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

@router.patch("/non-graduate/test-results/{applicant_id}")
def update_non_graduate_scores(applicant_id: int, scores: schemas.NonGraduateScoreUpdate, db: Session = Depends(get_db)):
    applicant = db.query(models.Applicant).filter(models.Applicant.id == applicant_id).first()
    if applicant:
        applicant.activity_score = scores.activity_score
        applicant.social_score = scores.social_score
        applicant.emotional_stability_score = scores.emotional_stability_score
        applicant.structure_score = scores.structure_score
        applicant.leadership_score = scores.leadership_score
        applicant.has_completed_test = True
        db.commit()
    return {"success": True}

@router.patch("/graduate/test-results/{applicant_id}")
def update_graduate_scores(applicant_id: int, scores: schemas.GraduateScoreUpdate, db: Session = Depends(get_db)):
    applicant = db.query(models.Applicant).filter(models.Applicant.id == applicant_id).first()
    if applicant:
        applicant.activity_score = scores.activity_score
        applicant.social_score = scores.social_score
        applicant.emotional_stability_score = scores.emotional_stability_score
        applicant.structure_score = scores.structure_score
        applicant.leadership_score = scores.leadership_score
        applicant.math_score = scores.math_score
        applicant.physics_score = scores.physics_score
        applicant.has_completed_test = True
        db.commit()
    return {"success": True}

@router.get("/test-results/{applicant_id}", response_model=schemas.TestResultsResponse)
def get_test_results(applicant_id: int, db: Session = Depends(get_db)):
    applicant = db.query(models.Applicant).filter(models.Applicant.id == applicant_id).first()
    if not applicant or not applicant.has_completed_test:
        return {"success": False, "score": {
            "activityScore": 0, "socialScore": 0,
            "emotionalStabilityScore": 0, "structureScore": 0, "leadershipScore": 0
        }}
    
    score = schemas.JobScore(
        activityScore=float(applicant.activity_score or 0),
        socialScore=float(applicant.social_score or 0),
        emotionalStabilityScore=float(applicant.emotional_stability_score or 0),
        structureScore=float(applicant.structure_score or 0),
        leadershipScore=float(applicant.leadership_score or 0)
    )
    return schemas.TestResultsResponse(success=True, score=score)
