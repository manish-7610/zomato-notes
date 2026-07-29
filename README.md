# 🍽️ Zomato Notes

## 📌 Project Overview

Zomato Notes is a Full Stack Note Management Application built using FastAPI, SQLAlchemy, SQLite, HTML, CSS and JavaScript.

The application allows users to create, update, delete and search notes. It also provides AI powered smart search, category tree navigation and authentication.

---

## 🚀 Features

- User Authentication (JWT)
- Create Note
- Update Note
- Delete Note
- Delete Confirmation Modal
- Toast Notification
- Search Notes
- Smart Search
- Category Tree
- Import Notes (.txt)
- Responsive UI
- Loading Animation
- Error Handling

---

## 🛠 Tech Stack

Frontend
- HTML
- CSS
- JavaScript

Backend
- FastAPI
- SQLAlchemy
- SQLite
- JWT
- Pydantic

---

## 📂 Folder Structure

backend/
frontend/
README.md
sample_import.txt

---

## ⚙ Installation

git clone <repo>

cd zomato-notes

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python seed.py

uvicorn main:app --reload

---

## 🌐 Frontend

Use Live Server

http://127.0.0.1:3000

Backend

http://127.0.0.1:8000

Swagger

http://127.0.0.1:8000/docs

---

## 📌 API Endpoints

POST /login

POST /users

GET /notes

POST /notes

PUT /notes/{id}

DELETE /notes/{id}

POST /notes/import

GET /reports/tag-summary

GET /reports/user-notes

GET /reports/long-notes

---

## 👨‍💻 Author

Manish Kevat