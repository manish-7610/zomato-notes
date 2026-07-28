from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text

from database import engine, Base, get_db

import models
import crud
import schemas
from auth import create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm


app = FastAPI(
    title="Zomato Notes API",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "Welcome to Zomato Notes API"
    }


@app.get("/db-test")
def db_test():

    with engine.connect() as connection:

        result = connection.execute(text("SELECT 1"))

        return {
            "message": "Database Connected Successfully",
            "result": result.scalar()
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
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud.create_note(
        db,
        note,
        current_user.id
    )


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