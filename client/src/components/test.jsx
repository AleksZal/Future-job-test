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
  
  const isGraduate = localStorage.getItem('studyingStatus') === 'Graduated';
  const questions = isGraduate ? questionsAndAnswers.graduate : questionsAndAnswers.nonGraduate;
  const total = questions.length;
  const currentQ = questions[currentIdx];

  const proceed = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx(currentIdx + 1);
      setFocusedIdx(-1);
      setSubjectInput('');
    } else {
      localStorage.setItem('testScores', JSON.stringify(scores));
      navigate('/results');
    }
  };

  const handleAnswer = (idx) => {
    if (currentQ.isSubjectScore) return;
    const points = currentQ.answers[idx].points;
    setScores(prev => ({ ...prev, [currentQ.trait]: prev[currentQ.trait] + points }));
    proceed();
  };

  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    const val = parseInt(subjectInput, 10);
    if (val >= 1 && val <= 12) {
      setScores(prev => ({ ...prev, [currentQ.trait]: val }));
      proceed();
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

