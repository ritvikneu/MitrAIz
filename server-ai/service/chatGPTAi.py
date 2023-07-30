import os
import requests
import json
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv('CHATGPT_API_KEY')
END_POINT = "https://api.openai.com/v1/chat/completions"
def ask_GPT(question):
    question = question + " at most in two lines"
    body ={
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": question}]
    }
    header ={
        "Content-Type":"application/json",
        "Authorization":f"Bearer {API_KEY}"
    }
    response = requests.post(END_POINT, json=body,headers=header)
    jsonObj = response.json()
    print(jsonObj)
    ans = jsonObj["choices"][0]["message"]["content"]
    #ans = response["choices"][0]["message"]["content"]
    print(ans)
    return ans


def set_default(obj):
    if isinstance(obj, set):
        return list(obj)
    raise TypeError