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

class ApplicantResponse(BaseModel):
    token: str

class NonGraduateScoreUpdate(BaseModel):
    activity_score: float = Field(alias="activityScore", ge=-3.0, le=3.0)
    social_score: float = Field(alias="socialScore", ge=-3.0, le=3.0)
    emotional_stability_score: float = Field(alias="emotionalStabilityScore", ge=-3.0, le=3.0)
    structure_score: float = Field(alias="structureScore", ge=-3.0, le=3.0)
    leadership_score: float = Field(alias="leadershipScore", ge=-3.0, le=3.0)

class GraduateScoreUpdate(NonGraduateScoreUpdate):
    math_score: int = Field(alias="mathScore", ge=0, le=200)
    physics_score: int = Field(alias="physicsScore", ge=0, le=200)

class JobScore(BaseModel):
    activityScore: float
    socialScore: float
    emotionalStabilityScore: float
    structureScore: float
    leadershipScore: float

class TestResultsResponse(BaseModel):
    success: bool
    score: JobScore
