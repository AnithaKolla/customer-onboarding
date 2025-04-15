import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function SignInPage() {
  const [role, setRole] = useState('consumer');
  const [mobile, setMobile] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!mobile || !pin) {
      alert('Please enter mobile number and PIN');
      return;
    }

    console.log({ mobile, pin, role });

    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, pin, role }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/dashboard');
      } else {
        alert('Invalid mobile or PIN');
      }
    } catch (err) {
      console.log(err);
      if (!navigator.onLine) {
        alert('You are offline. Please connect to the internet to Sign In.')
      } else {
        alert('Something went wrong. Please try again later.')
      }
    }
  };

  const handleNewRegistration = () => {
    navigate('/registration', { state: { role } });
  };

  return (
    <div className="signin-container">
      <h2>Enter your Mobile Number</h2>
      <p>Contact your administrator for PIN</p>

      <div className="role-section">
        <label className="section-label">Are you a?</label>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              value="provider"
              checked={role === 'provider'}
              onChange={() => setRole('provider')}
            />
            <span>Gas Provider</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              value="consumer"
              checked={role === 'consumer'}
              onChange={() => setRole('consumer')}
            />
            <span>Consumer</span>
          </label>
        </div>
      </div>

      <input
        type="tel"
        className="input-field"
        placeholder="Mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <input
        type="password"
        placeholder="PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className="input-field"
      />

      <button onClick={handleSignIn} className="primary-button">
        Sign In
      </button>

      <button onClick={handleNewRegistration} className="secondary-button">
        New Registration
      </button>
    </div>
  );
}
