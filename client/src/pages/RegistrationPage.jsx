import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './RegistrationPage.module.css';
import { FaBuilding, FaIndustry, FaIdCard, FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function RegistrationPage() {
  const location = useLocation();
  const defaultRole = location.state?.role || 'provider';
  const [role, setRole] = useState(defaultRole);
  const [formData, setFormData] = useState({
    org_name: '',
    org_type: '',
    address: '',
    gst: '',
    name: '',
    mobile: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = role === 'provider'
        ? {
            org_name: formData.org_name,
            org_type: formData.org_type,
            gst: formData.gst,
            name: formData.name,
            mobile: formData.mobile,
          }
        : {
            org_name: formData.org_name,
            org_type: formData.org_type,
            address: formData.address,
            name: formData.name,
            mobile: formData.mobile,
          };

      const response = await fetch(`http://localhost:5000/api/register/${role}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        navigate('/success');
      } else {
        alert('Registration failed.');
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {role === 'consumer' ? 'Consumer Registration' : 'Provider Registration'}
      </h2>
      <p className={styles.subtitle}>Fill Following Details to Onboard</p>

      <div className={styles.radioContainer}>
        <label className={styles.radioLabel}>Are you a?</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioOption}>
            <input
              type="radio"
              value="provider"
              checked={role === 'provider'}
              onChange={() => setRole('provider')}
            />
            <span>Gas Provider</span>
          </label>
          <label className={styles.radioOption}>
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

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Organization Name</label>
        <div className={styles.inputGroup}>
          <FaBuilding className={styles.icon} />
          <input
            type="text"
            name="org_name"
            value={formData.org_name}
            onChange={handleChange}
            placeholder="Input text"
            required
          />
        </div>

        <label className={styles.label}>Organization Type</label>
        <div className={styles.inputGroup}>
          <FaIndustry className={styles.icon} />
          <select
            name="org_type"
            value={formData.org_type}
            onChange={handleChange}
            required
          >
            <option value="">Organization Type</option>
            <option value="Private">Private</option>
            <option value="Government">Government</option>
            <option value="NGO">NGO</option>
          </select>
        </div>

        {role === 'consumer' && (
          <>
            <label className={styles.label}>Organization Address</label>
            <div className={styles.inputGroup}>
              <FaMapMarkerAlt className={styles.icon} />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Input address"
                required
              />
            </div>
          </>
        )}

        {role === 'provider' && (
          <>
            <label className={styles.label}>GST Number</label>
            <div className={styles.inputGroup}>
              <FaIdCard className={styles.icon} />
              <input
                type="text"
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                placeholder="GST Number"
                required
              />
            </div>
          </>
        )}

        <label className={styles.label}>Your Name</label>
        <div className={styles.inputGroup}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>

        <label className={styles.label}>Mobile Number</label>
        <div className={styles.inputGroup}>
          <FaPhone className={styles.icon} />
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile number"
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Register
        </button>
      </form>
    </div>
  );
}
