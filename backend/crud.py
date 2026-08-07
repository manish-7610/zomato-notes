from sqlalchemy.orm import Session
from sqlalchemy import func, text
import models
import schemas
from semantic_search import semantic_search
from ai_service import get_ai_response, SYSTEM_PROMPT
import json
from auth import hash_password, verify_password
from logger import logger

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


def update_profile(db: Session, user_id: int, data: schemas.ProfileUpdate):

    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        return None

    user.name = data.name
    user.email = data.email

    db.commit()
    db.refresh(user)

    return user


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def authenticate_user(db: Session, email: str, password: str):

    user = get_user_by_email(db, email)

    if not user:
        return None

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

        logger.error(f"AI Error: {e}")

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
    limit: int = 100000
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

    search_results = semantic_search(
        query=query,
        notes=notes,
        top_k=5,
        threshold=0.30
    )

    return {
        "results": search_results
    }



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



def create_note_bulk(
    db: Session,
    notes: list,
    user_id: int
):
    """
    Insert multiple notes in a single DB commit.
    Used by the import endpoint only.
    No AI call — assignment requires AI only on single POST /notes.
    Returns count of inserted notes.
    """
    db_notes = [
        models.Note(
            title=note.title,
            content=note.content,
            tag=note.tag,
            owner_id=user_id
        )
        for note in notes
    ]

    db.add_all(db_notes)
    db.commit()

    return len(db_notes)


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







def tag_summary(db: Session, user_id: int):
    """
    Raw SQL with GROUP BY and HAVING COUNT(*) > 1
    as required by the assignment.
    Returns only tags that have more than 1 note.
    """
    result = db.execute(
        text("""
            SELECT tag, COUNT(*) AS count
            FROM notes
            WHERE owner_id = :user_id
            GROUP BY tag
            HAVING COUNT(*) > 1
        """),
        {"user_id": user_id}
    )
    return [{"tag": row[0], "count": row[1]} for row in result]


def user_notes_count(db: Session, user_id: int):
    """
    Raw SQL JOIN between users and notes as required by the assignment.
    Returns each user alongside their total note count.
    """
    result = db.execute(
        text("""
            SELECT u.id, u.name, u.email, COUNT(n.id) AS note_count
            FROM users u
            LEFT JOIN notes n ON u.id = n.owner_id
            WHERE u.id = :user_id
            GROUP BY u.id, u.name, u.email
        """),
        {"user_id": user_id}
    )
    row = result.fetchone()
    if row:
        return row[3]
    return 0


def long_notes(db: Session, user_id: int):
    """
    Raw SQL with subquery to return notes whose content length
    is above the average content length — as required by the assignment.
    """
    result = db.execute(
        text("""
            SELECT id, title, content, tag, owner_id, created_at
            FROM notes
            WHERE owner_id = :user_id
            AND LENGTH(content) > (
                SELECT AVG(LENGTH(content))
                FROM notes
                WHERE owner_id = :user_id
            )
        """),
        {"user_id": user_id}
    )
    rows = result.fetchall()
    return [
        {
            "id": row[0],
            "title": row[1],
            "content": row[2],
            "tag": row[3],
            "owner_id": row[4],
            "created_at": row[5]
        }
        for row in rows
    ]