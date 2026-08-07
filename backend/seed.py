from database import SessionLocal
import models
from auth import hash_password
from ai_sample_notes import AI_SAMPLE_NOTES

db = SessionLocal()

# -----------------------------------------------
# Seed demo user (skip if already exists)
# -----------------------------------------------

user = db.query(models.User).filter(
    models.User.email == "demo@example.com"
).first()

if not user:
    user = models.User(
        name="Demo User",
        email="demo@example.com",
        password=hash_password("12345678")
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    print("Demo user created.")
else:
    print("Demo user already exists, skipping.")

# -----------------------------------------------
# Seed demo notes (skip if already exist)
# -----------------------------------------------

demo_notes = [

    models.Note(
        title="Python Basics",
        content="Variables, loops and functions",
        tag="Programming",
        owner_id=user.id
    ),

    models.Note(
        title="Shopping List",
        content="Milk Bread Eggs Butter",
        tag="Personal",
        owner_id=user.id
    ),

    models.Note(
        title="College Assignment",
        content="Complete FastAPI Project",
        tag="College",
        owner_id=user.id
    ),

    models.Note(
        title="Workout",
        content="Pushups Squats Running",
        tag="Health",
        owner_id=user.id
    )

]

existing_titles = {
    n.title for n in db.query(models.Note)
    .filter(models.Note.owner_id == user.id)
    .all()
}

new_demo_notes = [
    n for n in demo_notes
    if n.title not in existing_titles
]

if new_demo_notes:
    db.add_all(new_demo_notes)
    db.commit()
    print(f"{len(new_demo_notes)} demo note(s) inserted.")
else:
    print("Demo notes already exist, skipping.")

# -----------------------------------------------
# Seed AI_SAMPLE_NOTES for demo user, tag="ai-demo"
# Assignment: Part 3 — seed via seed.py, tag="ai-demo"
# Uses the demo user resolved above (not a hardcoded id)
# -----------------------------------------------

user2 = user

existing_ai_titles = {
    n.title for n in db.query(models.Note)
    .filter(
        models.Note.owner_id == user2.id,
        models.Note.tag == "ai-demo"
    )
    .all()
}

ai_notes_to_insert = [
    models.Note(
        title=note["title"],
        content=note["content"],
        tag="ai-demo",
        owner_id=user2.id
    )
    for note in AI_SAMPLE_NOTES
    if note["title"] not in existing_ai_titles
]

if ai_notes_to_insert:
    db.add_all(ai_notes_to_insert)
    db.commit()
    print(f"{len(ai_notes_to_insert)} AI sample note(s) inserted for owner_id={user2.id}.")
else:
    print("AI sample notes already exist, skipping.")

db.close()
print("Seeding complete.")