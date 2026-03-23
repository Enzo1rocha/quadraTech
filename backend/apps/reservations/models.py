from django.db import models
import uuid
from django.conf import settings

# Create your models here.

class Reservation(models.Model):
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
        default='SCHEDULED'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.venue.name} - {self.reservation_date}"
    
    

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