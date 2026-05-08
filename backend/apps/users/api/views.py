from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import IsAdmin, isTeacher, IsDirector
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer, MeSerializer
from rest_framework_simplejwt.exceptions import TokenError

class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']

        refresh = RefreshToken.for_user(user)

        response = Response({
            'message': 'Login realizado com sucesso'
        }, status=status.HTTP_200_OK)

        response.set_cookie(
            key='access_token',
            value=str(refresh.access_token),
            httponly=True,
            secure=False, # True em produção
            samesite='Lax'
        )

        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite='Lax'
        )

        return response


class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        refresh_token = request.COOKIES.get('refresh_token')

        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()

        response = Response({
            'message': 'Logout realizado com sucesso'
        })

        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')

        return response


class RefreshView(APIView):

    def post(self, request):

        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response(
                {'error': 'Refresh token não encontrado'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            refresh = RefreshToken(refresh_token)

            access_token = str(refresh.access_token)

            response = Response({
                'message': 'Token renovado'
            })

            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False, # True em produção
                samesite='Lax'
            )

            return response

        except TokenError:
            return Response(
                {'error': 'Refresh token inválido'},
                status=status.HTTP_401_UNAUTHORIZED
            )


class CreateUserView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def post(self, request):
        return Response({
            "message": "Somente admin acessa"
        })
    

class MeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = MeSerializer(request.user)

        return Response(serializer.data)