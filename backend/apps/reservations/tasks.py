from celery import shared_task
from services.reservation_service import complete_finished_reservations

@shared_task
def complete_reservations_task():

    return complete_finished_reservations()