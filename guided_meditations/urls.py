from django.urls import path
from .views import GuidedMeditationListView

urlpatterns = [
    path('', GuidedMeditationListView.as_view)
]
