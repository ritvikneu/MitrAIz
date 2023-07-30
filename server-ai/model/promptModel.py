from pydantic import BaseModel
class Prompt(BaseModel):
    question:str
    promptType:str
    