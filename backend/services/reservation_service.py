from django.utils import timezone
from datetime import datetime
from django.db import transaction

from apps.reservations.models import Reservation, ReservationMaterial


@transaction.atomic
def complete_finished_reservations():

    now = timezone.now()
    today = now.date()

    reservations = Reservation.objects.filter(
        status='SCHEDULED',
        reservation_date__lte=today
    )

    updated_count = 0

    for r in reservations:

        end_datetime = timezone.make_aware(
            datetime.combine(r.reservation_date, r.end_time)
        )

        if now >= end_datetime:

            # devolver materiais
            materials = ReservationMaterial.objects.filter(reservation=r)

            for rm in materials:
                material = rm.material
                material.available_quantity += rm.quantity
                material.save()

            # atualizar status
            r.status = 'DONE'
            r.save()

            updated_count += 1

    return updated_count