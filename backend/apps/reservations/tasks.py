from celery import shared_task
from services.reservation_service import complete_finished_reservations
import logging

logger = logging.getLogger(__name__)


@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=5, max_retries=3)
def complete_reservations_task(self):
    try:
        logger.info("Starting reservation completion task")

        result = complete_finished_reservations()

        logger.info(f"Completed reservations: {result}")
        return result

    except Exception as e:
        logger.error(f"Error in task: {e}")
        raise self.retry(exc=e)