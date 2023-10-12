from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SoundViewSet

router = DefaultRouter()
router.register(r'', SoundViewSet)

urlpatterns = [path('', include(router.urls)),]
