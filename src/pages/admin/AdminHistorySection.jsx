import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import { Plus, Trash2, Edit3, Save, CheckCircle2, ArrowUp, ArrowDown, X } from 'lucide-react';

const AdminHistorySection = () => {
  const { historyTimeline, parishFacts, updateHistoryTimeline, updateParishFacts } = useParishData();
  const [timeline, setTimeline] = useState(historyTimeline);
  const [facts, setFacts] = useState(parishFacts);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [activeItemId, setActiveItemId] = useState(null);
  const [formState, setFormState] = useState({ year: '', era: '', title: '', description: '', image: '' });
  const [savedSuccess, setSavedSuccess] = useState('');

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setModalMode('add');
    setActiveItemId(null);
    setFormState({
      year: new Date().getFullYear().toString(),
      era: 'New Milestone',
      title: '',
      description: '',
      image: `${import.meta.env.BASE_URL}images/hero-exterior.jpg`,
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (item) => {
    setModalMode('edit');
    setActiveItemId(item.id);
    setFormState({ ...item });
    setIsModalOpen(true);
  };

  // Submit Modal Form
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newItem = {
        ...formState,
        id: Date.now(),
      };
      const updated = [...timeline, newItem];
      setTimeline(updated);
      updateHistoryTimeline(updated);
      setSavedSuccess('New historical milestone added!');
    } else {
      const updated = timeline.map(item => item.id === activeItemId ? { ...item, ...formState } : item);
      setTimeline(updated);
      updateHistoryTimeline(updated);
      setSavedSuccess('Historical milestone updated!');
    }

    setIsModalOpen(false);
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this historical milestone?')) {
      const updated = timeline.filter(item => item.id !== id);
      setTimeline(updated);
      updateHistoryTimeline(updated);
      setSavedSuccess('Timeline item deleted.');
      setTimeout(() => setSavedSuccess(''), 3000);
    }
  };

  const handleMove = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= timeline.length) return;
    const updated = [...timeline];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setTimeline(updated);
    updateHistoryTimeline(updated);
  };

  // Facts handlers
  const handleFactChange = (index, newValue) => {
    const updated = facts.map((fact, idx) => idx === index ? { ...fact, value: newValue } : fact);
    setFacts(updated);
    updateParishFacts(updated);
    setSavedSuccess('Parish Facts updated!');
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  return (
    <div>
      {/* Historical Milestones Card */}
      <div className="admin-card">
        <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h2 className="admin-card__title">Church History Milestones</h2>
            <p className="admin-card__subtitle">Add, edit, reorder, or delete timeline entries shown on the Church History page.</p>
          </div>
          <button onClick={handleOpenAddModal} className="admin-btn admin-btn--primary">
            <Plus size={16} /> Add Milestone
          </button>
        </div>

        {savedSuccess && (
          <div className="admin-alert admin-alert--success">
            <CheckCircle2 size={18} />
            <span>{savedSuccess}</span>
          </div>
        )}

        {/* Timeline Items List */}
        <div className="admin-timeline-list">
          {timeline.map((item, index) => (
            <div key={item.id} style={{ marginBottom: '1rem', background: 'var(--cream)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--brown-primary)', color: 'var(--gold-light)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', minWidth: '80px' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700 }}>{item.year}</div>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.8 }}>{item.era}</div>
                </div>

                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--brown-primary)', margin: '0 0 0.3rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.5 }}>{item.description}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <button onClick={() => handleMove(index, 'up')} disabled={index === 0} className="admin-btn admin-btn--secondary" style={{ padding: '0.4rem 0.6rem' }} title="Move Up">
                  <ArrowUp size={14} />
                </button>
                <button onClick={() => handleMove(index, 'down')} disabled={index === timeline.length - 1} className="admin-btn admin-btn--secondary" style={{ padding: '0.4rem 0.6rem' }} title="Move Down">
                  <ArrowDown size={14} />
                </button>
                <button onClick={() => handleOpenEditModal(item)} className="admin-btn admin-btn--secondary" style={{ padding: '0.4rem 0.6rem' }} title="Edit Milestone">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => handleDeleteItem(item.id)} className="admin-btn admin-btn--danger" style={{ padding: '0.4rem 0.6rem' }} title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parish Quick Facts Card */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">Parish Quick Facts</h2>
          <p className="admin-card__subtitle">Edit general parish details displayed on the About Parish page.</p>
        </div>

        <div className="admin-form-grid">
          {facts.map((fact, idx) => (
            <div key={idx} className="admin-form-group">
              <label>{fact.label}</label>
              <input
                type="text"
                className="admin-form-control"
                value={fact.value}
                onChange={(e) => handleFactChange(idx, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── MODAL POPUP FOR ADD / EDIT ── */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {modalMode === 'add' ? 'Add New Milestone' : 'Edit Historical Milestone'}
              </h3>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveModal}>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Year</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. 1920 or Present"
                      value={formState.year}
                      onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Era / Category</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. Foundation / Early Growth"
                      value={formState.era}
                      onChange={(e) => setFormState({ ...formState, era: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Milestone Title *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="Enter milestone title"
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Milestone Description *</label>
                  <textarea
                    className="admin-form-control"
                    rows="4"
                    placeholder="Enter detailed description of this historical event..."
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn admin-btn--secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  <Save size={15} /> {modalMode === 'add' ? 'Add Milestone' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHistorySection;
