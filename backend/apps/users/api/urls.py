from django.urls import path
from .views import (
    LoginView, 
    MeView, 
    LogoutView, 
    RefreshView,
    UserListCreateView,
    UserDetailView,
    UserDeactivateView,
    
    
    
)

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('me/', MeView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('refresh/', RefreshView.as_view()),
    path('users/', UserListCreateView.as_view()),
    path('users/<uuid:pk>/', UserDetailView.as_view()),
    path('users/<uuid:pk>/deactivate/', UserDeactivateView.as_view()),
]