from rest_framework import serializers
from apps.notices.models import Notice, NoticeType, NoticeDuration
from apps.activity_logs.services import create_log
from apps.activity_logs.models import ActivityLog


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = '__all__'
        read_only_fields = ('id', 'author', 'created_at', 'updated_at', 'expires_at')

    def create(self, validated_data):
        request = self.context['request']
        validated_data['author'] = request.user

        notice = super().create(validated_data)

        create_log(
            user=request.user,
            action_type=ActivityLog.ActionChoices.CREATE,
            entity_type=ActivityLog.EntityChoices.NOTICE,
            entity_id=str(notice.id),
            icon='✅', 
            description=f"Aviso '{notice.title}' criado."
        )

        return notice

    def update(self, instance, validated_data):
        notice = super().update(instance, validated_data)

        create_log(
            user=self.context['request'].user,
            action_type=ActivityLog.ActionChoices.UPDATE,
            entity_type=ActivityLog.EntityChoices.NOTICE,
            entity_id=str(notice.id),
            icon='✅',
            description=f"Aviso '{notice.title}' atualizado."
        )

        return notice


class NoticeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoticeType
        fields = '__all__'
        read_only_fields = ('id', 'created_at')
        
    def create(self, validated_data):
        exists = NoticeType.objects.filter(name=validated_data.get('name'))
        
        if exists.exists():
            raise serializers.ValidationError("Esse tipo de aviso já existe")
        
        notice_type = super().create(validated_data)
        
        if notice_type and notice_type.id:
            create_log(
                user=self.context['request'].user,
                action_type=ActivityLog.ActionChoices.CREATE,
                entity_type=ActivityLog.EntityChoices.NOTICE,
                entity_id=str(notice_type.id),
                icon='✅',
                description=f'Tipo de Aviso {notice_type.name} criado.'
            )
        
        return notice_type
    
    def delete(self, instance):
        notice_type_id = str(instance.id)
        notice_type_name = instance.name
        
        create_log(
            user=self.context['request'].user,
            action_type=ActivityLog.ActionChoices.DELETE,
            entity_type=ActivityLog.EntityChoices.NOTICE,
            entity_id=notice_type_id,
            icon='❌',
            description=f'Tipo de Aviso {notice_type_name} deletado.'
        )
        
        instance.delete()


class NoticeDurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoticeDuration
        fields = '__all__'
        read_only_fields = ('id', 'created_at')
        
        
        def create(self, validated_data):
            exists = NoticeDuration.objects.filter(name=validated_data.get('name'))
            
            if exists.exists():
                raise serializers.ValidationError("Essa duração de aviso já existe")
            
            notice_duration = super().create(validated_data)
            
            if notice_duration and notice_duration.id:
                create_log(
                    user=self.context['request'].user,
                    action_type=ActivityLog.ActionChoices.CREATE,
                    entity_type=ActivityLog.EntityChoices.NOTICE,
                    entity_id=str(notice_duration.id),
                    icon='✅',
                    description=f'Duração de Aviso {notice_duration.name} criada.'
                )
            
            return notice_duration
        
        
        def delete(self, instance):
            notice_duration_id = str(instance.id)
            notice_duration_name = instance.name
            
            create_log(
                user=self.context['request'].user,
                action_type=ActivityLog.ActionChoices.DELETE,
                entity_type=ActivityLog.EntityChoices.NOTICE,
                entity_id=notice_duration_id,
                icon='❌',
                description=f'Duração de Aviso {notice_duration_name} deletada.'
            )
            
            instance.delete()