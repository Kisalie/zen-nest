from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Sound
from .serializers.common import SoundSerializer


class SoundListView(APIView):
    def get(self, request):
        sounds = Sound.objects.all()

        serialized_sounds = SoundSerializer(sounds, many=True)
        print(serialized_sounds.data)
        return Response(serialized_sounds.data)
