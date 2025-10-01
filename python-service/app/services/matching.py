import json
import os
from dotenv import load_dotenv
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()  

FAQ_JSON_PATH = os.getenv("FAQ_JSON_PATH", "faq.json")  

with open(FAQ_JSON_PATH, "r") as f:
    faq_data = json.load(f)

# Extraire les questions pour le vectoriseur
questions = [item["q"] for item in faq_data]

# Initialiser le vectoriseur et transformer les questions
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(questions)

# Fonction pour trouver la meilleure réponse
def find_answer(message: str):
    message_vec = vectorizer.transform([message])
    similarities = cosine_similarity(message_vec, tfidf_matrix).flatten()
    
    best_idx = similarities.argmax()
    
    # Seuil de similarité pour éviter les mauvaises correspondances
    if similarities[best_idx] < 0.2:
        return "Désolé, je n’ai pas trouvé de réponse.", []
    
    return faq_data[best_idx]["a"], [faq_data[best_idx]["id"]]
