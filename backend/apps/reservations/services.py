from .models import Reservation, ReservationMaterial
from .validators import (
    check_user_conflict,
    check_class_conflict,
    check_venue_conflict,
    validate_class_schedule_conflict,
    validate_not_sunday,
    validate_venue_status,
    
    
    
    )
from apps.materials.models import Material
from rest_framework.exceptions import ValidationError
from django.db import transaction
from django.utils import timezone
from apps.activity_logs.services import create_log
from apps.activity_logs.models import ActivityLog
from datetime import datetime

    

# criação de reserva com checagem de conflitos
@transaction.atomic
def create_reservation(data):

    materials_data = data.pop('materials', [])
    
    if validate_venue_status(data['venue']):
        raise ValidationError(
            'Essa quadra está bloqueada no momento'
        )
    
    if validate_not_sunday(data['reservation_date']):
        raise ValidationError(
            'Não é permitido fazer reservas para domingos'
        )
    
    
    
    if check_venue_conflict(data['venue'], data['reservation_date'], data['start_time'], data['end_time']
    ):
        raise ValidationError(
            'Essa quadra já está ocupada nesse horário'
        )
    
    if check_user_conflict(data['user'], data['reservation_date'], data['start_time'], data['end_time']
    ):
        raise ValidationError(
            'Você já possui uma reserva nesse horário'
        )
    
    if check_class_conflict(
        data['class_obj'],
        data['reservation_date'],
        data['start_time'],
        data['end_time']
    ):
        raise ValidationError(
            'Essa turma já possui reserva nesse horário'
        )
    
    
    if validate_class_schedule_conflict(
        data['class_obj'],
        data['reservation_date'],
        data['start_time'],
        data['end_time']
    ):
        raise ValidationError(
            'Essa turma tem aula nesse horário'
        )
    
    reservation = Reservation.objects.create(**data)
    
    for item in materials_data:
        material = Material.objects.get(
            id=item['material_id']
        )
        
        quantity = item['quantity']
        
        if material.available_quantity < quantity:

            raise ValidationError(
                f'Estoque insuficiente para {material.name}'
            )
    
        ReservationMaterial.objects.create(
            reservation=reservation,
            material=material,
            quantity=quantity
        )
        
        material.available_quantity -= quantity
        material.save()
    
    create_log(
        user=data['user'],
        action_type=ActivityLog.ActionChoices.CREATE,
        entity_type=ActivityLog.EntityChoices.RESERVATION,
        entity_id=reservation.id,
        description=f'{data["user"].name} criou uma reserva em {data["venue"].name}',
        icon='✅'
    )
        
    return reservation


@transaction.atomic
def cancel_reservation(reservation, user):

    now = timezone.now()

    # status dinâmico
    start_datetime = timezone.make_aware(
        datetime.combine(reservation.reservation_date, reservation.start_time)
    )

    end_datetime = timezone.make_aware(
        datetime.combine(reservation.reservation_date, reservation.end_time)
    )

    if now > end_datetime:
        raise ValidationError(
            'Não é possível cancelar uma reserva já finalizada.'
        )

    if reservation.status == 'CANCELED':
        raise ValidationError(
            'Essa reserva já foi cancelada.'
        )

    reservation_materials = ReservationMaterial.objects.filter(
        reservation=reservation
    )

    for rm in reservation_materials:
        material = rm.material
        material.available_quantity += rm.quantity
        material.save()

    reservation.status = 'CANCELED'
    reservation.save()

    create_log(
        user=user,
        action_type=ActivityLog.ActionChoices.CANCEL,
        entity_type=ActivityLog.EntityChoices.RESERVATION,
        entity_id=reservation.id,
        description=f'{user.name} cancelou uma reserva em {reservation.venue.name}',
        icon='❌'
    )

    return reservation