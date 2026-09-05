import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import { UserCheck, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

const AdminPriestSection = () => {
  const { parishPriest, updateParishPriest } = useParishData();
  const [formData, setFormData] = useState({
    name: parishPriest.name || '',
    designation: parishPriest.designation || 'Rev. Fr.',
    title: parishPriest.title || 'Parish Priest',
    image: parishPriest.image || '',
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
    updateParishPriest(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <h2 className="admin-card__title">Parish Priest Name & Global Details</h2>
        <p className="admin-card__subtitle">
          Update the Parish Priest details. Any changes made here are instantly synchronized across all pages of the website.
        </p>
      </div>

      <div className="admin-sync-banner">
        <RefreshCw size={20} />
        <div>
          <strong>Global Synchronization Enabled</strong>
          <p style={{ margin: '0.2rem 0 0', opacity: 0.9 }}>
            Updating the name here automatically updates the Parish Priest page, Home Page Priest message banner, Parish Leadership cards, Parish Council Ex-officio President entry, and Church History facts table.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="admin-alert admin-alert--success">
          <CheckCircle2 size={18} />
          <span>Parish Priest name & details updated successfully! Updated everywhere on the site.</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
        {/* Form Column */}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label htmlFor="designation">Honorific / Designation</label>
              <input
                type="text"
                id="designation"
                name="designation"
                className="admin-form-control"
                placeholder="e.g. Rev. Fr. / Very Rev. Fr."
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="title">Official Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="admin-form-control"
                placeholder="e.g. Parish Priest"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="name">Parish Priest Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className="admin-form-control"
              placeholder="e.g. James D'Souza"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="image">Portrait Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              className="admin-form-control"
              placeholder="e.g. images/priest-portrait.jpg or full image URL"
              value={formData.image}
              onChange={handleChange}
            />
            <small style={{ color: 'var(--brown-muted)', display: 'block', marginTop: '0.3rem' }}>
              Leave relative path or paste full image URL.
            </small>
          </div>

          <button type="submit" className="admin-btn admin-btn--primary" style={{ marginTop: '1rem' }}>
            <UserCheck size={16} /> Save Priest Name & Sync Everywhere
          </button>
        </form>

        {/* Live Preview Card */}
        <div style={{ background: 'var(--cream)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-antique)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
            Live Preview
          </span>
          <div style={{ width: '130px', height: '150px', margin: '0 auto 1rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--gold-antique)', overflow: 'hidden', backgroundColor: 'var(--border-beige)' }}>
            <img
              src={formData.image || `${import.meta.env.BASE_URL}images/priest-portrait.jpg`}
              alt="Priest Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/priest-portrait.jpg`; }}
            />
          </div>

          <span className="priest-role-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--gold-antique)', color: 'var(--brown-primary)', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '12px', marginBottom: '0.5rem' }}>
            <Sparkles size={11} /> {formData.title || 'Parish Priest'}
          </span>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--brown-primary)', margin: '0.2rem 0 0.2rem' }}>
            <span style={{ fontWeight: 400, fontSize: '1.05rem' }}>{formData.designation}</span> {formData.name || 'Priest Name'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--brown-muted)', margin: 0 }}>
            Our Lady of Loretto Church
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPriestSection;
