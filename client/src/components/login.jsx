import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { PhoneInput } from './ui/PhoneInput';
import { Button } from './ui/Button';
import '../styles/login.css';

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    dob: '',
    city: '',
    school: '',
    status: ''
  });
  const [errors, setErrors] = useState({});

  const validateProfile = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (formData.phone.length !== 9) newErrors.phone = 'Phone must be 9 digits';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.school.trim()) newErrors.school = 'School is required';
    if (!formData.status) newErrors.status = 'Status is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (validateProfile()) {
      localStorage.setItem('studyingStatus', formData.status);
      setStep(2);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <h2>Welcome</h2>
          <p>Please enter your details to start the test</p>
        </div>
        
        {step === 1 ? (
          <form onSubmit={handleProfileSubmit}>
            <Input label="Full Name" placeholder="Ivan Ivanov" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} error={errors.fullName} />
            <PhoneInput label="Phone Number" value={formData.phone} onChange={(val) => handleChange('phone', val)} error={errors.phone} />
            <Input label="Date of Birth" type="date" value={formData.dob} onChange={(e) => handleChange('dob', e.target.value)} error={errors.dob} />
            <Input label="City" placeholder="Kyiv" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} error={errors.city} />
            <Input label="School" placeholder="Lyceum #1" value={formData.school} onChange={(e) => handleChange('school', e.target.value)} error={errors.school} />
            
            <div className="input-group">
              <label className="input-label">Studying Status</label>
              <select className={`input-field ${errors.status ? 'input-error' : ''}`} value={formData.status} onChange={(e) => handleChange('status', e.target.value)}>
                <option value="">Select status...</option>
                <option value="9th Grade">9th Grade</option>
                <option value="10th Grade">10th Grade</option>
                <option value="11th Grade">11th Grade</option>
                <option value="Graduated">Graduated</option>
              </select>
              {errors.status && <span className="input-error-msg">{errors.status}</span>}
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

