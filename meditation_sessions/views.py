
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import MeditationSession
from .serializers.common import MeditationSessionSerializer, GetMeditationSessionsSerializer


class MeditationSessionViewSet(viewsets.ModelViewSet):
    queryset = MeditationSession.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = MeditationSessionSerializer

    def get_serializer_class(self):
        if self.action == 'retrieve' or self.action == 'list':
            return GetMeditationSessionsSerializer
        return MeditationSessionSerializer

    def get_queryset(self):
        # Filter MeditationSessions based on the authenticated user
        return MeditationSession.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the user from the request
        serializer.save(user=self.request.user)
