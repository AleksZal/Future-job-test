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
    
    return normalize_scores(scores)

def normalize_scores(scores: dict[str, float]) -> dict[str, float]:
    if not scores:
        return {}
    
    min_score = min(scores.values())
    max_score = max(scores.values())
    
    if min_score == max_score:
        return {job: 1.0 for job in scores}
    
    return {
        job: (score - min_score) / (max_score - min_score)
        for job, score in scores.items()
    }

def get_top_job(scores: dict[str, float]) -> str:
    """Returns the job with the highest score."""
    if not scores:
        return ""
    return max(scores.items(), key=lambda x: x[1])[0]

JOB_WEIGHTS = {
    "Backend": [1, -2, 1, 3, 0],
    "Frontend": [2, 1, 0, -1, 0],
    "QA": [-1, 0, 1, 4, -1],
    "DevOps": [1, -1, 3, 2, 1],
    "Data-Science": [1, -2, 2, 1, -1],
    "Data-Engineering": [0, -1, 2, 3, 0],
    "Business-Analysis": [0, 3, 0, -1, 2],
    "Project-Management": [1, 3, 2, 0, 3]
}
