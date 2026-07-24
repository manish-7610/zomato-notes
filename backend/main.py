from fastapi import FastAPI

app = FastAPI(
    title="Zomato Notes API",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Zomato Notes API"
    }