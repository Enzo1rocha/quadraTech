from rest_framework.viewsets import ModelViewSet
from apps.venues.models import Venue, VenueStatus, VenueType
from .serializers import VenueSerializer, VenueTypeSerializer, VenueStatusSerializer
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import IsAdmin, IsSupport
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter
from django_filters import rest_framework as filters
from ..filters import VenueFilter



@extend_schema_view(
    list=extend_schema(tags=['venues'], summary='Listar locais', parameters=[
        OpenApiParameter(
            name='name',
            description='Filtrar por nome do local (ex: "Quadra Poliesportiva")',
            required=False,),
        OpenApiParameter(
            name='venue_status',
            description='Filtrar por status do local',
            required=False,),
        OpenApiParameter(
            name='venue_type',
            description='Filtrar por tipo de local',
            required=False,)
    ]),
    create=extend_schema(tags=['venues'], summary='Criar um novo local'),
    retrieve=extend_schema(tags=['venues'], summary='Visualizar um local específico'),
    update=extend_schema(tags=['venues'], summary='Atualizar um local existente'),
    partial_update=extend_schema(tags=['venues'], summary='Atualizar parcialmente um local'),
    destroy=extend_schema(tags=['venues'], summary='Deletar um local')
)
class VenueViewSet(ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = VenueFilter
    
    # /api/venues/?name=quadra
    # /api/venues/?venue_status=OPERATIONAL
    # /api/venues/?venue_type=<UUID>
    
    def get_permissions(self):
        # Se for um método GET
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated & (IsAdmin | IsSupport)]
            
        return [permission() for permission in permission_classes]




@extend_schema_view(
    list=extend_schema(tags=['venues-types'], summary='Listar tipos de locais'),
    create=extend_schema(tags=['venues-types'], summary='Criar um novo tipo de local'),
    retrieve=extend_schema(tags=['venues-types'], summary='Visualizar um tipo específico'),
    update=extend_schema(tags=['venues-types'], summary='Atualizar um tipo de local'),
    partial_update=extend_schema(tags=['venues-types'], summary='Atualizar parcialmente um tipo de local'),
    destroy=extend_schema(tags=['venues-types'], summary='Deletar um tipo de local')
)
class VenueTypeViewSet(ModelViewSet):
    queryset = VenueType.objects.all()
    serializer_class = VenueTypeSerializer
    
    def get_permissions(self):
        # Se for um método GET
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated & (IsAdmin | IsSupport)]
            
        return [permission() for permission in permission_classes]




@extend_schema_view(
    list=extend_schema(tags=['venues-status'], summary='Listar status dos locais'),
    create=extend_schema(tags=['venues-status'], summary='Criar um novo status'),
    retrieve=extend_schema(tags=['venues-status'], summary='Visualizar um status específico'),
    update=extend_schema(tags=['venues-status'], summary='Atualizar um status'),
    partial_update=extend_schema(tags=['venues-status'], summary='Atualizar parcialmente um status'),
    destroy=extend_schema(tags=['venues-status'], summary='Deletar um status')
)
class VenueStatusViewSet(ModelViewSet):
    queryset = VenueStatus.objects.all()
    serializer_class = VenueStatusSerializer
    
    def get_permissions(self):
        # Se for um método GET
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated & (IsAdmin | IsSupport)]
            
        return [permission() for permission in permission_classes]
    