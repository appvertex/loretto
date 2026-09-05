import React, { useState } from 'react';
import { useParishData } from '../../context/ParishContext';
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  HeartHandshake,
  Users,
  Search,
  ArrowLeft,
  X,
  Phone,
  Calendar,
  Sparkles,
  MapPin,
  Award,
  BookOpen,
  Target,
  Clock,
  UserCheck
} from 'lucide-react';

const AdminOrganizationsSection = ({ initialSelectedOrgSlug = null }) => {
  const {
    organizations,
    addOrganization,
    updateOrganization,
    deleteOrganization,
    addOfficeBearerToOrg,
    updateOfficeBearerInOrg,
    deleteOfficeBearerFromOrg,
    addObjectiveToOrg,
    updateObjectiveInOrg,
    deleteObjectiveFromOrg,
    addActivityToOrg,
    updateActivityInOrg,
    deleteActivityFromOrg,
  } = useParishData();

  // Selected Organization ID for detail editing
  const [selectedOrgId, setSelectedOrgId] = useState(() => {
    if (initialSelectedOrgSlug && organizations) {
      const match = organizations.find(o => o.slug === initialSelectedOrgSlug);
      if (match) return match.id;
    }
    return null;
  });

  const [activeOrgSubTab, setActiveOrgSubTab] = useState('basic'); // 'basic', 'description', 'bearers', 'objectives', 'activities'
  const [searchTerm, setSearchTerm] = useState('');
  const [savedSuccess, setSavedSuccess] = useState('');

  // Modal States
  const [modalType, setModalType] = useState(null); // 'addOrg', 'editOrgBasic', 'addBearer', 'editBearer', 'addObjective', 'editObjective', 'addActivity', 'editActivity'
  const [modalData, setModalData] = useState({});

  const selectedOrg = organizations ? organizations.find(o => o.id === selectedOrgId) : null;

  // Filtered Organizations
  const filteredOrgs = (organizations || []).filter(o =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.konkaniName && o.konkaniName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (o.category && o.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // -------------------------------------------------------------
  // MODAL OPEN HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddOrg = () => {
    setModalType('addOrg');
    setModalData({
      name: '',
      shortName: '',
      konkaniName: '',
      slug: '',
      category: 'Lay Association',
      motto: '',
      tagline: '',
      description: '',
      fullDescription: '',
      image: `${import.meta.env.BASE_URL}images/hero-community.jpg`,
      targetGroup: 'All parishioners',
      meetingDay: 'Monthly meetings',
      venue: 'Parish Hall',
      spiritualDirector: 'Rev. Fr. Parish Priest',
      howToJoin: 'Contact unit office bearers or enroll during monthly meetings.',
    });
  };

  const handleOpenEditOrgBasic = (org) => {
    setModalType('editOrgBasic');
    setModalData({
      id: org.id,
      name: org.name || '',
      shortName: org.shortName || '',
      konkaniName: org.konkaniName || '',
      slug: org.slug || '',
      category: org.category || '',
      motto: org.motto || '',
      tagline: org.tagline || '',
      targetGroup: org.targetGroup || '',
      meetingDay: org.meetingDay || '',
      venue: org.venue || '',
      spiritualDirector: org.spiritualDirector || '',
      image: org.image || '',
      howToJoin: org.howToJoin || '',
    });
  };

  const handleOpenAddBearer = () => {
    setModalType('addBearer');
    setModalData({
      role: 'President',
      konkaniRole: 'ಅಧ್ಯಕ್ಷ್',
      name: '',
      phone: '',
      ward: 'Parish Ward',
      photo: '',
    });
  };

  const handleOpenEditBearer = (bearer, index) => {
    setModalType('editBearer');
    setModalData({
      index,
      role: bearer.role || '',
      konkaniRole: bearer.konkaniRole || '',
      name: bearer.name || '',
      phone: bearer.phone || '',
      ward: bearer.ward || '',
      photo: bearer.photo || '',
    });
  };

  const handleOpenAddObjective = () => {
    setModalType('addObjective');
    setModalData({ objectiveText: '' });
  };

  const handleOpenEditObjective = (text, index) => {
    setModalType('editObjective');
    setModalData({ index, objectiveText: text });
  };

  const handleOpenAddActivity = () => {
    setModalType('addActivity');
    setModalData({ activityText: '' });
  };

  const handleOpenEditActivity = (text, index) => {
    setModalType('editActivity');
    setModalData({ index, activityText: text });
  };

  // -------------------------------------------------------------
  // MODAL SUBMIT HANDLERS
  // -------------------------------------------------------------
  const handleModalSubmit = (e) => {
    e.preventDefault();

    if (modalType === 'addOrg') {
      const newOrg = addOrganization(modalData);
      setSelectedOrgId(newOrg.id);
      setSavedSuccess(`Organization "${newOrg.name}" added successfully!`);
    } else if (modalType === 'editOrgBasic') {
      updateOrganization(modalData.id, modalData);
      setSavedSuccess('Organization details updated!');
    } else if (modalType === 'addBearer') {
      addOfficeBearerToOrg(selectedOrgId, modalData);
      setSavedSuccess('Office bearer added successfully!');
    } else if (modalType === 'editBearer') {
      updateOfficeBearerInOrg(selectedOrgId, modalData.index, modalData);
      setSavedSuccess('Office bearer updated!');
    } else if (modalType === 'addObjective') {
      if (modalData.objectiveText.trim()) {
        addObjectiveToOrg(selectedOrgId, modalData.objectiveText.trim());
        setSavedSuccess('Objective added!');
      }
    } else if (modalType === 'editObjective') {
      if (modalData.objectiveText.trim()) {
        updateObjectiveInOrg(selectedOrgId, modalData.index, modalData.objectiveText.trim());
        setSavedSuccess('Objective updated!');
      }
    } else if (modalType === 'addActivity') {
      if (modalData.activityText.trim()) {
        addActivityToOrg(selectedOrgId, modalData.activityText.trim());
        setSavedSuccess('Activity added!');
      }
    } else if (modalType === 'editActivity') {
      if (modalData.activityText.trim()) {
        updateActivityInOrg(selectedOrgId, modalData.index, modalData.activityText.trim());
        setSavedSuccess('Activity updated!');
      }
    }

    setModalType(null);
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  const handleDeleteOrg = (orgId, orgName) => {
    if (window.confirm(`Are you sure you want to delete "${orgName}"? This will permanently remove this organization from the site.`)) {
      deleteOrganization(orgId);
      if (selectedOrgId === orgId) setSelectedOrgId(null);
      setSavedSuccess('Organization deleted.');
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

      {/* ========================================================= */}
      {/* MODE A: MAIN ORGANIZATIONS LIST VIEW                      */}
      {/* ========================================================= */}
      {!selectedOrgId ? (
        <div className="admin-card">
          <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="admin-card__title">Parish Organizations (ಸಂಘಟನಾಂ) Management</h2>
              <p className="admin-card__subtitle">Manage all parish associations, office bearers, objectives, activities, and meeting details.</p>
            </div>
            <button onClick={handleOpenAddOrg} className="admin-btn admin-btn--primary">
              <Plus size={16} /> Add New Organization
            </button>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input
              type="text"
              className="admin-form-control"
              style={{ paddingLeft: '2.5rem' }}
              placeholder="Search organization by name, Konkani title, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--brown-muted)' }} />
          </div>

          {/* Organizations Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filteredOrgs.map((org) => (
              <div
                key={org.id}
                style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Banner Photo */}
                <div style={{ position: 'relative', height: '140px', backgroundColor: 'var(--border-beige)', overflow: 'hidden' }}>
                  <img
                    src={org.image}
                    alt={org.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/hero-community.jpg`; }}
                  />
                  {org.category && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(53,21,27,0.85)',
                        color: 'var(--gold-light)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '12px',
                        border: '1px solid var(--gold-antique)',
                      }}
                    >
                      {org.category}
                    </span>
                  )}
                </div>

                {/* Content Info */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--brown-primary)', margin: '0 0 0.2rem' }}>
                      {org.name}
                    </h3>
                    {org.konkaniName && (
                      <p style={{ fontSize: '0.88rem', color: 'var(--gold-antique)', fontWeight: 600, margin: '0 0 0.6rem' }}>
                        {org.konkaniName}
                      </p>
                    )}

                    <p style={{ fontSize: '0.83rem', color: 'var(--brown-muted)', lineHeight: 1.5, margin: '0 0 0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {org.tagline || org.description}
                    </p>

                    <div style={{ fontSize: '0.8rem', color: 'var(--brown-muted)', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <span><strong>Leaders:</strong> {(org.officeBearers || []).length}</span>
                      <span><strong>Goals:</strong> {(org.objectives || []).length}</span>
                      <span><strong>Activities:</strong> {(org.activities || []).length}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-beige)' }}>
                    <button
                      onClick={() => setSelectedOrgId(org.id)}
                      className="admin-btn admin-btn--primary"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <Edit3 size={15} /> Edit Everything
                    </button>
                    <button
                      onClick={() => handleDeleteOrg(org.id, org.name)}
                      className="admin-btn admin-btn--danger"
                      style={{ padding: '0.4rem 0.6rem' }}
                      title="Delete Organization"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* MODE B: SELECTED ORGANIZATION WORKSPACE                   */
        /* ========================================================= */
        <div>
          {/* Header Banner */}
          <div className="admin-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                onClick={() => setSelectedOrgId(null)}
                className="admin-btn admin-btn--secondary"
              >
                <ArrowLeft size={16} /> Back to All Organizations
              </button>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-antique)', fontWeight: 700 }}>
                  ORGANIZATION EDIT PORTAL
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--brown-primary)', margin: 0 }}>
                  {selectedOrg.name} {selectedOrg.konkaniName && <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>({selectedOrg.konkaniName})</span>}
                </h2>
              </div>
            </div>

            {/* Quick Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-beige)' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--brown-muted)' }}>Category</span>
                <div style={{ fontWeight: 700, color: 'var(--brown-primary)' }}>{selectedOrg.category || 'N/A'}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--brown-muted)' }}>Meeting Day</span>
                <div style={{ fontWeight: 700, color: 'var(--brown-primary)' }}>{selectedOrg.meetingDay || 'N/A'}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--brown-muted)' }}>Office Bearers</span>
                <div style={{ fontWeight: 700, color: 'var(--brown-primary)' }}>{(selectedOrg.officeBearers || []).length} Leaders</div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--brown-muted)' }}>Activities</span>
                <div style={{ fontWeight: 700, color: 'var(--brown-primary)' }}>{(selectedOrg.activities || []).length} Annual Events</div>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.75rem', overflowX: 'auto' }}>
            <button
              onClick={() => setActiveOrgSubTab('basic')}
              className={`admin-tab-btn ${activeOrgSubTab === 'basic' ? 'active' : ''}`}
            >
              <Sparkles size={16} /> Basic & Info
            </button>

            <button
              onClick={() => setActiveOrgSubTab('description')}
              className={`admin-tab-btn ${activeOrgSubTab === 'description' ? 'active' : ''}`}
            >
              <BookOpen size={16} /> About & Description
            </button>

            <button
              onClick={() => setActiveOrgSubTab('bearers')}
              className={`admin-tab-btn ${activeOrgSubTab === 'bearers' ? 'active' : ''}`}
            >
              <Award size={16} /> Office Bearers ({(selectedOrg.officeBearers || []).length})
            </button>

            <button
              onClick={() => setActiveOrgSubTab('objectives')}
              className={`admin-tab-btn ${activeOrgSubTab === 'objectives' ? 'active' : ''}`}
            >
              <Target size={16} /> Objectives ({(selectedOrg.objectives || []).length})
            </button>

            <button
              onClick={() => setActiveOrgSubTab('activities')}
              className={`admin-tab-btn ${activeOrgSubTab === 'activities' ? 'active' : ''}`}
            >
              <Calendar size={16} /> Activities ({(selectedOrg.activities || []).length})
            </button>
          </div>

          {/* SUB TAB 1: BASIC INFO */}
          {activeOrgSubTab === 'basic' && (
            <div className="admin-card">
              <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 className="admin-card__title">Organization Profile & Meeting Details</h3>
                  <p className="admin-card__subtitle">Edit names, category, motto, target group, venue, and cover photo.</p>
                </div>
                <button onClick={() => handleOpenEditOrgBasic(selectedOrg)} className="admin-btn admin-btn--primary">
                  <Edit3 size={16} /> Edit Basic Info
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
                <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-beige)' }}>
                  <strong style={{ color: 'var(--gold-antique)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Full Name (English)</strong>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brown-primary)', marginTop: '0.2rem' }}>{selectedOrg.name}</div>
                </div>

                <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-beige)' }}>
                  <strong style={{ color: 'var(--gold-antique)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Konkani Title (ಸಂಘಟನ್)</strong>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brown-primary)', marginTop: '0.2rem' }}>{selectedOrg.konkaniName || 'N/A'}</div>
                </div>

                <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-beige)' }}>
                  <strong style={{ color: 'var(--gold-antique)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Motto / Slogan</strong>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--brown-primary)', marginTop: '0.2rem' }}>"{selectedOrg.motto || 'N/A'}"</div>
                </div>

                <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-beige)' }}>
                  <strong style={{ color: 'var(--gold-antique)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Tagline</strong>
                  <div style={{ fontSize: '0.95rem', color: 'var(--brown-primary)', marginTop: '0.2rem' }}>{selectedOrg.tagline || 'N/A'}</div>
                </div>

                <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-beige)' }}>
                  <strong style={{ color: 'var(--gold-antique)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Target Group / Eligibility</strong>
                  <div style={{ fontSize: '0.95rem', color: 'var(--brown-primary)', marginTop: '0.2rem' }}>{selectedOrg.targetGroup || 'N/A'}</div>
                </div>

                <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-beige)' }}>
                  <strong style={{ color: 'var(--gold-antique)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Meeting Schedule & Venue</strong>
                  <div style={{ fontSize: '0.95rem', color: 'var(--brown-primary)', marginTop: '0.2rem' }}>{selectedOrg.meetingDay || 'N/A'} • {selectedOrg.venue || 'N/A'}</div>
                </div>
              </div>
            </div>
          )}

          {/* SUB TAB 2: DESCRIPTION & DETAILS */}
          {activeOrgSubTab === 'description' && (
            <div className="admin-card">
              <div className="admin-card__header">
                <h3 className="admin-card__title">About & History Description</h3>
                <p className="admin-card__subtitle">Edit the short summary and full detailed description displayed on the association page.</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                updateOrganization(selectedOrg.id, {
                  description: form.description.value,
                  fullDescription: form.fullDescription.value,
                  howToJoin: form.howToJoin.value,
                });
                setSavedSuccess('Descriptions updated successfully!');
                setTimeout(() => setSavedSuccess(''), 3000);
              }}>
                <div className="admin-form-group">
                  <label>Short Tagline Description</label>
                  <textarea
                    name="description"
                    className="admin-form-control"
                    rows="3"
                    defaultValue={selectedOrg.description || ''}
                  ></textarea>
                </div>

                <div className="admin-form-group">
                  <label>Full Detailed Description / History</label>
                  <textarea
                    name="fullDescription"
                    className="admin-form-control"
                    rows="6"
                    defaultValue={selectedOrg.fullDescription || ''}
                  ></textarea>
                </div>

                <div className="admin-form-group">
                  <label>How to Join Instructions</label>
                  <input
                    type="text"
                    name="howToJoin"
                    className="admin-form-control"
                    defaultValue={selectedOrg.howToJoin || ''}
                  />
                </div>

                <button type="submit" className="admin-btn admin-btn--primary">
                  <Save size={16} /> Save Description Changes
                </button>
              </form>
            </div>
          )}

          {/* SUB TAB 3: OFFICE BEARERS */}
          {activeOrgSubTab === 'bearers' && (
            <div className="admin-card">
              <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 className="admin-card__title">Office Bearers & Committee Leaders (ಹುದ್ದೆದಾರ್)</h3>
                  <p className="admin-card__subtitle">Manage executive leaders, spiritual director, president, secretary, treasurer, etc.</p>
                </div>
                <button onClick={handleOpenAddBearer} className="admin-btn admin-btn--primary">
                  <Plus size={16} /> Add Office Bearer
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {(selectedOrg.officeBearers || []).map((bearer, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--cream)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-antique)', textTransform: 'uppercase' }}>
                        {bearer.role} {bearer.konkaniRole && `(${bearer.konkaniRole})`}
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--brown-primary)', margin: '0.2rem 0 0.4rem' }}>
                        {bearer.name}
                      </h4>
                      <div style={{ fontSize: '0.85rem', color: 'var(--brown-muted)', lineHeight: 1.5 }}>
                        {bearer.phone && <div><strong>Phone:</strong> {bearer.phone}</div>}
                        {bearer.ward && <div><strong>Ward:</strong> {bearer.ward}</div>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-beige)' }}>
                      <button onClick={() => handleOpenEditBearer(bearer, idx)} className="admin-btn admin-btn--secondary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>
                        <Edit3 size={13} /> Edit
                      </button>
                      <button onClick={() => deleteOfficeBearerFromOrg(selectedOrg.id, idx)} className="admin-btn admin-btn--danger" style={{ padding: '0.35rem 0.6rem' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB TAB 4: OBJECTIVES */}
          {activeOrgSubTab === 'objectives' && (
            <div className="admin-card">
              <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 className="admin-card__title">Objectives & Key Goals</h3>
                  <p className="admin-card__subtitle">List of core goals, mission statements, and spiritual objectives of {selectedOrg.name}.</p>
                </div>
                <button onClick={handleOpenAddObjective} className="admin-btn admin-btn--primary">
                  <Plus size={16} /> Add Objective
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(selectedOrg.objectives || []).map((objText, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--cream)',
                      border: '1px solid var(--border-beige)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <span style={{ color: 'var(--gold-antique)', fontWeight: 700 }}>{idx + 1}.</span>
                      <span style={{ fontSize: '0.95rem', color: 'var(--brown-primary)' }}>{objText}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                      <button onClick={() => handleOpenEditObjective(objText, idx)} className="admin-btn admin-btn--secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}>
                        <Edit3 size={13} />
                      </button>
                      <button onClick={() => deleteObjectiveFromOrg(selectedOrg.id, idx)} className="admin-btn admin-btn--danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB TAB 5: ACTIVITIES */}
          {activeOrgSubTab === 'activities' && (
            <div className="admin-card">
              <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 className="admin-card__title">Annual Activities & Key Initiatives</h3>
                  <p className="admin-card__subtitle">List of annual programs, seminars, feasts, and community projects.</p>
                </div>
                <button onClick={handleOpenAddActivity} className="admin-btn admin-btn--primary">
                  <Plus size={16} /> Add Activity
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(selectedOrg.activities || []).map((actText, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--cream)',
                      border: '1px solid var(--border-beige)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <span style={{ color: 'var(--gold-antique)', fontWeight: 700 }}>•</span>
                      <span style={{ fontSize: '0.95rem', color: 'var(--brown-primary)' }}>{actText}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                      <button onClick={() => handleOpenEditActivity(actText, idx)} className="admin-btn admin-btn--secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}>
                        <Edit3 size={13} />
                      </button>
                      <button onClick={() => deleteActivityFromOrg(selectedOrg.id, idx)} className="admin-btn admin-btn--danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* DYNAMIC POPUP MODAL DIALOG                                */}
      {/* ========================================================= */}
      {modalType && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {modalType === 'addOrg' && 'Add New Parish Organization'}
                {modalType === 'editOrgBasic' && 'Edit Organization Details'}
                {modalType === 'addBearer' && 'Add Office Bearer'}
                {modalType === 'editBearer' && 'Edit Office Bearer'}
                {modalType === 'addObjective' && 'Add Goal / Objective'}
                {modalType === 'editObjective' && 'Edit Goal / Objective'}
                {modalType === 'addActivity' && 'Add Annual Activity'}
                {modalType === 'editActivity' && 'Edit Annual Activity'}
              </h3>
              <button className="admin-modal-close" onClick={() => setModalType(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleModalSubmit}>
              <div className="admin-modal-body">
                {/* 1. ADD / EDIT ORGANIZATION FORM */}
                {(modalType === 'addOrg' || modalType === 'editOrgBasic') && (
                  <>
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Organization Name *</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. Catholic Sabha"
                          value={modalData.name}
                          onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Konkani Title (ಸಂಘಟನ್)</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. ಕಥೊಲಿಕ್ ಸಭಾ"
                          value={modalData.konkaniName}
                          onChange={(e) => setModalData({ ...modalData, konkaniName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Category / Type *</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. Lay Association / Youth Ministry"
                          value={modalData.category}
                          onChange={(e) => setModalData({ ...modalData, category: e.target.value })}
                          required
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Motto / Slogan</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. Service, Unity & Empowerment"
                          value={modalData.motto}
                          onChange={(e) => setModalData({ ...modalData, motto: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label>Tagline / Subtitle Summary</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="Promoting community welfare and social justice."
                        value={modalData.tagline}
                        onChange={(e) => setModalData({ ...modalData, tagline: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Meeting Day & Time</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. 3rd Sunday of every month at 10:30 AM"
                          value={modalData.meetingDay}
                          onChange={(e) => setModalData({ ...modalData, meetingDay: e.target.value })}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Meeting Venue</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. Parish Mini Hall"
                          value={modalData.venue}
                          onChange={(e) => setModalData({ ...modalData, venue: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Spiritual Director</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Rev. Fr. Parish Priest"
                          value={modalData.spiritualDirector}
                          onChange={(e) => setModalData({ ...modalData, spiritualDirector: e.target.value })}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Target Audience / Eligibility</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. Neophytes, Youth aged 15-28, All adults"
                          value={modalData.targetGroup}
                          onChange={(e) => setModalData({ ...modalData, targetGroup: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label>Cover Photo URL</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="images/hero-community.jpg"
                        value={modalData.image}
                        onChange={(e) => setModalData({ ...modalData, image: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {/* 2. ADD / EDIT OFFICE BEARER FORM */}
                {(modalType === 'addBearer' || modalType === 'editBearer') && (
                  <>
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Role Designation (English) *</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. President / Secretary / Treasurer"
                          value={modalData.role}
                          onChange={(e) => setModalData({ ...modalData, role: e.target.value })}
                          required
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Konkani Role (ಹುದ್ದೊ)</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. ಅಧ್ಯಕ್ಷ್ / ಕಾರ್ಯದರ್ಶಿ"
                          value={modalData.konkaniRole}
                          onChange={(e) => setModalData({ ...modalData, konkaniRole: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label>Leader Full Name *</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="e.g. Mr. Ronald D'Souza"
                        value={modalData.name}
                        onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Contact Phone</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="+91 94480 00001"
                          value={modalData.phone}
                          onChange={(e) => setModalData({ ...modalData, phone: e.target.value })}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Ward Name</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. Kuprady Ward"
                          value={modalData.ward}
                          onChange={(e) => setModalData({ ...modalData, ward: e.target.value })}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* 3. ADD / EDIT OBJECTIVE FORM */}
                {(modalType === 'addObjective' || modalType === 'editObjective') && (
                  <div className="admin-form-group">
                    <label>Objective / Goal Statement *</label>
                    <textarea
                      className="admin-form-control"
                      rows="3"
                      placeholder="e.g. Promote socio-economic welfare and educational empowerment..."
                      value={modalData.objectiveText}
                      onChange={(e) => setModalData({ ...modalData, objectiveText: e.target.value })}
                      required
                    ></textarea>
                  </div>
                )}

                {/* 4. ADD / EDIT ACTIVITY FORM */}
                {(modalType === 'addActivity' || modalType === 'editActivity') && (
                  <div className="admin-form-group">
                    <label>Activity / Program Title *</label>
                    <textarea
                      className="admin-form-control"
                      rows="3"
                      placeholder="e.g. Annual Blood Donation Camp & Medical Health Checkup"
                      value={modalData.activityText}
                      onChange={(e) => setModalData({ ...modalData, activityText: e.target.value })}
                      required
                    ></textarea>
                  </div>
                )}
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setModalType(null)} className="admin-btn admin-btn--secondary">
                  Cancel
                </button>
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

export default AdminOrganizationsSection;
