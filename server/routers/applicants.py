from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/applicant", tags=["Applicant"])

@router.post("/register", response_model=schemas.ApplicantResponse)
def register_applicant(applicant: schemas.ApplicantCreate, db: Session = Depends(get_db)):
    db_applicant = db.query(models.Applicant).filter(models.Applicant.phone_number == applicant.phone_number).first()
    if db_applicant:
        # Update existing applicant details on re-registration if needed, or just return existing
        return db_applicant
    
    new_applicant = models.Applicant(
        full_name=applicant.full_name,
        phone_number=applicant.phone_number,
        date_of_birth=applicant.date_of_birth,
        city=applicant.city,
        school=applicant.school,
        studying_status=applicant.studying_status,
        is_phone_number_valid=False
    )
    db.add(new_applicant)
    db.commit()
    db.refresh(new_applicant)
    return new_applicant
