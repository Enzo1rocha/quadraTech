from rest_framework.routers import DefaultRouter
from .views import MaterialViewSet

router = DefaultRouter()
router.register(r'materials', MaterialViewSet)

urlpatterns = router.urls