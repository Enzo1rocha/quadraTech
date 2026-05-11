from rest_framework.exceptions import ValidationError
from .models import Reservation, ReservationMaterial
from datetime import datetime
from services.holiday_service import get_holidays

def check_user_conflict(user, date, start_time, end_time):

    queryset = Reservation.objects.filter(
        user=user,
        reservation_date=date
    )

    return check_time_overlap(
        queryset,
        start_time,
        end_time
    )


def check_class_conflict(class_obj, date, start_time, end_time):

    queryset = Reservation.objects.filter(
        class_obj=class_obj,
        reservation_date=date
    )

    return check_time_overlap(
        queryset,
        start_time,
        end_time
    )


def check_venue_conflict(venue, date, start_time, end_time):

    queryset = Reservation.objects.filter(
        venue=venue,
        reservation_date=date
    )

    return check_time_overlap(
        queryset,
        start_time,
        end_time
    )


def check_time_overlap(queryset, start_time, end_time):

    return queryset.filter(
        start_time__lt=end_time,
        end_time__gt=start_time
    ).exists()


def validate_class_schedule_conflict(
    class_obj,
    reservation_date,
    start_time,
    end_time
):

    weekday_map = {
        0: 'MON',
        1: 'TUE',
        2: 'WED',
        3: 'THU',
        4: 'FRI',
        5: 'SAT',
        6: 'SUN',
    }

    weekday = weekday_map[reservation_date.weekday()]

    if weekday not in class_obj.class_days:
        return

    if (
        start_time < class_obj.end_time and
        end_time > class_obj.start_time
    ):
        raise ValidationError(
            'Turma está em horário de aula nesse período.'
        )
        

def validate_not_sunday(reservation_date):

    if reservation_date.weekday() == 6:
        raise ValidationError(
            'Não é permitido agendar aos domingos.'
        )


def validate_venue_status(venue):

    if venue.status.name != 'OPERATIONAL':
        raise ValidationError(
            'Esta quadra não está disponível para reservas.'
        )
        

def validate_not_holiday(reservation_date):
    holidays = get_holidays(reservation_date.year)

    reservation_str = reservation_date.strftime('%Y-%m-%d')

    for holiday in holidays:
        if holiday['date'] == reservation_str:
            raise ValidationError(
                f'Não é permitido agendar em feriados ({holiday["name"]}).'
            )


def is_valid_date_range(start_str, end_str):
    try:
        start = datetime.strptime(start_str, '%Y-%m-%d')
        end = datetime.strptime(end_str, '%Y-%m-%d')
        
        return start < end
    except ValueError:
        return False