from django.db import models

# Create your models here.
from users.models import User
from sounds.models import Sound


class Meditation_Session(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    duration_in_minutes = models.FloatField(default=0.0)
    sound = models.ForeignKey(Sound, on_delete=models.CASCADE)
