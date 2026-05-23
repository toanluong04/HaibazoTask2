from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

# --- AUTHORS ---
@app.get("/api/authors", response_model=List[schemas.AuthorResponse])
def get_authors(db: Session = Depends(get_db)):
    # Direct dictionary mapping avoids Pydantic versioning errors
    return [
        schemas.AuthorResponse(id=a.id, name=a.name, book_count=len(a.books)) 
        for a in db.query(models.Author).all()
    ]

@app.post("/api/authors", response_model=schemas.AuthorResponse)
def add_author(author: schemas.AuthorCreate, db: Session = Depends(get_db)):
    if db.query(models.Author).filter(models.Author.name == author.name).first():
        raise HTTPException(status_code=400, detail="Exists")
    new_author = models.Author(name=author.name)
    db.add(new_author)
    db.commit()
    db.refresh(new_author)
    return schemas.AuthorResponse(id=new_author.id, name=new_author.name, book_count=0)

@app.put("/api/authors/{id}", response_model=schemas.AuthorResponse)
def update_author(id: int, author_in: schemas.AuthorCreate, db: Session = Depends(get_db)):
    author = db.query(models.Author).filter(models.Author.id == id).first()
    author.name = author_in.name
    db.commit()
    db.refresh(author)
    return schemas.AuthorResponse(id=author.id, name=author.name, book_count=len(author.books))

@app.delete("/api/authors/{id}")
def delete_author(id: int, db: Session = Depends(get_db)):
    author = db.query(models.Author).filter(models.Author.id == id).first()
    db.delete(author)
    db.commit()

# --- BOOKS ---
@app.get("/api/books", response_model=List[schemas.BookResponse])
def get_books(db: Session = Depends(get_db)):
    return [
        schemas.BookResponse(
            id=b.id, title=b.title, author_id=b.author_id, 
            author_name=b.author.name if b.author else "Unknown"
        ) for b in db.query(models.Book).all()
    ]

@app.post("/api/books", response_model=schemas.BookResponse)
def add_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    new_book = models.Book(title=book.title, author_id=book.author_id)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    author_name = db.query(models.Author).filter(models.Author.id == book.author_id).first().name
    return schemas.BookResponse(id=new_book.id, title=new_book.title, author_id=new_book.author_id, author_name=author_name)

@app.put("/api/books/{id}", response_model=schemas.BookResponse)
def update_book(id: int, book_in: schemas.BookCreate, db: Session = Depends(get_db)):
    book = db.query(models.Book).filter(models.Book.id == id).first()
    book.title = book_in.title
    book.author_id = book_in.author_id
    db.commit()
    db.refresh(book)
    return schemas.BookResponse(id=book.id, title=book.title, author_id=book.author_id, author_name=book.author.name)

@app.delete("/api/books/{id}")
def delete_book(id: int, db: Session = Depends(get_db)):
    book = db.query(models.Book).filter(models.Book.id == id).first()
    db.delete(book)
    db.commit()

# --- REVIEWS ---
@app.get("/api/reviews", response_model=List[schemas.ReviewResponse])
def get_reviews(db: Session = Depends(get_db)):
    return [
        schemas.ReviewResponse(
            id=r.id, review_text=r.review_text, book_id=r.book_id,
            book_title=r.book.title if r.book else "Unknown",
            author_name=r.book.author.name if r.book and r.book.author else "Unknown"
        ) for r in db.query(models.Review).all()
    ]

@app.post("/api/reviews", response_model=schemas.ReviewResponse)
def add_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    new_review = models.Review(review_text=review.review_text, book_id=review.book_id)
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return schemas.ReviewResponse(
        id=new_review.id, review_text=new_review.review_text, book_id=new_review.book_id,
        book_title=new_review.book.title, author_name=new_review.book.author.name
    )

@app.put("/api/reviews/{id}", response_model=schemas.ReviewResponse)
def update_review(id: int, review_in: schemas.ReviewCreate, db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == id).first()
    review.review_text = review_in.review_text
    review.book_id = review_in.book_id
    db.commit()
    db.refresh(review)
    return schemas.ReviewResponse(
        id=review.id, review_text=review.review_text, book_id=review.book_id,
        book_title=review.book.title, author_name=review.book.author.name
    )

@app.delete("/api/reviews/{id}")
def delete_review(id: int, db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == id).first()
    db.delete(review)
    db.commit()