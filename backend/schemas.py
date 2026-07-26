from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime


# ==========================
# USER SCHEMAS
# ==========================

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=8)

    @field_validator("name")
    @classmethod
    def validate_name(cls, value):
        if not value.strip():
            raise ValueError("Name cannot be empty")
        return value


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


# ==========================
# NOTE SCHEMAS
# ==========================

class NoteCreate(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    content: str = Field(min_length=1)
    tag: str
    owner_id: int


class NoteUpdate(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    content: str = Field(min_length=1)
    tag: str


class NoteResponse(BaseModel):
    id: int
    title: str
    content: str
    tag: str
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True