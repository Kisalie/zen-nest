from django.db import models

# Create your models here.
from sounds.models import Sound


class GuidedMeditation(models.Model):
    intensity = models.CharField(max_length=200)
    sound = models.ForeignKey(Sound, on_delete=models.CASCADE)
