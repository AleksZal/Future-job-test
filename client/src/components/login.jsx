import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { PhoneInput } from './ui/PhoneInput';
import { Button } from './ui/Button';
import '../styles/login.css';

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Profile, 2: Telegram Code (Optional)
  
  // Layout for now, state logic later
  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <h2>Welcome</h2>
          <p>Please enter your details to start the test</p>
        </div>
        
        {step === 1 ? (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <Input label="Full Name" placeholder="Ivan Ivanov" />
            <PhoneInput label="Phone Number" />
            <Input label="Date of Birth" type="date" />
            <Input label="City" placeholder="Kyiv" />
            <Input label="School" placeholder="Lyceum #1" />
            
            <div className="input-group">
              <label className="input-label">Studying Status</label>
              <select className="input-field">
                <option value="">Select status...</option>
                <option value="9th Grade">9th Grade</option>
                <option value="10th Grade">10th Grade</option>
                <option value="11th Grade">11th Grade</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>
            
            <div className="form-actions">
              <Button type="submit" variant="primary">Continue</Button>
              <Button type="button" variant="secondary" onClick={() => navigate('/test')}>Skip (Dev)</Button>
            </div>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); navigate('/test'); }}>
            <Input label="Telegram Code" placeholder="12345" />
            <div className="form-actions">
              <Button type="submit" variant="primary">Verify & Login</Button>
              <Button type="button" variant="secondary" onClick={() => setStep(1)}>Back</Button>
            </div>
          </form>
        )}
        
        <div className="login-footer">
          Your data is secure and will only be used for the test results.
        </div>
      </Card>
    </div>
  );
}

