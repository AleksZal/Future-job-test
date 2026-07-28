from pydantic import BaseModel, Field
from typing import Optional

class ApplicantBase(BaseModel):
    full_name: str = Field(alias="applicantFullName")
    phone_number: str = Field(alias="applicantPhoneNumber")
    date_of_birth: Optional[str] = Field(None, alias="applicantDateOfBirth")
    city: Optional[str] = Field(None, alias="applicantCity")
    school: Optional[str] = Field(None, alias="applicantSchool")
    studying_status: Optional[str] = Field(None, alias="applicantStudyingStatus")

class ApplicantCreate(ApplicantBase):
    pass

class ApplicantResponse(ApplicantBase):
    id: int
    has_completed_test: bool
    is_phone_number_valid: bool
    
    class Config:
        populate_by_name = True
        from_attributes = True

class NonGraduateScoreUpdate(BaseModel):
    activity_score: float = Field(alias="activityScore")
    social_score: float = Field(alias="socialScore")
    emotional_stability_score: float = Field(alias="emotionalStabilityScore")
    structure_score: float = Field(alias="structureScore")
    leadership_score: float = Field(alias="leadershipScore")

class GraduateScoreUpdate(NonGraduateScoreUpdate):
    math_score: int = Field(alias="mathScore")
    physics_score: int = Field(alias="physicsScore")

class JobScore(BaseModel):
    activityScore: float
    socialScore: float
    emotionalStabilityScore: float
    structureScore: float
    leadershipScore: float

class TestResultsResponse(BaseModel):
    success: bool
    score: JobScore
