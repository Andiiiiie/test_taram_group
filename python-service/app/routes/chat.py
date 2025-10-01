from fastapi import APIRouter
from app.models.chat_models import ChatRequest
from app.services.matching import find_answer
from datetime import datetime


router = APIRouter()

@router.post("/chat")
def chat_endpoint(request: ChatRequest):
    answer, sources = find_answer(request.message)
    
    # Log 
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] Question posée : {request.message} | Réponse donnée : {answer}")
    
    
    return {"answer": answer, "sources": sources}