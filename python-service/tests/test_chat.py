from fastapi.testclient import TestClient
from main import app
import json
import os
from dotenv import load_dotenv

client = TestClient(app)

load_dotenv()

FAQ_JSON_PATH = os.getenv("FAQ_JSON_PATH", "faq.json")

with open(FAQ_JSON_PATH, "r") as f:
    faq_data = json.load(f)

#test sur toutes les questions de la FAQ
def test_faq_questions():
    for item in faq_data:
        response = client.post("/chat", json={"message": item["q"]})
        assert response.status_code == 200
        data = response.json()
        assert data["answer"] == item["a"]
        assert item["id"] in data["sources"]


#test sur une question inconnue
def test_unknown_question():
    response = client.post("/chat", json={"message": "Question inconnue"})
    assert response.status_code == 200
    data = response.json()
    assert data["answer"] == "Désolé, je n’ai pas trouvé de réponse."
    assert data["sources"] == []
