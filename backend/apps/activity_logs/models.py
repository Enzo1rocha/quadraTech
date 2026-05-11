from django.db import models
from django.conf import settings
import uuid

class ActivityLog(models.Model):

    # Opções para action_type
    class ActionChoices(models.TextChoices):
        CREATE = 'CREATE', 'Criação'
        UPDATE = 'UPDATE', 'Atualização'
        DELETE = 'DELETE', 'Exclusão'
        CANCEL = 'CANCEL', 'Cancelamento'
        COMPLETE = 'COMPLETE', 'Conclusão'
        LOGIN = 'LOGIN', 'Login'
        LOGOUT = 'LOGOUT', 'Logout'

    # Opções para entity_type baseadas nos seus apps
    class EntityChoices(models.TextChoices):
        CLASS = 'CLASS', 'Turma/Aula'
        HELP_CENTER = 'HELP_CENTER', 'Centro de Ajuda'
        MATERIAL = 'MATERIAL', 'Material'
        NOTICE = 'NOTICE', 'Aviso'
        RESERVATION = 'RESERVATION', 'Reserva'
        USER = 'USER', 'Usuário'
        VENUE = 'VENUE', 'Local/Espaço'
        

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='activity_logs'
    )

    # Aplicando as escolhas aos CharFields
    action_type = models.CharField(
        max_length=30,
        choices=ActionChoices.choices
    )
    
    entity_type = models.CharField(
        max_length=30,
        choices=EntityChoices.choices
    )
    
    entity_id = models.UUIDField()

    description = models.TextField()
    icon = models.CharField(max_length=10)

    metadata = models.JSONField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        action_label = dict(self.ActionChoices.choices).get(self.action_type, self.action_type)
        entity_label = dict(self.EntityChoices.choices).get(self.entity_type, self.entity_type)
        
        return f"{action_label} - {entity_label}"