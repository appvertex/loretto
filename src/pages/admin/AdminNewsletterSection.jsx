import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  FileText,
  Calendar,
  Download,
  Eye,
  Search,
  X,
  Star,
  Link as LinkIcon
} from 'lucide-react';

const AdminNewsletterSection = () => {
  const { newsletters, addNewsletterItem, updateNewsletterItem, deleteNewsletterItem } = useParishData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYearFilter, setSelectedYearFilter] = useState('All');
  const [savedSuccess, setSavedSuccess] = useState('');

  // Modal States
  const [modalType, setModalType] = useState(null); // 'addNewsletter' | 'editNewsletter'
  const [modalData, setModalData] = useState({});

  // Dynamic list of available years
  const availableYears = ['All', ...new Set((newsletters || []).map((n) => n.year).filter(Boolean))].sort((a, b) => (typeof a === 'number' && typeof b === 'number' ? b - a : 0));

  // Filtered Newsletters
  const filteredNewsletters = (newsletters || []).filter((item) => {
    const matchesYear =
      selectedYearFilter === 'All' || item.year === Number(selectedYearFilter);
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.edition && item.edition.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q));

    return matchesYear && matchesSearch;
  });

  // Cover image presets
  const presetCovers = [
    { label: 'Default Newsletter Cover', url: `${import.meta.env.BASE_URL}images/newsletter-cover.jpg` },
    { label: 'Community Hero', url: `${import.meta.env.BASE_URL}images/hero-community.jpg` },
    { label: 'Church Exterior', url: `${import.meta.env.BASE_URL}images/hero-exterior.jpg` },
  ];

  // -------------------------------------------------------------
  // MODAL OPEN HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddNewsletter = () => {
    setModalType('addNewsletter');
    const today = new Date().toISOString().split('T')[0];
    const dateObj = new Date();
    const monthName = dateObj.toLocaleDateString('en-US', { month: 'long' });
    const yearNum = dateObj.getFullYear();
    setModalData({
      title: `Parish Newsletter — ${monthName} ${yearNum}`,
      edition: 'Vol. I, Issue 1',
      date: today,
      image: `${import.meta.env.BASE_URL}images/newsletter-cover.jpg`,
      pdfUrl: '#',
      readUrl: '#',
      featured: false,
      description: 'Monthly parish newsletter featuring upcoming events, community news, Mass schedule updates, and reflections from the Parish Priest.',
    });
  };

  const handleOpenEditNewsletter = (item) => {
    setModalType('editNewsletter');
    setModalData({
      id: item.id,
      title: item.title || '',
      edition: item.edition || '',
      date: item.date || new Date().toISOString().split('T')[0],
      image: item.image || `${import.meta.env.BASE_URL}images/newsletter-cover.jpg`,
      pdfUrl: item.pdfUrl || '#',
      readUrl: item.readUrl || '#',
      featured: item.featured || false,
      description: item.description || '',
    });
  };

  // -------------------------------------------------------------
  // MODAL SUBMIT HANDLER
  // -------------------------------------------------------------
  const handleModalSubmit = (e) => {
    e.preventDefault();

    if (modalType === 'addNewsletter') {
      const created = addNewsletterItem(modalData);
      setSavedSuccess(`Newsletter "${created.title}" published successfully!`);
    } else if (modalType === 'editNewsletter') {
      updateNewsletterItem(modalData.id, modalData);
      setSavedSuccess('Newsletter edition updated successfully!');
    }

    setModalType(null);
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  const handleDeleteNewsletter = (id, title) => {
    if (window.confirm(`Are you sure you want to delete newsletter "${title}"? This cannot be undone.`)) {
      deleteNewsletterItem(id);
      setSavedSuccess('Newsletter edition deleted.');
      setTimeout(() => setSavedSuccess(''), 3000);
    }
  };

  const handleToggleFeatured = (item) => {
    updateNewsletterItem(item.id, { ...item, featured: !item.featured });
    setSavedSuccess(`"${item.title}" ${!item.featured ? 'set as Featured/Latest issue' : 'unmarked from featured'}.`);
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  return (
    <div>
      {/* ── TOP ALERT BANNER ── */}
      {savedSuccess && (
        <div className="admin-alert admin-alert--success">
          <CheckCircle2 size={18} />
          <span>{savedSuccess}</span>
        </div>
      )}

      {/* ── MAIN NEWSLETTER WORKSPACE ── */}
      <div className="admin-card">
        <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="admin-card__title">Parish Newsletter Editions (ಪತ್ರಾಂ)</h2>
            <p className="admin-card__subtitle">Publish monthly parish newsletters, upload PDF copies, set featured latest issues, and manage archives.</p>
          </div>
          <button onClick={handleOpenAddNewsletter} className="admin-btn admin-btn--primary">
            <Plus size={16} /> Add Newsletter Edition
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <input
              type="text"
              className="admin-form-control"
              style={{ paddingLeft: '2.5rem' }}
              placeholder="Search newsletters by title, edition, or summary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--brown-muted)' }} />
          </div>

          {/* Year Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {availableYears.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYearFilter(String(year))}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: String(selectedYearFilter) === String(year) ? '1px solid var(--gold-antique)' : '1px solid var(--border-beige)',
                  backgroundColor: String(selectedYearFilter) === String(year) ? 'var(--brown-primary)' : 'var(--cream)',
                  color: String(selectedYearFilter) === String(year) ? 'var(--gold-light)' : 'var(--brown-primary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {year === 'All' ? 'All Years' : year}
              </button>
            ))}
          </div>
        </div>

        {/* Newsletters Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredNewsletters.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--cream)',
                border: item.featured ? '2px solid var(--gold-antique)' : '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Cover Banner */}
              <div style={{ position: 'relative', height: '170px', backgroundColor: 'var(--border-beige)', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/newsletter-cover.jpg`; }}
                />
                
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(53,21,27,0.85)',
                    color: 'var(--gold-light)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    border: '1px solid var(--gold-antique)',
                  }}
                >
                  {item.edition}
                </span>

                {item.featured && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: 'var(--gold-antique)',
                      color: 'var(--brown-primary)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.6rem',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Star size={11} fill="var(--brown-primary)" /> Latest Featured Issue
                  </span>
                )}
              </div>

              {/* Newsletter Body */}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--gold-antique)', fontWeight: 600, marginBottom: '0.4rem' }}>
                    <Calendar size={13} />
                    <span>{item.displayDate || item.date}</span>
                    <span style={{ opacity: 0.5 }}>•</span>
                    <span style={{ color: 'var(--brown-muted)' }}>{item.year}</span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--brown-primary)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.83rem', color: 'var(--brown-muted)', lineHeight: 1.5, margin: '0 0 0.75rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </p>

                  {/* Resource Badges */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.73rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: item.pdfUrl && item.pdfUrl !== '#' ? '#e6f4ea' : '#f1f3f4', color: item.pdfUrl && item.pdfUrl !== '#' ? '#137333' : '#5f6368', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Download size={11} /> {item.pdfUrl && item.pdfUrl !== '#' ? 'PDF Attached' : 'No PDF'}
                    </span>
                    <span style={{ fontSize: '0.73rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: item.readUrl && item.readUrl !== '#' ? '#e8f0fe' : '#f1f3f4', color: item.readUrl && item.readUrl !== '#' ? '#1a73e8' : '#5f6368', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Eye size={11} /> {item.readUrl && item.readUrl !== '#' ? 'Online Reader Active' : 'No Online Reader'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-beige)' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleOpenEditNewsletter(item)}
                      className="admin-btn admin-btn--secondary"
                      style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                    >
                      <Edit3 size={14} /> Edit Edition
                    </button>
                    <button
                      onClick={() => handleDeleteNewsletter(item.id, item.title)}
                      className="admin-btn admin-btn--danger"
                      style={{ padding: '0.4rem 0.65rem' }}
                      title="Delete Newsletter Edition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleToggleFeatured(item)}
                    style={{
                      width: '100%',
                      padding: '0.35rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      border: item.featured ? '1px solid var(--gold-antique)' : '1px dashed var(--border-gold)',
                      backgroundColor: item.featured ? 'var(--gold-antique)' : 'transparent',
                      color: item.featured ? 'var(--brown-primary)' : 'var(--brown-primary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Star size={12} fill={item.featured ? 'var(--brown-primary)' : 'none'} />
                    {item.featured ? 'Currently Featured Latest Issue' : 'Set as Latest Featured Issue'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* DYNAMIC POPUP MODAL DIALOG                                */}
      {/* ========================================================= */}
      {modalType && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '650px' }}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {modalType === 'addNewsletter' ? 'Publish New Newsletter Edition' : 'Edit Newsletter Edition'}
              </h3>
              <button className="admin-modal-close" onClick={() => setModalType(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleModalSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Newsletter Title *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Parish Newsletter — September 2026"
                    value={modalData.title}
                    onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Edition / Issue Tag *</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. Vol. XII, Issue 9"
                      value={modalData.edition}
                      onChange={(e) => setModalData({ ...modalData, edition: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Release Date *</label>
                    <input
                      type="date"
                      className="admin-form-control"
                      value={modalData.date}
                      onChange={(e) => setModalData({ ...modalData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={modalData.featured || false}
                      onChange={(e) => setModalData({ ...modalData, featured: e.target.checked })}
                    />
                    <span>Mark as <strong>Latest Featured Newsletter Issue</strong> (Shows on top of home & media section)</span>
                  </label>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>PDF Document Download Link / Path *</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. /documents/newsletter-sep-2026.pdf or link"
                      value={modalData.pdfUrl}
                      onChange={(e) => setModalData({ ...modalData, pdfUrl: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Online Reader URL (Flipbook / View Link)</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. https://online-reader.link or #"
                      value={modalData.readUrl}
                      onChange={(e) => setModalData({ ...modalData, readUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Cover Photo Image URL *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. images/newsletter-cover.jpg or image URL"
                    value={modalData.image}
                    onChange={(e) => setModalData({ ...modalData, image: e.target.value })}
                    required
                  />
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--brown-muted)', width: '100%' }}>Quick Cover Presets:</span>
                    {presetCovers.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setModalData({ ...modalData, image: preset.url })}
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '12px',
                          border: modalData.image === preset.url ? '1px solid var(--gold-antique)' : '1px solid var(--border-beige)',
                          backgroundColor: modalData.image === preset.url ? 'var(--gold-antique)' : 'var(--cream)',
                          color: modalData.image === preset.url ? 'var(--brown-primary)' : 'var(--brown-primary)',
                          cursor: 'pointer',
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Edition Summary / Overview *</label>
                  <textarea
                    className="admin-form-control"
                    rows="4"
                    placeholder="Summary of articles, pastor reflections, committee reports, and events covered in this issue..."
                    value={modalData.description}
                    onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setModalType(null)} className="admin-btn admin-btn--secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  <Save size={15} /> Save Newsletter Edition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsletterSection;
