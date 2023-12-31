from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MeditationSessionViewSet

router = DefaultRouter()
router.register(r'', MeditationSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
