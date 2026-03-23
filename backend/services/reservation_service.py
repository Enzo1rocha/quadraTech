from apps.reservations.models import Reservation


# checagem de conflitos de horário para usuário, turma e quadra
def check_user_conflict(user, date, start_time, end_time):
    return Reservation.objects.filter(
        user=user,
        reservation_date=date,
        start_time__lt=end_time,
        end_time__gt=start_time
    ).exists()


def check_class_conflict(class_obj, date, start_time, end_time):
    return Reservation.objects.filter(
        class_obj=class_obj,
        reservation_date=date,
        start_time__lt=end_time,
        end_time__gt=start_time
    ).exists()


def check_venue_conflict(venue, date, start_time, end_time):
    return Reservation.objects.filter(
        venue=venue,
        reservation_date=date,
        start_time__lt=end_time,
        end_time__gt=start_time
    ).exists()
    

# criação de reserva com checagem de conflitos
def create_reservation(data):
    # verifica conflito de horário para a quadra
    venue_conflict = check_venue_conflict(
        data['venue'],
        data['reservation_date'],
        data['start_time'],
        data['end_time']
    )

    if venue_conflict:
        raise Exception("Essa quadra já está ocupada nesse horário")
    # verifica conflito de horário para o usuário
    user_conflict = check_user_conflict(
        data['user'],
        data['reservation_date'],
        data['start_time'],
        data['end_time']
    )

    if user_conflict:
        raise Exception("Você já tem uma reserva nesse horário")
    
    # verifica conflito de horário para a turma
    class_conflict = check_class_conflict(
        data['class_obj'],
        data['reservation_date'],
        data['start_time'],
        data['end_time']
    )

    if class_conflict:
        raise Exception("Essa turma já tem uma reserva nesse horário")

    return Reservation.objects.create(**data)