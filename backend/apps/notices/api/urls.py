from rest_framework.routers import DefaultRouter
from .views import NoticeViewSet, NoticeTypeViewSet, NoticeDurationViewSet

router = DefaultRouter()
router.register(r'notices', NoticeViewSet, basename='notice')
router.register(r'notice-types', NoticeTypeViewSet, basename='notice-type')
router.register(r'notice-durations', NoticeDurationViewSet, basename='notice-duration')

urlpatterns = router.urls