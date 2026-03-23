from django.contrib import admin
from .models import Reservation, ReservationMaterial

admin.site.register(Reservation)
admin.site.register(ReservationMaterial)