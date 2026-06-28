from django.utils import timezone

from apps.notices.models import Notice


def expire_notices():
    """
    Marca automaticamente como inativos
    todos os avisos expirados.
    """

    return Notice.objects.filter(
        is_active=True,
        expires_at__lte=timezone.now()
    ).update(is_active=False)