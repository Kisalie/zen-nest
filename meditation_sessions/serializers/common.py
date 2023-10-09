from rest_framework import serializers
from models import Meditation_Session


class MeditationSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meditation_Session
        fields = '__all__'
