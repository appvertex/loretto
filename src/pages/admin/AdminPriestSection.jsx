import React, { useEffect, useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import ImageUploadField from '../../components/common/ImageUploadField';
import { UserCheck, Sparkles, HeartHandshake, Calendar, CheckCircle2, RefreshCw } from 'lucide-react';

const defaultAssistantBio = 'Assisting in the pastoral care, spiritual formation, and administrative guidance of Our Lady of Loretto Parish. Working alongside the Parish Priest in administering the Holy Sacraments, conducting liturgical celebrations, guiding parish youth and ministries, and serving our community family.';

const defaultAssistantHighlights = [
  {
    title: 'Youth & Catechism',
    subtitle: 'Spiritual Guidance',
  },
  {
    title: 'Liturgical Services',
    subtitle: 'Sacraments & Masses',
  },
];

const AdminPriestSection = () => {
  const { parishPriest, pastoralTeam, updateParishPriest, updateAssistantPriest } = useParishData();
  const assistantPriest = pastoralTeam.find((member) => member.id === 2 || member.position === 'Assistant Parish Priest') || {};

  const [priestFormData, setPriestFormData] = useState({
    name: parishPriest.name || '',
    designation: parishPriest.designation || 'Rev. Fr.',
    title: parishPriest.title || 'Parish Priest',
    image: parishPriest.image || '',
  });
  const [assistantFormData, setAssistantFormData] = useState({
    name: assistantPriest.name || '',
    designation: assistantPriest.designation || 'Rev. Fr.',
    position: assistantPriest.position || 'Assistant Parish Priest',
    image: assistantPriest.image || '',
    sectionLabel: assistantPriest.sectionLabel || 'PASTORAL TEAM',
    sectionTitle: assistantPriest.sectionTitle || 'Assistant Parish Priest',
    sectionHeading: assistantPriest.sectionHeading || 'Pastoral Care & Ministry',
    bio: assistantPriest.bio || defaultAssistantBio,
    highlights: assistantPriest.highlights?.length ? assistantPriest.highlights : defaultAssistantHighlights,
  });
  const [priestSavedSuccess, setPriestSavedSuccess] = useState(false);
  const [assistantSavedSuccess, setAssistantSavedSuccess] = useState(false);

  useEffect(() => {
    setPriestFormData({
      name: parishPriest.name || '',
      designation: parishPriest.designation || 'Rev. Fr.',
      title: parishPriest.title || 'Parish Priest',
      image: parishPriest.image || '',
    });
  }, [parishPriest.name, parishPriest.designation, parishPriest.title, parishPriest.image]);

  useEffect(() => {
    setAssistantFormData({
      name: assistantPriest.name || '',
      designation: assistantPriest.designation || 'Rev. Fr.',
      position: assistantPriest.position || 'Assistant Parish Priest',
      image: assistantPriest.image || '',
      sectionLabel: assistantPriest.sectionLabel || 'PASTORAL TEAM',
      sectionTitle: assistantPriest.sectionTitle || 'Assistant Parish Priest',
      sectionHeading: assistantPriest.sectionHeading || 'Pastoral Care & Ministry',
      bio: assistantPriest.bio || defaultAssistantBio,
      highlights: assistantPriest.highlights?.length ? assistantPriest.highlights : defaultAssistantHighlights,
    });
  }, [
    assistantPriest.name,
    assistantPriest.designation,
    assistantPriest.position,
    assistantPriest.image,
    assistantPriest.sectionLabel,
    assistantPriest.sectionTitle,
    assistantPriest.sectionHeading,
    assistantPriest.bio,
    assistantPriest.highlights,
  ]);

  const handlePriestChange = (e) => {
    setPriestFormData({
      ...priestFormData,
      [e.target.name]: e.target.value,
    });
    setPriestSavedSuccess(false);
  };

  const handleAssistantFieldChange = (field, value) => {
    setAssistantFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setAssistantSavedSuccess(false);
  };

  const handleAssistantHighlightChange = (index, field, value) => {
    setAssistantFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.map((highlight, currentIndex) => (
        currentIndex === index ? { ...highlight, [field]: value } : highlight
      )),
    }));
    setAssistantSavedSuccess(false);
  };

  const handlePriestSubmit = (e) => {
    e.preventDefault();
    updateParishPriest(priestFormData);
    setPriestSavedSuccess(true);
    setTimeout(() => setPriestSavedSuccess(false), 4000);
  };

  const handleAssistantSubmit = (e) => {
    e.preventDefault();
    updateAssistantPriest({
      ...assistantFormData,
      highlights: assistantFormData.highlights.filter((highlight) => highlight.title || highlight.subtitle),
    });
    setAssistantSavedSuccess(true);
    setTimeout(() => setAssistantSavedSuccess(false), 4000);
  };

  return (
    <>
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

        {priestSavedSuccess && (
          <div className="admin-alert admin-alert--success">
            <CheckCircle2 size={18} />
            <span>Parish Priest name & details updated successfully! Updated everywhere on the site.</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
          <form onSubmit={handlePriestSubmit}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label htmlFor="designation">Honorific / Designation</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  className="admin-form-control"
                  placeholder="e.g. Rev. Fr. / Very Rev. Fr."
                  value={priestFormData.designation}
                  onChange={handlePriestChange}
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
                  value={priestFormData.title}
                  onChange={handlePriestChange}
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
                value={priestFormData.name}
                onChange={handlePriestChange}
                required
              />
            </div>

            <ImageUploadField
              id="priest-portrait-image"
              label="Portrait Image"
              value={priestFormData.image}
              onChange={(image) => setPriestFormData({ ...priestFormData, image })}
              placeholder="Paste an image URL or upload a file"
              helpText="You can also paste a relative path or full image URL."
            />

            <button type="submit" className="admin-btn admin-btn--primary" style={{ marginTop: '1rem' }}>
              <UserCheck size={16} /> Save Priest Name & Sync Everywhere
            </button>
          </form>

          <div style={{ background: 'var(--cream)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-antique)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
              Live Preview
            </span>
            <div style={{ width: '130px', height: '150px', margin: '0 auto 1rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--gold-antique)', overflow: 'hidden', backgroundColor: 'var(--border-beige)' }}>
              <img
                src={priestFormData.image || `${import.meta.env.BASE_URL}images/priest-portrait.jpg`}
                alt="Priest Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/priest-portrait.jpg`; }}
              />
            </div>

            <span className="priest-role-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--gold-antique)', color: 'var(--brown-primary)', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '12px', marginBottom: '0.5rem' }}>
              <Sparkles size={11} /> {priestFormData.title || 'Parish Priest'}
            </span>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--brown-primary)', margin: '0.2rem 0 0.2rem' }}>
              <span style={{ fontWeight: 400, fontSize: '1.05rem' }}>{priestFormData.designation}</span> {priestFormData.name || 'Priest Name'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--brown-muted)', margin: 0 }}>
              Our Lady of Loretto Church
            </p>
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: '1.5rem' }}>
        <div className="admin-card__header">
          <h2 className="admin-card__title">Assistant Parish Priest</h2>
          <p className="admin-card__subtitle">
            Edit the Assistant Parish Priest card shown on the Parish page. These fields are stored in the shared leadership data and publish with the rest of the site content.
          </p>
        </div>

        {assistantSavedSuccess && (
          <div className="admin-alert admin-alert--success">
            <CheckCircle2 size={18} />
            <span>Assistant Parish Priest details updated successfully!</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
          <form onSubmit={handleAssistantSubmit}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label htmlFor="assistant-designation">Honorific / Designation</label>
                <input
                  type="text"
                  id="assistant-designation"
                  className="admin-form-control"
                  value={assistantFormData.designation}
                  onChange={(event) => handleAssistantFieldChange('designation', event.target.value)}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="assistant-title">Role Badge</label>
                <input
                  type="text"
                  id="assistant-title"
                  className="admin-form-control"
                  value={assistantFormData.position}
                  onChange={(event) => handleAssistantFieldChange('position', event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="assistant-name">Assistant Priest Full Name *</label>
              <input
                type="text"
                id="assistant-name"
                className="admin-form-control"
                value={assistantFormData.name}
                onChange={(event) => handleAssistantFieldChange('name', event.target.value)}
                required
              />
            </div>

            <ImageUploadField
              id="assistant-priest-image"
              label="Assistant Priest Portrait"
              value={assistantFormData.image}
              onChange={(image) => handleAssistantFieldChange('image', image)}
              placeholder="Paste an image URL or upload a file"
              helpText="Use a square portrait for the cleanest display on the public page."
            />

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label htmlFor="assistant-section-label">Section Label</label>
                <input
                  type="text"
                  id="assistant-section-label"
                  className="admin-form-control"
                  value={assistantFormData.sectionLabel}
                  onChange={(event) => handleAssistantFieldChange('sectionLabel', event.target.value)}
                  placeholder="PASTORAL TEAM"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="assistant-section-title">Section Heading</label>
                <input
                  type="text"
                  id="assistant-section-title"
                  className="admin-form-control"
                  value={assistantFormData.sectionTitle}
                  onChange={(event) => handleAssistantFieldChange('sectionTitle', event.target.value)}
                  placeholder="Assistant Parish Priest"
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="assistant-heading">Bio Heading</label>
              <input
                type="text"
                id="assistant-heading"
                className="admin-form-control"
                value={assistantFormData.sectionHeading}
                onChange={(event) => handleAssistantFieldChange('sectionHeading', event.target.value)}
                placeholder="Pastoral Care & Ministry"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="assistant-bio">Assistant Priest Bio</label>
              <textarea
                id="assistant-bio"
                className="admin-form-control"
                rows="5"
                value={assistantFormData.bio}
                onChange={(event) => handleAssistantFieldChange('bio', event.target.value)}
              />
            </div>

            <div className="admin-settings-divider" />

            <div className="admin-card__header" style={{ padding: 0 }}>
              <h3 className="admin-card__title" style={{ fontSize: '1.15rem' }}>Highlights</h3>
              <p className="admin-card__subtitle">These show as the two highlight blocks on the public Parish page.</p>
            </div>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label htmlFor="highlight-1-title">Highlight 1 Title</label>
                <input
                  id="highlight-1-title"
                  className="admin-form-control"
                  value={assistantFormData.highlights?.[0]?.title || ''}
                  onChange={(event) => handleAssistantHighlightChange(0, 'title', event.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="highlight-1-subtitle">Highlight 1 Subtitle</label>
                <input
                  id="highlight-1-subtitle"
                  className="admin-form-control"
                  value={assistantFormData.highlights?.[0]?.subtitle || ''}
                  onChange={(event) => handleAssistantHighlightChange(0, 'subtitle', event.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label htmlFor="highlight-2-title">Highlight 2 Title</label>
                <input
                  id="highlight-2-title"
                  className="admin-form-control"
                  value={assistantFormData.highlights?.[1]?.title || ''}
                  onChange={(event) => handleAssistantHighlightChange(1, 'title', event.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="highlight-2-subtitle">Highlight 2 Subtitle</label>
                <input
                  id="highlight-2-subtitle"
                  className="admin-form-control"
                  value={assistantFormData.highlights?.[1]?.subtitle || ''}
                  onChange={(event) => handleAssistantHighlightChange(1, 'subtitle', event.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="admin-btn admin-btn--primary" style={{ marginTop: '1rem' }}>
              <HeartHandshake size={16} /> Save Assistant Priest Details
            </button>
          </form>

          <div style={{ background: 'var(--cream)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-antique)', fontWeight: 700, display: 'block', marginBottom: '1rem', textAlign: 'center' }}>
              Assistant Preview
            </span>

            <div style={{ width: '150px', height: '190px', margin: '0 auto 1rem', borderRadius: '20px', overflow: 'hidden', border: '2px solid var(--gold-antique)', backgroundColor: 'var(--border-beige)' }}>
              <img
                src={assistantFormData.image || `${import.meta.env.BASE_URL}images/fr-jason-vijay-monis.jpg`}
                alt="Assistant Priest Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/fr-jason-vijay-monis.jpg`; }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <span className="section-title-tag">{assistantFormData.sectionLabel || 'PASTORAL TEAM'}</span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--brown-primary)', margin: '0.35rem 0 1rem' }}>
                {assistantFormData.sectionTitle || 'Assistant Parish Priest'}
              </h4>
              <span className="assistant-role-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(122, 31, 43, 0.08)', color: 'var(--burgundy-primary)', fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px', marginBottom: '0.65rem' }}>
                <Sparkles size={11} /> {assistantFormData.position || 'Assistant Parish Priest'}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--burgundy-dark)', margin: '0 0 0.35rem' }}>
                <span style={{ fontWeight: 400, fontSize: '1.05rem', color: 'var(--gold-antique)' }}>{assistantFormData.designation}</span> {assistantFormData.name || 'Assistant Priest Name'}
              </h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                {assistantFormData.sectionHeading || 'Pastoral Care & Ministry'}
              </p>
            </div>

            <div className="admin-settings-divider" />

            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-body)', marginTop: 0 }}>
              {assistantFormData.bio || defaultAssistantBio}
            </p>

            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {(assistantFormData.highlights || defaultAssistantHighlights).map((highlight, index) => (
                <div key={`${highlight.title || 'highlight'}-${index}`} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', padding: '0.85rem', borderRadius: 'var(--radius-sm)', background: '#fff', border: '1px solid var(--border-beige)' }}>
                  {index === 0 ? <HeartHandshake size={18} style={{ color: 'var(--burgundy-primary)', flexShrink: 0, marginTop: '0.1rem' }} /> : <Calendar size={18} style={{ color: 'var(--burgundy-primary)', flexShrink: 0, marginTop: '0.1rem' }} />}
                  <div>
                    <strong style={{ display: 'block', color: 'var(--brown-primary)' }}>{highlight.title || 'Highlight title'}</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{highlight.subtitle || 'Highlight subtitle'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPriestSection;
