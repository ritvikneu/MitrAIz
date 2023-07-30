from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import controller.aiApi as ai_router

app = FastAPI()
origins = [
    "http://localhost",          # Allow requests from localhost
    "http://localhost:3000",     # Allow requests from localhost on port 3000
    "https://example.com",       # Allow requests from a specific domain
    "https://sub.example.com",   # Allow requests from a subdomain
]
app.include_router(ai_router.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
@app.get('/')
def home():
    return{
        "message":"First FastAPI"
    }