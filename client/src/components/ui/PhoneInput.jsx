import { useState } from 'react';
import './ui.css';

export function PhoneInput({ label, error, onChange, value, className = '', ...props }) {
  const [phone, setPhone] = useState(value || '');

  const handleChange = (e) => {
    let val = e.target.value.replace(/\D/g, ''); // keep only numbers
    if (val.length > 9) val = val.substring(0, 9);
    setPhone(val);
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div 
          className="input-field" 
          style={{ width: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}
        >
          +380
        </div>
        <input 
          className={`input-field ${error ? 'input-error' : ''}`} 
          style={{ flex: 1 }} 
          placeholder="50 123 4567"
          value={phone}
          onChange={handleChange}
          {...props} 
        />
      </div>
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
}
