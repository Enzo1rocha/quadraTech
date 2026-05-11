from django.urls import path

from apps.reservations.api.views import (
    ReservationListCreateView,
    ReservationCalendarView,
    CancelReservationView
)

urlpatterns = [
    path('', ReservationListCreateView.as_view(), name='reservation-list-create'),
    path('calendar/', ReservationCalendarView.as_view()),
    path('reservations/<uuid:pk>/cancel/', CancelReservationView.as_view()),
]