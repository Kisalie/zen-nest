from .models import GuidedMeditation
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers.common import GuidedMeditationSerializer

# Create your views here.


class GuidedMeditationListView(APIView):
    def get(self, request):
        guidedmeditations = GuidedMeditation.objects.all()
        serialized_guidedmeditations = GuidedMeditationSerializer(
            guidedmeditations, many=True)
        print(serialized_guidedmeditations.data)
        return Response(serialized_guidedmeditations.data)
