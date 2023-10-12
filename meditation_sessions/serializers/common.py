from rest_framework import serializers
from ..models import MeditationSession
from sounds.serializers.common import SoundSerializer


class MeditationSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeditationSession
        # Exclude user from serialization and deserialization
        exclude = ('user',)
