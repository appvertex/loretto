import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import { Plus, Trash2, Edit3, Save, CheckCircle2, X } from 'lucide-react';

const AdminCouncilSection = () => {
  const { parishCouncil, updateParishCouncil } = useParishData();
  const [council, setCouncil] = useState(parishCouncil);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [activeMemberId, setActiveMemberId] = useState(null);
  const [formState, setFormState] = useState({ name: '', position: '', image: '' });
  const [savedSuccess, setSavedSuccess] = useState('');

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setModalMode('add');
    setActiveMemberId(null);
    setFormState({
      name: '',
      position: 'Council Representative',
      image: `${import.meta.env.BASE_URL}images/hero-exterior.jpg`,
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (member) => {
    setModalMode('edit');
    setActiveMemberId(member.id);
    setFormState({ ...member });
    setIsModalOpen(true);
  };

  // Save Modal Form
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newMember = {
        ...formState,
        id: Date.now(),
      };
      const updated = [...council, newMember];
      setCouncil(updated);
      updateParishCouncil(updated);
      setSavedSuccess('New council member added!');
    } else {
      const updated = council.map(m => m.id === activeMemberId ? { ...m, ...formState } : m);
      setCouncil(updated);
      updateParishCouncil(updated);
      setSavedSuccess('Council member details updated!');
    }

    setIsModalOpen(false);
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  const handleDeleteMember = (id) => {
    const memberToDelete = council.find(m => m.id === id);
    if (memberToDelete?.position?.includes('Ex-officio')) {
      alert('The Parish Priest (Ex-officio President) entry is auto-managed via the Parish Priest admin section.');
      return;
    }

    if (window.confirm('Are you sure you want to remove this council member?')) {
      const updated = council.filter(m => m.id !== id);
      setCouncil(updated);
      updateParishCouncil(updated);
      setSavedSuccess('Member removed.');
      setTimeout(() => setSavedSuccess(''), 3000);
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <h2 className="admin-card__title">Parish Council Office Bearers</h2>
          <p className="admin-card__subtitle">Manage executive board office bearers and committee leadership members.</p>
        </div>
        <button onClick={handleOpenAddModal} className="admin-btn admin-btn--primary">
          <Plus size={16} /> Add Council Member
        </button>
      </div>

      {savedSuccess && (
        <div className="admin-alert admin-alert--success">
          <CheckCircle2 size={18} />
          <span>{savedSuccess}</span>
        </div>
      )}

      {/* Member Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {council.map((member) => {
          const isExOfficio = member.position?.includes('Ex-officio') || member.id === 1;

          return (
            <div
              key={member.id}
              style={{
                background: isExOfficio ? 'linear-gradient(135deg, rgba(198,161,91,0.08) 0%, rgba(198,161,91,0.02) 100%)' : 'var(--cream)',
                border: isExOfficio ? '2px solid var(--gold-antique)' : '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
              }}
            >
              {isExOfficio && (
                <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-antique)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                  ✦ EX-OFFICIO PRESIDENT
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--gold-antique)', backgroundColor: 'var(--border-beige)', flexShrink: 0 }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/hero-exterior.jpg`; }}
                  />
                </div>

                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--brown-primary)', margin: '0 0 0.2rem' }}>
                    {member.name}
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--brown-muted)', fontWeight: 600 }}>
                    {member.position}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem', borderTop: '1px solid var(--border-beige)', paddingTop: '0.75rem' }}>
                <button onClick={() => handleOpenEditModal(member)} className="admin-btn admin-btn--secondary" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}>
                  <Edit3 size={13} /> Edit
                </button>
                {!isExOfficio && (
                  <button onClick={() => handleDeleteMember(member.id)} className="admin-btn admin-btn--danger" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}>
                    <Trash2 size={13} /> Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MODAL POPUP FOR ADD / EDIT COUNCIL MEMBER ── */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {modalMode === 'add' ? 'Add Council Member' : 'Edit Council Member'}
              </h3>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveModal}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="Enter member name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    disabled={formState.position?.includes('Ex-officio')}
                    required
                  />
                  {formState.position?.includes('Ex-officio') && (
                    <small style={{ color: 'var(--brown-muted)', display: 'block', marginTop: '0.2rem' }}>
                      * Synchronized with Parish Priest Name.
                    </small>
                  )}
                </div>

                <div className="admin-form-group">
                  <label>Position / Role *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Vice President / Secretary / Gurkar"
                    value={formState.position}
                    onChange={(e) => setFormState({ ...formState, position: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Photo URL / Image Path</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. images/member-photo.jpg or full URL"
                    value={formState.image}
                    onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn admin-btn--secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  <Save size={15} /> {modalMode === 'add' ? 'Add Member' : 'Save Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCouncilSection;
