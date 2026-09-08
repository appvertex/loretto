import React, { useEffect, useState } from 'react';
import { CheckCircle2, ImagePlus, Loader2, Plus, Save, Trash2, Upload } from 'lucide-react';
import { useParishData } from '../../context/ParishContext';
import { api } from '../../api/client';

const blankSlide = {
  image: '',
  eyebrow: '',
  title: '',
  subtitle: '',
  primaryCtaText: '',
  primaryCtaTo: '/',
  secondaryCtaText: '',
  secondaryCtaTo: '/',
};

const navigationTabs = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'parish', label: 'Parish' },
  { key: 'wards', label: 'Wards' },
  { key: 'institutions', label: 'Institutions' },
  { key: 'organizations', label: 'Organizations' },
  { key: 'newsEvents', label: 'News & Events' },
  { key: 'obituary', label: 'Obituary' },
  { key: 'media', label: 'Media' },
  { key: 'contact', label: 'Contact' },
];

const AdminSiteSettingsSection = () => {
  const { siteSettings, updateSiteSettings } = useParishData();
  const [formData, setFormData] = useState(() => ({
    ...siteSettings,
    heroSlides: siteSettings.heroSlides || [],
  }));
  const [uploadingSlideId, setUploadingSlideId] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData({
      ...siteSettings,
      heroSlides: siteSettings.heroSlides || [],
    });
  }, [siteSettings]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSavedSuccess(false);
  };

  const updateSlide = (slideId, field, value) => {
    setFormData(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.map(slide => (
        slide.id === slideId ? { ...slide, [field]: value } : slide
      )),
    }));
    setSavedSuccess(false);
  };

  const updateNavigationVisibility = (key, isVisible) => {
    setFormData(prev => ({
      ...prev,
      navigationVisibility: {
        ...(prev.navigationVisibility || {}),
        [key]: isVisible,
      },
    }));
    setSavedSuccess(false);
  };

  const handleImageUpload = async (slideId, file) => {
    if (!file) return;
    setUploadingSlideId(slideId);
    setError('');
    const result = await api.uploadImage(file);
    setUploadingSlideId(null);
    if (!result.success || !result.url) {
      setError(result.error || 'Image upload failed. Check your admin session and Cloudinary settings.');
      return;
    }
    updateSlide(slideId, 'image', result.url);
  };

  const handleAddSlide = () => {
    setFormData(prev => ({
      ...prev,
      heroSlides: [...prev.heroSlides, { ...blankSlide, id: Date.now(), title: 'New hero message' }],
    }));
  };

  const handleRemoveSlide = (slideId) => {
    if (formData.heroSlides.length <= 1) {
      setError('Keep at least one hero slide on the homepage.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.filter(slide => slide.id !== slideId),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSiteSettings(formData);
    setSavedSuccess(true);
    setError('');
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <h2 className="admin-card__title">Site Settings</h2>
        <p className="admin-card__subtitle">
          Manage the public church name and homepage hero slides. Changes are saved to the shared database.
        </p>
      </div>

      {savedSuccess && (
        <div className="admin-alert admin-alert--success">
          <CheckCircle2 size={18} />
          <span>Site settings saved successfully.</span>
        </div>
      )}
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label htmlFor="site-church-name">Church Name</label>
            <input
              id="site-church-name"
              className="admin-form-control"
              value={formData.churchName || ''}
              onChange={event => updateField('churchName', event.target.value)}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="site-location">Location Line</label>
            <input
              id="site-location"
              className="admin-form-control"
              value={formData.location || ''}
              onChange={event => updateField('location', event.target.value)}
              placeholder="Loretto, Bantwal"
            />
          </div>
        </div>

        <div className="admin-settings-divider" />

        <div className="admin-card__header" style={{ padding: 0 }}>
          <h3 className="admin-card__title" style={{ fontSize: '1.2rem' }}>Public Navbar Tabs</h3>
          <p className="admin-card__subtitle">Pause a tab to hide it from the public desktop and mobile navigation. Its page and route will remain available.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {navigationTabs.map((tab) => {
            const isVisible = formData.navigationVisibility?.[tab.key] !== false;
            return (
              <label key={tab.key} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.85rem 1rem', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-sm)', background: isVisible ? 'var(--cream)' : 'rgba(122, 31, 43, 0.06)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={(event) => updateNavigationVisibility(tab.key, event.target.checked)}
                  style={{ width: '1rem', height: '1rem', accentColor: 'var(--gold-antique)' }}
                />
                <span style={{ color: 'var(--brown-primary)', fontWeight: 600 }}>{tab.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: isVisible ? 'var(--gold-antique)' : 'var(--brown-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {isVisible ? 'Shown' : 'Paused'}
                </span>
              </label>
            );
          })}
        </div>

        <div className="admin-settings-divider" />

        <div className="admin-card__header" style={{ padding: 0 }}>
          <h3 className="admin-card__title" style={{ fontSize: '1.2rem' }}>Homepage Hero Slides</h3>
          <p className="admin-card__subtitle">Upload an image and edit the text shown over it.</p>
        </div>

        <div className="admin-settings-slides">
          {formData.heroSlides.map((slide, index) => (
            <fieldset className="admin-settings-slide" key={slide.id}>
              <legend>Hero Slide {index + 1}</legend>

              <div className="admin-settings-slide__image-row">
                <div className="admin-settings-slide__preview">
                  {slide.image ? <img src={slide.image} alt="" /> : <ImagePlus size={28} />}
                </div>
                <div className="admin-settings-slide__image-actions">
                  <label className="admin-btn admin-btn--secondary admin-settings-upload">
                    {uploadingSlideId === slide.id ? <Loader2 size={16} className="admin-spin" /> : <Upload size={16} />}
                    {uploadingSlideId === slide.id ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={event => handleImageUpload(slide.id, event.target.files?.[0])}
                      disabled={uploadingSlideId !== null}
                    />
                  </label>
                  <input
                    className="admin-form-control"
                    value={slide.image || ''}
                    onChange={event => updateSlide(slide.id, 'image', event.target.value)}
                    placeholder="Or paste an image URL"
                    aria-label={`Hero slide ${index + 1} image URL`}
                  />
                </div>
                <button
                  type="button"
                  className="admin-icon-btn admin-icon-btn--danger"
                  onClick={() => handleRemoveSlide(slide.id)}
                  title="Remove hero slide"
                  aria-label="Remove hero slide"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Eyebrow</label>
                  <input className="admin-form-control" value={slide.eyebrow || ''} onChange={event => updateSlide(slide.id, 'eyebrow', event.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Title</label>
                  <input className="admin-form-control" value={slide.title || ''} onChange={event => updateSlide(slide.id, 'title', event.target.value)} required />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Subtitle</label>
                <textarea className="admin-form-control" rows="2" value={slide.subtitle || ''} onChange={event => updateSlide(slide.id, 'subtitle', event.target.value)} />
              </div>

              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Primary Button Text</label>
                  <input className="admin-form-control" value={slide.primaryCtaText || ''} onChange={event => updateSlide(slide.id, 'primaryCtaText', event.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Primary Button Link</label>
                  <input className="admin-form-control" value={slide.primaryCtaTo || ''} onChange={event => updateSlide(slide.id, 'primaryCtaTo', event.target.value)} placeholder="/about/our-parish" />
                </div>
                <div className="admin-form-group">
                  <label>Secondary Button Text</label>
                  <input className="admin-form-control" value={slide.secondaryCtaText || ''} onChange={event => updateSlide(slide.id, 'secondaryCtaText', event.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Secondary Button Link</label>
                  <input className="admin-form-control" value={slide.secondaryCtaTo || ''} onChange={event => updateSlide(slide.id, 'secondaryCtaTo', event.target.value)} placeholder="/events" />
                </div>
              </div>
            </fieldset>
          ))}
        </div>

        <div className="admin-settings-actions">
          <button type="button" className="admin-btn admin-btn--secondary" onClick={handleAddSlide}>
            <Plus size={16} /> Add Hero Slide
          </button>
          <button type="submit" className="admin-btn admin-btn--primary">
            <Save size={16} /> Save Site Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSiteSettingsSection;
