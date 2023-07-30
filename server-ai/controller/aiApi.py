from fastapi import APIRouter,UploadFile,Response
from fastapi.responses import FileResponse

import os
import io

import speech_recognition as sr
import service.audioRecord as audioService
import service.speechToText as sr
import service.vicunaAi as ai
import service.chatGPTAi as gptAI
from model.promptModel import Prompt
from model.testModel import Test
import service.textToVoice as txtToVoice
import service.lipSyncing as lipSync


router = APIRouter(
    prefix='/aiResponse',
    tags=['ai responding']
)

@router.post('/uploadRecord')
async def ai_response(audio:UploadFile):
    #audioService.saveAudio(audio)
    #blob_data = await audio.read()
   # text = convert_audio_to_text(io.BytesIO(blob_data))
    #text =  sr.speech_to_text(audio)
    result = gptAI.ask_GPT("How u doing")
    print(result)
    return {"message":"some success"}

@router.post('/chatgpt/prompt')
async def gpt_response(prop:Prompt):
    question = prop.question
    gptResponse = gptAI.ask_GPT(question)
    audio = await txtToVoice.convertTextToVoice(gptResponse)
    run_code = await lipSync.run_some_process()
    if run_code == 0:
        video_path= await lipSync.getVideo()
        print(video_path)
    
        return FileResponse(video_path)


   # result = gptAI.ask_GPT(question)
    #result = 'hi'
   # print(result)
   
   # return Response(content=audio, media_type="audio/mp3")
    return {'reply':"Oh my god!!! Have u seen Sumanth anytime. I think he is sexiest man on earth."};

@router.post('/test')
def ai_response(test:Test):
    return test
