from django.contrib import admin
from .models import Venue, VenueType, VenueStatus

admin.site.register(Venue)
admin.site.register(VenueType)
admin.site.register(VenueStatus)