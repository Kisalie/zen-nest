
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import MeditationSession
from .serializers.common import MeditationSessionSerializer


class MeditationSessionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = MeditationSession.objects.all()
    serializer_class = MeditationSessionSerializer
