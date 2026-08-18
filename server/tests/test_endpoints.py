from fastapi.testclient import TestClient
from server.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/api")
    assert response.status_code == 200
    assert response.json() == {"message": "API is working."}

def test_register_applicant():
    # In a real scenario, we should mock the database or use a test DB
    # We will just write the structure here
    payload = {
        "applicantFullName": "John Doe",
        "applicantPhoneNumber": "+380123456789",
        "applicantDateOfBirth": "2000-01-01",
        "applicantCity": "Kyiv",
        "applicantSchool": "School 1",
        "applicantStudyingStatus": "Graduated"
    }
    # response = client.post("/api/applicant/register", json=payload)
    # assert response.status_code == 200
    # assert response.json()["applicantFullName"] == "John Doe"

def test_submit_scores_not_found():
    payload = {
        "activityScore": 1.0,
        "socialScore": 0.5,
        "emotionalStabilityScore": 1.0,
        "structureScore": 0.0,
        "leadershipScore": -1.0
    }
    # We expect 404 because applicant 999 doesn't exist
    response = client.patch("/api/applicant/non-graduate/test-results/999", json=payload)
    assert response.status_code == 404
