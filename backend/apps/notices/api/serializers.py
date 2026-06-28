from rest_framework import serializers
from apps.notices.models import Notice, NoticeType, NoticeDuration
from apps.activity_logs.services import create_log
from apps.activity_logs.models import ActivityLog

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = '__all__'
        read_only_fields = ('id', 'author', 'created_at', 'updated_at', 'expires_at')
        
        
    def validate(self, attrs):
        duration = attrs.get(
            "duration",
            getattr(self.instance, "duration", None)
        )

        if duration and duration.duration_hours <= 0:
            raise serializers.ValidationError(
                "A duração deve ser maior que zero."
            )

        return attrs

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
        notice_type = super().create(validated_data)
        create_log(
            user=self.context['request'].user,
            action_type=ActivityLog.ActionChoices.CREATE,
            entity_type=ActivityLog.EntityChoices.NOTICE,
            entity_id=str(notice_type.id),
            icon='✅',
            description=f'Tipo de Aviso {notice_type.name} criado.'
        )
        return notice_type

class NoticeDurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoticeDuration
        fields = '__all__'
        read_only_fields = ('id', 'created_at')
        
    def create(self, validated_data):
        notice_duration = super().create(validated_data)
        create_log(
            user=self.context['request'].user,
            action_type=ActivityLog.ActionChoices.CREATE,
            entity_type=ActivityLog.EntityChoices.NOTICE,
            entity_id=str(notice_duration.id),
            icon='✅',
            description=f'Duração de Aviso {notice_duration.name} criada.'
        )
        return notice_duration
