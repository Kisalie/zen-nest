from django.db import models

# Create your models here.


class Sound(models.Model):
    theme_or_sound_name = models.CharField(max_length=255)
    sound_file_location = models.CharField(max_length=255)
    is_guided = models.BooleanField(default=False)
    duration = models.FloatField()

    def __str__(self):
        return f"{self.theme_or_sound_name} - {self.duration}"
