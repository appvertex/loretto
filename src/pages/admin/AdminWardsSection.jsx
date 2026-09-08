import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import ImageUploadField from '../../components/common/ImageUploadField';
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  Image as ImageIcon,
  Search,
  ArrowLeft,
  X,
  Users,
} from 'lucide-react';

// ─── Small helper: renders a photo or initials fallback ───────────────────────
const OfficerThumb = ({ photo, name }) => {
  const [err, setErr] = useState(false);
  if (!photo || err) {
    const initials = (name || '?')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    return (
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'var(--brown-primary)',
          color: 'var(--gold-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
    );
  }
  return (
    <img
      src={photo}
      alt={name}
      style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      onError={() => setErr(true)}
    />
  );
};

// ─── Officer Card Component ────────────────────────────────────────────────────
const OfficerCard = ({ officer, roleLabel, roleKonkani, onEdit }) => {
  if (!officer) return null;
  const isEmpty = !officer.name;
  return (
    <div
      style={{
        background: 'var(--cream)',
        border: '1px solid var(--border-gold)',
        borderRadius: 'var(--radius-md)',
        padding: '1.1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <OfficerThumb photo={officer.photo} name={officer.name} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            color: 'var(--gold-antique)',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          {roleLabel} {roleKonkani && <span style={{ opacity: 0.7 }}>· {roleKonkani}</span>}
        </div>
        {isEmpty ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--brown-muted)', margin: '0.2rem 0 0' }}>Not assigned yet</p>
        ) : (
          <>
            <div style={{ fontWeight: 700, color: 'var(--brown-primary)', fontSize: '1rem' }}>{officer.name}</div>
            {officer.konkaniName && <div style={{ fontSize: '0.82rem', color: 'var(--brown-muted)' }}>{officer.konkaniName}</div>}
            {officer.phone && (
              <a href={`tel:${officer.phone}`} style={{ fontSize: '0.8rem', color: 'var(--gold-antique)', textDecoration: 'none' }}>
                📞 {officer.phone}
              </a>
            )}
          </>
        )}
      </div>
      <button onClick={onEdit} className="admin-btn admin-btn--secondary" style={{ flexShrink: 0 }}>
        <Edit3 size={14} /> {isEmpty ? 'Add' : 'Edit'}
      </button>
    </div>
  );
};

