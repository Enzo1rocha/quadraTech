from rest_framework.routers import DefaultRouter
from .views import ClassViewSet, ClassShiftViewSet

router = DefaultRouter()
router.register(r'classes', ClassViewSet)
router.register(r'class-shifts', ClassShiftViewSet)

urlpatterns = router.urls