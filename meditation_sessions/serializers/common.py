from rest_framework import serializers
from ..models import MeditationSession
from sounds.serializers.common import SoundSerializer


class MeditationSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeditationSession
        exclude = ('user',)


class GetMeditationSessionsSerializer(serializers.ModelSerializer):
    sound = SoundSerializer()

    class Meta:
        model = MeditationSession
        exclude = ('user',)
