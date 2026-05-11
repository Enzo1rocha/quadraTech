from django.shortcuts import render
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers # Importe os serializers base do DRF
from apps.reservations.models import Reservation
from apps.classes.models import Class
from apps.venues.models import Venue
from apps.materials.models import Material
from apps.activity_logs.models import ActivityLog
from django.db.models import F
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiExample, inline_serializer


@extend_schema(
    tags=['dashboard'],
    summary='Obter dados para o dashboard',
    description='Retorna dados agregados para exibição no dashboard, como número de reservas, classes ativas, quadras disponíveis, materiais em uso e atividades recentes.',
    responses={
        200: OpenApiResponse(
            description='Dados agregados do Dashboard',
            response=inline_serializer(
                name='DashboardResponse',
                fields={
                    'today_reservations': serializers.IntegerField(),
                    'active_classes': serializers.IntegerField(),
                    'available_venues': serializers.IntegerField(),
                    'materials_in_use': serializers.IntegerField(),
                    'recent_activities': inline_serializer(
                        name='DashboardRecentActivity',
                        many=True, # Avisa que é uma lista de objetos
                        fields={
                            'description': serializers.CharField(),
                            'icon': serializers.CharField(),
                            'created_at': serializers.DateTimeField(),
                            'user': serializers.CharField(allow_null=True),
                        }
                    )
                }
            ),
            examples=[
                OpenApiExample(
                    name='Exemplo de Dashboard',
                    description='Retorno típico ao carregar a página inicial do Dashboard.',
                    value={
                        "today_reservations": 12,
                        "active_classes": 5,
                        "available_venues": 3,
                        "materials_in_use": 8,
                        "recent_activities": [
                            {
                                "description": "Nova reserva criada para a Quadra 1",
                                "icon": "📅",
                                "created_at": "2026-05-10T14:30:00Z",
                                "user": "João Silva"
                            },
                            {
                                "description": "Material 'Bola de Basquete' atualizado",
                                "icon": "🏀",
                                "created_at": "2026-05-10T13:15:00Z",
                                "user": "Maria Souza"
                            }
                        ]
                    }
                )
            ]
        ),
        401: OpenApiResponse(
            description='Usuário não autenticado',
            response=dict,
            examples=[
                OpenApiExample(
                    name='Erro de Autenticação',
                    value={'detail': 'As credenciais de autenticação não foram fornecidas.'}
                )
            ]
        )
    }
)
class DashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        today = timezone.now().date()

        today_reservations = Reservation.objects.filter(
            reservation_date=today
        ).count()

        active_classes = Class.objects.count()

        available_venues = Venue.objects.filter(
            venue_status__name='OPERATIONAL'
        ).count()

        materials_in_use = Material.objects.filter(
            available_quantity__lt=F('total_quantity')
        ).count()

        recent_logs = ActivityLog.objects.select_related('user').order_by('-created_at')[:5]

        logs_data = [
            {
                'description': log.description,
                'icon': log.icon,
                'created_at': log.created_at,
                'user': getattr(log.user, 'name', 'Sistema') 
            }
            for log in recent_logs
        ]

        return Response({
            'today_reservations': today_reservations,
            'active_classes': active_classes,
            'available_venues': available_venues,
            'materials_in_use': materials_in_use,
            'recent_activities': logs_data
        })