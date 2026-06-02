from rest_framework.routers import DefaultRouter
from apps.venues.api.views import VenueViewSet, VenueTypeViewSet, VenueStatusViewSet

router = DefaultRouter()
router.register(r'venues', VenueViewSet)
router.register(r'venue-types', VenueTypeViewSet)
router.register(r'venue-statuses', VenueStatusViewSet)

urlpatterns = router.urls