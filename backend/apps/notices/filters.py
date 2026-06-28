from django.utils import timezone
from django_filters import rest_framework as filters

from apps.notices.models import Notice


class NoticeFilter(filters.FilterSet):

    type = filters.UUIDFilter(field_name="type")

    author = filters.UUIDFilter(field_name="author")

    is_active = filters.BooleanFilter()

    active = filters.BooleanFilter(method="filter_active")

    class Meta:
        model = Notice
        fields = [
            "type",
            "author",
            "is_active",
            "active",
        ]

    def filter_active(self, queryset, name, value):

        now = timezone.now()

        if value:
            return queryset.filter(
                is_active=True,
                expires_at__gt=now
            )

        return queryset.exclude(
            is_active=True,
            expires_at__gt=now
        )