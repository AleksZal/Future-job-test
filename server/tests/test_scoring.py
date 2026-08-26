import pytest
from server.services.scoring import calculate_job_scores, get_top_job, JOB_WEIGHTS

def test_calculate_job_scores():
    # Example traits: [activity, social, emotional_stability, structure, leadership]
    traits = [1.0, 1.0, 1.0, 1.0, 1.0]
    scores = calculate_job_scores(traits, JOB_WEIGHTS)
    
    # Min raw score is 1.0 (Data-Science), Max raw score is 9.0 (Project-Management)
    # Normalized = (raw - min) / (max - min)
    # Backend raw = 3 -> (3 - 1) / 8 = 0.25
    assert scores["Backend"] == 0.25
    
    # QA raw = 3 -> 0.25
    assert scores["QA"] == 0.25
    
    # Project-Management raw = 9 -> 1.0
    assert scores["Project-Management"] == 1.0

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
