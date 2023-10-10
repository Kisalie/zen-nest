# Generated by Django 4.2.6 on 2023-10-10 16:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sounds', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GuidedMeditation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('intensity', models.CharField(max_length=200)),
                ('sound', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sounds.sound')),
            ],
        ),
    ]
