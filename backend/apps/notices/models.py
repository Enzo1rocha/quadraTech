import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone


class NoticeType(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=50, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class NoticeDuration(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=15, unique=True)
    duration_hours = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Notice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=150)
    description = models.TextField()

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notices"
    )

    type = models.ForeignKey(
        NoticeType,
        on_delete=models.PROTECT,
        related_name="notices"
    )

    duration = models.ForeignKey(
        NoticeDuration,
        on_delete=models.PROTECT,
        related_name="notices"
    )

    is_active = models.BooleanField(default=True)

    expires_at = models.DateTimeField(
        blank=True,
        null=True,
        db_index=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title