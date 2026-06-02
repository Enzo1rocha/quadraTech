from rest_framework.viewsets import ModelViewSet
from apps.classes.models import Class, ClassShift
from .serializers import ClassSerializer, ClassShiftSerializer
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse, OpenApiExample, OpenApiTypes
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import (
    IsAdmin,
    IsTeacher,
    IsDirector,
    IsSupport
)




@extend_schema(
    tags=['classes'],
    summary='Gerenciar Turmas',
    description='Permite criar, listar, atualizar e deletar as turmas disponíveis no sistema, incluindo detalhes como nome, descrição, número de alunos, dias da semana e horários.',
    parameters=[
        OpenApiParameter(
            name='id',
            description='ID da turma (para atualização ou deleção)',
            required=False,
            type=OpenApiTypes.UUID,
            location=OpenApiParameter.PATH
        ),
        OpenApiParameter(
            name='acronym_and_year',
            description='Acrônimo e ano da turma (ex: "FUT-2023")',
            required=True,
            type=OpenApiTypes.STR,
        ),
        OpenApiParameter(
            name='course_name',
            description='Nome do curso (ex: "Futebol")',
            required=True,
            type=OpenApiTypes.STR,
        ),
        OpenApiParameter(
            name='number_of_students',
            description='Número de alunos na turma',
            required=True,
            type=OpenApiTypes.INT,
        ),
        OpenApiParameter(
            name='acronym_and_year',
            description='Acrônimo e ano da turma (ex: "FUT-2023")',
            required=True,
            type=OpenApiTypes.STR,
        ),
        OpenApiParameter(
            name='shift',
            description='ID do turno da turma (referência para ClassShift)',
            required=True,
            type=OpenApiTypes.UUID,
        ),
        OpenApiParameter(
            name='class_days',
            description='Dias da semana em que a turma ocorre (ex: ["MON", "WED", "FRI"])',
            required=True,
            type=OpenApiTypes.STR,            many=True
        ),
        OpenApiParameter(
            name='start_time',
            description='Horário de início da turma (ex: "14:00:00")',
            required=True,
            type=OpenApiTypes.TIME,
        ),
        OpenApiParameter(
            name='end_time',
            description='Horário de término da turma (ex: "16:00:00")',
            required=True,
            type=OpenApiTypes.TIME,
        )
        
    ]
)
class ClassViewSet(ModelViewSet):
    queryset = Class.objects.select_related('shift').all()
    serializer_class = ClassSerializer
    
    def get_permissions(self):
        # Se for um método GET
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated & (IsAdmin | IsSupport | IsDirector)]
            
        return [permission() for permission in permission_classes]



@extend_schema(
    tags=['classes'],
    summary='Gerenciar turnos de aulas',
    description='Permite criar, listar, atualizar e deletar os turnos de aulas disponíveis no sistema, como MANHA, TARDE e NOITE.',
    parameters=[
        OpenApiParameter(
            name='id',
            description='ID do turno de aula (para atualização ou deleção)',
            required=False,
            type=OpenApiTypes.UUID,
            location=OpenApiParameter.PATH
        ),
        OpenApiParameter(
            name='name',
            description='Nome do turno de aula (ex: MANHA, TARDE, NOITE)',
            required=True,
            type=OpenApiTypes.STR,
        )
    ],
    responses={
        200: OpenApiResponse(
            description='Turnos de aulas listados ou detalhes do turno atualizado.',
            response=ClassShiftSerializer(many=True)
        ),
        201: OpenApiResponse(
            description='Turno de aula criado com sucesso.',
            response=ClassShiftSerializer()
        ),
        400: OpenApiResponse(
            description='Dados inválidos fornecidos para criação ou atualização do turno de aula.'
        ),
        404: OpenApiResponse(
            description='Turno de aula não encontrado para atualização ou deleção.'
        )
        
    },
)
class ClassShiftViewSet(ModelViewSet):
    queryset = ClassShift.objects.all()
    serializer_class = ClassShiftSerializer
    
    
    def get_permissions(self):
        # Se for um método GET
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated & (IsAdmin | IsSupport | IsDirector)]
            
        return [permission() for permission in permission_classes]
    
    