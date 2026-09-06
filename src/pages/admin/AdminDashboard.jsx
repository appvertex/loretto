import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParishData } from '../../context/ParishContext';
import AdminLogin from './AdminLogin';
import AdminPriestSection from './AdminPriestSection';
import AdminMessagesSection from './AdminMessagesSection';
import AdminHistorySection from './AdminHistorySection';
import AdminCouncilSection from './AdminCouncilSection';
import AdminOfficeSection from './AdminOfficeSection';
import AdminGallerySection from './AdminGallerySection';
import AdminWardsSection from './AdminWardsSection';
import AdminOrganizationsSection from './AdminOrganizationsSection';
import AdminNewsSection from './AdminNewsSection';
import AdminEventsSection from './AdminEventsSection';
import AdminNewsletterSection from './AdminNewsletterSection';
import AdminObituarySection from './AdminObituarySection';
import AdminInstitutionsSection from './AdminInstitutionsSection';
import {
  UserCheck,
  MessageSquareText,
  History,
  Users,
  Building2,
  Image as ImageIcon,
  Home as HomeIcon,
  HeartHandshake,
  Newspaper,
  Calendar,
  FileText,
  ChevronDown,
  ChevronRight,
  LogOut,
  RotateCcw,
  Key,
  UploadCloud,
  Menu,
  X,
  ShieldCheck,
  Church,
  Radio,
  Flame
} from 'lucide-react';
import './AdminLayout.css';

const parishSubItems = [
  { id: 'priest', label: 'Parish Priest Name', icon: <UserCheck size={16} /> },
  { id: 'messages', label: 'Priest Messages', icon: <MessageSquareText size={16} /> },
  { id: 'council', label: 'Parish Council', icon: <Users size={16} /> },
  { id: 'office', label: 'Parish Office', icon: <Building2 size={16} /> },
];

const mediaSubItems = [
  { id: 'events', label: 'Upcoming Events (ಕಾರ್ಯಕ್ರಮ್)', icon: <Calendar size={16} /> },
  { id: 'news', label: 'Parish News & Notices (ಖಬ್ರೊ)', icon: <Newspaper size={16} /> },
  { id: 'newsletter', label: 'Parish Newsletter (ಪತ್ರಾಂ)', icon: <FileText size={16} /> },
  { id: 'gallery', label: 'Photo Gallery', icon: <ImageIcon size={16} /> },
  { id: 'obituary', label: 'Obituaries (ಮರಣಾಂ)', icon: <Flame size={16} /> },
];

const navItems = [
  {
    id: 'parish',
    label: 'Parish Details (ಫಿರ್ಗಜ್)',
    icon: <Church size={18} />,
    isDropdown: true,
    dropdownType: 'parish',
    subItems: parishSubItems,
  },
  {
    id: 'media',
    label: 'Media & News (ಮಾಧ್ಯಮ್)',
    icon: <Radio size={18} />,
    isDropdown: true,
    dropdownType: 'media',
    subItems: mediaSubItems,
  },
  {
    id: 'organizations',
    label: 'Parish Organizations (ಸಂಘಟನಾಂ)',
    icon: <HeartHandshake size={18} />,
    isDropdown: true,
    dropdownType: 'organizations',
  },
  { id: 'institutions', label: 'Parish Institutions (ಸಂಸ್ಥಾವೊ)', icon: <Building2 size={18} /> },
  { id: 'wards', label: 'Parish Wards (ವಾಡೆ)', icon: <HomeIcon size={18} /> },
  { id: 'history', label: 'Church History', icon: <History size={18} /> },
];

