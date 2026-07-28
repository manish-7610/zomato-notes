from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, get_db
import time
import models
import crud
import schemas
from auth import create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from logger import logger
from fastapi import BackgroundTasks

app = FastAPI(
    title="Zomato Notes API",
    version="1.0.0"
)



origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):

    start_time = time.time()

    response = await call_next(request)

    process_time = round((time.time() - start_time) * 1000, 2)

    logger.info(
        f"{request.method} {request.url.path} "
        f"Status={response.status_code} "
        f"Time={process_time}ms"
    )

    return response


@app.exception_handler(Exception)
async def global_exception_handler(
    request: Request,
    exc: Exception
):
    logger.exception(exc)

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal Server Error"
        }
    )


Base.metadata.create_all(bind=engine)


@app.get("/")
def home():

    return {
        "message": "Welcome to Zomato Notes API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

def process_note_background(note_id: int):
    import time

    print(f"Started indexing note {note_id}")

    time.sleep(2)

    logger.info(f"Background indexing completed for Note ID {note_id}")

    print(f"Completed indexing note {note_id}")



@app.get("/db-test")
def db_test():

    with engine.connect() as connection:

        result = connection.execute(text("SELECT 1"))

        return {
            "message": "Database Connected Successfully",
            "result": result.scalar()
        }


@app.get("/health")
def health_check():

    return {
        "status": "healthy",
        "application": "Zomato Notes API",
        "version": "1.0.0"
    }


@app.post("/users", response_model=schemas.UserResponse)
def create_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = crud.get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return crud.create_user(db, user)


# ==========================
# NOTE APIs
# ==========================

@app.post("/notes", response_model=schemas.NoteWithAISuggestion)
def create_note(
    note: schemas.NoteCreate,
    background_tasks: BackgroundTasks,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    result = crud.create_note(
        db,
        note,
        current_user.id
    )

    background_tasks.add_task(
        process_note_background,
        result["note"].id
    )

    return result
@app.get("/notes", response_model=list[schemas.NoteResponse])
def get_notes(
    search: str = None,
    tag: str = None,
    skip: int = 0,
    limit: int = 10,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return crud.get_notes(
        db=db,
        user_id=current_user.id,
        search=search,
        tag=tag,
        skip=skip,
        limit=limit
    )


@app.post(
    "/notes/semantic-search",
    response_model=schemas.SemanticSearchResponse
)
def semantic_search_notes(
    request: schemas.SemanticSearchRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return crud.semantic_search_notes(
        db=db,
        user_id=current_user.id,
        query=request.query
    )



@app.put(
    "/notes/apply-ai-tag",
    response_model=schemas.NoteResponse
)
def apply_ai_tag(

    request: schemas.ApplyAITagRequest,

    current_user: models.User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    note = crud.apply_ai_tag(

        db=db,

        note_id=request.note_id,

        tag=request.tag,

        user_id=current_user.id

    )

    if note is None:

        raise HTTPException(

            status_code=404,

            detail="Note not found"

        )

    return note


@app.get("/notes/{note_id}", response_model=schemas.NoteResponse)
def get_note(
    note_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    note = crud.get_note(
        db,
        note_id,
        current_user.id
    )

    if note is None:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )

    return note


@app.put("/notes/{note_id}", response_model=schemas.NoteResponse)
def update_note(
    note_id: int,
    note: schemas.NoteCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    updated_note = crud.update_note(
        db,
        note_id,
        note,
        current_user.id
    )

    if updated_note is None:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )

    return updated_note


@app.delete("/notes/{note_id}")
def delete_note(
    note_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    deleted_note = crud.delete_note(
        db,
        note_id,
        current_user.id
    )

    if deleted_note is None:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )

    return {
        "message": "Note deleted successfully"
    }


@app.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    authenticated_user = crud.authenticate_user(
        db,
        form_data.username,
        form_data.password
    )

    if authenticated_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    access_token = create_access_token(
        data={"sub": authenticated_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }