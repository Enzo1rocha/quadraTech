from rest_framework import serializers

from apps.reservations.models import (
    Reservation,
    ReservationMaterial
)

from apps.materials.models import Material


class ReservationMaterialSerializer(serializers.Serializer):

    material_id = serializers.UUIDField()

    quantity = serializers.IntegerField(min_value=1)



class ReservationCreateSerializer(serializers.ModelSerializer):

    materials = ReservationMaterialSerializer(
        many=True,
        required=False
    )

    class Meta:

        model = Reservation

        fields = [
            'id',
            'title',
            'user',
            'venue',
            'class_obj',
            'reservation_date',
            'start_time',
            'end_time',
            'materials'
        ]
        
        def validate(self, attrs):

            start_time = attrs['start_time']
            end_time = attrs['end_time']

            if start_time >= end_time:
                raise serializers.ValidationError(
                    'Horário final deve ser maior que inicial.'
                )

            return attrs