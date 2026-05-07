
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include("apps.users.api.urls")),
    path("api/reservations/", include("apps.reservations.api.urls")),
]