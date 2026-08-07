# 🍽️ Zomato Notes

### 🚀 AI-Powered Full Stack Notes Management System

A modern Full Stack Note Management Application built using **FastAPI**, **SQLAlchemy**, **Supabase PostgreSQL**, **HTML**, **CSS**, **JavaScript**, and **Artificial Intelligence**.

The application provides secure authentication, AI-powered note management, semantic search, advanced searching algorithms, pagination, reporting, background processing, and a modern responsive frontend.

---

![Python](https://img.shields.io/badge/Python-3.13-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.139-green?style=for-the-badge&logo=fastapi)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-red?style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-orange?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-blue?style=for-the-badge&logo=css3)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

---

**Capstone Project**

Software Development Engineering with Applied AI

Vishlesan I-Hub Foundation, IIT Patna

---

# 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Database Design](#-database-design)
- [Installation Guide](#-installation-guide)
- [Seeding the Database](#-seeding-the-database)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-backend)
- [API Documentation](#-api-documentation)
- [Sample Requests and Responses](#-sample-requests-and-responses)
- [Authentication Flow](#-authentication-flow)
- [CRUD Operations](#-crud-operations)
- [Import Notes](#-import-notes)
- [Pagination](#-pagination)
- [Search Algorithms](#-search-algorithms)
- [AI Features](#-artificial-intelligence-features)
- [Reports Module](#-reports-module)
- [Background Tasks](#-background-tasks)
- [Logging System](#-logging-system)
- [Security Features](#-security-features)
- [Assignment Compliance](#-assignment-compliance)
- [Testing Guide](#-testing-guide)
- [Development Journey](#-development-journey--bug-fixes)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

# 📌 Project Overview

Zomato Notes is a modern Full Stack AI-powered Note Management Application that enables users to securely create, organize, search, update, delete, and manage personal notes through an intuitive browser interface backed by a scalable FastAPI backend.

Unlike traditional note-taking applications, this project combines **Artificial Intelligence**, **Search Algorithms**, **JWT Authentication**, **Semantic Search**, **Pagination**, **Background Processing**, and **Reporting** into a single integrated application.

The project was developed as a Capstone Project to demonstrate real-world backend development concepts, database management, REST API design, authentication, search optimization, and AI integration.

---

# ✨ Key Features

## 🔐 Authentication
- User Registration with email validation and password hashing
- Secure Login with JWT Token generation
- Password hashing using Passlib + bcrypt
- Protected API routes — all note operations require a valid Bearer token
- User-specific data isolation — users only see their own notes

## 📝 Notes Management
- Create, Read, Update, Delete notes (full CRUD)
- Personal notes dashboard with card layout
- Category/tag management with dynamic sidebar
- Custom category support via "Others" dropdown option
- Import notes in bulk from a `.txt` file

## 🔍 Searching
- Standard keyword search (debounced, client-side, searches across all notes)
- Linear search via `GET /notes/search`
- Binary search via `GET /notes/lookup`
- Recursive binary search via `GET /notes/lookup-recursive`
- Quick Find (title substring) via `GET /notes/quick-find`
- Smart Search (AI semantic) via `POST /notes/semantic-search`

## 🤖 Artificial Intelligence
- AI tag suggestions on every note creation (Mock AI mode, no API key required)
- AI summary generation on every note creation
- AI Suggests panel rendered on the new note card with "Apply as tag" button
- Semantic similarity search using Sentence Transformers (`all-MiniLM-L6-v2`)
- Cosine similarity ranking

## 📄 Pagination
- 10 notes per page
- Previous / Next buttons
- Page number buttons with active highlight
- Pagination resets on create, search, category filter, and smart search

## 📊 Reports
- `GET /reports/tag-summary` — raw SQL with `GROUP BY` and `HAVING COUNT > 1`
- `GET /reports/user-notes` — raw SQL `JOIN` between users and notes
- `GET /reports/long-notes` — raw SQL subquery returning notes above average content length

## ⚙️ Background Processing
- Background indexing task fires after every `POST /notes`
- Response returns immediately; indexing completes asynchronously

## 📋 Logging
- Every request logged: method, path, status, processing time
- Global exception handler logs all unhandled errors
- `X-Process-Time` header on every response

---

# 💻 Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript (ES6), Fetch API |
| Backend | Python, FastAPI 0.139, Uvicorn |
| ORM | SQLAlchemy 2.0 |
| Database | Supabase PostgreSQL |
| Auth | JWT (python-jose), Passlib + bcrypt |
| Validation | Pydantic 2.x, EmailStr |
| AI | sentence-transformers, scikit-learn, torch |
| Driver | psycopg (v3, binary) |
| Config | python-dotenv |
| Tools | VS Code, Swagger UI, Git, GitHub, Live Server |

---

# 🏗️ System Architecture

```
+----------------------+
|      Frontend        |
| HTML • CSS • JS      |
+----------+-----------+
           |
  Fetch API (HTTP/REST)
           |
           ▼
+----------------------+
|    FastAPI Backend   |
| JWT Auth Middleware  |
| CORS Middleware      |
| X-Process-Time MW    |
| CRUD Endpoints       |
| Search Algorithms    |
| AI / Semantic Search |
| Raw SQL Reports      |
+----------+-----------+
           |
   SQLAlchemy ORM
           |
           ▼
+-----------------------------+
|   Supabase PostgreSQL       |
|   tables: users, notes      |
+-----------------------------+
           |
           ▼
  Sentence Transformers
  all-MiniLM-L6-v2
  Cosine Similarity
```

---

# 📂 Project Structure

```
zomato-notes/
├── backend/
│   ├── main.py              # All FastAPI routes and middleware
│   ├── models.py            # SQLAlchemy ORM: User, Note
│   ├── schemas.py           # Pydantic request/response schemas
│   ├── database.py          # Engine, SessionLocal, get_db
│   ├── auth.py              # JWT creation, bcrypt, get_current_user
│   ├── crud.py              # All DB operations + raw SQL reports
│   ├── algorithms.py        # insertion_sort, binary_search, linear_search, quick_find
│   ├── ai_service.py        # get_ai_response(), SYSTEM_PROMPT, Mock AI
│   ├── semantic_search.py   # SentenceTransformer + cosine_similarity
│   ├── ai_sample_notes.py   # AI sample dataset (8 notes, Part 3)
│   ├── ranking_dataset.py   # Ranking dataset (Part 2)
│   ├── seed.py              # Seeds demo user + notes + AI sample notes
│   ├── logger.py            # Logging configuration
│   ├── requirements.txt
│   ├── .env.example
│   └── .env                 # Not committed (see .gitignore)
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── sample_import.txt        # 10 pipe-delimited notes for import testing
├── README.md
└── .gitignore
```

---

# 🗄️ Database Design

Database: **Supabase PostgreSQL** — connected via SQLAlchemy ORM with `psycopg` (v3) driver and `sslmode=require`.

## Tables

### users

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | Primary Key, auto-increment |
| name | String(100) | NOT NULL |
| email | String(100) | UNIQUE, NOT NULL |
| password | String(255) | NOT NULL (bcrypt hash) |
| created_at | DateTime(timezone) | server default now() |

### notes

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | Primary Key, auto-increment |
| title | String(120) | NOT NULL |
| content | String(1000) | NOT NULL |
| tag | String(100) | nullable |
| owner_id | Integer | ForeignKey → users.id |
| created_at | DateTime(timezone) | server default now() |

**Relationship:** One User → Many Notes (`owner_id` foreign key).

Tables are created automatically on startup via `Base.metadata.create_all(bind=engine)`.

---

# ⚙️ Installation Guide

## 1. Clone the Repository

```bash
git clone https://github.com/manish-7610/zomato-notes.git
cd zomato-notes
```

## 2. Create Virtual Environment

```bash
python -m venv venv
```

## 3. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux / macOS:**
```bash
source venv/bin/activate
```

## 4. Install Dependencies

```bash
pip install -r backend/requirements.txt
```

## 5. Configure Environment Variables

Copy `.env.example` to `.env` inside the `backend/` folder and fill in your values:

```bash
cp backend/.env.example backend/.env
```

---

# 🌱 Seeding the Database

Run the seed script once to insert the demo user and all required sample data:

```bash
cd backend
python seed.py
```

This script is **idempotent** — running it multiple times will not create duplicate records.

What it seeds:
- Demo user: `demo@example.com` / `12345678`
- 4 standard demo notes (Programming, Personal, College, Health)
- 8 AI sample notes tagged `ai-demo` (required for Part 3 Smart Search)

---

# 🌍 Environment Variables

Create `backend/.env` using `backend/.env.example` as the template:

```env
user=postgres
password=YOUR_DATABASE_PASSWORD
host=YOUR_SUPABASE_HOST
port=5432
dbname=postgres

SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

SECRET_KEY=YOUR_SECRET_KEY_HERE
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

MOCK_AI=1
```

| Variable | Description |
|----------|-------------|
| `user` | Supabase PostgreSQL username (usually `postgres`) |
| `password` | Supabase database password |
| `host` | Supabase host (e.g. `db.xxxx.supabase.co`) |
| `port` | PostgreSQL port (default `5432`) |
| `dbname` | Database name (default `postgres`) |
| `SECRET_KEY` | Random secret for JWT signing |
| `ALGORITHM` | JWT algorithm (default `HS256`) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiry in minutes (default `60`) |
| `MOCK_AI` | Set to `1` for offline Mock AI mode (default). Set to `0` to use a real LLM. |

> **Never commit `.env`** — it is listed in `.gitignore`.

---

# 🚀 Running the Backend

```bash
cd backend
uvicorn main:app --reload
```

Server starts at: `http://127.0.0.1:8000`

Swagger UI: `http://127.0.0.1:8000/docs`

Health check: `http://127.0.0.1:8000/health`

---

# 🌐 Running the Frontend

Open `frontend/index.html` directly in a browser, or use VS Code Live Server:

```
http://127.0.0.1:5500
```

or

```
http://127.0.0.1:3000
```

Both origins are configured in the backend CORS allowed origins list.

---

# 📡 API Documentation

All protected endpoints require the header: `Authorization: Bearer <token>`

## Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/users` | No | Register new user |
| POST | `/login` | No | Login, returns JWT token |
| PUT | `/profile` | Yes | Update name or email |

## Notes CRUD

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/notes` | Yes | Get all notes (supports `?search=` and `?tag=`) |
| POST | `/notes` | Yes | Create note + returns AI suggestion |
| GET | `/notes/{id}` | Yes | Get single note |
| PUT | `/notes/{id}` | Yes | Update note |
| DELETE | `/notes/{id}` | Yes | Delete note |

## Search

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/notes/search?keyword=` | Yes | Linear search (keyword in title/content/tag) |
| GET | `/notes/lookup?title=` | Yes | Binary search — exact title match |
| GET | `/notes/lookup-recursive?title=` | Yes | Recursive binary search — exact title match |
| GET | `/notes/quick-find?keyword=` | Yes | Quick Find — title substring match |
| POST | `/notes/semantic-search` | Yes | Smart Search — semantic similarity |

## AI

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/notes/apply-ai-tag` | Yes | Apply AI suggested tag to a note |

## Import

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/notes/import` | Yes | Bulk import notes from TXT file |

## Reports

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/reports/tag-summary` | Yes | Tags with count > 1 (raw SQL GROUP BY + HAVING) |
| GET | `/reports/user-notes` | Yes | Total notes for logged-in user (raw SQL JOIN) |
| GET | `/reports/long-notes` | Yes | Notes above average content length (raw SQL subquery) |

## Utility

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | API welcome message |
| GET | `/health` | No | Health check |
| GET | `/db-test` | No | Database connectivity test |
| GET | `/docs` | No | Swagger / OpenAPI UI |

---

# 📋 Sample Requests and Responses

## Register User

**Request:**
```
POST /users
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "securepass123"
}
```

**Response (201):**
```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "created_at": "2026-08-07T10:00:00Z"
}
```

---

## Login

**Request:**
```
POST /login
Content-Type: application/x-www-form-urlencoded

username=alice@example.com&password=securepass123
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "name": "Alice",
  "email": "alice@example.com",
  "created_at": "2026-08-07T10:00:00Z"
}
```

---

## Create Note (with AI Suggestion)

**Request:**
```
POST /notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "FastAPI Basics",
  "content": "FastAPI is a modern Python web framework for building APIs.",
  "tag": "Programming"
}
```

**Response (200):**
```json
{
  "note": {
    "id": 42,
    "title": "FastAPI Basics",
    "content": "FastAPI is a modern Python web framework for building APIs.",
    "tag": "Programming",
    "owner_id": 1,
    "created_at": "2026-08-07T10:05:00Z"
  },
  "ai_suggestion": {
    "tags": ["fastapi", "modern", "python"],
    "summary": "FastAPI is a modern Python web framework for building APIs."
  }
}
```

---

## Smart Search

**Request:**
```
POST /notes/semantic-search
Authorization: Bearer <token>
Content-Type: application/json

{
  "query": "leg day exercise plan"
}
```

**Response (200):**
```json
{
  "results": [
    {
      "score": 0.6439,
      "note": {
        "id": 6,
        "title": "Morning workout plan",
        "content": "Do 30 minutes of cardio followed by strength training focused on legs and core.",
        "tag": "ai-demo",
        "owner_id": 5,
        "created_at": "2026-08-07T09:00:00Z"
      }
    },
    {
      "score": 0.5873,
      "note": {
        "id": 11,
        "title": "Gym schedule change",
        "content": "Switch leg day to Thursday and move the rest day to Sunday this week.",
        "tag": "ai-demo",
        "owner_id": 5,
        "created_at": "2026-08-07T09:00:00Z"
      }
    }
  ]
}
```

---

## Tag Summary Report

**Request:**
```
GET /reports/tag-summary
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {"tag": "ai-demo", "count": 8},
  {"tag": "College", "count": 4},
  {"tag": "Programming", "count": 3}
]
```

Only tags with count > 1 are returned (HAVING clause).

---

# 🔐 Authentication Flow

```
User fills Register form
        │
        ▼
POST /users
        │
        ▼
Pydantic validates (EmailStr, min_length=8 password)
        │
        ▼
Password hashed with bcrypt
        │
        ▼
User stored in Supabase DB
        │
        ▼
User fills Login form
        │
        ▼
POST /login (form-urlencoded: username + password)
        │
        ▼
Verify email + bcrypt password check
        │
        ▼
JWT token generated (sub = email, exp = 60 min)
        │
        ▼
Token + name + email + created_at returned
        │
        ▼
Frontend stores token in localStorage
        │
        ▼
Every API call: Authorization: Bearer <token>
        │
        ▼
get_current_user() decodes JWT → fetches user from DB
        │
        ▼
Protected API executes
```

**JWT Configuration** (loaded from `.env`):
- `SECRET_KEY` — signing key
- `ALGORITHM` — HS256
- `ACCESS_TOKEN_EXPIRE_MINUTES` — 60

---

# 📝 CRUD Operations

## Create Note
`POST /notes` → validates data → inserts into DB → calls `get_ai_response()` → registers background indexing task → returns `{note, ai_suggestion}`.

## Read Notes
`GET /notes` → authenticates → fetches user's notes → returns JSON array. Supports optional `?search=` and `?tag=` query parameters.

## Update Note
`PUT /notes/{id}` → verifies ownership → updates title/content/tag → returns updated note.

## Delete Note
`DELETE /notes/{id}` → verifies ownership → deletes record → returns `{"message": "Note deleted successfully"}`.

---

# 📥 Import Notes

Import multiple notes at once by uploading a `.txt` file.

**File format — each line must be:**
```
title|content|tag
```

**Example (`sample_import.txt`):**
```
Complete FastAPI Project|Build and test all FastAPI routes for the capstone project|College
Review JWT Authentication|Revise token creation, expiry and protected route flow|Programming
Learn AI Tagging Concepts|Explore mock AI and real LLM tag suggestion techniques|Ideas
```

**Rules:**
- Lines not matching the `title|content|tag` format are silently skipped.
- Empty lines are skipped.
- All notes are inserted in a **single database commit** for performance.

**Request:**
```
POST /notes/import
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: sample_import.txt
```

**Response:**
```json
{
  "message": "Import Successful",
  "count": 10
}
```

A sample file with 10 notes is included at the repository root: `sample_import.txt`.

---

# 📄 Pagination

The frontend paginates all note views — 10 notes per page.

- **Previous** button — disabled on page 1
- **Next** button — disabled on the last page
- **Page number buttons** — active page highlighted in red
- Pagination resets to page 1 whenever notes are reloaded, a search is performed, a category is selected, or a smart search runs
- Edit and Delete buttons work on every page

Pagination is implemented entirely on the frontend using the full `allNotes` array loaded from `GET /notes`.

---

# 🔍 Search Algorithms

All algorithms are implemented from scratch in `backend/algorithms.py` — no built-in `sorted()`, `.sort()`, or imported search utilities.

## 1. Insertion Sort

Sorts notes alphabetically by title (ascending) before binary search. Implemented with an outer loop and an inner backward-swap loop.

- **Used in:** `GET /notes/lookup`, `GET /notes/lookup-recursive`
- **Complexity:** O(n) best, O(n²) average/worst

## 2. Linear Search

Sequentially scans all notes. Returns all notes where the keyword appears in title, content, or tag (case-insensitive).

- **Used in:** `GET /notes/search?keyword=`
- **Complexity:** O(n)

## 3. Binary Search (Iterative)

Searches the alphabetically sorted title list using the iterative midpoint method. Returns the exact matching note or 404.

- **Used in:** `GET /notes/lookup?title=`
- **Complexity:** O(log n)

## 4. Binary Search (Recursive)

Recursive implementation of binary search. Explicit base case: `if left > right: return None`.

- **Used in:** `GET /notes/lookup-recursive?title=`
- **Complexity:** O(log n)

## 5. Quick Find

Scans all notes and returns those whose title contains the keyword as a substring. Faster for partial title matching.

- **Used in:** `GET /notes/quick-find?keyword=`
- **Complexity:** O(n)

---

# 🤖 Artificial Intelligence Features

## Mock AI Mode

Set `MOCK_AI=1` in `.env` (default). No API key, no internet connection, no signup required.

**Mock logic:**
- Tags: first 3 words from the note content longer than 4 characters
- Summary: first 20 words of the note content

## Prompt Template

The system prompt used by `get_ai_response()` (verbatim from `backend/ai_service.py`):

```
Instructions:
You are an AI assistant that analyzes notes.

Context:
The note belongs to an internal knowledge base.

Input:
The user will provide note content.

Constraints:
Return ONLY valid JSON.
No explanation.
No markdown.
No extra text.

Output Format:
{
  "tags": ["tag1", "tag2", "tag3"],
  "summary": "One sentence summary."
}
```

The prompt uses all five required parts: **Instructions**, **Context**, **Input**, **Constraints**, **Output Format**.

## AI Suggestion Flow

1. User submits "Create Note" form
2. Frontend sends `POST /notes`
3. Backend inserts the note into the database
4. `get_ai_response()` is called with the note content
5. Response is parsed with `json.loads()` — failures are caught and return `null` (note is still created)
6. Response returned: `{"note": {...}, "ai_suggestion": {"tags": [...], "summary": "..."}}`
7. Frontend renders an **"AI Suggests"** panel on the new note card showing tags and summary
8. An **"Apply as tag"** button calls `PUT /notes/{id}` to update the note's tag with the first suggested tag

## Smart Search (Semantic)

Powered by `sentence-transformers` library using the **`all-MiniLM-L6-v2`** model.

**One-time model download:**
The first run downloads and caches the model weights from HuggingFace (~80MB). An active internet connection is required for this first download only. After that, all runs use the local cache at `~/.cache/huggingface/` — no API key and no internet required.

```bash
# First run (requires internet, downloads model):
uvicorn main:app --reload

# All subsequent runs (fully offline):
uvicorn main:app --reload
```

**Search flow:**
1. Query is encoded using `all-MiniLM-L6-v2`
2. All user notes are encoded (title + content + tag concatenated)
3. Cosine similarity computed between query and all note embeddings
4. Notes ranked by similarity score (descending)
5. Returns top 5 results above threshold 0.30

**Verified results:**
- Query `"leg day exercise plan"` → "Gym schedule change" in Top 3
- Query `"dinner ideas with vegetables"` → "Recipe idea" in Top 3

**Frontend:** Smart Search input is separate from the standard keyword search and calls `POST /notes/semantic-search`.

---

# 📊 Reports Module

All three report functions use **raw SQL** executed via `db.execute(text(...))` — not the SQLAlchemy ORM query builder.

## Tag Summary

```
GET /reports/tag-summary
```

Raw SQL with `GROUP BY tag` and `HAVING COUNT(*) > 1`. Returns only tags that appear on more than one note.

```sql
SELECT tag, COUNT(*) AS count
FROM notes
WHERE owner_id = :user_id
GROUP BY tag
HAVING COUNT(*) > 1
```

## User Notes Count

```
GET /reports/user-notes
```

Raw SQL `LEFT JOIN` between `users` and `notes`. Returns the total note count for the logged-in user.

```sql
SELECT u.id, u.name, u.email, COUNT(n.id) AS note_count
FROM users u
LEFT JOIN notes n ON u.id = n.owner_id
WHERE u.id = :user_id
GROUP BY u.id, u.name, u.email
```

## Long Notes

```
GET /reports/long-notes
```

Raw SQL with a **subquery** for average content length. Returns notes whose content is longer than the average content length of all the user's notes.

```sql
SELECT id, title, content, tag, owner_id, created_at
FROM notes
WHERE owner_id = :user_id
AND LENGTH(content) > (
    SELECT AVG(LENGTH(content))
    FROM notes
    WHERE owner_id = :user_id
)
```

---

# ⚡ Background Tasks

After every `POST /notes`, a FastAPI `BackgroundTask` is registered that simulates a 2-second indexing delay:

```python
def process_note_background(note_id: int):
    time.sleep(2)
    logger.info(f"Background indexing completed for Note ID {note_id}")
```

The API response returns **immediately** — before the background task finishes. This demonstrates non-blocking background processing.

---

# 📝 Logging System

Configured in `backend/logger.py`. Logs are written to `backend/app.log` (excluded from Git via `.gitignore`).

Every HTTP request is logged by middleware:

```
2026-08-07 10:05:23 | INFO | GET /notes Status=200 Time=45.2ms
2026-08-07 10:05:24 | INFO | POST /notes Status=200 Time=312.7ms
```

The `X-Process-Time` response header is set on every response showing the processing time in milliseconds.

---

# 🛡️ Security Features

| Feature | Implementation |
|---------|---------------|
| Password Hashing | Passlib + bcrypt |
| JWT Authentication | python-jose, HS256, 60-min expiry |
| Protected Routes | `Depends(get_current_user)` on all note/report endpoints |
| Owner Verification | All queries filter by `owner_id == current_user.id` |
| Email Validation | Pydantic `EmailStr` |
| Input Validation | Pydantic field validators, min/max length |
| CORS | CORSMiddleware — only frontend origins allowed |
| Secrets | All secrets in `.env`, never committed |
| Global Error Handler | Catches all unhandled exceptions, returns 500 JSON |

**CORS allowed origins:**
- `http://127.0.0.1:5500`
- `http://localhost:5500`
- `http://127.0.0.1:3000`
- `http://localhost:3000`

---

# 📐 Assignment Compliance

This project was built for the **Software Development Engineering with Applied AI Capstone** at Vishlesan I-Hub Foundation, IIT Patna.

## Part 1 — Core App

| Requirement | Implementation |
|-------------|---------------|
| SQLAlchemy ORM models (User, Note) | `backend/models.py` |
| Pydantic validation (EmailStr, min_length, field_validator) | `backend/schemas.py` |
| CRUD endpoints | `main.py` — POST/GET/PUT/DELETE /notes |
| owner_id existence check on POST /notes | JWT-based — current user's id used directly |
| Dependency injection (get_db) | `Depends(get_db)` on all routes |
| X-Process-Time middleware | `log_requests` middleware in `main.py` |
| CORS configuration | `CORSMiddleware` in `main.py` |
| Background task on POST /notes | `process_note_background()` — 2s delay |
| Bulk import POST /notes/import | Single-commit bulk insert |
| Raw SQL reports | `crud.py` — tag_summary, user_notes_count, long_notes |
| Seed dataset | `backend/seed.py` |
| Frontend: Fetch API, dynamic DOM, no frameworks | `frontend/script.js` |
| Debounced search (400ms) | `searchInput` event listener |
| Pagination (10/page) | `renderNotes()`, `renderPagination()` |
| Responsive layout | CSS `@media (max-width: 1000px)` and `(max-width: 700px)` |
| Sticky header | `.header { position: sticky; top: 0; }` |
| No alert()/confirm() | All user feedback via toast and DOM |
| Event listeners only (no inline onclick) | `addEventListener` throughout |

## Part 2 — Ranking Engine

| Requirement | Implementation |
|-------------|---------------|
| Insertion sort (from scratch) | `insertion_sort()` in `algorithms.py` |
| Iterative binary search | `binary_search()` in `algorithms.py` |
| Recursive binary search | `binary_search_recursive()` in `algorithms.py` |
| Linear search with found-flag pattern | `linear_search()` in `algorithms.py` |
| Quick find | `quick_find()` in `algorithms.py` |
| GET /notes/search (linear search) | `main.py` |
| GET /notes/lookup (binary search) | `main.py` |
| GET /notes/lookup-recursive | `main.py` |
| GET /notes/quick-find | `main.py` |

## Part 3 — Intelligence Layer

| Requirement | Implementation |
|-------------|---------------|
| `get_ai_response()` function | `backend/ai_service.py` |
| MOCK_AI=1 offline mode | `ai_service.py` — no API key, no internet |
| 5-part prompt template | `SYSTEM_PROMPT` in `ai_service.py` |
| AI suggestion on POST /notes | `crud.create_note()` calls `get_ai_response()` |
| json.loads failure handling | `try/except` → `ai_suggestion = None` |
| Frontend AI Suggests panel | Create note handler in `script.js` |
| "Apply as tag" button | Calls `PUT /notes/{id}` in `script.js` |
| POST /notes/semantic-search | `main.py` + `semantic_search.py` |
| `all-MiniLM-L6-v2` model | `SentenceTransformer("all-MiniLM-L6-v2")` |
| Cosine similarity ranking | `sklearn.metrics.pairwise.cosine_similarity` |
| AI sample notes seeded | `seed.py` — 8 notes, tag=`ai-demo` |
| Smart Search UI (distinct) | `#smartSearchInput` in header, separate from `#searchInput` |
| Top-3 verified results | "Gym schedule change" ✅, "Recipe idea" ✅ |

---

# 🧪 Testing Guide

## How to Test via Swagger UI

1. Start the backend: `uvicorn main:app --reload`
2. Open `http://127.0.0.1:8000/docs`
3. Register a user: `POST /users`
4. Login: `POST /login` → copy `access_token`
5. Click **Authorize** → enter `Bearer <token>`
6. Test all endpoints

## Validation Error Examples

**Missing required field (422):**
```json
POST /notes  body: {"content": "missing title", "tag": "Work"}
→ 422 Unprocessable Entity
{"detail": [{"loc": ["body","title"],"msg":"Field required"}]}
```

**Malformed email (422):**
```json
POST /users  body: {"name":"Test","email":"notanemail","password":"pass1234"}
→ 422 Unprocessable Entity
```

**Password too short (422):**
```json
POST /users  body: {"name":"Test","email":"t@t.com","password":"short"}
→ 422 Unprocessable Entity
```

**Duplicate email (400):**
```json
POST /users  (existing email)
→ 400 Bad Request  {"detail": "Email already registered"}
```

**Missing token (401):**
```json
GET /notes  (no Authorization header)
→ 401 Unauthorized
```

## Test Checklist

| Feature | Status |
|---------|--------|
| Register | ✅ |
| Login (valid) | ✅ |
| Login (invalid) | ✅ 401 |
| Duplicate email | ✅ 400 |
| JWT Protected Routes | ✅ 401 without token |
| Create Note + AI suggestion | ✅ |
| Read Notes | ✅ |
| Update Note | ✅ |
| Delete Note | ✅ |
| Import Notes (TXT) | ✅ |
| Linear Search | ✅ |
| Binary Search | ✅ |
| Recursive Binary Search | ✅ |
| Quick Find | ✅ |
| Smart Search | ✅ |
| Tag Summary Report | ✅ |
| User Notes Report | ✅ |
| Long Notes Report | ✅ |
| Pagination | ✅ |
| Profile + Member Since date | ✅ |
| Apply as tag | ✅ |
| X-Process-Time header | ✅ |
| Background task (non-blocking) | ✅ |

---

# 🐞 Development Journey & Bug Fixes

Key challenges encountered and resolved during development:

**1. Database Migration** — Project initially used SQLite, later migrated to Supabase PostgreSQL. Updated connection string to use `psycopg` (v3) driver with `sslmode=require`.

**2. Login/Logout Refresh Issue** — After login, dashboard required a manual browser refresh. Fixed by making the `DOMContentLoaded` handler `async` and `await`-ing `loadNotes()`.

**3. Import Notes Button** — Import button inside the form triggered form submission. Fixed by setting `type="button"`.

**4. CORS Issue** — Frontend showed "Failed to Fetch". Fixed by configuring `CORSMiddleware` with the exact frontend origins.

**5. Import Performance** — Importing 10 notes triggered 10 separate database commits and 10 AI calls. Fixed by using `db.add_all()` with a single commit and no AI on bulk import.

**6. AI Suggestion Panel (Pagination)** — When a user had more than 10 notes, the newly created note's card was on a later page and the AI panel never rendered. Fixed by computing the target page and navigating to it before querying the DOM.

**7. Edit Note — Custom Tag Loss** — When editing a note with a custom/imported tag not in the dropdown, the tag was silently wiped to empty on save. Fixed by detecting dropdown mismatch and falling back to "Others" + custom input.

**8. Raw SQL Reports** — Initial implementation used the SQLAlchemy ORM query builder. Rewritten to use `db.execute(text(...))` with proper `GROUP BY`, `HAVING`, `JOIN`, and subquery as required by the assignment.

**9. Smart Search — Empty Results** — AI sample notes were not seeded for the demo user. Fixed by updating `seed.py` to seed all 8 `AI_SAMPLE_NOTES` with `tag="ai-demo"` for the demo user.

---

# 🔮 Future Improvements

- OpenAI / Gemini real LLM integration
- Real-time auto-tagging as user types
- Rich text / Markdown editor
- Note sharing and team collaboration
- Cloud file attachments
- Mobile application (React Native)
- Email verification and password reset
- Docker deployment + CI/CD pipeline

---

# 👨‍💻 Author

**Manish Kevat**

Full Stack Web Developer

GitHub: [https://github.com/manish-7610](https://github.com/manish-7610)

---

# 🙏 Acknowledgements

This project was developed as part of the **Software Development Engineering with Applied AI Capstone Project**.

Special thanks to Vishlesan I-Hub Foundation, IIT Patna, faculty members, mentors, teaching assistants, and the open source community.

---

# 📜 License

This project is developed for educational and learning purposes only.

---
