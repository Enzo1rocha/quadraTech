from django.db import models
from django.contrib.postgres.fields import ArrayField
import uuid

# Create your models here.

class ClassShift(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=10)  # MANHA, TARDE, NOITE

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class WeekDay(models.TextChoices):
    MON = 'MON', 'Segunda'
    TUE = 'TUE', 'Terça'
    WED = 'WED', 'Quarta'
    THU = 'THU', 'Quinta'
    FRI = 'FRI', 'Sexta'
    SAT = 'SAT', 'Sábado'
    SUN = 'SUN', 'Domingo'


class Class(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    acronym_and_year = models.CharField(max_length=30)
    course_name = models.CharField(max_length=100)
    number_of_students = models.IntegerField()

    shift = models.ForeignKey(
        ClassShift,
        on_delete=models.PROTECT,
        related_name='classes'
    )

    class_days = ArrayField(
        models.CharField(
            max_length=3,
            choices=WeekDay.choices
        ),
        default=list
    )
    start_time = models.TimeField()
    end_time = models.TimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.acronym_and_year} - {self.course_name}"