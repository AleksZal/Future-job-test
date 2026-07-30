import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import '../styles/test.css';

// Mock data for layout
const mockQuestion = {
  questionTextOne: "I prefer working with numbers and logic.",
  questionTextTwo: "I prefer working with people and emotions.",
};
const mockAnswers = ["Точно А", "Ближче до А", "Не знаю", "Ближче до Б", "Точно Б"];

export default function Test() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const total = 20;

  const handleAnswer = (idx) => {
    if (currentIdx < total - 1) {
      setCurrentIdx(currentIdx + 1);
      setFocusedIdx(-1);
    } else {
      navigate('/results');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Numbers 1-5
      if (e.key >= '1' && e.key <= '5') {
        const idx = parseInt(e.key) - 1;
        handleAnswer(idx);
      }
      
      // Arrow keys for visual focus
      if (e.key === 'ArrowRight') {
        setFocusedIdx(prev => Math.min(prev + 1, 4));
      } else if (e.key === 'ArrowLeft') {
        setFocusedIdx(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && focusedIdx !== -1) {
        handleAnswer(focusedIdx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, focusedIdx]);

  const progress = ((currentIdx) / total) * 100;

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
          <div className="question-text">{mockQuestion.questionTextOne}</div>
          <div className="question-text">{mockQuestion.questionTextTwo}</div>
        </div>

        <div className="answers-container">
          {mockAnswers.map((ans, idx) => (
            <button 
              key={idx} 
              className={`answer-btn ${focusedIdx === idx ? 'selected' : ''}`}
              onClick={() => handleAnswer(idx)}
              onMouseEnter={() => setFocusedIdx(idx)}
            >
              <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '4px' }}>[{idx + 1}]</div>
              {ans}
            </button>
          ))}
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <Button variant="secondary" onClick={() => navigate('/results')}>Skip to Results (Dev)</Button>
        </div>
      </Card>
    </div>
  );
}

