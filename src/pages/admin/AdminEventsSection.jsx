import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import { eventCategories as initialCategories } from '../../data/events';
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Search,
  X,
  Star,
  Tag,
  Sparkles
} from 'lucide-react';

const AdminEventsSection = () => {
  const { events, addEventItem, updateEventItem, deleteEventItem } = useParishData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [savedSuccess, setSavedSuccess] = useState('');

  // Modal States
  const [modalType, setModalType] = useState(null); // 'addEvent' | 'editEvent'
  const [modalData, setModalData] = useState({});

  // Filtered Events
  const filteredEvents = (events || []).filter((item) => {
    const matchesCategory =
      selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter;
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Preset image URLs for quick selection
  const presetImages = [
    { label: 'Community', url: `${import.meta.env.BASE_URL}images/hero-community.jpg` },
    { label: 'Events', url: `${import.meta.env.BASE_URL}images/quick-events.jpg` },
    { label: 'Mass & Liturgy', url: `${import.meta.env.BASE_URL}images/quick-mass.jpg` },
    { label: 'Youth & Groups', url: `${import.meta.env.BASE_URL}images/quick-groups.jpg` },
    { label: 'Church Exterior', url: `${import.meta.env.BASE_URL}images/hero-exterior.jpg` },
  ];

  // -------------------------------------------------------------
  // MODAL OPEN HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddEvent = () => {
    setModalType('addEvent');
    const today = new Date().toISOString().split('T')[0];
    setModalData({
      title: '',
      category: 'Parish',
      date: today,
      time: '10:00 AM onwards',
      location: 'Our Lady of Loretto Church',
      image: `${import.meta.env.BASE_URL}images/hero-community.jpg`,
      featured: false,
      description: '',
    });
  };

  const handleOpenEditEvent = (item) => {
    setModalType('editEvent');
    setModalData({
      id: item.id,
      title: item.title || '',
      category: item.category || 'Parish',
      date: item.date || new Date().toISOString().split('T')[0],
      time: item.time || '',
      location: item.location || '',
      image: item.image || `${import.meta.env.BASE_URL}images/hero-community.jpg`,
      featured: item.featured || false,
      description: item.description || '',
    });
  };

  // -------------------------------------------------------------
  // MODAL SUBMIT HANDLER
  // -------------------------------------------------------------
  const handleModalSubmit = (e) => {
    e.preventDefault();

    if (modalType === 'addEvent') {
      const created = addEventItem(modalData);
      setSavedSuccess(`Upcoming event "${created.title}" added successfully!`);
    } else if (modalType === 'editEvent') {
      updateEventItem(modalData.id, modalData);
      setSavedSuccess('Upcoming event updated successfully!');
    }

    setModalType(null);
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  const handleDeleteEvent = (id, title) => {
    if (window.confirm(`Are you sure you want to delete event "${title}"? This cannot be undone.`)) {
      deleteEventItem(id);
      setSavedSuccess('Event deleted.');
      setTimeout(() => setSavedSuccess(''), 3000);
    }
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

      {/* ── MAIN EVENTS WORKSPACE ── */}
      <div className="admin-card">
        <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="admin-card__title">Upcoming Events & Celebrations (ಕಾರ್ಯಕ್ರಮ್ ಆನಿ ಸಂಭ್ರಮ್)</h2>
            <p className="admin-card__subtitle">Add, update, and manage upcoming parish feast days, liturgy schedules, youth meetings, and community events.</p>
          </div>
          <button onClick={handleOpenAddEvent} className="admin-btn admin-btn--primary">
            <Plus size={16} /> Add New Event (ಕಾರ್ಯಕ್ರಮ್)
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
              placeholder="Search events by title, location, category, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--brown-muted)' }} />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {initialCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategoryFilter(cat)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: selectedCategoryFilter === cat ? '1px solid var(--gold-antique)' : '1px solid var(--border-beige)',
                  backgroundColor: selectedCategoryFilter === cat ? 'var(--brown-primary)' : 'var(--cream)',
                  color: selectedCategoryFilter === cat ? 'var(--gold-light)' : 'var(--brown-primary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredEvents.map((item) => (
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
              {/* Photo Banner with Date Badge */}
              <div style={{ position: 'relative', height: '160px', backgroundColor: 'var(--border-beige)', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/hero-community.jpg`; }}
                />

                {/* Date Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'var(--brown-primary)',
                    color: 'var(--gold-light)',
                    borderRadius: '8px',
                    padding: '0.35rem 0.65rem',
                    textAlign: 'center',
                    lineHeight: 1.1,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    border: '1px solid var(--gold-antique)',
                  }}
                >
                  <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800 }}>{item.day || '10'}</span>
                  <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', tracking: '0.05em', color: 'var(--gold-antique)', fontWeight: 700 }}>{item.month || 'DEC'}</span>
                </div>

                <span
                  style={{
                    position: 'absolute',
                    bottom: '10px',
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
                  {item.category}
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
                    <Star size={11} fill="var(--brown-primary)" /> Featured
                  </span>
                )}
              </div>

              {/* Event Body */}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--brown-primary)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--gold-antique)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={13} />
                      <span>{item.displayDate || item.date}</span>
                    </div>
                    {item.time && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brown-primary)' }}>
                        <Clock size={13} />
                        <span>{item.time}</span>
                      </div>
                    )}
                    {item.location && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brown-muted)' }}>
                        <MapPin size={13} />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>

                  <p style={{ fontSize: '0.83rem', color: 'var(--brown-muted)', lineHeight: 1.5, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-beige)' }}>
                  <button
                    onClick={() => handleOpenEditEvent(item)}
                    className="admin-btn admin-btn--secondary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                  >
                    <Edit3 size={14} /> Edit Event
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(item.id, item.title)}
                    className="admin-btn admin-btn--danger"
                    style={{ padding: '0.4rem 0.65rem' }}
                    title="Delete Event"
                  >
                    <Trash2 size={14} />
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
                {modalType === 'addEvent' ? 'Add New Upcoming Event' : 'Edit Event Details'}
              </h3>
              <button className="admin-modal-close" onClick={() => setModalType(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleModalSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Event Title *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Parish Feast — Our Lady of Loretto"
                    value={modalData.title}
                    onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Category *</label>
                    <select
                      className="admin-form-control"
                      value={modalData.category}
                      onChange={(e) => setModalData({ ...modalData, category: e.target.value })}
                      required
                    >
                      <option value="Feast">Feast</option>
                      <option value="Liturgy">Liturgy</option>
                      <option value="Youth">Youth</option>
                      <option value="Catechism">Catechism</option>
                      <option value="Organization">Organization</option>
                      <option value="Parish">Parish</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Event Date *</label>
                    <input
                      type="date"
                      className="admin-form-control"
                      value={modalData.date}
                      onChange={(e) => setModalData({ ...modalData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Timing *</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. 10:00 AM onwards or 5:00 PM"
                      value={modalData.time}
                      onChange={(e) => setModalData({ ...modalData, time: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Location / Venue *</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. Our Lady of Loretto Church or Parish Hall"
                      value={modalData.location}
                      onChange={(e) => setModalData({ ...modalData, location: e.target.value })}
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
                    <span>Mark as <strong>Featured Event</strong> (Highlight on Homepage)</span>
                  </label>
                </div>

                <div className="admin-form-group">
                  <label>Cover Photo Image URL *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. images/hero-community.jpg or image URL"
                    value={modalData.image}
                    onChange={(e) => setModalData({ ...modalData, image: e.target.value })}
                    required
                  />
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--brown-muted)', width: '100%' }}>Quick Photo Presets:</span>
                    {presetImages.map((preset) => (
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
                  <label>Event Description *</label>
                  <textarea
                    className="admin-form-control"
                    rows="4"
                    placeholder="Detailed description of the upcoming event, Mass timings, procession, or program schedule..."
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
                  <Save size={15} /> Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventsSection;
