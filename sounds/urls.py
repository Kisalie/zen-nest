from .views import SoundListView
from django.urls import path

urlpatterns = [
    path('', SoundListView.as_view())
]
