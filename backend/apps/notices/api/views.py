from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from apps.notices.models import Notice, NoticeType, NoticeDuration
from .serializers import NoticeSerializer, NoticeTypeSerializer, NoticeDurationSerializer
from ..filters import NoticeFilter
from apps.users.permissions import IsAdmin, IsSupport, IsDirector, IsTeacher
from rest_framework.permissions import IsAuthenticated


class NoticeViewSet(ModelViewSet):
    queryset = Notice.objects.all().order_by('-created_at')
    serializer_class = NoticeSerializer
    permission_classes = [IsAuthenticated & (IsAdmin | IsSupport | IsDirector | IsTeacher)]
    filter_backends = [DjangoFilterBackend]
    filterset_class = NoticeFilter
    
    

class NoticeDurationViewSet(ModelViewSet):
    queryset = NoticeDuration.objects.all()
    serializer_class = NoticeDurationSerializer
    
    def get_permissions(self):
        # Se for um método GET
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated & (IsAdmin | IsSupport)]
            
        return [permission() for permission in permission_classes]


class NoticeTypeViewSet(ModelViewSet):
    queryset = NoticeType.objects.all()
    serializer_class = NoticeTypeSerializer
    
    def get_permissions(self):
        # Se for um método GET
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated & (IsAdmin | IsSupport)]
            
        return [permission() for permission in permission_classes]