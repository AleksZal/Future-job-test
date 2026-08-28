from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import get_db
from auth import create_access_token, get_current_applicant

router = APIRouter(prefix="/api/applicant", tags=["Applicant"])

@router.post(
    "/register", 
    response_model=schemas.ApplicantResponse,
    summary="Register a new applicant",
    response_description="Returns the created or existing applicant data with JWT token"
)
def register_applicant(applicant: schemas.ApplicantCreate, db: Session = Depends(get_db)):
    db_applicant = db.query(models.Applicant).filter(models.Applicant.phone_number == applicant.phone_number).first()
    
    if db_applicant:
        # User exists, just generate a new token
        access_token = create_access_token(data={"sub": db_applicant.id})
        return schemas.ApplicantResponse(token=access_token)
    
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
    
    access_token = create_access_token(data={"sub": new_applicant.id})
    return schemas.ApplicantResponse(token=access_token)

@router.patch(
    "/non-graduate/test-results",
    summary="Update test results for non-graduates",
    response_description="Returns success status"
)
def update_non_graduate_scores(scores: schemas.NonGraduateScoreUpdate, applicant: models.Applicant = Depends(get_current_applicant), db: Session = Depends(get_db)):
    applicant.activity_score = scores.activity_score
    applicant.social_score = scores.social_score
    applicant.emotional_stability_score = scores.emotional_stability_score
    applicant.structure_score = scores.structure_score
    applicant.leadership_score = scores.leadership_score
    applicant.has_completed_test = True
    db.commit()
    return {"success": True}

@router.patch(
    "/graduate/test-results",
    summary="Update test results for graduates (includes subjects)",
    response_description="Returns success status"
)
def update_graduate_scores(scores: schemas.GraduateScoreUpdate, applicant: models.Applicant = Depends(get_current_applicant), db: Session = Depends(get_db)):
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

@router.get(
    "/test-results", 
    response_model=schemas.TestResultsResponse,
    summary="Get calculated job test results",
    response_description="Returns traits for score calculation"
)
def get_test_results(applicant: models.Applicant = Depends(get_current_applicant)):
    if not applicant.has_completed_test:
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
