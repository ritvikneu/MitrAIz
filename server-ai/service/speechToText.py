import logging
import io
logging.basicConfig(filename='app.log', filemode='w')
import speech_recognition as sr
from pydub import AudioSegment



def speech_to_text(blob):
    r = sr.Recognizer()
    file_obj = io.BytesIO()
    file_obj.write(blob.file.read())
    file_obj.seek(0)
    audio = AudioSegment.from_file(file_obj)
    wav_file = io.BytesIO()
    audio.export(wav_file, format="wav")
    wav_file.seek(0)

    mic = sr.AudioFile(wav_file) # use file-object
    logging.info("mic",mic)
    with mic as source:
         audio = r.record(source)
         logging.info("audio",audio)
    result = r.recognize_google(audio)
    logging.info(result)
    return result

