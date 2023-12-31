from rest_framework import serializers
from ..models import GuidedMeditation
from sounds.serializers.common import SoundSerializer


class GuidedMeditationSerializer(serializers.ModelSerializer):
    sound = SoundSerializer()

    class Meta:
        model = GuidedMeditation
        fields = '__all__'
