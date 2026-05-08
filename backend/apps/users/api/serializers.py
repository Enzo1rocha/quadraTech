from django.contrib.auth import authenticate
from rest_framework import serializers
from apps.users.models import User

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            username=email,
            password=password
        )

        if not user:
            raise serializers.ValidationError(
                'Email ou senha inválidos'
            )

        attrs['user'] = user
        return attrs


class MeSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'email',
            'role',
            'position',
            'telephone',
            'profile_image_url',
        ]


class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'email',
            'role',
            'position',
            'is_active',
        ]


class CreateUserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'name',
            'email',
            'password',
            'role',
            'position',
            'telephone',
        ]

    def create(self, validated_data):

        password = validated_data.pop('password')

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        return user


class UpdateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'name',
            'position',
            'telephone',
            'profile_image_url',
        ]