// ─── Officer Form Component (for Modal Body) ───────────────────────────────────
const OfficerForm = ({ data, onChange, roleLabel }) => (
  <>
    <p style={{ fontSize: '0.8rem', color: 'var(--gold-antique)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
      {roleLabel} Details
    </p>
    <div className="admin-form-grid">
      <div className="admin-form-group">
        <label>Full Name *</label>
        <input
          type="text"
          className="admin-form-control"
          placeholder="e.g. Mr. John D'Souza"
          value={data.name || ''}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
        />
      </div>
      <div className="admin-form-group">
        <label>Konkani / Tulu Name</label>
        <input
          type="text"
          className="admin-form-control"
          placeholder="e.g. ಮಾನೇಸ್ತ್ ಜಾನ್ ಡಿಸೋಜಾ"
          value={data.konkaniName || ''}
          onChange={(e) => onChange({ ...data, konkaniName: e.target.value })}
        />
      </div>
    </div>
    <div className="admin-form-grid">
      <div className="admin-form-group">
        <label>Phone Number</label>
        <input
          type="text"
          className="admin-form-control"
          placeholder="+91 98450 12345"
          value={data.phone || ''}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
        />
      </div>
      <div className="admin-form-group">
        <label>Address / Area</label>
        <input
          type="text"
          className="admin-form-control"
          placeholder="e.g. Kuprady Cross, Loretto"
          value={data.address || ''}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
        />
      </div>
    </div>
    <ImageUploadField
      id={`ward-officer-photo-${roleLabel.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
      label="Profile Photo"
      value={data.photo}
      onChange={(photo) => onChange({ ...data, photo })}
      placeholder="Paste an image URL or upload a file"
    />
    <div>
      {data.photo && (
        <img
          src={data.photo}
          alt="preview"
          style={{ marginTop: '0.5rem', width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-gold)' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
    </div>
  </>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const AdminWardsSection = () => {
  const {
    wards,
    addWard,
    updateWard,
    deleteWard,
    addWardImage,
    deleteWardImage,
  } = useParishData();

  const [selectedWardId, setSelectedWardId] = useState(null);
  const [activeWardSubTab, setActiveWardSubTab] = useState('officers'); // 'officers' | 'gallery'
  const [searchTerm, setSearchTerm] = useState('');
  const [savedSuccess, setSavedSuccess] = useState('');

  // Modal: type + data
  const [modalType, setModalType] = useState(null);
  // addWard / editWard / addWardImage / editPresident / editVicePresident / editSecretary / editGurkar / editRep_X
  const [modalData, setModalData] = useState({});

  const selectedWard = wards.find((w) => String(w.id) === String(selectedWardId));


  const filteredWards = wards.filter(
    (w) =>
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (w.konkaniName && w.konkaniName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (w.patronSaint && w.patronSaint.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const showSuccess = (msg) => {
    setSavedSuccess(msg);
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  // ── Modal openers ────────────────────────────────────────────────────────────
  const handleOpenAddWard = () => {
    setModalType('addWard');
    setModalData({
      name: '', konkaniName: '', patronSaint: '', konkaniPatron: '',
      feastDate: 'May 1', area: '', meetingSchedule: '1st Sunday of every month at 4:00 PM',
      image: `${import.meta.env.BASE_URL}images/gallery-2.jpg`,
      gurkarName: '', gurkarPhone: '',
    });
  };

  const handleOpenEditWard = (ward) => {
    setModalType('editWard');
    setModalData({
      id: ward.id,
      name: ward.name || '', konkaniName: ward.konkaniName || '',
      patronSaint: ward.patronSaint || '', konkaniPatron: ward.konkaniPatron || '',
      feastDate: ward.feastDate || '', area: ward.area || '',
      meetingSchedule: ward.meetingSchedule || '',
      image: ward.image || '',
      gurkarName: ward.gurkar?.name || '',
      gurkarPhone: ward.gurkar?.phone || '',
      gurkarAddress: ward.gurkar?.address || '',
    });
  };

  const handleOpenAddWardImage = () => {
    setModalType('addWardImage');
    setModalData({ src: `${import.meta.env.BASE_URL}images/hero-exterior.jpg`, caption: 'Ward Gathering' });
  };

  const handleOpenEditOfficer = (officerKey, ward) => {
    setModalType(officerKey);
    const key = officerKey.replace('edit', '').replace(/^./, (c) => c.toLowerCase());
    const officerData = ward[key] || {};
    setModalData({ ...officerData });
  };

  const handleOpenEditGurkar = (ward) => {
    setModalType('editGurkar');
    const g = ward.gurkar || {};
    setModalData({
      name: g.name || '',
      konkaniName: g.konkaniName || '',
      phone: g.phone || '',
      address: g.address || '',
      photo: g.photo || '',
      role: g.role || 'Gurkar (Ward Leader)',
      konkaniRole: g.konkaniRole || 'ಗುರ್ಕಾರ್',
    });
  };

  const handleOpenEditRep = (index, rep) => {
    setModalType(`editRep_${index}`);
    setModalData({
      name: rep.name || '',
      konkaniName: rep.konkaniName || '',
      phone: rep.phone || '',
      photo: rep.photo || '',
      role: rep.role || `Council Representative ${index + 1}`,
      konkaniRole: rep.konkaniRole || 'ಪ್ರತಿನಿದಿ',
    });
  };

  // ── Modal submit ─────────────────────────────────────────────────────────────
  const handleModalSubmit = (e) => {
    e.preventDefault();

    if (modalType === 'addWard') {
      const newWard = addWard({
        name: modalData.name, konkaniName: modalData.konkaniName,
        patronSaint: modalData.patronSaint, konkaniPatron: modalData.konkaniPatron,
        feastDate: modalData.feastDate, area: modalData.area,
        meetingSchedule: modalData.meetingSchedule, image: modalData.image,
        gurkar: { name: modalData.gurkarName, phone: modalData.gurkarPhone, role: 'Gurkar (Ward Leader)' },
      });
      showSuccess(`Ward "${newWard.name}" created successfully!`);

    } else if (modalType === 'editWard') {
      updateWard(modalData.id, {
        name: modalData.name, konkaniName: modalData.konkaniName,
        patronSaint: modalData.patronSaint, konkaniPatron: modalData.konkaniPatron,
        feastDate: modalData.feastDate, area: modalData.area,
        meetingSchedule: modalData.meetingSchedule, image: modalData.image,
        gurkar: {
          ...selectedWard?.gurkar,
          name: modalData.gurkarName,
          phone: modalData.gurkarPhone,
          address: modalData.gurkarAddress,
        },
      });
      showSuccess('Ward information updated!');

    } else if (modalType === 'addWardImage') {
      addWardImage(selectedWardId, modalData);
      showSuccess('Photo added to Ward Gallery!');

    } else if (modalType === 'editPresident') {
      updateWard(selectedWardId, { president: { ...modalData } });
      showSuccess('President information saved!');

    } else if (modalType === 'editVicePresident') {
      updateWard(selectedWardId, { vicePresident: { ...modalData } });
      showSuccess('Vice President information saved!');

    } else if (modalType === 'editSecretary') {
      updateWard(selectedWardId, { secretary: { ...modalData } });
      showSuccess('Secretary information saved!');

    } else if (modalType === 'editGurkar') {
      updateWard(selectedWardId, {
        gurkar: {
          ...selectedWard?.gurkar,
          name: modalData.name,
          konkaniName: modalData.konkaniName,
          phone: modalData.phone,
          address: modalData.address,
          photo: modalData.photo,
        },
      });
      showSuccess('Gurkar details saved!');

    } else if (modalType && modalType.startsWith('editRep_')) {
      const repIndex = parseInt(modalType.split('_')[1], 10);
      const currentReps = selectedWard?.representatives || [];
      const updatedReps = [...currentReps];
      updatedReps[repIndex] = {
        ...updatedReps[repIndex],
        name: modalData.name,
        konkaniName: modalData.konkaniName,
        phone: modalData.phone,
        photo: modalData.photo,
      };
      updateWard(selectedWardId, { representatives: updatedReps });
      showSuccess('Council Representative details saved!');
    }

    setModalType(null);
  };

  const handleDeleteWard = (wardId, wardName) => {
    if (window.confirm(`Delete "${wardName}"? This action cannot be undone.`)) {
      deleteWard(wardId);
      if (String(selectedWardId) === String(wardId)) setSelectedWardId(null);
      showSuccess('Ward deleted.');
    }
  };

  // modal title helper
  const modalTitle =
    {
      addWard: 'Add New Parish Ward',
      editWard: 'Edit Ward Information',
      addWardImage: 'Add Ward Photo',
      editPresident: 'Edit President Details',
      editVicePresident: 'Edit Vice President Details',
      editSecretary: 'Edit Secretary Details',
      editGurkar: 'Edit Gurkar (Ward Leader) Details',
    }[modalType] ||
    (modalType && modalType.startsWith('editRep_')
      ? `Edit ${modalData.role || 'Council Representative'} Details`
      : '');

  // ═══════════════════════════════════════════════════════════════════════════════
  return (
    <div>
      {/* SUCCESS BANNER */}
      {savedSuccess && (
        <div className="admin-alert admin-alert--success">
          <CheckCircle2 size={18} />
          <span>{savedSuccess}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* MODE A – WARD LIST                                                    */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {!selectedWardId || !selectedWard ? (
        <div className="admin-card">
          <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                <h2 className="admin-card__title" style={{ margin: 0 }}>Parish Wards (ವಾಡೆ) Management</h2>
                <span style={{ background: 'var(--cream)', border: '1px solid var(--border-gold)', color: 'var(--brown-primary)', fontSize: '0.82rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '14px', display: 'inline-flex', alignItems: 'center' }}>
                  <span>{wards.length} Wards (ವಾಡೆ)</span>
                </span>
              </div>
              <p className="admin-card__subtitle">Manage wards, Catholic family counts, office bearers, leaders, and photo galleries.</p>
            </div>
            <button onClick={handleOpenAddWard} className="admin-btn admin-btn--primary">
              <Plus size={16} /> Add New Ward
            </button>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input
              type="text"
              className="admin-form-control"
              style={{ paddingLeft: '2.5rem' }}
              placeholder="Search ward by name, Konkani title, or patron saint..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--brown-muted)' }} />
          </div>

          {/* Wards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {filteredWards.map((ward) => (
              <div
                key={ward.id}
                style={{ background: 'var(--cream)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* Banner image */}
                <div style={{ position: 'relative', height: '140px', backgroundColor: 'var(--border-beige)', overflow: 'hidden' }}>
                  <img
                    src={ward.image}
                    alt={ward.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/hero-exterior.jpg`; }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--brown-primary)', margin: '0 0 0.2rem' }}>{ward.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gold-antique)', fontWeight: 600, margin: '0 0 0.6rem' }}>{ward.konkaniName || ward.patronSaint}</p>
                    <div style={{ fontSize: '0.82rem', color: 'var(--brown-muted)', lineHeight: 1.6 }}>
                      <div><strong>Patron:</strong> {ward.patronSaint}</div>
                      <div><strong>Gurkar:</strong> {ward.gurkar?.name || 'Not assigned'}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-beige)' }}>
                    <button
                      onClick={() => { setSelectedWardId(ward.id); setActiveWardSubTab('officers'); }}
                      className="admin-btn admin-btn--primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <Users size={15} /> Manage Ward
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEditWard(ward)}
                        className="admin-btn admin-btn--secondary"
                        style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                      >
                        <Edit3 size={13} /> Edit Info
                      </button>
                      <button
                        onClick={() => handleDeleteWard(ward.id, ward.name)}
                        className="admin-btn admin-btn--danger"
                        style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
                        title="Delete Ward"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      ) : (
        /* ══════════════════════════════════════════════════════════════════════ */
        /* MODE B – SELECTED WARD WORKSPACE                                      */
        /* ══════════════════════════════════════════════════════════════════════ */
        <div>
          {/* Header */}
          <div className="admin-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={() => setSelectedWardId(null)} className="admin-btn admin-btn--secondary">
                <ArrowLeft size={16} /> Back to All Wards
              </button>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-antique)', fontWeight: 700 }}>WARD MANAGEMENT PORTAL</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--brown-primary)', margin: 0 }}>
                  {selectedWard?.name} <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>({selectedWard?.konkaniName})</span>
                </h2>
              </div>
            </div>

            {/* Quick summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-beige)' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--brown-muted)' }}>Patron Saint</span>
                <div style={{ fontWeight: 700, color: 'var(--brown-primary)' }}>{selectedWard?.patronSaint}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--brown-muted)' }}>Gurkar (Ward Leader)</span>
                <div style={{ fontWeight: 700, color: 'var(--brown-primary)' }}>{selectedWard?.gurkar?.name || 'N/A'}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--brown-muted)' }}>Meeting Schedule</span>
                <div style={{ fontWeight: 700, color: 'var(--brown-primary)' }}>{selectedWard?.meetingSchedule || '1st Sunday of month'}</div>
              </div>
            </div>
          </div>

          {/* Sub-tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.75rem', overflowX: 'auto' }}>
            <button
              onClick={() => setActiveWardSubTab('officers')}
              className={`admin-tab-btn ${activeWardSubTab === 'officers' ? 'active' : ''}`}
            >
              <Users size={16} /> Office Bearers
            </button>
            <button
              onClick={() => setActiveWardSubTab('gallery')}
              className={`admin-tab-btn ${activeWardSubTab === 'gallery' ? 'active' : ''}`}
            >
              <ImageIcon size={16} /> Ward Photos ({(selectedWard?.wardGallery || []).length})
            </button>
            <button
              onClick={() => handleOpenEditWard(selectedWard)}
              className="admin-tab-btn"
            >
              <Edit3 size={16} /> Edit Ward Info
            </button>
          </div>

          {/* ── OFFICE BEARERS TAB ───────────────────────────────────────────── */}
          {activeWardSubTab === 'officers' && (
            <div className="admin-card">
              <div className="admin-card__header">
                <h3 className="admin-card__title">Office Bearers (ಹುದ್ದೆದಾರ್) & Ward Leadership</h3>
                <p className="admin-card__subtitle">
                  Manage the President, Vice President, Secretary, Gurkar, and Council Representatives of {selectedWard?.name}.
                  Click Edit / Add on any officer to update their details and photo.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                <OfficerCard
                  officer={selectedWard?.president}
                  roleLabel="President"
                  roleKonkani="ಅಧ್ಯಕ್ಷ"
                  onEdit={() => handleOpenEditOfficer('editPresident', selectedWard)}
                />
                <OfficerCard
                  officer={selectedWard?.vicePresident}
                  roleLabel="Vice President"
                  roleKonkani="ಉಪಾಧ್ಯಕ್ಷ"
                  onEdit={() => handleOpenEditOfficer('editVicePresident', selectedWard)}
                />
                <OfficerCard
                  officer={selectedWard?.secretary}
                  roleLabel="Secretary"
                  roleKonkani="ಕಾರ್ಯದರ್ಶಿ"
                  onEdit={() => handleOpenEditOfficer('editSecretary', selectedWard)}
                />
                <OfficerCard
                  officer={selectedWard?.gurkar}
                  roleLabel="Gurkar (Ward Leader)"
                  roleKonkani="ಗುರ್ಕಾರ್"
                  onEdit={() => handleOpenEditGurkar(selectedWard)}
                />
                {(selectedWard?.representatives || []).map((rep, idx) => (
                  <OfficerCard
                    key={idx}
                    officer={rep}
                    roleLabel={rep.role || `Council Representative ${idx + 1}`}
                    roleKonkani={rep.konkaniRole || 'ಪ್ರತಿನಿದಿ'}
                    onEdit={() => handleOpenEditRep(idx, rep)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── GALLERY TAB ──────────────────────────────────────────────────── */}
          {activeWardSubTab === 'gallery' && (
            <div className="admin-card">
              <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 className="admin-card__title">Ward Photo Gallery</h3>
                  <p className="admin-card__subtitle">Photos from ward feast celebrations, rosary meetings, and community events.</p>
                </div>
                <button onClick={handleOpenAddWardImage} className="admin-btn admin-btn--primary">
                  <Plus size={16} /> Add Ward Photo
                </button>
              </div>

              {selectedWard?.wardGallery && selectedWard.wardGallery.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
                  {selectedWard.wardGallery.map((img) => (
                    <div key={img.id} style={{ background: 'var(--cream)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                      <div style={{ height: '160px', overflow: 'hidden' }}>
                        <img src={img.src} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-primary)' }}>{img.caption}</span>
                        <button
                          onClick={() => deleteWardImage(selectedWardId, img.id)}
                          className="admin-btn admin-btn--danger"
                          style={{ padding: '0.3rem 0.5rem', fontSize: '0.78rem' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--brown-muted)', background: 'var(--cream)', borderRadius: 'var(--radius-sm)' }}>
                  <ImageIcon size={32} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                  <p>No photos added yet for this ward gallery.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* MODAL                                                                 */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {modalType && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{modalTitle}</h3>
              <button className="admin-modal-close" onClick={() => setModalType(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleModalSubmit}>
              <div className="admin-modal-body">

                {/* ── ADD / EDIT WARD ───────────────────────────────────────── */}
                {(modalType === 'addWard' || modalType === 'editWard') && (
                  <>
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Ward Name *</label>
                        <input type="text" className="admin-form-control" placeholder="e.g. Kuprady Ward" value={modalData.name} onChange={(e) => setModalData({ ...modalData, name: e.target.value })} required />
                      </div>
                      <div className="admin-form-group">
                        <label>Konkani Title (ವಾಡೊ)</label>
                        <input type="text" className="admin-form-control" placeholder="e.g. ಕುಪ್ರಡ್ಡಿ ವಾಡೊ" value={modalData.konkaniName} onChange={(e) => setModalData({ ...modalData, konkaniName: e.target.value })} />
                      </div>
                    </div>
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Patron Saint *</label>
                        <input type="text" className="admin-form-control" placeholder="e.g. St. Joseph the Worker" value={modalData.patronSaint} onChange={(e) => setModalData({ ...modalData, patronSaint: e.target.value })} required />
                      </div>
                      <div className="admin-form-group">
                        <label>Annual Feast Date</label>
                        <input type="text" className="admin-form-control" placeholder="e.g. May 1 / First Sunday of May" value={modalData.feastDate} onChange={(e) => setModalData({ ...modalData, feastDate: e.target.value })} />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label>Meeting Schedule</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="e.g. 1st Sunday of every month at 4:00 PM"
                        value={modalData.meetingSchedule || ''}
                        onChange={(e) => setModalData({ ...modalData, meetingSchedule: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Ward Area & Landmarks</label>
                      <input type="text" className="admin-form-control" placeholder="e.g. Kuprady Valley, Near School Road" value={modalData.area} onChange={(e) => setModalData({ ...modalData, area: e.target.value })} />
                    </div>
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Gurkar (Ward Leader) Name</label>
                        <input type="text" className="admin-form-control" placeholder="e.g. Mr. Ligory Monteiro" value={modalData.gurkarName} onChange={(e) => setModalData({ ...modalData, gurkarName: e.target.value })} />
                      </div>
                      <div className="admin-form-group">
                        <label>Gurkar Phone Number</label>
                        <input type="text" className="admin-form-control" placeholder="+91 98450 12345" value={modalData.gurkarPhone} onChange={(e) => setModalData({ ...modalData, gurkarPhone: e.target.value })} />
                      </div>
                    </div>
                    <ImageUploadField id="ward-banner-image" label="Main Banner Image" value={modalData.image} onChange={(image) => setModalData({ ...modalData, image })} placeholder="Paste an image URL or upload a file" />
                  </>
                )}

                {/* ── ADD WARD IMAGE ────────────────────────────────────────── */}
                {modalType === 'addWardImage' && (
                  <>
                    <ImageUploadField id="ward-gallery-image" label="Image *" value={modalData.src} onChange={(src) => setModalData({ ...modalData, src })} placeholder="Paste an image URL or upload a file" required />
                    <div className="admin-form-group">
                      <label>Photo Title / Caption *</label>
                      <input type="text" className="admin-form-control" placeholder="e.g. Ward Feast Thanksgiving Mass" value={modalData.caption} onChange={(e) => setModalData({ ...modalData, caption: e.target.value })} required />
                    </div>
                  </>
                )}

                {/* ── OFFICER FORMS ─────────────────────────────────────────── */}
                {modalType === 'editPresident' && (
                  <OfficerForm data={modalData} onChange={setModalData} roleLabel="President (ಅಧ್ಯಕ್ಷ)" />
                )}
                {modalType === 'editVicePresident' && (
                  <OfficerForm data={modalData} onChange={setModalData} roleLabel="Vice President (ಉಪಾಧ್ಯಕ್ಷ)" />
                )}
                {modalType === 'editSecretary' && (
                  <OfficerForm data={modalData} onChange={setModalData} roleLabel="Secretary (ಕಾರ್ಯದರ್ಶಿ)" />
                )}
                {modalType === 'editGurkar' && (
                  <OfficerForm data={modalData} onChange={setModalData} roleLabel="Gurkar / Ward Leader (ಗುರ್ಕಾರ್)" />
                )}
                {modalType && modalType.startsWith('editRep_') && (
                  <OfficerForm
                    data={modalData}
                    onChange={setModalData}
                    roleLabel={`${modalData.role || 'Council Representative'} (${modalData.konkaniRole || 'ಪ್ರತಿನಿದಿ'})`}
                  />
                )}

              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setModalType(null)} className="admin-btn admin-btn--secondary">Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  <Save size={15} /> Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWardsSection;
