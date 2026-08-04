import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import '../styles/results.css';

// Mock data
const mockJobs = [
  { name: 'Frontend', score: 100, desc: 'Creates the user interface and interactions.' },
  { name: 'Backend', score: 85, desc: 'Builds server logic and databases.' },
  { name: 'QA', score: 60, desc: 'Ensures software quality.' },
  { name: 'DevOps', score: 45, desc: 'Automates deployment and operations.' },
];

export default function Results() {
  const winner = mockJobs[0];
  const [animatedScores, setAnimatedScores] = useState(mockJobs.map(() => 0));

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => {
      setAnimatedScores(mockJobs.map(job => job.score));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
          {mockJobs.map((job, idx) => (
            <div key={idx} className="job-item">
              <div className="job-name">{job.name}</div>
              <div className="job-bar-container">
                <div 
                  className="job-bar" 
                  style={{ 
                    width: `${animatedScores[idx]}%`,
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

