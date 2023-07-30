import os
from dotenv import load_dotenv
load_dotenv()
import elevenlabs  as elevLabs


API_KEY = os.getenv('ELEVEN_LABS_KEY')
elevLabs.set_api_key(API_KEY)
async def convertTextToVoice(response):
    #voices = elevLabs.voices();
    print("voices")
    audio = elevLabs.generate(
    text=response,
    voice="Rachel",
    model="eleven_monolingual_v1"
    )
    # elevLabs.play(audio)
    elevLabs.save(audio,await getAudioPath())
    return audio
    # play(audio)

async def getAudioPath():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Construct the relative path to inference.py
    inference_dir = os.path.join(current_dir, "..", "Wav2Lip")
    os.chdir(inference_dir)

    # Construct the paths to the required files
    result_path = os.path.join(inference_dir,  "media", "sumanth_intro.wav")
    print(result_path)
    return result_path