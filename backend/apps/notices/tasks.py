from celery import shared_task
from services import expire_notices

import logging

logger = logging.getLogger(__name__)


@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=5, max_retries=3)
def expire_notices_task(self):
    try:
        logger.info("Starting notice expiration task")

        updated = expire_notices()

        logger.info(f"{updated} notices expired.")

        return updated

    except Exception as e:
        logger.exception("Error expiring notices")
        raise self.retry(exc=e)