const AdminDashboard = () => {
  const { isAdminAuthenticated, logoutAdmin, resetToDefaults, changeAdminPasscode, publishSiteContent, organizations } = useParishData();
  const [activeTab, setActiveTab] = useState('priest');
  const [selectedOrgSlug, setSelectedOrgSlug] = useState(null);
  const [isParishDropdownOpen, setIsParishDropdownOpen] = useState(true);
  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(true);
  const [isOrgsDropdownOpen, setIsOrgsDropdownOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [currentPasscode, setCurrentPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [passcodeNotice, setPasscodeNotice] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [isChangingPasscode, setIsChangingPasscode] = useState(false);
  const [isPublishingContent, setIsPublishingContent] = useState(false);

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  const logoUrl = `${import.meta.env.BASE_URL}favicon.png`;

  const findActiveTitle = () => {
    const pSub = parishSubItems.find(sub => sub.id === activeTab);
    if (pSub) return pSub.label;
    const mSub = mediaSubItems.find(sub => sub.id === activeTab);
    if (mSub) return mSub.label;
    const item = navItems.find(n => n.id === activeTab);
    return item ? item.label : 'Admin Dashboard';
  };

  const handleReset = () => {
    if (window.confirm('Reset all edited data back to original default settings? This cannot be undone.')) {
      resetToDefaults();
      alert('Data reset to original defaults.');
    }
  };

  const handleChangePasscode = async (e) => {
    e.preventDefault();
    setPasscodeNotice('');
    setPasscodeError('');

    const trimmedCurrentPasscode = currentPasscode.trim();
    const trimmedNewPasscode = newPasscode.trim();

    if (!trimmedCurrentPasscode || !trimmedNewPasscode || !confirmPasscode.trim()) {
      setPasscodeError('Please fill in all passcode fields.');
      return;
    }

    if (trimmedNewPasscode.length < 6) {
      setPasscodeError('New passcode must be at least 6 characters.');
      return;
    }

    if (trimmedNewPasscode !== confirmPasscode.trim()) {
      setPasscodeError('New passcode and confirmation do not match.');
      return;
    }

    setIsChangingPasscode(true);
    const result = await changeAdminPasscode(trimmedCurrentPasscode, trimmedNewPasscode);
    setIsChangingPasscode(false);

    if (!result.success) {
      setPasscodeError(result.message || 'Unable to update passcode.');
      return;
    }

    setPasscodeNotice(result.message || 'Passcode updated successfully!');
    setCurrentPasscode('');
    setNewPasscode('');
    setConfirmPasscode('');
    setTimeout(() => {
      setPasscodeNotice('');
      setPasscodeError('');
      setShowPasscodeModal(false);
    }, 2000);
  };

  const handlePublishContent = async () => {
    setIsPublishingContent(true);
    const result = await publishSiteContent();
    setIsPublishingContent(false);

    if (result.success) {
      alert('Content published to D1. Open incognito and refresh to see the latest content.');
      return;
    }

    alert(result.message || 'Could not publish content. Please log in again and retry.');
  };

  return (
    <div className="admin-layout">
      {/* ── MOBILE TOP BAR ── */}
      <div className="admin-mobile-bar">
        <button
          className="admin-mobile-toggle"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          <span>Admin Menu</span>
        </button>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold-light)' }}>
          {findActiveTitle()}
        </span>
      </div>

      {/* ── LEFT SIDEBAR NAVBAR ── */}
      <aside className={`admin-sidebar ${isMobileSidebarOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="admin-sidebar__brand">
          <img src={logoUrl} alt="Loretto Church" className="admin-sidebar__logo" />
          <div>
            <h2 className="admin-sidebar__title">Loretto Church</h2>
            <span className="admin-sidebar__subtitle">Admin Dashboard</span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="admin-sidebar__nav">
          <span className="admin-sidebar__section-label">Management Pages</span>
          <ul className="admin-sidebar__menu">
            {navItems.map((item) => {
              if (item.dropdownType === 'parish') {
                const isParishActive = ['priest', 'messages', 'council', 'office'].includes(activeTab);
                return (
                  <li key={item.id}>
                    <button
                      className={`admin-sidebar__item-btn ${isParishActive ? 'active' : ''}`}
                      onClick={() => setIsParishDropdownOpen(!isParishDropdownOpen)}
                    >
                      {item.icon}
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {isParishDropdownOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>

                    {isParishDropdownOpen && (
                      <ul className="admin-sidebar__dropdown-menu">
                        {parishSubItems.map((sub) => (
                          <li key={sub.id}>
                            <button
                              className={`admin-sidebar__dropdown-btn ${activeTab === sub.id ? 'active' : ''}`}
                              onClick={() => {
                                setActiveTab(sub.id);
                                setIsMobileSidebarOpen(false);
                              }}
                            >
                              <span>{sub.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              if (item.dropdownType === 'media') {
                const isMediaActive = ['events', 'news', 'newsletter', 'gallery', 'obituary'].includes(activeTab);
                return (
                  <li key={item.id}>
                    <button
                      className={`admin-sidebar__item-btn ${isMediaActive ? 'active' : ''}`}
                      onClick={() => setIsMediaDropdownOpen(!isMediaDropdownOpen)}
                    >
                      {item.icon}
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {isMediaDropdownOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>

                    {isMediaDropdownOpen && (
                      <ul className="admin-sidebar__dropdown-menu">
                        {mediaSubItems.map((sub) => (
                          <li key={sub.id}>
                            <button
                              className={`admin-sidebar__dropdown-btn ${activeTab === sub.id ? 'active' : ''}`}
                              onClick={() => {
                                setActiveTab(sub.id);
                                setIsMobileSidebarOpen(false);
                              }}
                            >
                              <span>{sub.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              if (item.dropdownType === 'organizations') {
                const isOrgActive = activeTab === 'organizations';
                return (
                  <li key={item.id}>
                    <button
                      className={`admin-sidebar__item-btn ${isOrgActive ? 'active' : ''}`}
                      onClick={() => {
                        if (activeTab !== 'organizations') {
                          setActiveTab('organizations');
                        }
                        setIsOrgsDropdownOpen(!isOrgsDropdownOpen);
                      }}
                    >
                      {item.icon}
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {isOrgsDropdownOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>

                    {isOrgsDropdownOpen && (
                      <ul className="admin-sidebar__dropdown-menu">
                        <li>
                          <button
                            className={`admin-sidebar__dropdown-btn ${activeTab === 'organizations' && !selectedOrgSlug ? 'active' : ''}`}
                            onClick={() => {
                              setActiveTab('organizations');
                              setSelectedOrgSlug(null);
                              setIsMobileSidebarOpen(false);
                            }}
                          >
                            <span>All Organizations Overview</span>
                          </button>
                        </li>
                        {(organizations || []).map((org) => (
                          <li key={org.id}>
                            <button
                              className={`admin-sidebar__dropdown-btn ${activeTab === 'organizations' && selectedOrgSlug === org.slug ? 'active' : ''}`}
                              onClick={() => {
                                setActiveTab('organizations');
                                setSelectedOrgSlug(org.slug);
                                setIsMobileSidebarOpen(false);
                              }}
                            >
                              <span>{org.shortName || org.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <button
                    className={`admin-sidebar__item-btn ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar System Action Buttons */}
        <div className="admin-sidebar__footer">
          <span className="admin-sidebar__section-label" style={{ paddingLeft: 0, marginBottom: '0.2rem' }}>System Controls</span>
          <button
            onClick={() => {
              setCurrentPasscode('');
              setNewPasscode('');
              setConfirmPasscode('');
              setPasscodeNotice('');
              setPasscodeError('');
              setShowPasscodeModal(true);
              setIsMobileSidebarOpen(false);
            }}
            className="admin-sidebar__action-btn admin-sidebar__action-btn--passcode"
          >
            <Key size={15} />
            <span>Change Passcode</span>
          </button>

          <button
            onClick={handlePublishContent}
            className="admin-sidebar__action-btn admin-sidebar__action-btn--publish"
            disabled={isPublishingContent}
          >
            <UploadCloud size={15} />
            <span>{isPublishingContent ? 'Publishing...' : 'Publish Content'}</span>
          </button>

          <button
            onClick={handleReset}
            className="admin-sidebar__action-btn admin-sidebar__action-btn--reset"
          >
            <RotateCcw size={15} />
            <span>Reset Defaults</span>
          </button>

          <Link
            to="/"
            onClick={logoutAdmin}
            className="admin-sidebar__action-btn admin-sidebar__action-btn--exit"
          >
            <LogOut size={15} />
            <span>Exit Admin & Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* ── RIGHT MAIN WORKSPACE ── */}
      <main className="admin-workspace">
        {/* Workspace Top Header Bar */}
        <header className="admin-topbar">
          <div>
            <h1 className="admin-topbar__title">{findActiveTitle()}</h1>
          </div>
          <div className="admin-topbar__badge">
            <ShieldCheck size={15} />
            <span>Admin Active</span>
          </div>
        </header>

        {/* Content Section Component */}
        <div className="admin-workspace__content">
          {activeTab === 'priest' && <AdminPriestSection />}
          {activeTab === 'messages' && <AdminMessagesSection />}
          {activeTab === 'newsletter' && <AdminNewsletterSection />}
          {activeTab === 'events' && <AdminEventsSection />}
          {activeTab === 'news' && <AdminNewsSection />}
          {activeTab === 'history' && <AdminHistorySection />}
          {activeTab === 'council' && <AdminCouncilSection />}
          {activeTab === 'organizations' && (
            <AdminOrganizationsSection
              key={selectedOrgSlug || 'all'}
              initialSelectedOrgSlug={selectedOrgSlug}
            />
          )}
          {activeTab === 'wards' && <AdminWardsSection />}
          {activeTab === 'office' && <AdminOfficeSection />}
          {activeTab === 'gallery' && <AdminGallerySection />}
          {activeTab === 'obituary' && <AdminObituarySection />}
          {activeTab === 'institutions' && <AdminInstitutionsSection />}
        </div>
      </main>

      {/* Overlay backdrop for mobile view */}
      {isMobileSidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 95 }}
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Change Passcode Modal */}
      {showPasscodeModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '400px', margin: 0 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--brown-primary)', marginTop: 0 }}>Change Passcode</h3>
            {passcodeNotice ? (
              <div className="admin-alert admin-alert--success">{passcodeNotice}</div>
            ) : (
              <form onSubmit={handleChangePasscode}>
                {passcodeError && (
                  <div className="admin-alert admin-alert--error" style={{ marginBottom: '1rem' }}>{passcodeError}</div>
                )}
                <div className="admin-form-group">
                  <label>Current Passcode</label>
                  <input
                    type="password"
                    className="admin-form-control"
                    placeholder="Enter current passcode"
                    value={currentPasscode}
                    onChange={(e) => setCurrentPasscode(e.target.value)}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>New Passcode</label>
                  <input
                    type="password"
                    className="admin-form-control"
                    placeholder="Enter new passcode"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>Confirm New Passcode</label>
                  <input
                    type="password"
                    className="admin-form-control"
                    placeholder="Re-enter new passcode"
                    value={confirmPasscode}
                    onChange={(e) => setConfirmPasscode(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button type="submit" className="admin-btn admin-btn--primary" style={{ flex: 1 }} disabled={isChangingPasscode}>
                    {isChangingPasscode ? 'Updating...' : 'Update'}
                  </button>
                  <button type="button" onClick={() => setShowPasscodeModal(false)} className="admin-btn admin-btn--secondary" disabled={isChangingPasscode}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
