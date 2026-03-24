from django.db import models
from django.conf import settings
import uuid

# Create your models here.

class ActivityLog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='activity_logs'
    )

    action_type = models.CharField(max_length=30)  # CREATE, UPDATE, DELETE
    entity_type = models.CharField(max_length=30)  # RESERVATION, MATERIAL, NOTICE
    entity_id = models.UUIDField()

    description = models.TextField()
    icon = models.CharField(max_length=10)

    metadata = models.JSONField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.action_type} - {self.entity_type}"