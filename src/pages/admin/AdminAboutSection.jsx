import React, { useEffect, useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import ImageUploadField from '../../components/common/ImageUploadField';
import { CheckCircle2, Save } from 'lucide-react';

const pageNames = {
  parish: 'Our Parish',
  history: 'Church History',
  patroness: 'Our Patroness',
  diocese: 'Diocese',
};

const AdminAboutSection = ({ page = 'parish' }) => {
  const { aboutContent, updateAboutContent } = useParishData();
  const [formData, setFormData] = useState(aboutContent);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(aboutContent);
  }, [aboutContent]);

  const updatePage = (page, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [page]: { ...prev[page], [field]: value },
    }));
    setSavedSuccess(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateAboutContent(formData);
    setSavedSuccess(true);
    window.setTimeout(() => setSavedSuccess(false), 4000);
  };

  const field = (page, key, label, options = {}) => (
    <div className="admin-form-group">
      <label htmlFor={`about-${page}-${key}`}>{label}</label>
      {options.multiline ? (
        <textarea
          id={`about-${page}-${key}`}
          className="admin-form-control"
          rows={options.rows || 4}
          value={formData[page]?.[key] || ''}
          onChange={(event) => updatePage(page, key, event.target.value)}
        />
      ) : (
        <input
          id={`about-${page}-${key}`}
          type="text"
          className="admin-form-control"
          value={formData[page]?.[key] || ''}
          onChange={(event) => updatePage(page, key, event.target.value)}
        />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">{pageNames[page]} Content</h2>
          <p className="admin-card__subtitle">Edit the headings, images, and written content for this About page. Use <code>{'{churchName}'}</code> where the current church name should appear automatically.</p>
        </div>

        {savedSuccess && (
          <div className="admin-alert admin-alert--success">
            <CheckCircle2 size={18} />
            <span>About page content updated successfully.</span>
          </div>
        )}

        {page === 'parish' && <>
        <div className="admin-card__header" style={{ padding: 0 }}>
          <h3 className="admin-card__title" style={{ fontSize: '1.25rem' }}>Our Parish</h3>
          <p className="admin-card__subtitle">Content for <code>/about/our-parish</code>.</p>
        </div>
        <div className="admin-form-grid">
          {field('parish', 'heroTitle', 'Page Hero Title')}
          {field('parish', 'contentHeading', 'Main Heading')}
        </div>
        <ImageUploadField id="about-parish-image" label="Parish Image" value={formData.parish?.image || ''} onChange={(image) => updatePage('parish', 'image', image)} placeholder="Paste an image URL or upload a file" />
        <div className="admin-form-grid">
          {field('parish', 'imageCaption', 'Image Caption')}
          {field('parish', 'missionHeading', 'Mission Heading')}
        </div>
        {field('parish', 'introduction', 'Introduction', { multiline: true })}
        {field('parish', 'mission', 'Mission Statement', { multiline: true })}
        </>}

        {page === 'history' && <>
        <div className="admin-settings-divider" />

        <div className="admin-card__header" style={{ padding: 0 }}>
          <h3 className="admin-card__title" style={{ fontSize: '1.25rem' }}>Church History</h3>
          <p className="admin-card__subtitle">Content for <code>/about/history</code>. Timeline entries and quick facts remain editable in the Church History section.</p>
        </div>
        <div className="admin-form-grid">
          {field('history', 'heroTitle', 'Page Hero Title')}
          {field('history', 'sectionHeading', 'Section Heading')}
        </div>
        {field('history', 'sectionSubtitle', 'Section Subtitle', { multiline: true, rows: 3 })}
        <ImageUploadField id="about-history-image" label="History Banner Image" value={formData.history?.image || ''} onChange={(image) => updatePage('history', 'image', image)} placeholder="Paste an image URL or upload a file" />
        {field('history', 'imageAlt', 'Image Alt Text')}
        </>}

        {page === 'patroness' && <>
        <div className="admin-settings-divider" />

        <div className="admin-card__header" style={{ padding: 0 }}>
          <h3 className="admin-card__title" style={{ fontSize: '1.25rem' }}>Our Patroness</h3>
          <p className="admin-card__subtitle">Content for <code>/about/our-patroness</code>.</p>
        </div>
        <div className="admin-form-grid">
          {field('patroness', 'heroTitle', 'Page Hero Title')}
          {field('patroness', 'devotionalTitle', 'Devotional Title')}
        </div>
        <ImageUploadField id="about-patroness-image" label="Patroness Image" value={formData.patroness?.image || ''} onChange={(image) => updatePage('patroness', 'image', image)} placeholder="Paste an image URL or upload a file" />
        <div className="admin-form-grid">
          {field('patroness', 'imageAlt', 'Image Alt Text')}
          {field('patroness', 'feastLabel', 'Feast Day Label')}
          {field('patroness', 'feastDate', 'Feast Day')}
        </div>
        {field('patroness', 'significanceHeading', 'Significance Heading')}
        {field('patroness', 'significanceParagraphOne', 'Significance Paragraph 1', { multiline: true })}
        {field('patroness', 'significanceParagraphTwo', 'Significance Paragraph 2', { multiline: true })}
        <div className="admin-form-grid">
          {field('patroness', 'prayerHeading', 'Prayer Heading')}
          {field('patroness', 'prayer', 'Prayer Text', { multiline: true })}
        </div>
        </>}

        {page === 'diocese' && <>
        <div className="admin-settings-divider" />

        <div className="admin-card__header" style={{ padding: 0 }}>
          <h3 className="admin-card__title" style={{ fontSize: '1.25rem' }}>Diocese</h3>
          <p className="admin-card__subtitle">Content for <code>/about/diocese</code>.</p>
        </div>
        <div className="admin-form-grid">
          {field('diocese', 'heroTitle', 'Page Hero Title')}
          {field('diocese', 'sectionHeading', 'Section Heading')}
        </div>
        {field('diocese', 'introduction', 'Introduction', { multiline: true })}
        <div className="admin-form-grid">
          {field('diocese', 'regionTitle', 'Region Card Title')}
          {field('diocese', 'governanceTitle', 'Governance Card Title')}
        </div>
        <div className="admin-form-grid">
          {field('diocese', 'regionDescription', 'Region Card Description', { multiline: true })}
          {field('diocese', 'governanceDescription', 'Governance Card Description', { multiline: true })}
        </div>
        </>}

        <button type="submit" className="admin-btn admin-btn--primary" style={{ marginTop: '1rem' }}>
          <Save size={16} /> Save {pageNames[page]} Content
        </button>
      </div>
    </form>
  );
};

export default AdminAboutSection;
