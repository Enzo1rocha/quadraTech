from rest_framework import serializers
from apps.classes.models import Class, ClassShift, WeekDay


class ClassShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassShift
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')
        

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

    def validate(self, data):
        start = data.get('start_time', getattr(self.instance, 'start_time', None))
        
        end = data.get('end_time', getattr(self.instance, 'end_time', None))
        
        days = data.get('class_days', getattr(self.instance, 'class_days', []))
        
        students = data.get('number_of_students', getattr(self.instance, 'number_of_students', 0))
        
        shift = data.get('shift', getattr(self.instance, 'shift', None))

        if start and end and start >= end:
            raise serializers.ValidationError("Começo deve ser antes do fim.")

        # dias obrigatórios
        if not days:
            raise serializers.ValidationError("A turma deve ter pelo menos um dia definido.")

        # número de alunos
        if students <= 0:
            raise serializers.ValidationError("O número de alunos deve ser maior que 0.")
        
        existing = Class.objects.filter(
            shift=shift,
            start_time=start,
            end_time=end,
            class_days__overlap=days
        )
        
        if self.instance:
            existing = existing.exclude(id=self.instance.id)
            
        if existing.exists():
            raise serializers.ValidationError("Já existe uma turma com esse turno, horário e dias da semana.")
        
        
        return data