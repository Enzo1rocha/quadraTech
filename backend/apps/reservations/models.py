from django.db import models
import uuid
from django.conf import settings
from django.utils import timezone
from datetime import datetime

# Create your models here.

class Reservation(models.Model):

    # Definindo as opções disponíveis (Enum)
    class StatusChoices(models.TextChoices):
        SCHEDULED = 'SCHEDULED', 'Agendado'
        ONGOING = 'ONGOING', 'Em Andamento'
        DONE = 'DONE', 'Concluído'
        CANCELED = 'CANCELED', 'Cancelado'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=100, null=True, blank=True)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reservations'
    )

    venue = models.ForeignKey(
        'venues.Venue',
        on_delete=models.PROTECT,
        related_name='reservations'
    )

    class_obj = models.ForeignKey(
        'classes.Class',
        on_delete=models.PROTECT,
        related_name='reservations'
    )

    reservation_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    status = models.CharField(
        max_length=30,
        choices=StatusChoices.choices,
        default=StatusChoices.SCHEDULED,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.venue.name} - {self.reservation_date}"

    @property
    def computed_status(self):
        if self.status == self.StatusChoices.CANCELED:
            return self.StatusChoices.CANCELED

        now = timezone.now()

        start = timezone.make_aware(
            datetime.combine(self.reservation_date, self.start_time)
        )

        end = timezone.make_aware(
            datetime.combine(self.reservation_date, self.end_time)
        )

        if now < start:
            return self.StatusChoices.SCHEDULED
        elif start <= now <= end:
            return self.StatusChoices.ONGOING
        else:
            return self.StatusChoices.DONE
    

class ReservationMaterial(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    reservation = models.ForeignKey(
        Reservation,
        on_delete=models.CASCADE,
        related_name='materials'
    )

    material = models.ForeignKey(
        'materials.Material',
        on_delete=models.PROTECT
    )

    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.material.name} ({self.quantity})"