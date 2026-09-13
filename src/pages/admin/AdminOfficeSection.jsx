import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import { Building2, CheckCircle2 } from 'lucide-react';

const AdminOfficeSection = () => {
  const { office, updateParishOffice } = useParishData();
  const [formData, setFormData] = useState({ ...office });
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
    updateParishOffice(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <h2 className="admin-card__title">Parish Office & Contact Information</h2>
        <p className="admin-card__subtitle">
          Manage parish office working hours, email address, and office guidance notes. Update the public office phone number in Site Settings.
        </p>
      </div>

      {savedSuccess && (
        <div className="admin-alert admin-alert--success">
          <CheckCircle2 size={18} />
          <span>Parish Office information updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label htmlFor="address">Parish Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="admin-form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label htmlFor="email">Parish Office Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="admin-form-control"
              placeholder="office@lorettochurch.org"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="admin-form-grid" style={{ marginTop: '0.5rem' }}>
          <div className="admin-form-group">
            <label htmlFor="weekdayHours">Weekday Office Hours (Mon - Sat)</label>
            <input
              type="text"
              id="weekdayHours"
              name="weekdayHours"
              className="admin-form-control"
              placeholder="9:00 AM – 12:00 PM | 4:00 PM – 6:00 PM"
              value={formData.weekdayHours}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="weekendHours">Sundays & Public Holidays</label>
            <input
              type="text"
              id="weekendHours"
              name="weekendHours"
              className="admin-form-control"
              placeholder="Closed after Morning Mass"
              value={formData.weekendHours}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="admin-form-group" style={{ marginTop: '0.5rem' }}>
          <label htmlFor="notes">Office Description & Guidance Notes</label>
          <textarea
            id="notes"
            name="notes"
            className="admin-form-control"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="admin-btn admin-btn--primary" style={{ marginTop: '1rem' }}>
          <Building2 size={16} /> Save Parish Office Details
        </button>
      </form>
    </div>
  );
};

export default AdminOfficeSection;
