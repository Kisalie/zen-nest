from rest_framework import serializers
from django.contrib.auth import get_user_model


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmations = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email',
                  'password', 'password_confirmations')

    def validate(self, data):
        password = data.get('password')
        password_confirmation = data.pop('password_confirmations')

        if password != password_confirmation:
            raise serializers.ValidationError('Passwords do not match.')

        return data
