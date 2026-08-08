import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { weights } from '../data/weights';
import { API_BASE } from '../config';
import '../styles/results.css';

const jobDescriptions = {
  Frontend: 'Creates the user interface and interactions.',
  Backend: 'Builds server logic and databases.',
  QA: 'Ensures software quality.',
  DevOps: 'Automates deployment and operations.',
  'Data-Science': 'Extracts insights from data.',
  'Data-Engineering': 'Builds data pipelines.',
  'Business-Analysis': 'Translates needs into tech solutions.',
  'Project-Management': 'Leads teams to deliver projects.'
};

export default function Results() {
  const [jobs, setJobs] = useState([]);
  const [animatedScores, setAnimatedScores] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const applicantId = localStorage.getItem('applicantId');
      let scoreData = JSON.parse(localStorage.getItem('testScores') || '{}');

      if (applicantId) {
        try {
          const res = await fetch(`${API_BASE}/api/applicant/test-results/${applicantId}`);
          const data = await res.json();
          if (data.success && data.score) {
            scoreData = data.score;
          }
        } catch (e) {
          console.error(e);
        }
      }

      // Compute job scores
      let maxScore = -Infinity;
      let minScore = Infinity;
      const computed = Object.keys(weights).map(jobName => {
        const w = weights[jobName];
        const score = 
          (w.activity * (scoreData.activityScore || scoreData.activity || 0)) +
          (w.social * (scoreData.socialScore || scoreData.social || 0)) +
          (w.emotionalStability * (scoreData.emotionalStabilityScore || scoreData.emotionalStability || 0)) +
          (w.structure * (scoreData.structureScore || scoreData.structure || 0)) +
          (w.leadership * (scoreData.leadershipScore || scoreData.leadership || 0));
        
        if (score > maxScore) maxScore = score;
        if (score < minScore) minScore = score;

        return { name: jobName, rawScore: score, desc: jobDescriptions[jobName] };
      });

      // Normalize to 0-100
      const range = maxScore - minScore || 1;
      const normalized = computed.map(j => ({
        ...j,
        score: Math.round(((j.rawScore - minScore) / range) * 100)
      })).sort((a, b) => b.score - a.score);

      setJobs(normalized);
      
      // Trigger animation
      setTimeout(() => {
        setAnimatedScores(normalized.map(job => job.score));
      }, 100);
    };

    fetchResults();
  }, []);

  if (jobs.length === 0) return <div>Loading...</div>;

  const winner = jobs[0];

  return (
    <div className="results-container">
      <Card className="results-card">
        <div className="results-header">
          <h2>Your Ideal Career Path</h2>
          <p>Based on your psychometric profile, here are our recommendations.</p>
        </div>

        <div className="winner-section">
          <h3>Top Match</h3>
          <div className="winner-title">{winner.name}</div>
          <p className="winner-desc">{winner.desc}</p>
        </div>

        <div className="jobs-list">
          {jobs.map((job, idx) => (
            <div key={idx} className="job-item">
              <div className="job-name">{job.name}</div>
              <div className="job-bar-container">
                <div 
                  className="job-bar" 
                  style={{ 
                    width: `${animatedScores[idx] || 0}%`,
                    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' 
                  }}
                ></div>
              </div>
              <div className="job-score">{job.score}%</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

