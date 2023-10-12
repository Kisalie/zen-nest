from rest_framework import viewsets
from .models import Sound
from .serializers.common import SoundSerializer


class SoundViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sound.objects.all()
    serializer_class = SoundSerializer
