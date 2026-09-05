import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import { Plus, Trash2, Edit3, Save, CheckCircle2, X } from 'lucide-react';

const AdminGallerySection = () => {
  const { galleryImages, galleryCategories, updateGalleryImages } = useParishData();
  const [images, setImages] = useState(galleryImages);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [activeImageId, setActiveImageId] = useState(null);
  const [formState, setFormState] = useState({ title: '', category: 'Church', src: '', alt: '' });
  const [savedSuccess, setSavedSuccess] = useState('');

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setModalMode('add');
    setActiveImageId(null);
    setFormState({
      title: '',
      category: selectedCategory !== 'All' ? selectedCategory : 'Church',
      src: `${import.meta.env.BASE_URL}images/hero-exterior.jpg`,
      alt: 'Our Lady of Loretto Church',
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (img) => {
    setModalMode('edit');
    setActiveImageId(img.id);
    setFormState({ ...img });
    setIsModalOpen(true);
  };

  // Save Modal Form
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newImg = {
        ...formState,
        id: Date.now(),
      };
      const updated = [newImg, ...images];
      setImages(updated);
      updateGalleryImages(updated);
      setSavedSuccess('New photo added to gallery!');
    } else {
      const updated = images.map(img => img.id === activeImageId ? { ...img, ...formState } : img);
      setImages(updated);
      updateGalleryImages(updated);
      setSavedSuccess('Gallery photo updated!');
    }

    setIsModalOpen(false);
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  const handleDeleteImage = (id) => {
    if (window.confirm('Are you sure you want to delete this photo from the gallery?')) {
      const updated = images.filter(img => img.id !== id);
      setImages(updated);
      updateGalleryImages(updated);
      setSavedSuccess('Photo removed from gallery.');
      setTimeout(() => setSavedSuccess(''), 3000);
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="admin-card__title">Photo Gallery Management</h2>
          <p className="admin-card__subtitle">Add, edit, or delete photo gallery images displayed across the website.</p>
        </div>
        <button onClick={handleOpenAddModal} className="admin-btn admin-btn--primary">
          <Plus size={16} /> Add Photo
        </button>
      </div>

      {savedSuccess && (
        <div className="admin-alert admin-alert--success">
          <CheckCircle2 size={18} />
          <span>{savedSuccess}</span>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-beige)', paddingBottom: '0.75rem' }}>
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '20px',
              border: selectedCategory === cat ? '1.5px solid var(--gold-antique)' : '1px solid var(--border-beige)',
              backgroundColor: selectedCategory === cat ? 'var(--brown-primary)' : 'var(--cream)',
              color: selectedCategory === cat ? 'var(--gold-light)' : 'var(--brown-muted)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {cat} {cat === 'All' ? `(${images.length})` : `(${images.filter(i => i.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {filteredImages.map((img) => (
          <div
            key={img.id}
            style={{
              background: 'var(--cream)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ position: 'relative', height: '180px', backgroundColor: 'var(--border-beige)', overflow: 'hidden' }}>
              <img
                src={img.src}
                alt={img.alt || img.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/hero-exterior.jpg`; }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(53,21,27,0.85)',
                  color: 'var(--gold-light)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.6rem',
                  borderRadius: '12px',
                  border: '1px solid var(--gold-antique)',
                }}
              >
                {img.category}
              </span>
            </div>

            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--brown-primary)', margin: '0 0 0.3rem' }}>
                  {img.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--brown-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {img.alt}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-beige)' }}>
                <button onClick={() => handleOpenEditModal(img)} className="admin-btn admin-btn--secondary" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}>
                  <Edit3 size={13} /> Edit
                </button>
                <button onClick={() => handleDeleteImage(img.id)} className="admin-btn admin-btn--danger" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}>
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── MODAL POPUP FOR ADD / EDIT GALLERY PHOTO ── */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {modalMode === 'add' ? 'Add Photo to Gallery' : 'Edit Gallery Photo'}
              </h3>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveModal}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Photo Title *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Marian Devotion / Church Facade"
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Category *</label>
                  <select
                    className="admin-form-control"
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    required
                  >
                    {galleryCategories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Image URL / Source *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. images/gallery-1.jpg or full image URL"
                    value={formState.src}
                    onChange={(e) => setFormState({ ...formState, src: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Alt Description</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="Brief accessibility description of the image"
                    value={formState.alt}
                    onChange={(e) => setFormState({ ...formState, alt: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn admin-btn--secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  <Save size={15} /> {modalMode === 'add' ? 'Add Photo' : 'Save Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallerySection;
