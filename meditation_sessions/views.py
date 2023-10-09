
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Meditation_Session
from .serializers.common import MeditationSessionSerializer


class MeditationSessionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Meditation_Session.objects.all()
    serializer_class = MeditationSessionSerializer
