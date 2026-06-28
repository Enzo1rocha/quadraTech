from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from apps.activity_logs.models import ActivityLog
from apps.activity_logs.services import create_log
from apps.notices.filters import NoticeFilter
from apps.notices.models import (
    Notice,
    NoticeDuration,
    NoticeType,
)
from apps.users.permissions import (
    IsAdmin,
    IsDirector,
    IsSupport,
    IsTeacher,
)

from .serializers import (
    NoticeDurationSerializer,
    NoticeSerializer,
    NoticeTypeSerializer,
)


class NoticeViewSet(ModelViewSet):

    queryset = Notice.objects.all()

    serializer_class = NoticeSerializer

    permission_classes = [
        IsAuthenticated &
        (IsAdmin | IsSupport | IsDirector | IsTeacher)
    ]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_class = NoticeFilter

    search_fields = [
        "title",
        "description",
    ]

    ordering_fields = [
        "created_at",
        "expires_at",
    ]

    ordering = [
        "-created_at"
    ]

    def get_queryset(self):
        return Notice.objects.select_related(
            "author",
            "type",
            "duration",
        )


class NoticeTypeViewSet(ModelViewSet):

    queryset = NoticeType.objects.all()

    serializer_class = NoticeTypeSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [(IsAuthenticated & (IsAdmin | IsSupport))()]

    def perform_destroy(self, instance):

        create_log(
            user=self.request.user,
            action_type=ActivityLog.ActionChoices.DELETE,
            entity_type=ActivityLog.EntityChoices.NOTICE,
            entity_id=str(instance.id),
            icon="❌",
            description=f"Tipo de aviso '{instance.name}' deletado."
        )

        instance.delete()


class NoticeDurationViewSet(ModelViewSet):

    queryset = NoticeDuration.objects.all()

    serializer_class = NoticeDurationSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [(IsAuthenticated & (IsAdmin | IsSupport))()]

    def perform_destroy(self, instance):

        create_log(
            user=self.request.user,
            action_type=ActivityLog.ActionChoices.DELETE,
            entity_type=ActivityLog.EntityChoices.NOTICE,
            entity_id=str(instance.id),
            icon="❌",
            description=f"Duração '{instance.name}' deletada."
        )

        instance.delete()