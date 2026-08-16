import pytest
from server.services.scoring import calculate_job_scores, get_top_job, JOB_WEIGHTS

def test_calculate_job_scores():
    # Example traits: [activity, social, emotional_stability, structure, leadership]
    traits = [1.0, 1.0, 1.0, 1.0, 1.0]
    scores = calculate_job_scores(traits, JOB_WEIGHTS)
    
    # Backend = 1 - 2 + 1 + 3 + 0 = 3
    assert scores["Backend"] == 3.0
    
    # QA = -1 + 0 + 1 + 4 - 1 = 3
    assert scores["QA"] == 3.0
    
    # Project-Management = 1 + 3 + 2 + 0 + 3 = 9
    assert scores["Project-Management"] == 9.0

def test_get_top_job():
    scores = {
        "Backend": 3.0,
        "QA": 3.0,
        "Project-Management": 9.0,
        "Data-Science": 1.0
    }
    top_job = get_top_job(scores)
    assert top_job == "Project-Management"

def test_calculate_job_scores_length_mismatch():
    traits = [1.0, 1.0] # Only 2 traits
    with pytest.raises(ValueError, match="Traits and weights length mismatch"):
        calculate_job_scores(traits, JOB_WEIGHTS)
