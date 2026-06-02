from django_filters import rest_framework as filters
from apps.venues.models import Venue


class VenueFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains')
    venue_type = filters.UUIDFilter(field_name='venue_type__id')
    venue_status = filters.CharFilter(field_name='venue_status__name')

    class Meta:
        model = Venue
        fields = ['name', 'venue_type', 'venue_status']