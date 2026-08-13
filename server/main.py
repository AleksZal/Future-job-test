from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import applicants
from .database import engine
from . import models
from .config import settings

# Create all tables (in a real app, use alembic)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Applicant Test API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(applicants.router)

@app.get("/api")
def read_root():
    return {"message": "API is working."}
