from django.urls import path
from .views import GuidedMeditationListView, GuidedMeditationDetailView

urlpatterns = [
    path('', GuidedMeditationListView.as_view()),
    path('<int:pk>/', GuidedMeditationDetailView.as_view())
]
