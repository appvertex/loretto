import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParishData } from '../../context/ParishContext';
import './AdminLayout.css';

const AdminLogin = () => {
  const { loginAdmin } = useParishData();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!passcode) {
      setError('Please enter the admin passcode.');
      return;
    }

    const success = loginAdmin(passcode);
    if (!success) {
      setError('Incorrect passcode. Please check your admin passcode.');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-icon">
            <ShieldCheck size={28} />
          </div>

          <h1 className="admin-login-title">Admin Portal</h1>
          <p className="admin-login-desc">
            Enter passcode to access management pages for Parish Priest, History, Council & Office.
          </p>

          {error && (
            <div className="admin-alert admin-alert--error" style={{ textAlign: 'left' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group" style={{ textAlign: 'left' }}>
              <label htmlFor="passcode">Admin Passcode</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  id="passcode"
                  className="admin-form-control"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Enter passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  autoFocus
                />
                <Lock
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '0.9rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--brown-muted)',
                  }}
                />
              </div>
            </div>

            <button type="submit" className="admin-btn admin-btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.8rem' }}>
              Unlock Admin Panel
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-beige)', paddingTop: '1.25rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brown-muted)', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 600 }}>
              <ArrowLeft size={14} /> Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
