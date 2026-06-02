from rest_framework import serializers
from apps.venues.models import Venue, VenueType, VenueStatus
from apps.activity_logs.services import create_log
from apps.activity_logs.models import ActivityLog

class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        venue = super().create(validated_data)
        create_log(
            user=self.context['request'].user,
            action_type=ActivityLog.ActionChoices.CREATE,
            entity_type=ActivityLog.EntityChoices.VENUE,
            entity_id=str(venue.id),
            icon='✅',
            description=f"Venue '{venue.name}' criada."
        )
        return venue

    def update(self, instance, validated_data):
        venue = super().update(instance, validated_data)
        create_log(
            user=self.context['request'].user,
            action_type=ActivityLog.ActionChoices.UPDATE,
            entity_type=ActivityLog.EntityChoices.VENUE,
            entity_id=str(venue.id),
            icon='⇄',
            description=f"Venue '{venue.name}' atualizada."
        )
        return venue


class VenueTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VenueType
        fields = '__all__'
        read_only_fields = ('id', 'created_at')
    
    def create(self, validated_data):
        exists = VenueType.objects.filter(name=validated_data.get('name'))
        
        if exists.exists():
            raise serializers.ValidationError("Esse tipo de local já existe")
        
        venue_type = super().create(validated_data)
        
        if venue_type and venue_type.id:
            create_log(
                user=self.context['request'].user,
                action_type=ActivityLog.ActionChoices.CREATE,
                entity_type=ActivityLog.EntityChoices.VENUE,
                entity_id=str(venue_type.id),
                icon='✅',
                description=f'Tipo de Espaço {venue_type.name} criado.'
            )
        
        return venue_type
    
    
    def delete(self, instance):
        venue_type_id = str(instance.id)
        venue_type_name = instance.name
        
        result = super().delete(instance)
        
        if result.get('status') == 'sucess':
            create_log(
                user=self.context['request'].user,
                action_type=ActivityLog.ActionChoices.DELETE,
                entity_type=ActivityLog.EntityChoices.VENUE,
                entity_id=venue_type_id,
                icon='❌',
                description=f"Tipo do local {venue_type_name} excluido"
            )
        return result


class VenueStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = VenueStatus
        fields = '__all__'
        read_only_fields = ('id', 'created_at')


    def create(self, validated_data):
        venue_status = super().create(validated_data)
        
        if venue_status and venue_status.id:
            create_log(
                user=self.context['request'].user,
                action_type=ActivityLog.ActionChoices.CREATE,
                entity_type=ActivityLog.EntityChoices.VENUE,
                entity_id=str(venue_status.id),
                icon='✅',
                description=f'Status do local {venue_status.name} criado.'                    
            )
        return venue_status
    
    def delete(self, instance):
        venue_status_id = str(instance.id)
        venue_status_name = instance.name
        
        result = super().delete(instance)
        
        if result.get('status') == 'sucess':
            create_log(
                user=self.context['request'].user,
                action_type=ActivityLog.ActionChoices.DELETE,
                entity_type=ActivityLog.EntityChoices.VENUE,
                entity_id=venue_status_id,
                icon='❌',
                description=f"Status do local {venue_status_name} excluido"
            )
        return result