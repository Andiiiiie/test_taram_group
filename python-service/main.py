from fastapi import FastAPI
from app.routes import chat
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Chatbot FAQ Finance")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ton frontend Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Inclure le router
app.include_router(chat.router)
