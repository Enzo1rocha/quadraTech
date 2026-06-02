from rest_framework import serializers
from apps.materials.models import Material
from apps.activity_logs.services import create_log
from apps.activity_logs.models import ActivityLog



class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'
        read_only_fields = ('id', 'created_at')

    def validate(self, data):
        total = data.get('total_quantity', getattr(self.instance, 'total_quantity', 0))
        available = data.get('available_quantity', getattr(self.instance, 'available_quantity', 0))

        if available > total:
            raise serializers.ValidationError("Available quantity cannot be greater than total quantity.")

        return data
    
    
    def create(self, validated_data):

        if 'available_quantity' not in validated_data:
            validated_data['available_quantity'] = validated_data['total_quantity']

    # 🔥 cria o material no banco
        material = super().create(validated_data)

    # 🔥 agora tem ID válido
        if material and material.id:
            create_log(
                user=self.context['request'].user,
                action_type=ActivityLog.ActionChoices.CREATE,
                entity_type=ActivityLog.EntityChoices.MATERIAL,
                entity_id=str(material.id),
                icon=material.icon,
                description=f"Material '{material.name}' criado."
            )

        return material
    
    
    def update(self, instance, validated_data):
        material = super().update(instance, validated_data)
        
        if material and material.id:
            create_log(
                user=self.context['request'].user,
                action_type=ActivityLog.ActionChoices.UPDATE,
                entity_type=ActivityLog.EntityChoices.MATERIAL,
                entity_id=str(material.id),
                icon=material.icon,
                description=f"Material '{material.name}' atualizado."
            )
            
        return material
    
    
    def delete(self, instance):
        material_id = str(instance.id)
        material_name = instance.name
        icon = instance.icon
        
        result = super().delete(instance)
        
        create_log(
            user=self.context['request'].user,
            action_type=ActivityLog.ActionChoices.DELETE,
            entity_type=ActivityLog.EntityChoices.MATERIAL,
            entity_id=material_id,
            icon=icon,
            description=f"Material '{material_name}' excluído."
        )
        
        return result


