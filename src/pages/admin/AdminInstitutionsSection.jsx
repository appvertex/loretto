import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import ImageUploadField from '../../components/common/ImageUploadField';
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  Building2,
  Search,
  X,
  Phone,
  Mail,
  MapPin,
  UserCheck,
  Calendar,
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  'Educational Institution',
  'Convent & Religious House',
  'Parish Facility',
  'Health & Social Service',
  'Other Center',
];

const AdminInstitutionsSection = () => {
  const { institutions, addInstitution, updateInstitution, deleteInstitution } = useParishData();

  const [searchTerm, setSearchTerm] = useState('');
  const [savedSuccess, setSavedSuccess] = useState('');
  const [modalType, setModalType] = useState(null); // 'add' | 'edit'
  const [modalData, setModalData] = useState({});

  const filteredInstitutions = (institutions || []).filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.konkaniName && item.konkaniName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
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
      category: 'Educational Institution',
      established: '1970',
      head: '',
      phone: '',
      email: '',
      address: 'Loretto, Bantwal - 574211',
      description: '',
      image: `${import.meta.env.BASE_URL}images/hero-community.jpg`,
      facilitiesInput: 'Smart Classrooms, Library, Sports Ground',
    });
  };

  const handleOpenEdit = (item) => {
    setModalType('edit');
    setModalData({
      ...item,
      facilitiesInput: (item.facilities || []).join(', '),
    });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();

    const facilities = (modalData.facilitiesInput || '')
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      ...modalData,
      facilities,
    };
    delete payload.facilitiesInput;

    if (modalType === 'add') {
      const created = addInstitution(payload);
      showSuccess(`Institution "${created.name}" added successfully!`);
    } else if (modalType === 'edit') {
      updateInstitution(payload.id, payload);
      showSuccess('Institution details updated successfully!');
    }

    setModalType(null);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the institution record for "${name}"?`)) {
      deleteInstitution(id);
      showSuccess('Institution record deleted.');
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
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Building2 size={22} style={{ color: 'var(--gold-antique)' }} />
              <h2 className="admin-card__title" style={{ margin: 0 }}>
                Parish Institutions (ಸಂಸ್ಥಾವೊ) Management
              </h2>
            </div>
            <p className="admin-card__subtitle">
              Manage schools, convents, community halls, and religious institutions associated with Loretto Church.
            </p>
          </div>

          <button onClick={handleOpenAdd} className="admin-btn admin-btn--primary">
            <Plus size={16} /> Add New Institution
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <input
            type="text"
            className="admin-form-control"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by institution name, Konkani title, or category..."
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

        {/* Grid Cards List */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredInstitutions.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--cream)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <img
                    src={item.image || `${import.meta.env.BASE_URL}images/hero-community.jpg`}
                    alt={item.name}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      border: '1px solid var(--border-gold)',
                      flexShrink: 0,
                    }}
                  />

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
                      🏛️ {item.category || 'Institution'}
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

                    {item.established && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--brown-muted)' }}>
                        Est. {item.established}
                      </span>
                    )}
                  </div>
                </div>

                {item.head && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--brown-muted)', marginTop: '0.65rem' }}>
                    <strong>Head:</strong> {item.head}
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

      {/* ADD / EDIT MODAL */}
      {modalType && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {modalType === 'add' ? 'Add New Parish Institution' : 'Edit Institution Details'}
              </h3>
              <button className="admin-modal-close" onClick={() => setModalType(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleModalSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Institution Name (English) *</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. Loretto High School"
                      value={modalData.name || ''}
                      onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Konkani Title (ಸಂಸ್ಥಾ ನಾಂವ್)</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. ಲೊರೆಟ್ಟೊ ಹೈಸ್ಕೂಲ್"
                      value={modalData.konkaniName || ''}
                      onChange={(e) => setModalData({ ...modalData, konkaniName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Category *</label>
                    <select
                      className="admin-form-control"
                      value={modalData.category || 'Educational Institution'}
                      onChange={(e) => setModalData({ ...modalData, category: e.target.value })}
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Established Year</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. 1965"
                      value={modalData.established || ''}
                      onChange={(e) => setModalData({ ...modalData, established: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Head of Institution / Correspondent</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. Correspondent: Rev. Fr. Parish Priest"
                      value={modalData.head || ''}
                      onChange={(e) => setModalData({ ...modalData, head: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Contact Phone</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. +91 824 2345111"
                      value={modalData.phone || ''}
                      onChange={(e) => setModalData({ ...modalData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="admin-form-control"
                      placeholder="e.g. school@loretto.edu.in"
                      value={modalData.email || ''}
                      onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                    />
                  </div>

                  <ImageUploadField id="institution-image" label="Institution Photo" value={modalData.image} onChange={(image) => setModalData({ ...modalData, image })} placeholder="Paste an image URL or upload a file" />
                </div>

                <div className="admin-form-group">
                  <label>Full Address</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Church Campus, Loretto, Bantwal - 574211"
                    value={modalData.address || ''}
                    onChange={(e) => setModalData({ ...modalData, address: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    rows={3}
                    className="admin-form-control"
                    placeholder="Brief history, background, and mission of the institution..."
                    value={modalData.description || ''}
                    onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Key Facilities / Highlights (Comma-separated)</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Smart Classrooms, Science Lab, Sports Ground, Bus Service"
                    value={modalData.facilitiesInput || ''}
                    onChange={(e) => setModalData({ ...modalData, facilitiesInput: e.target.value })}
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
                  <Save size={15} /> Save Institution Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInstitutionsSection;
