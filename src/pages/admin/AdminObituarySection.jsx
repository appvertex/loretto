import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import ImageUploadField from '../../components/common/ImageUploadField';
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  Flame,
  Search,
  X,
  Calendar,
  User,
  Church,
} from 'lucide-react';

// Helper: Photo thumb with fallback
const PhotoThumb = ({ photo, name }) => {
  const [err, setErr] = useState(false);
  if (!photo || err) {
    const initials = (name || '?')
      .replace(/^(Late|Mr|Mrs|Miss|Fr|Sr)\.?\s+/i, '')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    return (
      <div
        style={{
          width: 105,
          height: 125,
          borderRadius: 'var(--radius-sm)',
          background: 'var(--burgundy-dark)',
          color: 'var(--gold-light)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          fontWeight: 700,
          border: '1px solid var(--border-gold)',
          flexShrink: 0,
        }}
      >
        <Flame size={20} style={{ opacity: 0.8 }} />
        <span>{initials || '✝'}</span>
      </div>
    );
  }
  return (
    <img
      src={photo}
      alt={name}
      style={{
        width: 105,
        height: 125,
        borderRadius: 'var(--radius-sm)',
        objectFit: 'cover',
        border: '1px solid var(--border-gold)',
        flexShrink: 0,
      }}
      onError={() => setErr(true)}
    />
  );
};

