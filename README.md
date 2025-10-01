#  Test Technique

Ce projet est composé de deux parties :  
1. **Frontend** : Next.js (React)  
2. **Backend** : FastAPI (Python)  

Les deux projets utilisent un fichier JSON comme base de données simple.

---

## Prérequis

- **Node.js** >= 18  
- **Python** >= 3.10  
- `pip` pour installer les dépendances Python  

---

## Variables d’environnement nécessaires

- **Frontend** :  
  - Créer un fichier `.env.local` dans le dossier `frontend` avec la variable suivante :
    ```
    ARTICLES_FILE=public/articles.json
    NEXT_PUBLIC_CHAT_API=http://127.0.0.1:8000/chat

    ```
- **python-service** :
    - Créer un fichier `.env` dans le dossier `python-service` avec la variable suivante :
    ```
    FAQ_JSON_PATH=faq.json

    ```


---

## 1. Installation

### Python-service (FastAPI)

1. Se placer dans le dossier `python-service` :
    ```bash
    cd python-service
    ```
2. Créer un environnement virtuel :
    ```bash
    python -m venv venv
    ```
3. Activer l'environnement virtuel :
    - **Sur Linux / Mac :**
        ```bash
        source venv/bin/activate
        ```
    - **Sur Windows :**
        ```bash
        venv\Scripts\activate
        ```
4. Installer les dépendances :
    ```bash
    pip install -r requirements.txt
    ```
5. Lancer le serveur :
    ```bash
    uvicorn main:app --reload
    ```
Le backend sera disponible sur [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### Frontend (Next.js)

1. Se placer dans le dossier `frontend` :
    ```bash
    cd frontend
    ```
2. Installer les dépendances :
    ```bash
    npm install
    ```
3. Lancer le serveur de développement :
    ```bash
    npm run dev
    ```
Le frontend sera disponible sur [http://localhost:3000](http://localhost:3000)

---

## Commandes utiles

- **Lancer le service python** :
    ```bash
    cd python-service
    uvicorn main:app --reload
    ```
- **Lancer le frontend** :
    ```bash
    cd frontend
    npm run dev
    ```
- **Lancer les tests frontend** :
    ```bash
    cd frontend
    npm test
    ```
- **Lancer les tests service python** :
    ```bash
    cd python-service
    pytest
    ```

---

## Choix techniques

- **Base de données** :  
  Utilisation d’un fichier `.json` pour stocker les données, ce qui simplifie la mise en place et la portabilité du projet. Le chemin du fichier est configurable via `.env`.

- **Librairies utilisées** :

    - **Frontend (Next.js)** :
        - `jest` et `supertest` : pour les tests unitaires et d’intégration.
        - `bootstrap` : pour la mise en forme rapide et responsive.
        - `babel` : pour utiliser la syntaxe moderne ES Modules dans tout le projet.
        - `dotenv` : pour lire les variables d’environnement.
    - **Backend (FastAPI)** :
        - `pytest` : pour les tests unitaires et d’intégration.
        - `scikit-learn` : pour la recherche avancée dans le JSON (filtrage, similarité, etc.).
        - `httpx` : pour les requêtes HTTP asynchrones lors des tests ou appels internes.

- **Organisation du code** :

    - **Frontend** :
        - `src/components` : composants réutilisables
        - `src/pages` : pages et API routes Next.js
        - `src/services` : accès aux données (JSON)
        - `src/tests` : tests unitaires et d’intégration
    - **Backend** :
        - Code principal dans `app`
        - dossier `models` pour la structure des donnees recues par l'api
        - dossier `routes` pour definir les enpoints 
        - dossier `services` pour le traitement 
        - Dossier `tests` pour les tests (ex : test de l’endpoint `/chat` dans `python-service/tests`)

---

## Limites et améliorations possibles

- **Limites** :
    - Le stockage dans un fichier JSON n’est pas adapté à la montée en charge ou à la concurrence d’accès.
    - Pas de gestion avancée des droits utilisateurs ou d’authentification.
    - Les traitements complexes côté backend sont limités par la structure simple du JSON.

- **Améliorations possibles** :
    - Remplacer le fichier JSON par une vraie base de données (PostgreSQL, MongoDB, etc.).
    - Ajouter une gestion d’authentification et d’autorisations.
    - Ajouter la gestion des erreurs et des logs plus détaillés.
    - Déployer les services avec Docker pour faciliter la portabilité et la scalabilité.
