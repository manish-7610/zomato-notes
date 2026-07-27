from sqlalchemy.orm import Session
import models
import schemas
from semantic_search import semantic_search
from ai_service import get_ai_response, SYSTEM_PROMPT
import json
from auth import hash_password

# ==========================
# USER CRUD
# ==========================

def create_user(db: Session, user: schemas.UserCreate):

    db_user = models.User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def authenticate_user(db: Session, email: str, password: str):

    user = get_user_by_email(db, email)

    if not user:
        return None

    from auth import verify_password

    if not verify_password(password, user.password):
        return None

    return user

# ==========================
# NOTE CRUD
# ==========================

def create_note(
    db: Session,
    note: schemas.NoteCreate,
    user_id: int
):

    db_note = models.Note(
        title=note.title,
        content=note.content,
        tag=note.tag,
        owner_id=user_id
    )

    db.add(db_note)
    db.commit()
    db.refresh(db_note)

    ai_suggestion = None

    try:

        ai_response = get_ai_response(
            user_message=note.content,
            system_prompt=SYSTEM_PROMPT
        )

        ai_suggestion = json.loads(ai_response)

    except Exception as e:

        print("AI Error:", e)

        ai_suggestion = None

    return {
        "note": db_note,
        "ai_suggestion": ai_suggestion
    }


def get_notes(
    db: Session,
    user_id: int,
    search: str = None,
    tag: str = None,
    skip: int = 0,
    limit: int = 10
):

    query = db.query(models.Note).filter(
        models.Note.owner_id == user_id
    )

    if search:
        query = query.filter(
            (models.Note.title.contains(search)) |
            (models.Note.content.contains(search))
        )

    if tag:
        query = query.filter(
            models.Note.tag == tag
        )

    return query.offset(skip).limit(limit).all()


def semantic_search_notes(
    db: Session,
    user_id: int,
    query: str
):
    notes = (
        db.query(models.Note)
        .filter(models.Note.owner_id == user_id)
        .all()
    )

    return semantic_search(query, notes)


def get_note(
    db: Session,
    note_id: int,
    user_id: int
):
    return (
        db.query(models.Note)
        .filter(
            models.Note.id == note_id,
            models.Note.owner_id == user_id
        )
        .first()
    )



def update_note(
    db: Session,
    note_id: int,
    note: schemas.NoteCreate,
    user_id: int
):

    db_note = get_note(
        db,
        note_id,
        user_id
    )

    if db_note is None:
        return None

    db_note.title = note.title
    db_note.content = note.content
    db_note.tag = note.tag

    db.commit()
    db.refresh(db_note)

    return db_note


def delete_note(
    db: Session,
    note_id: int,
    user_id: int
):

    db_note = get_note(
        db,
        note_id,
        user_id
    )

    if db_note is None:
        return None

    db.delete(db_note)
    db.commit()

    return db_note



def apply_ai_tag(
    db: Session,
    note_id: int,
    tag: str,
    user_id: int
):

    note = (
        db.query(models.Note)
        .filter(
            models.Note.id == note_id,
            models.Note.owner_id == user_id
        )
        .first()
    )

    if note is None:
        return None

    note.tag = tag

    db.commit()
    db.refresh(note)

    return note