from django.utils import timezone
from datetime import datetime
from django.db import transaction

from apps.reservations.models import Reservation, ReservationMaterial


@transaction.atomic
def complete_finished_reservations():
    now = timezone.now()
    today = now.date()

    reservations = (
        Reservation.objects
        .filter(status='SCHEDULED', reservation_date__lte=today)
        .prefetch_related('reservationmaterial_set__material')
    )

    updated_count = 0
    materials_to_update = []

    for r in reservations:
        end_datetime = timezone.make_aware(
            datetime.combine(r.reservation_date, r.end_time)
        )

        if now >= end_datetime:

            for rm in r.reservationmaterial_set.all():
                material = rm.material
                material.available_quantity += rm.quantity
                materials_to_update.append(material)

            r.status = 'DONE'
            updated_count += 1

    # 🔥 salva tudo em batch
    if materials_to_update:
        from django.db.models import F
        for m in materials_to_update:
            m.save()

    Reservation.objects.bulk_update(reservations, ['status'])

    return updated_count