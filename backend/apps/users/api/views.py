from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.users.permissions import (
    IsAdmin,
    isTeacher,
    IsDirector,
    IsAdminOrSelf
)

from rest_framework_simplejwt.tokens import RefreshToken
from apps.users.models import User
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
    GenericAPIView
)

from .serializers import (
    LoginSerializer,
    MeSerializer,
    UserListSerializer,
    CreateUserSerializer,
    UpdateUserSerializer,
    MessageSerializer
)

from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=['auth'],
    summary='Login do usuário',
    request=LoginSerializer,
    responses={200: MessageSerializer}
)
class LoginView(GenericAPIView):

    def post(self, request):
        serializer_class = LoginSerializer(data=request.data)

        serializer_class.is_valid(raise_exception=True)

        user = serializer_class.validated_data['user']

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


@extend_schema(
    tags=['auth'],
    summary='Logout do usuário',
    responses={200: MessageSerializer}
)
class LogoutView(GenericAPIView):

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


@extend_schema(
    tags=['auth'],
    summary='Renovação do token',
    responses={200: MessageSerializer}
)
class RefreshView(GenericAPIView):

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

@extend_schema(
    tags=['users'],
    summary='Endpoint de teste para acesso de admin',
    responses={200: MessageSerializer}
)
class CreateUserView(GenericAPIView):

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]
    
    def post(self, request):
        return Response({
            "message": "Somente admin acessa"
        })
    

@extend_schema(
    tags=['auth'],
    summary='Retorna os dados do usuário autenticado',
    responses={200: MeSerializer}
)
class MeView(GenericAPIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = MeSerializer(request.user)

        return Response(serializer.data)


@extend_schema(
    tags=['auth'],
    summary="Lista de usuários e criação de usuário",
    request=CreateUserSerializer,
)
class UserListCreateView(ListCreateAPIView):

    queryset = User.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_serializer_class(self):

        if self.request.method == 'POST':
            return CreateUserSerializer

        return UserListSerializer


@extend_schema(
    tags=['auth'],
    summary='Detalhes do usuário e atualização',
    request=UpdateUserSerializer,
)
class UserDetailView(RetrieveUpdateAPIView):

    queryset = User.objects.all()
    permission_classes = [
        IsAuthenticated,
        IsAdminOrSelf
    ]
    
    serializer_class = UpdateUserSerializer

    def get_serializer_class(self):
        return UpdateUserSerializer


@extend_schema(
    tags=['auth'],
    summary='Desativa um usuário',
)
class UserDeactivateView(DestroyAPIView):

    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsAdmin]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()