from database import SessionLocal
import models
from auth import hash_password

db = SessionLocal()

user = models.User(
    name="Demo User",
    email="demo@example.com",
    password=hash_password("12345678")
)

db.add(user)
db.commit()
db.refresh(user)

notes = [

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

db.add_all(notes)

db.commit()

print("Sample data inserted successfully.")