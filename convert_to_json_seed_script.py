import os
import json
from pydub import AudioSegment


def get_duration_of_audio(file_path):
    """Returns the duration of an audio file in minutes."""
    audio = AudioSegment.from_file(file_path, format="mp3")
    duration = len(audio) / (1000 * 60)  # Convert from milliseconds to minutes
    return round(duration, 2)


def generate_aws_url(file_name):
    """Generate the AWS URL for a given file name."""
    base_url = "https://zennest-sounds.s3.eu-west-2.amazonaws.com/"
    formatted_name = file_name.replace(' ', '+')
    return os.path.join(base_url, formatted_name)


def convert_files_to_seed_data(meditation_files, ambient_files, meditation_directory='data', ambient_directory='ambient_sounds'):
    """Converts mp3 file names to seed data for the Sound and Guided Meditation tables."""
    sound_seed_data = []
    guided_meditation_seed_data = []

    # Start ID from 1
    current_id = 1

    # First, process the meditation sounds
    for file in meditation_files:
        # Assuming file names are in the format "meditation_{short/long}_{theme}_{intensity}_{bg_sound}.mp3"
        parts = file.replace('.mp3', '').split('_')

        # Extracting attributes
        theme = parts[2].title()
        intensity = parts[3]

        # Generate the AWS URL for the file
        aws_url = generate_aws_url(file)

        # Using pydub to get the actual duration
        file_path = os.path.join(meditation_directory, file)
        duration = get_duration_of_audio(file_path)

        sound_entry = {
            'model': 'sounds.Sound',
            'pk': current_id,
            'fields': {
                'theme_or_sound_name': theme,
                'sound_file_location': aws_url,
                'is_guided': True,
                'duration': duration,
            }
        }
        sound_seed_data.append(sound_entry)

        guided_meditation_entry = {
            # Change 'guidedmeditationmodel' to your actual model name in the 'guidedmeditations' app
            # TODO - Fix this:
            'model': 'guidedmeditations.guidedmeditationmodel',
            'pk': current_id,
            'fields': {
                'intensity': intensity,
                'sound_ID': current_id,
                'image_url': None,  # Placeholder
            }
        }
        guided_meditation_seed_data.append(guided_meditation_entry)

        current_id += 1

    # Next, process the ambient sounds
    for file in ambient_files:
        # Generate the AWS URL for the file
        aws_url = generate_aws_url(file)

        # Using pydub to get the actual duration
        file_path = os.path.join(ambient_directory, file)
        duration = get_duration_of_audio(file_path)

        theme = file.replace('.mp3', '').replace('_', ' ').title()

        sound_entry = {
            'model': 'sounds.Sound',
            'pk': current_id,
            'fields': {
                'theme_or_sound_name': theme,
                'sound_file_location': aws_url,
                'is_guided': False,
                'duration': duration,
            }
        }
        sound_seed_data.append(sound_entry)

        current_id += 1

    # Write to the seed_data.json files
    with open('sounds/seed.json', 'w') as outfile:
        json.dump(sound_seed_data, outfile)

    with open('guided_meditation_seed.json', 'w') as outfile:
        json.dump(guided_meditation_seed_data, outfile)

    return sound_seed_data, guided_meditation_seed_data


# Use the function
meditation_files = [file for file in os.listdir(
    'data') if file.endswith('.mp3')]
ambient_files = [file for file in os.listdir(
    'ambient_sounds') if file.endswith('.mp3')]


sound_seed_data, guided_meditation_seed_data = convert_files_to_seed_data(
    meditation_files, ambient_files)
