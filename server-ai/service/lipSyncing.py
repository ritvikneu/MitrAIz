import os
import asyncio
from fastapi.responses import FileResponse


async def run_some_process():
    # Get the absolute path of the current directory (service directory)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Construct the relative path to inference.py
    inference_dir = os.path.join(current_dir, "..", "Wav2Lip")
    os.chdir(inference_dir)

    # Construct the paths to the required files
    checkpoint_path = os.path.join(inference_dir,  "checkpoints", "wav2lip_gan.pth")
    face_image_path = os.path.join(inference_dir, "media", "ai_image.jpg")
    audio_file_path = os.path.join(inference_dir, "media", "sumanth_intro.wav")

    try:
        command = f"python inference.py --checkpoint_path {checkpoint_path} --face {face_image_path} --audio {audio_file_path}"
        print(command)
        process = await asyncio.create_subprocess_shell(
            command,
            stdout=asyncio.subprocess.PIPE,  # Capture the standard output
            stderr=asyncio.subprocess.PIPE   # Capture the standard error
        )
        stdout, stderr = await process.communicate()

        # Check the return code to see if the process completed successfully
        if process.returncode == 0:
            print("Process completed successfully.")
            print("Output:")
            print(stdout.decode())
        else:
            print("Process failed with an error.")
            print("Error output:")
            print(stderr.decode())
        return process.returncode
    except FileNotFoundError:
        print("inference.py not found. Please check the file path.")
    except Exception as e:
        print("An error occurred:", e)


async def getVideo():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Construct the relative path to inference.py
    inference_dir = os.path.join(current_dir, "..", "Wav2Lip")
    os.chdir(inference_dir)

    # Construct the paths to the required files
    result_path = os.path.join(inference_dir,  "results", "result_voice.mp4")
    print(result_path)
    return result_path


