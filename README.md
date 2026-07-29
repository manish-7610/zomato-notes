# 🍽️ Zomato Notes

A modern Full Stack AI-powered Note Management Application built using **FastAPI, SQLAlchemy, SQLite, HTML, CSS and JavaScript**.

The application allows users to securely manage personal notes with **JWT Authentication**, **Smart Search**, **Semantic Search**, **Quick Find**, **AI Tag Suggestions**, and a responsive frontend.

---

# 📌 Project Overview

Zomato Notes is a full stack note management system where every user can securely create and manage their own notes.

The project combines traditional CRUD operations with searching algorithms and AI-powered features to provide a faster and smarter note management experience.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing

---

## 📝 Notes Management

- Create Notes
- Read Notes
- Update Notes
- Delete Notes
- User-specific Notes
- Import Notes from TXT File

---

## 🔍 Searching

- Search Notes
- Quick Find
- Binary Search
- Recursive Binary Search
- Linear Search
- Semantic Search (Sentence Transformers)

---

## 🤖 AI Features

- AI Generated Tags
- AI Summary Suggestions
- Mock AI Support
- Semantic Similarity Search

---

## 🎨 Frontend

- Responsive UI
- Modern Design
- Toast Notifications
- Delete Confirmation Modal
- Loading Animation
- Error Handling

---

# ⚙️ Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)

## Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Pydantic

## AI

- Sentence Transformers
- Scikit-Learn
- Cosine Similarity

---

# 🧠 Algorithms Used

- Linear Search
- Binary Search
- Recursive Binary Search
- Insertion Sort
- Semantic Similarity Ranking

---

# 📂 Project Structure

```
zomato-notes
│
├── backend
│   ├── main.py
│   ├── crud.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── database.py
│   ├── semantic_search.py
│   ├── algorithms.py
│   ├── ai_service.py
│   ├── ai_sample_notes.py
│   ├── logger.py
│   ├── requirements.txt
│   ├── seed.py
│   ├── .env.example
│   └── .env
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── sample_import.txt
├── README.md
└── .gitignore
```

---

# 🚀 Installation

## 1 Clone Repository

```bash
git clone <your-repository-url>
```

---

## 2 Open Project

```bash
cd zomato-notes
```

---

## 3 Create Virtual Environment

```bash
python -m venv venv
```

---

## 4 Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## 5 Install Dependencies

```bash
pip install -r backend/requirements.txt
```

---

## 6 Configure Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=zomato_notes

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

MOCK_AI=1
```

---

## 7 Run Backend

```bash
cd backend

uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## 8 Open Frontend

Open

```
frontend/index.html
```

or use **VS Code Live Server**

```
http://127.0.0.1:5500
```

---

# 📚 API Documentation

Swagger UI

```
http://127.0.0.1:8000/docs
```

---

# 🔐 Authentication

1. Register User

```
POST /users
```

2. Login

```
POST /login
```

3. Copy Access Token

4. Click **Authorize**

5. Paste

```
Bearer YOUR_ACCESS_TOKEN
```

---

# 📌 API Endpoints

## User

```
POST   /users
POST   /login
```

---

## Notes

```
GET    /notes
POST   /notes
GET    /notes/{id}
PUT    /notes/{id}
DELETE /notes/{id}
```

---

## Search

```
GET  /notes/search
GET  /notes/lookup
GET  /notes/quick-find
POST /notes/semantic-search
```

---

## AI

```
PUT /notes/apply-ai-tag
```

---

## Reports

```
GET /reports/tag-summary
GET /reports/user-notes
GET /reports/long-notes
```

---

# 📥 Import Notes

Create a text file like:

```
Buy groceries
Complete FastAPI project
Study SQLAlchemy
Practice DSA
Read AI documentation
```

Then import using

```
POST /notes/import
```

---

# 🧪 Sample Test Data

The project includes

```
sample_import.txt
```

for testing the Import Notes functionality.

---

# 📸 Screenshots

The project includes:

- Login
- Register
- Dashboard
- Create Note
- Edit Note
- Delete Note
- Search Notes
- Quick Find
- Semantic Search
- Swagger Documentation

---

# 🔮 Future Improvements

- OpenAI Integration
- Voice Notes
- File Attachments
- Markdown Support
- Note Sharing
- Dark Mode
- Email Notifications

---

# 👨‍💻 Author

**Manish Kevat**

Full Stack Web Developer

---

# ⭐ Acknowledgements

Developed as a **Full Stack Capstone Project** using FastAPI, SQLAlchemy, JWT Authentication, Semantic Search, and AI-powered note management concepts.