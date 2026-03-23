from django.db import models
import uuid

# Create your models here.

class Material(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=50)
    icon = models.CharField(max_length=10)

    total_quantity = models.IntegerField()
    available_quantity = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name