from rest_framework import serializers
from rest_framework.viewsets import ModelViewSet
from apps.materials.models import Material
from .serializers import MaterialSerializer
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import (
    IsAdmin,
    IsSupport,
    IsTeacher,
    IsDirector,
)
from drf_spectacular.utils import extend_schema, extend_schema_view, inline_serializer


material_request_serializer = inline_serializer(
    name='MaterialRequest',
    fields={
        'name': serializers.CharField(
            required=True, 
            help_text='Nome do material: "Bola de Futsal"'
        ),
        'icon': serializers.CharField(
            required=False, 
            help_text='Icone do material: ⚽'
        ),
    }
)

@extend_schema_view(
    # Documenta o método POST (Criar)
    create=extend_schema(
        tags=['materials'],
        summary='Criar um novo material',
        request=material_request_serializer
    ),
    # Documenta o método PUT (Atualizar tudo)
    update=extend_schema(
        tags=['materials'],
        summary='Atualizar um material existente',
        request=material_request_serializer
    ),
    # Documenta o método PATCH (Atualização parcial)
    partial_update=extend_schema(
        tags=['materials'],
        summary='Atualizar parcialmente um material',
        request=material_request_serializer
    ),
    # Documenta o GET e DELETE se necessário
    list=extend_schema(tags=['materials'], summary='Listar materiais'),
    retrieve=extend_schema(tags=['materials'], summary='Visualizar um material específico'),
    destroy=extend_schema(tags=['materials'], summary='Deletar um material')
)
class MaterialViewSet(ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    
    def get_permissions(self):
        # Se for um método GET
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated & (IsAdmin | IsSupport)]
            
        return [permission() for permission in permission_classes]