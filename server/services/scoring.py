def calculate_job_scores(traits: list[float], weight_matrix: dict[str, list[float]]) -> dict[str, float]:
    """
    Calculate the dot product of applicant traits against a matrix of job weights.
    traits order: [activity, social, emotional_stability, structure, leadership]
    """
    scores = {}
    for job, weights in weight_matrix.items():
        if len(traits) != len(weights):
            raise ValueError("Traits and weights length mismatch")
        
        score = sum(t * w for t, w in zip(traits, weights))
        scores[job] = score
    
    return scores

def get_top_job(scores: dict[str, float]) -> str:
    """Returns the job with the highest score."""
    if not scores:
        return ""
    return max(scores.items(), key=lambda x: x[1])[0]
