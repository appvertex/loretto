import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import { MessageSquareText, CheckCircle2 } from 'lucide-react';

const AdminMessagesSection = () => {
  const { parishPriest, updatePriestMessages } = useParishData();
  const [formData, setFormData] = useState({
    shortMessage: parishPriest.shortMessage || '',
    message: parishPriest.message || '',
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSavedSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePriestMessages(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <h2 className="admin-card__title">Parish Priest Messages</h2>
        <p className="admin-card__subtitle">
          Manage the pastoral greeting messages displayed on the Home page and the Parish Priest detail page.
        </p>
      </div>

      {savedSuccess && (
        <div className="admin-alert admin-alert--success">
          <CheckCircle2 size={18} />
          <span>Pastoral messages updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label htmlFor="shortMessage">Home Page Short Message (Summary)</label>
          <textarea
            id="shortMessage"
            name="shortMessage"
            className="admin-form-control"
            rows="3"
            placeholder="Short welcome message shown on the main homepage card..."
            value={formData.shortMessage}
            onChange={handleChange}
            required
          />
          <small style={{ color: 'var(--brown-muted)', display: 'block', marginTop: '0.3rem' }}>
            Appears on the homepage inside the "Message from Our Parish Priest" card.
          </small>
        </div>

        <div className="admin-form-group" style={{ marginTop: '1.5rem' }}>
          <label htmlFor="message">Full Pastoral Greeting Letter (Parish Priest Page)</label>
          <textarea
            id="message"
            name="message"
            className="admin-form-control"
            rows="7"
            placeholder="Full pastoral message letter shown on the Parish Priest page..."
            value={formData.message}
            onChange={handleChange}
            required
          />
          <small style={{ color: 'var(--brown-muted)', display: 'block', marginTop: '0.3rem' }}>
            Appears on the official Parish Priest page under Pastoral Greeting.
          </small>
        </div>

        <button type="submit" className="admin-btn admin-btn--primary" style={{ marginTop: '1rem' }}>
          <MessageSquareText size={16} /> Save Pastoral Messages
        </button>
      </form>
    </div>
  );
};

export default AdminMessagesSection;
