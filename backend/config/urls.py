
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include("apps.users.api.urls")),
    path("api/reservations/", include("apps.reservations.api.urls")),
    path("api/", include("apps.materials.api.urls")),
    path("api/", include("apps.classes.api.urls")),
    path("api/", include("apps.venues.api.urls")),
    path("api/", include("apps.notices.api.urls")),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/dashboard/', include('apps.dashboard.api.urls')),
]