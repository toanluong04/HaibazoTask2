from pydantic import BaseModel

class AuthorCreate(BaseModel):
    name: str

class AuthorResponse(BaseModel):
    id: int
    name: str
    book_count: int = 0
    class Config: from_attributes = True

class BookCreate(BaseModel):
    title: str
    author_id: int

class BookResponse(BaseModel):
    id: int
    title: str
    author_id: int
    author_name: str = ""
    class Config: from_attributes = True

class ReviewCreate(BaseModel):
    review_text: str
    book_id: int

class ReviewResponse(BaseModel):
    id: int
    review_text: str
    book_id: int
    book_title: str = ""
    author_name: str = ""
    class Config: from_attributes = True