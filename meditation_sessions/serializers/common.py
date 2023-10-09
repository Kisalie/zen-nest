from rest_framework import serializers
from ..models import MeditationSession


class MeditationSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeditationSession
        fields = '__all__'
