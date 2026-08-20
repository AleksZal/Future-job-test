from server.database import SessionLocal, engine
from server import models

def seed_data():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    applicant1 = models.Applicant(
        full_name="Alice Smith",
        phone_number="+380111111111",
        city="Kyiv",
        school="School 42",
        studying_status="Graduated",
        has_completed_test=True,
        activity_score=1.0,
        social_score=0.5,
        emotional_stability_score=1.0,
        structure_score=0.0,
        leadership_score=-1.0,
        math_score=10,
        physics_score=9
    )
    
    db.add(applicant1)
    db.commit()
    print("Test data seeded.")
    db.close()

if __name__ == "__main__":
    seed_data()
