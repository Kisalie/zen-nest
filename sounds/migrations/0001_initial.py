# Generated by Django 4.2.6 on 2023-10-06 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sound',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('theme_or_sound_name', models.CharField(max_length=255)),
                ('sound_file_location', models.CharField(max_length=255)),
                ('is_guided', models.BooleanField(default=False)),
                ('duration', models.FloatField()),
            ],
        ),
    ]