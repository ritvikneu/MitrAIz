import os

async def saveAudio(audio):
    directory = "uploads"
    os.makedirs(directory, exist_ok=True)  # Create directory if it doesn't exist
    file_path = os.path.join(directory, audio.filename)
    with open(file_path,"wb") as f:
        f.write(await audio.read())