const AdminObituarySection = () => {
  const { obituaries, addObituary, updateObituary, deleteObituary, wards } = useParishData();

  const [searchTerm, setSearchTerm] = useState('');
  const [savedSuccess, setSavedSuccess] = useState('');
  const [modalType, setModalType] = useState(null); // 'add' | 'edit'
  const [modalData, setModalData] = useState({});

  const filteredObituaries = obituaries.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.konkaniName && item.konkaniName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.ward && item.ward.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const showSuccess = (msg) => {
    setSavedSuccess(msg);
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  const handleOpenAdd = () => {
    setModalType('add');
    setModalData({
      name: '',
      konkaniName: '',
      photo: '',
      age: 70,
      dateOfDeath: new Date().toISOString().split('T')[0],
      ward: 'Kuprady Ward',
      funeralDetails: 'Funeral Mass will be offered at Our Lady of Loretto Church followed by burial.',
      survivedBy: '',
      tribute: 'Eternal rest grant unto him/her, O Lord, and let perpetual light shine upon him/her.',
    });
  };

  const handleOpenEdit = (item) => {
    setModalType('edit');
    setModalData({ ...item });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();

    if (modalType === 'add') {
      const created = addObituary(modalData);
      showSuccess(`Obituary record for "${created.name}" added successfully!`);
    } else if (modalType === 'edit') {
      updateObituary(modalData.id, modalData);
      showSuccess('Obituary record updated successfully!');
    }

    setModalType(null);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the obituary record for "${name}"?`)) {
      deleteObituary(id);
      showSuccess('Obituary record deleted.');
    }
  };

  return (
    <div>
      {/* SUCCESS ALERT */}
      {savedSuccess && (
        <div className="admin-alert admin-alert--success">
          <CheckCircle2 size={18} />
          <span>{savedSuccess}</span>
        </div>
      )}

      <div className="admin-card">
        {/* Card Header */}
        <div
          className="admin-card__header"
          style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Flame size={22} style={{ color: 'var(--gold-antique)' }} />
              <h2 className="admin-card__title" style={{ margin: 0 }}>
                Obituaries (ಮರಣಾಂ) Management
              </h2>
            </div>
            <p className="admin-card__subtitle">
              Manage deceased parishioner memorial records, photos, funeral mass schedules, and family tributes.
            </p>
          </div>

          <button onClick={handleOpenAdd} className="admin-btn admin-btn--primary">
            <Plus size={16} /> Add New Obituary Notice
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <input
            type="text"
            className="admin-form-control"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by deceased name, Konkani title, or ward..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--brown-muted)',
            }}
          />
        </div>

        {/* Obituary Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredObituaries.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--cream)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <PhotoThumb photo={item.photo} name={item.name} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--gold-antique)',
                        letterSpacing: '0.06em',
                        display: 'block',
                        marginBottom: '0.15rem',
                      }}
                    >
                      📍 {item.ward || 'Parish Ward'}
                    </span>

                    {item.konkaniName && (
                      <h4
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--brown-primary)',
                          margin: '0 0 0.15rem',
                          lineHeight: 1.25,
                        }}
                      >
                        {item.konkaniName}
                      </h4>
                    )}

                    <div
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                        margin: 0,
                      }}
                    >
                      {item.name}
                    </div>

                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--brown-muted)',
                        marginTop: '0.4rem',
                        display: 'flex',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      {item.age && <span>Age: {item.age} Yrs</span>}
                      {item.dateOfDeath && <span>Died: {item.dateOfDeath}</span>}
                    </div>
                  </div>
                </div>

                {item.funeralDetails && (
                  <div
                    style={{
                      marginTop: '0.85rem',
                      padding: '0.6rem 0.75rem',
                      background: 'rgba(255,255,255,0.7)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '2.5px solid var(--border-gold)',
                      fontSize: '0.78rem',
                      color: 'var(--brown-muted)',
                      lineHeight: 1.45,
                    }}
                  >
                    <strong>Funeral:</strong> {item.funeralDetails}
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div
                style={{
                  padding: '0.75rem 1.25rem',
                  background: 'rgba(0,0,0,0.02)',
                  borderTop: '1px solid var(--border-beige)',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="admin-btn admin-btn--secondary"
                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                  >
                    <Edit3 size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="admin-btn admin-btn--danger"
                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ADD / EDIT MODAL                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {modalType && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {modalType === 'add' ? 'Add New Obituary Notice' : 'Edit Obituary Record'}
              </h3>
              <button className="admin-modal-close" onClick={() => setModalType(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleModalSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Deceased Full Name (English) *</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. Late Mr. Ligory D'Souza"
                      value={modalData.name || ''}
                      onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Konkani Title / Name (ಮರಣಾಂ ಖಬರ್)</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. ಅಮರ್ ಮಾನೇಸ್ತ್ ಲಿಗೋರಿ ಡಿಸೋಜಾ"
                      value={modalData.konkaniName || ''}
                      onChange={(e) => setModalData({ ...modalData, konkaniName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Age at Demise *</label>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      className="admin-form-control"
                      placeholder="e.g. 78"
                      value={modalData.age || ''}
                      onChange={(e) => setModalData({ ...modalData, age: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Date of Demise *</label>
                    <input
                      type="date"
                      className="admin-form-control"
                      value={modalData.dateOfDeath || ''}
                      onChange={(e) => setModalData({ ...modalData, dateOfDeath: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Parish Ward</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. Kuprady Ward"
                      value={modalData.ward || ''}
                      onChange={(e) => setModalData({ ...modalData, ward: e.target.value })}
                    />
                  </div>

                  <ImageUploadField id="obituary-profile-photo" label="Profile Photo" value={modalData.photo} onChange={(photo) => setModalData({ ...modalData, photo })} placeholder="Paste an image URL or upload a file" />
                </div>

                <div className="admin-form-group">
                  <label>Funeral Services & Burial Details</label>
                  <textarea
                    rows={2}
                    className="admin-form-control"
                    placeholder="e.g. Funeral Mass at Our Lady of Loretto Church on Sept 4 at 3:30 PM..."
                    value={modalData.funeralDetails || ''}
                    onChange={(e) => setModalData({ ...modalData, funeralDetails: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Bereaved Family / Survived By</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Wife: Monthi D'Souza | Children: Melwyn, Steevan & Sunitha"
                    value={modalData.survivedBy || ''}
                    onChange={(e) => setModalData({ ...modalData, survivedBy: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Tribute / Prayer Note</label>
                  <textarea
                    rows={2}
                    className="admin-form-control"
                    placeholder="e.g. Eternal rest grant unto him, O Lord, and let perpetual light shine upon him."
                    value={modalData.tribute || ''}
                    onChange={(e) => setModalData({ ...modalData, tribute: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="admin-btn admin-btn--secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  <Save size={15} /> Save Obituary Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminObituarySection;
