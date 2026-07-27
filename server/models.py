from sqlalchemy import Column, Integer, String, Boolean, Numeric
from .database import Base

class Applicant(Base):
    __tablename__ = "applicants"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_name = Column(String, nullable=False)
    phone_number = Column(String, nullable=False, unique=True, index=True)
    is_phone_number_valid = Column(Boolean, default=False)
    date_of_birth = Column(String, nullable=True)
    city = Column(String, nullable=True)
    school = Column(String, nullable=True)
    studying_status = Column(String, nullable=True)
    has_completed_test = Column(Boolean, default=False)
    
    # Psychometric trait scores
    activity_score = Column(Numeric(3, 1), nullable=True)
    social_score = Column(Numeric(3, 1), nullable=True)
    emotional_stability_score = Column(Numeric(3, 1), nullable=True)
    structure_score = Column(Numeric(3, 1), nullable=True)
    leadership_score = Column(Numeric(3, 1), nullable=True)
    
    # Graduate subject scores
    math_score = Column(Integer, nullable=True)
    physics_score = Column(Integer, nullable=True)
