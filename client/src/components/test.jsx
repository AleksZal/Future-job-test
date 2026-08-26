import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { questionsAndAnswers } from '../data/questionsAndAnswers';
import '../styles/test.css';

export default function Test() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const [scores, setScores] = useState({
    activity: 0, social: 0, emotionalStability: 0, structure: 0, leadership: 0, math: 0, physics: 0
  });
  const [subjectInput, setSubjectInput] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  
  const isGraduate = localStorage.getItem('studyingStatus') === 'Graduated';
  const questions = isGraduate ? questionsAndAnswers.graduate : questionsAndAnswers.nonGraduate;
  const total = questions.length;
  const currentQ = questions[currentIdx];

  const proceed = async (updatedScores = scores) => {
    if (currentIdx < total - 1) {
      setCurrentIdx(currentIdx + 1);
      setFocusedIdx(-1);
      setSubjectInput('');
      setErrorMsg(null);
    } else {
      const applicantId = localStorage.getItem('applicantId');
      if (applicantId) {
        const endpoint = isGraduate ? `/api/applicant/graduate/test-results/${applicantId}` : `/api/applicant/non-graduate/test-results/${applicantId}`;
        try {
          const { API_BASE } = await import('../config');
          const res = await fetch(`${API_BASE}${endpoint}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              activityScore: updatedScores.activity,
              socialScore: updatedScores.social,
              emotionalStabilityScore: updatedScores.emotionalStability,
              structureScore: updatedScores.structure,
              leadershipScore: updatedScores.leadership,
              mathScore: updatedScores.math || 0,
              physicsScore: updatedScores.physics || 0
            })
          });
          if (!res.ok) throw new Error('Failed to submit results');
        } catch (e) {
          console.error(e);
          setErrorMsg('Failed to save your progress, but you can continue to results.');
          setTimeout(() => navigate('/results'), 2000);
          return; // Early return to show error message briefly
        }
      }
      localStorage.setItem('testScores', JSON.stringify(updatedScores));
      navigate('/results');
    }
  };

  const handleAnswer = (idx) => {
    if (currentQ.isSubjectScore) return;
    const points = currentQ.answers[idx].points;
    const newScores = { ...scores, [currentQ.trait]: scores[currentQ.trait] + points };
    setScores(newScores);
    proceed(newScores);
  };

  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    const val = parseInt(subjectInput, 10);
    if (val >= 1 && val <= 12) {
      const newScores = { ...scores, [currentQ.trait]: val };
      setScores(newScores);
      proceed(newScores);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentQ.isSubjectScore) return;
      if (e.key >= '1' && e.key <= '5') {
        const idx = parseInt(e.key) - 1;
        handleAnswer(idx);
      }
      if (e.key === 'ArrowRight') setFocusedIdx(prev => Math.min(prev + 1, 4));
      else if (e.key === 'ArrowLeft') setFocusedIdx(prev => Math.max(prev - 1, 0));
      else if (e.key === 'Enter' && focusedIdx !== -1) handleAnswer(focusedIdx);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, focusedIdx, currentQ]);

  const progress = (currentIdx / total) * 100;

  return (
    <div className="test-container">
      <Card className="test-card">
        {errorMsg && <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: 'var(--error)', color: 'white', borderRadius: 'var(--radius-sm)' }}>{errorMsg}</div>}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Question {currentIdx + 1} of {total}
        </div>
        
        <div className="question-text-container">
          <div className="question-text">{currentQ.questionTextOne}</div>
          {currentQ.questionTextTwo && <div className="question-text">{currentQ.questionTextTwo}</div>}
        </div>

        {currentQ.isSubjectScore ? (
          <form onSubmit={handleSubjectSubmit} style={{ maxWidth: '300px', margin: '0 auto', marginBottom: '2rem' }}>
            <Input 
              type="number" min="1" max="12" 
              value={subjectInput} 
              onChange={e => setSubjectInput(e.target.value)} 
              placeholder="1-12"
            />
            <Button type="submit" variant="primary" style={{ width: '100%' }}>Submit</Button>
          </form>
        ) : (
          <div className="answers-container">
            {currentQ.answers.map((ans, idx) => (
              <button 
                key={idx} 
                className={`answer-btn ${focusedIdx === idx ? 'selected' : ''}`}
                onClick={() => handleAnswer(idx)}
                onMouseEnter={() => setFocusedIdx(idx)}
              >
                <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '4px' }}>[{idx + 1}]</div>
                {ans.text}
              </button>
            ))}
          </div>
        )}
        
        <div style={{ textAlign: 'right' }}>
          <Button variant="secondary" onClick={() => navigate('/results')}>Skip to Results (Dev)</Button>
        </div>
      </Card>
    </div>
  );
}

