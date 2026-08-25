import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { weights } from '../data/weights';
import { API_BASE } from '../config';
import '../styles/results.css';

const jobDescriptions = {
  Frontend: 'Створює користувацькі інтерфейси та взаємодію з ними.',
  Backend: 'Розробляє серверну логіку, бази даних та API.',
  QA: 'Ви уважні до деталей і методичні. QA — це роль, де ваша точність стає ключовою перевагою команди.',
  DevOps: 'Автоматизує процеси розгортання та керує інфраструктурою.',
  'Data-Science': 'Аналізує великі дані та будує модели штучного інтелекту.',
  'Data-Engineering': 'Створює надійні конвеєри обробки великих даних.',
  'Business-Analysis': 'Перетворює бізнес-потреби на технічні вимоги.',
  'Project-Management': 'Керує командами для досягнення цілей проекту.'
};

const kpiMapping = {
  'QA': { specialty: "122: Комп'ютерні науки, системне проєктування та штучний інтелект", depts: ["СП: Кафедра системного проектування", "ШІ: Кафедра штучного інтелекту"] },
  'Frontend': { specialty: "122: Комп'ютерні науки, системне проєктування та штучний інтелект", depts: ["СП: Кафедра системного проектування", "ШІ: Кафедра штучного інтелекту"] },
  'Backend': { specialty: "122: Комп'ютерні науки, системне проєктування та штучний інтелект", depts: ["СП: Кафедра системного проектування", "ШІ: Кафедра штучного інтелекту"] },
  'DevOps': { specialty: "122: Комп'ютерні науки, системне проєктування та штучний інтелект", depts: ["СП: Кафедра системного проектування"] },
  'Data-Science': { specialty: "124: Системний аналіз", depts: ["ММСА: Кафедра математичних методів системного аналізу", "САТР: Кафедра системного аналізу та теорії рішень"] },
  'Data-Engineering': { specialty: "124: Системний аналіз", depts: ["ММСА: Кафедра математичних методів системного аналізу"] },
  'Business-Analysis': { specialty: "124: Системний аналіз", depts: ["САТР: Кафедра системного аналізу та теорії рішень"] },
  'Project-Management': { specialty: "124: Системний аналіз", depts: ["САТР: Кафедра системного аналізу та теорії рішень"] }
};

export default function Results() {
  const [jobs, setJobs] = useState([]);
  const [animatedScores, setAnimatedScores] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const applicantId = localStorage.getItem('applicantId');
      let scoreData = JSON.parse(localStorage.getItem('testScores') || '{}');

      if (applicantId) {
        try {
          const res = await fetch(`${API_BASE}/api/applicant/test-results/${applicantId}`);
          if (!res.ok) throw new Error('Network response was not ok');
          const data = await res.json();
          if (data.success && data.score) {
            scoreData = data.score;
          } else {
            setErrorMsg('Could not fetch latest results from server. Showing local results.');
          }
        } catch (e) {
          console.error(e);
          setErrorMsg('Could not connect to server. Showing local results.');
        }
      }

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

      const range = maxScore - minScore || 1;
      const normalized = computed.map(j => ({
        ...j,
        score: Math.round(((j.rawScore - minScore) / range) * 100)
      })).sort((a, b) => b.score - a.score);

      setJobs(normalized);
      
      setTimeout(() => {
        setAnimatedScores(normalized.map(job => job.score));
      }, 100);
    };

    fetchResults();
  }, []);

  if (jobs.length === 0) return <div>Loading...</div>;

  const winner = jobs[0];
  const winnerName = winner.name.replace('-', ' ');
  const kpiInfo = kpiMapping[winner.name] || kpiMapping['QA'];

  return (
    <div className="results-container">
      <Card className="results-card">
        {errorMsg && <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: 'var(--warning)', color: 'black', borderRadius: 'var(--radius-sm)' }}>{errorMsg}</div>}
        
        <div className="winner-section">
          <div className="winner-badge">
            <span className="winner-badge-dot"></span>
            НАЙКРАЩИЙ ЗБІГ
          </div>
          
          <div className="winner-title">{winnerName}</div>
          
          <div className="winner-score-row">
            <div className="winner-score">{winner.score}%</div>
            <div className="winner-score-label">відповідність профілю</div>
          </div>
          
          <div className="winner-divider"></div>
          
          <p className="winner-desc">{winner.desc}</p>

          <div className="kpi-section">
            <div className="kpi-label">СПЕЦІАЛЬНІСТЬ</div>
            <div className="kpi-pill"><strong>{kpiInfo.specialty.split(':')[0]}:</strong>{kpiInfo.specialty.split(':')[1]}</div>
            
            <div className="kpi-label">КАФЕДРА</div>
            <div className="kpi-dept-group">
              {kpiInfo.depts.map((dept, i) => (
                <div key={i} className="kpi-pill" style={{ marginBottom: i === kpiInfo.depts.length - 1 ? 0 : '0.5rem' }}>
                  <strong>{dept.split(':')[0]}:</strong>{dept.split(':')[1]}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="jobs-list">
          {jobs.map((job, idx) => (
            <div key={idx} className="job-item">
              <div className="job-name">{job.name.replace('-', ' ')}</div>
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

