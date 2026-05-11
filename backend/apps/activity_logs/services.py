from .models import ActivityLog

def create_log(user, action_type, entity_type, entity_id, description, icon=None, metadata=None):

    ActivityLog.objects.create(
        user=user,
        action_type=action_type,
        entity_type=entity_type,
        entity_id=entity_id,
        description=description,
        icon=icon,
        metadata=metadata or {}
    )