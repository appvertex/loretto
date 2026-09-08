import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import { newsCategories as initialCategories } from '../../data/news';
import ImageUploadField from '../../components/common/ImageUploadField';
import BulkImageUploadField from '../../components/common/BulkImageUploadField';
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  Newspaper,
  Calendar,
  Search,
  X,
  Star,
  Tag,
  Sparkles
} from 'lucide-react';

const AdminNewsSection = () => {
  const { news, addNewsItem, updateNewsItem, deleteNewsItem } = useParishData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [savedSuccess, setSavedSuccess] = useState('');

  // Modal States
  const [modalType, setModalType] = useState(null); // 'addNews' | 'editNews'
  const [modalData, setModalData] = useState({});

  // Filtered News Articles
  const filteredNews = (news || []).filter((item) => {
    const matchesCategory =
      selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter;
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
      (item.content && item.content.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // -------------------------------------------------------------
  // MODAL OPEN HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddNews = () => {
    setModalType('addNews');
    const today = new Date().toISOString().split('T')[0];
    setModalData({
      title: '',
      category: 'Parish',
      date: today,
      image: `${import.meta.env.BASE_URL}images/hero-community.jpg`,
      subImages: [],
      featured: false,
      excerpt: '',
      content: '',
    });
  };

  const handleOpenEditNews = (item) => {
    setModalType('editNews');
    setModalData({
      id: item.id,
      title: item.title || '',
      category: item.category || 'Parish',
      date: item.date || new Date().toISOString().split('T')[0],
      image: item.image || `${import.meta.env.BASE_URL}images/hero-community.jpg`,
      subImages: item.subImages || [],
      featured: item.featured || false,
      excerpt: item.excerpt || '',
      content: item.content || '',
    });
  };

  // -------------------------------------------------------------
  // MODAL SUBMIT HANDLER
  // -------------------------------------------------------------
  const handleModalSubmit = (e) => {
    e.preventDefault();

    if (modalType === 'addNews') {
      const created = addNewsItem(modalData);
      setSavedSuccess(`News article "${created.title}" published successfully!`);
    } else if (modalType === 'editNews') {
      updateNewsItem(modalData.id, modalData);
      setSavedSuccess('News article updated successfully!');
    }

    setModalType(null);
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  const handleDeleteNews = (id, title) => {
    if (window.confirm(`Are you sure you want to delete news article "${title}"? This cannot be undone.`)) {
      deleteNewsItem(id);
      setSavedSuccess('News article deleted.');
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

      {/* ── MAIN NEWS WORKSPACE ── */}
      <div className="admin-card">
        <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="admin-card__title">Parish News & Announcements (ಖಬ್ರೊ ಆನಿ ಕಳವ್ಣ್ಯೊ)</h2>
            <p className="admin-card__subtitle">Publish and edit news articles, feast notices, pastoral messages, and parish bulletins.</p>
          </div>
          <button onClick={handleOpenAddNews} className="admin-btn admin-btn--primary">
            <Plus size={16} /> Add News Article
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
              placeholder="Search news by title, category, or content..."
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

        {/* News Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredNews.map((item) => (
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
              {/* Photo Banner */}
              <div style={{ position: 'relative', height: '160px', backgroundColor: 'var(--border-beige)', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/hero-community.jpg`; }}
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

              {/* News Body */}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--gold-antique)', fontWeight: 600, marginBottom: '0.4rem' }}>
                    <Calendar size={13} />
                    <span>{item.displayDate || item.date}</span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--brown-primary)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.83rem', color: 'var(--brown-muted)', lineHeight: 1.5, margin: '0 0 0.75rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.excerpt || item.content}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-beige)' }}>
                  <button
                    onClick={() => handleOpenEditNews(item)}
                    className="admin-btn admin-btn--secondary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                  >
                    <Edit3 size={14} /> Edit News
                  </button>
                  <button
                    onClick={() => handleDeleteNews(item.id, item.title)}
                    className="admin-btn admin-btn--danger"
                    style={{ padding: '0.4rem 0.65rem' }}
                    title="Delete News Article"
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
                {modalType === 'addNews' ? 'Publish New News Article' : 'Edit News Article'}
              </h3>
              <button className="admin-modal-close" onClick={() => setModalType(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleModalSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Article Headline / Title *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Annual Parish Feast Celebrations 2026"
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
                      <option value="Parish">Parish</option>
                      <option value="Feast">Feast</option>
                      <option value="Liturgy">Liturgy</option>
                      <option value="Youth">Youth</option>
                      <option value="Catechism">Catechism</option>
                      <option value="Organization">Organization</option>
                      <option value="Newsletter">Newsletter</option>
                      <option value="Announcement">Announcement</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Publish Date *</label>
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
                    <span>Mark as <strong>Featured News Article</strong> (Highlight on Home & News section)</span>
                  </label>
                </div>

                <ImageUploadField id="news-cover-image" label="Cover Photo Image *" value={modalData.image} onChange={(image) => setModalData({ ...modalData, image })} placeholder="Paste an image URL or upload a file" required />

                <BulkImageUploadField
                  images={modalData.subImages || []}
                  onChange={(subImages) => setModalData({ ...modalData, subImages })}
                />

                <div className="admin-form-group">
                  <label>Short Excerpt / Summary *</label>
                  <textarea
                    className="admin-form-control"
                    rows="3"
                    placeholder="Brief 1-2 sentence preview shown on news cards..."
                    value={modalData.excerpt}
                    onChange={(e) => setModalData({ ...modalData, excerpt: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="admin-form-group">
                  <label>Full Article Content</label>
                  <textarea
                    className="admin-form-control"
                    rows="6"
                    placeholder="Detailed full news article text..."
                    value={modalData.content}
                    onChange={(e) => setModalData({ ...modalData, content: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setModalType(null)} className="admin-btn admin-btn--secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  <Save size={15} /> Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsSection;
