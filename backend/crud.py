from sqlalchemy.orm import Session
import models
import schemas


# ==========================
# USER CRUD
# ==========================

def create_user(db: Session, user: schemas.UserCreate):

    db_user = models.User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


# ==========================
# NOTE CRUD
# ==========================

def create_note(db: Session, note: schemas.NoteCreate):

    db_note = models.Note(
        title=note.title,
        content=note.content,
        tag=note.tag,
        owner_id=note.owner_id
    )

    db.add(db_note)
    db.commit()
    db.refresh(db_note)

    return db_note


def get_notes(db: Session):
    return db.query(models.Note).all()


def get_note(db: Session, note_id: int):
    return db.query(models.Note).filter(models.Note.id == note_id).first()


def update_note(db: Session, note_id: int, note: schemas.NoteCreate):

    db_note = get_note(db, note_id)

    if db_note is None:
        return None

    db_note.title = note.title
    db_note.content = note.content
    db_note.tag = note.tag
    db_note.owner_id = note.owner_id

    db.commit()
    db.refresh(db_note)

    return db_note


def delete_note(db: Session, note_id: int):

    db_note = get_note(db, note_id)

    if db_note is None:
        return None

    db.delete(db_note)
    db.commit()

    return db_note