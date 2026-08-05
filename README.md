
# 🍽️ Zomato Notes

### 🚀 AI Powered Full Stack Notes Management System

A modern Full Stack Note Management Application built using **FastAPI**, **SQLAlchemy**, **Supabase PostgreSQL**, **HTML**, **CSS**, **JavaScript**, and **Artificial Intelligence**.

The application provides secure authentication, AI-powered note management, semantic search, advanced searching algorithms, reporting, background processing, and a modern responsive frontend.

---

![Python](https://img.shields.io/badge/Python-3.13-blue?style=for-the-badge&logo=python)

![FastAPI](https://img.shields.io/badge/FastAPI-0.116-green?style=for-the-badge&logo=fastapi)

![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-ORM-red?style=for-the-badge)

![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)

![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)

![HTML5](https://img.shields.io/badge/HTML5-orange?style=for-the-badge&logo=html5)

![CSS3](https://img.shields.io/badge/CSS3-blue?style=for-the-badge&logo=css3)

![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)  #Educational Purpose Only

---

**Capstone Project**

Software Development Engineering with Applied AI

Vishlesan I-Hub Foundation, IIT Patna

</div>

---

# 📑 Table of Contents

- Project Overview
- Key Features
- System Architecture
- Technology Stack
- Project Structure
- Database Design
- Installation Guide
- Environment Variables
- Running the Project
- API Documentation
- Authentication Flow
- CRUD Operations
- Search Algorithms
- AI Features
- Reports Module
- Background Tasks
- Logging System
- Security Features
- Testing
- Challenges & Bug Fixes
- Future Improvements
- Author

---

# 📌 Project Overview

Zomato Notes is a modern Full Stack AI-powered Note Management Application that enables users to securely create, organize, search, update, delete, and manage personal notes through an intuitive user interface backed by a scalable FastAPI backend.

Unlike traditional note-taking applications, this project combines **Artificial Intelligence**, **Search Algorithms**, **JWT Authentication**, **Semantic Search**, **Background Processing**, and **Reporting** into a single application.

The project was developed as a Capstone Project to demonstrate real-world backend development concepts, database management, REST API design, authentication, search optimization, and AI integration.

---

# 🎯 Objectives

The primary objectives of this project are:

- Build a complete Full Stack application
- Implement secure JWT Authentication
- Learn REST API Development
- Integrate SQLAlchemy ORM
- Work with Supabase PostgreSQL Database
- Apply Searching Algorithms
- Implement AI-assisted Features
- Create Responsive Frontend
- Practice Clean Project Structure
- Demonstrate Software Engineering Best Practices

---

# ✨ Key Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Token Authentication
- Password Hashing using Passlib + bcrypt
- Protected API Routes
- User-specific Data Isolation

---

## 📝 Notes Management

- Create Notes
- Read Notes
- Update Notes
- Delete Notes
- Personal Notes Dashboard
- Category Management
- Import Notes from TXT File

---

## 🔍 Searching

The application provides multiple searching techniques.

### Standard Search

Searches notes using keywords.

### Linear Search

Performs sequential search through all notes.

### Binary Search

Searches alphabetically sorted notes efficiently.

### Recursive Binary Search

Recursive implementation of Binary Search.

### Quick Find

Fast title-based searching.

### Semantic Search

Uses AI embeddings to search based on meaning instead of exact words.

---

## 🤖 Artificial Intelligence

The project includes AI-assisted features.

- AI Tag Suggestions
- AI Summary Generation
- Semantic Similarity Search
- Mock AI Support
- Sentence Transformers Integration
- Cosine Similarity Ranking

---

## 📊 Reports

Administrative reports available inside the backend.

- Tag Summary Report
- User Notes Report
- Long Notes Report

---

## ⚙️ Background Processing

The application performs asynchronous tasks.

- Background Note Indexing
- Automatic Processing after Note Creation

---

## 📋 Logging

Every API request is logged.

- Request Logging
- Processing Time
- Global Exception Logging
- API Status Logging

---

## 🎨 Frontend

Modern responsive frontend built using Vanilla JavaScript.

Features include:

- Responsive Layout
- Beautiful Dashboard
- Modern Cards
- Dynamic Categories
- Toast Notifications
- Loader Animation
- Delete Confirmation Modal
- Edit Mode
- Profile Management
- Import Notes
- AI Search
- Smart Search

---

# 💻 Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API

---

## Backend

- Python
- FastAPI
- SQLAlchemy ORM
- Pydantic
- JWT Authentication
- Passlib
- bcrypt

---

## Database

- Supabase PostgreSQL
- SQLAlchemy ORM

---

## Artificial Intelligence

- Sentence Transformers
- Scikit-Learn
- Cosine Similarity
- Mock AI Engine

---

## Development Tools

- Visual Studio Code
- Swagger UI
- Git
- GitHub
- Live Server
- Uvicorn

---

# 🏗️ System Architecture

The application follows a modern Full Stack Architecture where the frontend communicates with the FastAPI backend through REST APIs. The backend handles authentication, business logic, database operations, AI processing, and reporting.

```
                    +----------------------+
                    |      Frontend        |
                    | HTML • CSS • JS      |
                    +----------+-----------+
                               |
                     Fetch API (HTTP)
                               |
                               ▼
                    +----------------------+
                    |      FastAPI API     |
                    | Authentication       |
                    | CRUD Operations      |
                    | Search Algorithms    |
                    | AI Processing        |
                    | Reports              |
                    +----------+-----------+
                               |
                  SQLAlchemy ORM
                               |
                               ▼
               +-----------------------------+
               |    Supabase PostgreSQL      |
               |                             |
               |   users                     |
               |   notes                     |
               +-----------------------------+
                               |
                               ▼
                AI Services / Semantic Search
          Sentence Transformers + Cosine Similarity
```

---

# 📂 Project Structure

```
zomato-notes/
│
├── backend/
│
│   ├── __pycache__/
│   │
│   ├── auth.py
│   │      JWT Authentication
│   │      Password Hashing
│   │
│   ├── crud.py
│   │      Database CRUD Operations
│   │
│   ├── database.py
│   │      SQLAlchemy Configuration
│   │      Supabase Connection
│   │
│   ├── models.py
│   │      Database Models
│   │
│   ├── schemas.py
│   │      Request & Response Schemas
│   │
│   ├── algorithms.py
│   │      Linear Search
│   │      Binary Search
│   │      Recursive Binary Search
│   │      Insertion Sort
│   │      Quick Find
│   │
│   ├── semantic_search.py
│   │      AI Semantic Search
│   │
│   ├── ai_service.py
│   │      AI Tag Suggestions
│   │      AI Summary
│   │
│   ├── logger.py
│   │      Logging Configuration
│   │
│   ├── seed.py
│   │      Sample Data Generator
│   │
│   ├── requirements.txt
│   │
│   ├── .env.example
│   ├── .env
│   │
│   └── main.py
│          FastAPI Application
│
│
├── frontend/
│
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── sample_import.txt
│
├── README.md
│
└── .gitignore
```

---

# 🗄️ Database Design

The project uses **Supabase PostgreSQL** as the primary cloud database.

The database is connected using **SQLAlchemy ORM**, allowing Python objects to interact directly with PostgreSQL tables.

---

## Database Tables

### Users Table

| Column | Type |
|---------|------|
| id | Integer |
| name | String |
| email | String |
| password | String |
| created_at | DateTime |

---

### Notes Table

| Column | Type |
|---------|------|
| id | Integer |
| title | String |
| content | Text |
| tag | String |
| owner_id | Integer |
| created_at | DateTime |

---

## Entity Relationship

```
+-----------+          1
|   Users   |--------------------+
+-----------+                    |
| id         |                   |
| name       |                   |
| email      |                   |
| password   |                   |
+-----------+                    |
                                 |
                                 | Many
                                 ▼
                          +-------------+
                          |    Notes    |
                          +-------------+
                          | id          |
                          | title       |
                          | content     |
                          | tag         |
                          | owner_id    |
                          +-------------+
```

One User can own multiple Notes.

Each Note belongs to exactly one User.

---

# ⚙️ Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/manish-7610/zomato-notes.git
```

---

## 2. Open Project

```bash
cd zomato-notes
```

---

## 3. Create Virtual Environment

```bash
python -m venv venv
```

---

## 4. Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## 5. Install Dependencies

```bash
pip install -r backend/requirements.txt
```

---

# 🌍 Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
user=postgres
password=YOUR_DATABASE_PASSWORD
host=YOUR_SUPABASE_HOST
port=5432
dbname=postgres

SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

SECRET_KEY=YOUR_SECRET_KEY
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

MOCK_AI=1
```

---

# 🚀 Running the Backend

```bash
cd backend

uvicorn main:app --reload
```

Server starts at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# 🌐 Running the Frontend

Open

```
frontend/index.html
```

or launch using **VS Code Live Server**

```
http://127.0.0.1:3000
```

---

# 📡 REST API Documentation

## User APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /users | Register User |
| POST | /login | Login User |
| PUT | /profile | Update User Profile |

---

## Notes APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /notes | Get All Notes |
| POST | /notes | Create Note |
| GET | /notes/{id} | Get Note |
| PUT | /notes/{id} | Update Note |
| DELETE | /notes/{id} | Delete Note |

---

## Search APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /notes/search | Linear Search |
| GET | /notes/lookup | Binary Search |
| GET | /notes/lookup-recursive | Recursive Binary Search |
| GET | /notes/quick-find | Quick Find |
| POST | /notes/semantic-search | Semantic Search |

---

## AI APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| PUT | /notes/apply-ai-tag | Apply AI Suggested Tag |

---

## Reports APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /reports/tag-summary | Tag Statistics |
| GET | /reports/user-notes | Total User Notes |
| GET | /reports/long-notes | Long Notes Report |

---

## Import API

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /notes/import | Import Notes from TXT File |

---


# 🔐 Authentication Flow

The application uses **JWT (JSON Web Token)** based authentication to secure all protected APIs.

Every user must register and login before accessing any note-related functionality.

---

## Authentication Workflow

```
                User
                  │
                  ▼
        Register (/users)
                  │
                  ▼
        Password Hashing
          Passlib + bcrypt
                  │
                  ▼
      Store User in Database
                  │
                  ▼
          Login (/login)
                  │
                  ▼
      Verify Email & Password
                  │
                  ▼
         Generate JWT Token
                  │
                  ▼
      Return Access Token
                  │
                  ▼
Store Token in Browser (localStorage)
                  │
                  ▼
 Authorization: Bearer TOKEN
                  │
                  ▼
 Access Protected APIs
```

---

## Authentication Security

The project protects every note API using:

- JWT Authentication
- Password Hashing
- Protected Routes
- User Authorization
- Token Verification

This ensures that one user cannot access another user's notes.

---

# 📝 CRUD Workflow

The project implements complete CRUD operations.

---

## Create Note

```
Frontend
     │
     ▼
POST /notes
     │
     ▼
Validate Data
     │
     ▼
Store in Database
     │
     ▼
Generate AI Suggestions
     │
     ▼
Background Indexing
     │
     ▼
Return Response
```

---

## Read Notes

```
Frontend
     │
     ▼
GET /notes
     │
     ▼
Authenticate User
     │
     ▼
Fetch User Notes
     │
     ▼
Return JSON
```

---

## Update Note

```
PUT /notes/{id}

↓

Validate Ownership

↓

Update Database

↓

Return Updated Note
```

---

## Delete Note

```
DELETE /notes/{id}

↓

Verify Owner

↓

Delete Record

↓

Return Success Message
```

---

# 🔍 Searching Algorithms

One of the major objectives of this project was implementing Data Structures & Algorithms in a practical application.

---

## 1️⃣ Linear Search

### Purpose

Used for sequential keyword searching.

### Used In

```
GET /notes/search
```

### Working

```
Note1

↓

Note2

↓

Note3

↓

Note4

↓

Keyword Found
```

### Time Complexity

```
Best Case

O(1)

Average Case

O(n)

Worst Case

O(n)
```

---

## 2️⃣ Insertion Sort

### Purpose

Sorts notes alphabetically before Binary Search.

### Used In

```
GET /notes/lookup
```

### Time Complexity

```
Best

O(n)

Average

O(n²)

Worst

O(n²)
```

---

## 3️⃣ Binary Search

### Purpose

Efficient searching on sorted notes.

### Used In

```
GET /notes/lookup
```

### Working

```
Sorted Notes

↓

Check Middle

↓

Left / Right

↓

Repeat

↓

Found
```

### Complexity

```
Best

O(1)

Average

O(log n)

Worst

O(log n)
```

---

## 4️⃣ Recursive Binary Search

Recursive implementation of Binary Search.

### Used In

```
GET /notes/lookup-recursive
```

Instead of loops, the function calls itself until the note is found.

Complexity remains:

```
O(log n)
```

---

## 5️⃣ Quick Find

Fast title-based searching.

### Used In

```
GET /notes/quick-find
```

Designed for instant title matching.

---

## 6️⃣ Semantic Search

Unlike traditional search, semantic search understands the **meaning** of the query.

Instead of matching words, it compares vector embeddings.

Workflow

```
User Query

↓

Embedding Generation

↓

Cosine Similarity

↓

Rank Notes

↓

Return Most Relevant Notes
```

Libraries Used

- Sentence Transformers
- Scikit-Learn
- Cosine Similarity

---

# 🤖 Artificial Intelligence Features

The project integrates lightweight AI features to enhance note management.

---

## AI Tag Suggestion

Whenever a note is created,

AI analyzes the content and suggests suitable tags.

Example

```
Input

Learn SQLAlchemy ORM relationships

↓

AI Suggestion

Python

Backend

Database
```

---

## AI Summary

AI also generates a short summary of the note.

---

## Semantic Search

Uses embeddings instead of exact keyword matching.

Allows users to search naturally.

Example

Searching

```
Workout
```

can also return

```
Gym

Exercise

Fitness

Cardio
```

depending on similarity score.

---

## Mock AI Support

The project supports Mock AI mode for local development.

This allows testing AI features without requiring external API keys.

---

# 📊 Reports Module

The backend includes multiple analytical reports.

---

## Tag Summary Report

Endpoint

```
GET /reports/tag-summary
```

Returns

- Tag Name
- Number of Notes

---

## User Notes Report

Endpoint

```
GET /reports/user-notes
```

Returns

Total notes created by the logged-in user.

---

## Long Notes Report

Endpoint

```
GET /reports/long-notes
```

Returns notes whose content length exceeds the configured limit.

---

# ⚡ Background Tasks

FastAPI BackgroundTasks are used for asynchronous processing.

Current Implementation

```
Create Note

↓

Return Response Immediately

↓

Background Task Starts

↓

Index Note

↓

Complete
```

Benefits

- Faster Response Time
- Better User Experience
- Scalable Design

---

# 📝 Logging System

Every request passing through the backend is logged.

The middleware records:

- Request Method
- API Endpoint
- Response Status
- Processing Time

Example

```
GET /notes

Status = 200

Time = 34ms
```

Global Exception Logging is also implemented.

---

# 🛡️ Security Features

The project follows multiple security best practices.

✔ Password Hashing

✔ JWT Authentication

✔ Protected Routes

✔ Owner Verification

✔ User-specific Notes

✔ Secure Password Storage

✔ Request Validation

✔ Pydantic Validation

✔ SQLAlchemy ORM Protection

✔ Environment Variables

✔ Global Exception Handling

✔ CORS Configuration

---


# 🧪 Testing Guide

The application was tested module by module to ensure correctness and stability.

---

## Authentication Testing

| Test Case | Status |
|-----------|--------|
| User Registration | ✅ Passed |
| Duplicate Email Validation | ✅ Passed |
| Login with Valid Credentials | ✅ Passed |
| Login with Invalid Credentials | ✅ Passed |
| JWT Authentication | ✅ Passed |
| Protected Routes | ✅ Passed |

---

## Notes CRUD Testing

| Test Case | Status |
|-----------|--------|
| Create Note | ✅ Passed |
| Read Notes | ✅ Passed |
| Update Note | ✅ Passed |
| Delete Note | ✅ Passed |
| User-specific Notes | ✅ Passed |

---

## Search Testing

| Feature | Status |
|----------|--------|
| Linear Search | ✅ Passed |
| Binary Search | ✅ Passed |
| Recursive Binary Search | ✅ Passed |
| Quick Find | ✅ Passed |
| Semantic Search | ✅ Passed |

---

## AI Testing

| Feature | Status |
|----------|--------|
| AI Tag Suggestion | ✅ Passed |
| AI Summary | ✅ Passed |
| Mock AI | ✅ Passed |

---

## Import Testing

| Feature | Status |
|----------|--------|
| TXT File Import | ✅ Passed |
| Multiple Notes Import | ✅ Passed |
| Invalid Lines Handling | ✅ Passed |

---

## Reports Testing

| Report | Status |
|---------|--------|
| Tag Summary | ✅ Passed |
| User Notes Report | ✅ Passed |
| Long Notes Report | ✅ Passed |

---

# 🐞 Development Journey & Bug Fixes

During development, several real-world issues were encountered and resolved.

---

## 1. Database Migration

### Problem

Initially, the project was developed using **MySQL**.

Later, the database was migrated to **Supabase PostgreSQL**.

### Solution

- Updated SQLAlchemy connection string
- Installed PostgreSQL driver (`psycopg2-binary`)
- Modified environment variables
- Successfully connected FastAPI with Supabase PostgreSQL

---

## 2. Login / Logout Refresh Issue

### Problem

After login, the **Profile** and **Logout** buttons did not work until the page was refreshed.

### Cause

Event listeners and authentication state were not synchronized after successful login.

### Solution

- Updated frontend authentication flow
- Reloaded user state after login
- Fixed event binding
- Removed unnecessary initialization calls

---

## 3. Import Notes Button Issue

### Problem

Clicking **Import Notes** displayed:

Please fill in this field.

### Cause

The Import button was inside the note creation form and behaved like a submit button.

### Solution

- Changed Import button to `type="button"`
- Prevented default form submission
- Successfully imported TXT files

---

## 4. Supabase Connection Errors

### Problem

Database connection failed while configuring Supabase.

### Cause

Incorrect database credentials and connection configuration.

### Solution

- Regenerated database password
- Updated `.env`
- Configured PostgreSQL connection correctly
- Verified connection using SQLAlchemy

---

## 5. Bcrypt Compatibility Issue

### Problem

Password hashing generated compatibility errors during authentication.

### Solution

Installed compatible package versions and verified secure password hashing.

---

## 6. Unauthorized API Requests

### Problem

Swagger returned:

401 Unauthorized

### Cause

JWT token was not provided.

### Solution

Used Swagger **Authorize** with Bearer Token to access protected APIs.

---

## 7. Main Application Import Error

### Problem

FastAPI failed to start because the application was executed from the wrong directory.

### Solution

Started Uvicorn from the backend directory.

---

## 8. CORS Issue

### Problem

Frontend displayed:

Failed to Fetch

### Solution

Configured FastAPI CORSMiddleware for frontend origins.

---

## 9. Frontend Rendering Issue

### Problem

Notes were successfully returned from the backend but were not rendered correctly.

### Solution

Verified API responses, fixed rendering logic, and synchronized frontend state.

---

## 10. Logging Optimization

### Problem

The log file continuously increased in size during development.

### Solution

Retained logging for debugging while clearing log files before project submission.

---

# 🚀 Performance Optimizations

Several optimizations were implemented to improve the application's performance.

- SQLAlchemy ORM
- Background Tasks
- JWT Authentication
- Semantic Search
- FastAPI Dependency Injection
- Request Logging
- Processing Time Middleware
- Efficient Searching Algorithms

---

# 🖥️ Application Walkthrough

The application includes the following user interfaces:

- Login
- Register
- Dashboard
- Create Note
- Edit Note
- Delete Note
- Import Notes
- AI Search
- Smart Search
- Profile
- Reports
- Swagger Documentation

All features can be tested by running the backend and opening the frontend in a browser.

---

# 🔮 Future Improvements

The current project provides a strong foundation for future enhancements.

Possible improvements include:

- OpenAI / Gemini Integration
- Real AI-based Auto Categorization
- Image Attachments
- Voice Notes
- Rich Text Editor
- Markdown Support
- Note Sharing
- Team Collaboration
- Cloud File Storage
- Mobile Application
- Offline Support
- Notification System
- Email Verification
- Password Reset
- Docker Deployment
- CI/CD Pipeline

---

# 📖 Learning Outcomes

This project helped strengthen knowledge of:

- REST API Development
- FastAPI
- SQLAlchemy ORM
- Supabase PostgreSQL
- JWT Authentication
- AI Integration
- Semantic Search
- Search Algorithms
- Background Tasks
- Logging
- Responsive Frontend Development
- Full Stack Project Architecture

---

# 👨‍💻 Author

## Manish Kevat

**Full Stack Web Developer**

### Skills

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Supabase
- HTML
- CSS
- JavaScript
- REST APIs
- JWT Authentication

GitHub

https://github.com/manish-7610


---

# 🙏 Acknowledgements

This project was developed as part of the

**Software Development Engineering with Applied AI Capstone Project**

Special thanks to:

- Vishlesan I-Hub Foundation
- IIT Patna
- Faculty Members
- Mentors
- Teaching Assistants
- Open Source Community

for providing valuable learning resources and guidance throughout the project.

---

# 📜 License

This project is developed for educational and learning purposes.

---

# 🎯 Conclusion

**Zomato Notes** is a modern Full Stack AI-powered Note Management System that combines secure authentication, efficient database management, advanced search algorithms, semantic AI search, background processing, reporting, and a responsive frontend into a single application.

The project demonstrates practical implementation of modern backend development concepts including REST APIs, SQLAlchemy ORM, Supabase PostgreSQL integration, JWT Authentication, Artificial Intelligence features, and software engineering best practices.

Beyond implementing core CRUD functionality, this project focuses on solving real-world problems through efficient searching techniques, AI-assisted note organization, and scalable architecture.

This capstone project represents the successful integration of Full Stack Development, Database Engineering, AI Concepts, and Software Engineering principles into a production-style application.

---
# 📊 Project Statistics

| Category | Details |
|----------|---------|
| Project Type | Full Stack Web Application |
| Backend Framework | FastAPI |
| Frontend | HTML, CSS, JavaScript |
| Database | Supabase PostgreSQL |
| ORM | SQLAlchemy |
| Authentication | JWT |
| AI Integration | Sentence Transformers + Mock AI |
| Search Algorithms | Linear Search, Binary Search, Recursive Binary Search, Insertion Sort |
| Reports | 3 |
| CRUD Operations | Complete |
| API Endpoints | 15+ |
| Protected APIs | Yes |
| Responsive UI | Yes |

---

# 🏗️ Software Engineering Concepts Implemented

This project demonstrates the practical implementation of several software engineering concepts, including:

- RESTful API Design
- MVC-inspired Project Structure
- CRUD Operations
- Authentication & Authorization
- Database Normalization
- SQLAlchemy ORM
- Dependency Injection
- Exception Handling
- Logging
- Middleware
- Background Tasks
- Search Algorithms
- AI Integration
- Semantic Search
- Responsive UI Design

---

# 🔄 Development Workflow

The project was developed incrementally with continuous testing and debugging.

Development phases included:

1. Backend API Development
2. Database Integration
3. Authentication Module
4. CRUD Operations
5. AI Integration
6. Search Algorithms
7. Reporting APIs
8. Frontend Development
9. Frontend-Backend Integration
10. Bug Fixing & Optimization
11. Documentation

---

# ✅ Final Project Checklist

### Backend

- [x] FastAPI Setup
- [x] SQLAlchemy ORM
- [x] Supabase PostgreSQL Integration
- [x] JWT Authentication
- [x] CRUD APIs
- [x] Import Notes API
- [x] Semantic Search
- [x] AI Tag Suggestions
- [x] Reports APIs
- [x] Background Tasks
- [x] Logging
- [x] Exception Handling
- [x] Middleware

---

### Frontend

- [x] Login
- [x] Register
- [x] Dashboard
- [x] Create Note
- [x] Edit Note
- [x] Delete Note
- [x] Search Notes
- [x] Smart Search
- [x] Import Notes
- [x] Dynamic Categories
- [x] Profile
- [x] Toast Notifications
- [x] Loading Animation
- [x] Responsive Layout

---

### Algorithms

- [x] Linear Search
- [x] Binary Search
- [x] Recursive Binary Search
- [x] Insertion Sort
- [x] Semantic Similarity Search

---

### Testing

- [x] Authentication Tested
- [x] CRUD Tested
- [x] Search Tested
- [x] AI Tested
- [x] Import Tested
- [x] Reports Tested
- [x] Frontend Integration Tested

---

# 💡 Key Learnings

During the development of this capstone project, I gained hands-on experience in:

- Designing REST APIs with FastAPI
- Managing relational databases using SQLAlchemy ORM
- Migrating from MySQL to Supabase PostgreSQL
- Implementing JWT-based authentication and authorization
- Integrating AI-powered semantic search
- Applying searching algorithms in real-world scenarios
- Building responsive frontend interfaces using HTML, CSS, and JavaScript
- Debugging frontend-backend integration issues
- Writing clean, modular, and maintainable code
- Documenting software projects professionally

---

# 📬 Feedback

Suggestions, improvements, and contributions are always welcome.

If you have ideas to improve this project, feel free to open an Issue or submit a Pull Request on GitHub.

---

# ⭐ Support

If you found this project helpful:

- ⭐ Star this repository
- 🍴 Fork the repository
- 🛠️ Suggest improvements
- 💬 Share feedback

Your support is greatly appreciated!

---

# 🎉 Thank You

Thank you for taking the time to explore this project.

This capstone represents my practical learning journey in Full Stack Development, Backend Engineering, Database Design, Authentication, AI Integration, and Software Engineering.

I hope you find this project useful and informative.

Happy Coding! 🚀