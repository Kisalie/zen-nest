from django.shortcuts import get_object_or_404
from .models import GuidedMeditation
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers.common import GuidedMeditationSerializer


class GuidedMeditationListView(APIView):
    def get(self, request):
        guidedmeditations = GuidedMeditation.objects.all()
        serialized_guidedmeditations = GuidedMeditationSerializer(
            guidedmeditations, many=True)
        print(serialized_guidedmeditations.data)
        return Response(serialized_guidedmeditations.data)


class GuidedMeditationDetailView(APIView):
    def get(self, request, pk):
        guidedmeditation = get_object_or_404(GuidedMeditation, pk=pk)
        serialized_guidedmeditation = GuidedMeditationSerializer(
            guidedmeditation)
        return Response(serialized_guidedmeditation.data)
