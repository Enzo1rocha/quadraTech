from apps.activity_logs.models import ActivityLog

def log_activity(user, action_type, entity_type, entity_id, description, icon, metadata=None):
    ActivityLog.objects.create(
        user=user,
        action_type=action_type,
        entity_type=entity_type,
        entity_id=entity_id,
        description=description,
        icon=icon,
        metadata=metadata
    )