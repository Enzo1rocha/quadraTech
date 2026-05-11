from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
from collections import defaultdict
from apps.reservations.models import Reservation
from apps.reservations.validators import is_valid_date_range

from apps.reservations.api.serializers import (
    ReservationCreateSerializer
)

from apps.reservations.services import (
    create_reservation,
    cancel_reservation
)
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse, OpenApiExample, OpenApiTypes




class ReservationListCreateView(ListCreateAPIView):

    queryset = Reservation.objects.all()

    serializer_class = ReservationCreateSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        reservation = create_reservation(
            serializer.validated_data
        )

        serializer.instance = reservation


@extend_schema(
    tags=['reservations'],
    summary='Visualizar reservas em formato de calendário',
    parameters=[
        OpenApiParameter(
            name='start_date',
            description='Data inicial (YYYY-MM-DD)',
            required=True,
            type=OpenApiTypes.DATE,
            location=OpenApiParameter.QUERY
        ),
        OpenApiParameter(
            name='end_date',
            description='Data final (YYYY-MM-DD)',
            required=True,
            type=OpenApiTypes.DATE,
            location=OpenApiParameter.QUERY
        ),
        OpenApiParameter(
            name='venue_id',
            description='ID do local para filtrar',
            required=False,
            type=OpenApiTypes.UUID,
            location=OpenApiParameter.QUERY
        ),
        OpenApiParameter(
            name='user_id',
            description='ID do usuário para filtrar',
            required=False,
            type=OpenApiTypes.UUID,
            location=OpenApiParameter.QUERY
        )
    ],
    responses={
        200: OpenApiResponse(
            description='Calendário de reservas agrupado por data e hora',
            response=dict, 
            examples=[
                OpenApiExample(
                    name='Exemplo de Retorno do Calendário',
                    summary='Calendário com 1 dia e 2 horários',
                    description='Retorna um dicionário onde a chave primária é a data (YYYY-MM-DD), a secundária é a hora (HH:MM), contendo uma lista de reservas.',
                    value={
                        "YYYY-MM-DD": {
                            "HH:MM": [
                                {
                                    "id": "UUID",
                                    "title": "Treino Basquete",
                                    "start_time": "HH:MM:SS",
                                    "end_time": "HH:MM:SS",
                                    "status": "SCHEDULED",
                                    "user": {
                                        "id": "UUID",
                                        "name": "Responsável pela reserva"
                                    },
                                    "venue": {
                                        "id": "UUID",
                                        "name": "Quadra 1",
                                        "icon": "@"
                                    },
                                    "class": {
                                        "id": "UUID",
                                        "name": "CLASS"
                                    }
                                }
                            ],
                            "HH:MM": [
                                {
                                    "id": "UUID",
                                    "title": "Treino Futsal",
                                    "start_time": "HH:MM:SS",
                                    "end_time": "HH:MM:SS",
                                    "status": "SCHEDULED",
                                    "user": {
                                        "id": "UUID",
                                        "name": "Responsável pela reserva"
                                    },
                                    "venue": {
                                        "id": "UUID",
                                        "name": "Quadra 2",
                                        "icon": "$"
                                    },
                                    "class": {
                                        "id": "UUID",
                                        "name": "CLASS"
                                    }
                                }
                            ]
                        }
                    }
                )
            ]
        ),
        400: OpenApiResponse(
            description='Erro de validação nos parâmetros',
            response=dict,
            examples=[
                OpenApiExample(
                    name='Erro de Formato',
                    value={'detail': 'Formato inválido. Use YYYY-MM-DD.'}
                )
            ]
        ),
        
        400: OpenApiResponse(
            description='Erro de validação nos parâmetros',
            response=dict,
            examples=[
                OpenApiExample(
                    name='Erro de Intervalo de Datas',
                    value={'detail': 'start_date deve ser menor ou igual a end_date.'}
                )
            ]
        )
    }
)
class ReservationCalendarView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        venue_id = request.query_params.get('venue_id')
        user_id = request.query_params.get('user_id')

        if not start_date or not end_date:
            return Response(
                {'detail': 'start_date e end_date são obrigatórios.'},
                status=400
            )
            
        if not is_valid_date_range(start_date, end_date):
            return Response(
                {'detail': 'start_date deve ser menor ou igual a end_date.'},
                status=400
            )

        try:
            start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {'detail': 'Formato inválido. Use YYYY-MM-DD.'},
                status=400
            )

        queryset = Reservation.objects.filter(
            reservation_date__range=[start_date, end_date]
        ).select_related(
            'user',
            'venue',
            'class_obj'
        )

        # filtros opcionais
        if venue_id:
            queryset = queryset.filter(venue_id=venue_id)

        if user_id:
            queryset = queryset.filter(user_id=user_id)

        queryset = queryset.order_by('reservation_date', 'start_time')

        # estrutura agrupada
        calendar = defaultdict(lambda: defaultdict(list))

        for r in queryset:

            day = r.reservation_date.strftime('%Y-%m-%d')
            hour = r.start_time.strftime('%H:%M')

            calendar[day][hour].append({
                'id': str(r.id),
                'title': r.title,
                'start_time': r.start_time,
                'end_time': r.end_time,
                'status': r.status,

                'user': {
                    'id': str(r.user.id),
                    'name': r.user.name
                },

                'venue': {
                    'id': str(r.venue.id),
                    'name': r.venue.name,
                    'icon': r.venue.icon
                },

                'class': {
                    'id': str(r.class_obj.id),
                    'name': r.class_obj.acronym_and_year
                }
            })

        return Response(dict(calendar))
    

class CancelReservationView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        try:
            reservation = Reservation.objects.get(id=pk)
        except Reservation.DoesNotExist:
            return Response({'detail': 'Reserva não encontrada'}, status=404)

        cancel_reservation(reservation, request.user)

        return Response({'detail': 'Reserva cancelada com sucesso'})