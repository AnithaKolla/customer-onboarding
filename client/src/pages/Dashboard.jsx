import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Dashboard</h1>
      <p>You have successfully signed in.</p>
      <button className="primary-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
