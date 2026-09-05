import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Phone,
  ArrowRight,
  ArrowLeft,
  Users,
  Calendar,
  Home as HomeIcon,
  Sparkles,
  MapPin,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useParishData } from '../context/ParishContext';
import './Wards.css';

// Animation variants for smooth stagger & card transitions
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// Subcomponent: Leader Avatar with initials fallback
const LeaderAvatar = ({ photo, name, role }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !photo) {
    const getInitials = () => {
      const r = role?.toLowerCase() || '';
      if (r.includes('gurkar')) return 'ಗು';
      if (r.includes('president') && r.includes('vice')) return 'ಉ.ಅ';
      if (r.includes('president')) return 'ಅ';
      if (r.includes('secretary')) return 'ಕಾ';
      if (r.includes('male')) return 'ದಾ';
      if (r.includes('female')) return 'ಸ್ತ್ರೀ';
      // initials from name
      const initials = (name || '?').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
      return initials || '✝';
    };

    return (
      <div className="ward-minimal-avatar__placeholder">
        <span>{getInitials()}</span>
      </div>
    );
  }

  return (
    <img
      src={photo}
      alt={name}
      className="ward-minimal-avatar__img"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
};

// Subcomponent: Minimal Clean Ward Detail (Thodambila Aligned)
const WardDetail = ({ ward }) => {
  const { wards } = useParishData();

  const currentIndex = wards.findIndex((w) => w.slug === ward.slug);
  const prevWard = currentIndex > 0 ? wards[currentIndex - 1] : null;
  const nextWard = currentIndex < wards.length - 1 ? wards[currentIndex + 1] : null;

  // Build a unified leader list: Gurkar first, then President/VP/Secretary (if set), then Reps
  const hasName = (obj) => obj && obj.name && obj.name.trim() !== '';

  const officerBearers = [
    ward.gurkar && { ...ward.gurkar, _roleLabel: 'Gurkar', _roleKonkani: ward.gurkar.konkaniRole || 'ಗುರ್ಕಾರ್', _badgeClass: 'ward-minimal-role-badge--gurkar' },
    hasName(ward.president) && { ...ward.president, _roleLabel: 'President', _roleKonkani: 'ಅಧ್ಯಕ್ಷ', _badgeClass: 'ward-minimal-role-badge--president' },
    hasName(ward.vicePresident) && { ...ward.vicePresident, _roleLabel: 'Vice President', _roleKonkani: 'ಉಪಾಧ್ಯಕ್ಷ', _badgeClass: 'ward-minimal-role-badge--president' },
    hasName(ward.secretary) && { ...ward.secretary, _roleLabel: 'Secretary', _roleKonkani: 'ಕಾರ್ಯದರ್ಶಿ', _badgeClass: '' },
    ...(ward.representatives || []).map((rep) => ({
      ...rep,
      _roleLabel: rep.role?.includes('Male') ? 'Male Representative' : 'Female Representative',
      _roleKonkani: rep.konkaniRole || 'ಪ್ರತಿನಿದಿ',
      _badgeClass: '',
    })),
  ].filter(Boolean);

  return (
    <div className="ward-minimal-wrapper">
      {/* 1. Clean Title Header */}
      <motion.div
        className="ward-minimal-header"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="ward-minimal-meta-strip">
          <span className="ward-minimal-meta-item">
            <Sparkles size={14} className="ward-minimal-meta-icon" />
            <span>{ward.patronSaint}</span>
          </span>
          <span className="ward-minimal-meta-sep">•</span>
          <span className="ward-minimal-meta-item">
            <Calendar size={14} className="ward-minimal-meta-icon" />
            <span>Feast: {ward.feastDate}</span>
          </span>
        </div>

        {ward.motto && (
          <p className="ward-minimal-motto">"{ward.motto}"</p>
        )}
      </motion.div>

      {/* 2. Office Bearers / Leadership Grid (ಹುದ್ದೆದಾರ್) */}
      <motion.div
        className="ward-minimal-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div
          className="ward-minimal-bearers-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {officerBearers.map((officer, idx) => (
            <motion.div
              key={idx}
              className="ward-minimal-bearer-card"
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.25 }}
            >
              <div className="ward-minimal-avatar">
                <LeaderAvatar
                  photo={officer.photo}
                  name={officer.name}
                  role={officer._roleLabel}
                />
              </div>
              <h4 className="ward-minimal-bearer-konkani-name">
                {officer.konkaniName || officer.name}
              </h4>
              <p className="ward-minimal-bearer-eng-name">{officer.name}</p>
              <span className={`ward-minimal-role-badge ${officer._badgeClass || ''}`}>
                {officer._roleKonkani}
              </span>

              {officer.phone && (
                <a
                  href={`tel:${officer.phone.replace(/\s+/g, '')}`}
                  className="ward-minimal-phone-btn"
                  title={`Call ${officer.name}`}
                >
                  <Phone size={12} />
                  <span>{officer.phone}</span>
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* 5. Ward Feast & Overview Section (Minimal) */}
      <motion.div
        className="ward-minimal-feast-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.15 }}
      >
        <div className="ward-minimal-feast-header">
          <Sparkles size={20} className="ward-minimal-feast-icon" />
          <h3 className="ward-minimal-feast-title">
            ವಾಡ್ಯಾ ಫೆಸ್ತ್ — {ward.konkaniName}, ಲೊರೆಟ್ಟೊ
          </h3>
        </div>

        <p className="ward-minimal-feast-desc">
          {ward.feastCelebration?.description ||
            `Our Lady of Loretto Parish, ${ward.name} celebrates its annual patron saint feast day on ${ward.feastDate} with solemn Thanksgiving Holy Mass, nine-day family novena, and fellowship meal.`}
        </p>

        <div className="ward-minimal-quick-details">
          <div className="ward-minimal-detail-item">
            <span className="ward-minimal-detail-label">ಮಯ್ನ್ಯಾಚಿ ಜಮಾತ್ (Monthly SCC) :</span>
            <span className="ward-minimal-detail-value">{ward.meetingSchedule || ward.meetingDay}</span>
          </div>
          <div className="ward-minimal-detail-item">
            <span className="ward-minimal-detail-label">ವ್ಯಾಪ್ತಿ (Area Covered) :</span>
            <span className="ward-minimal-detail-value">{ward.area}</span>
          </div>
        </div>
      </motion.div>

      {/* 6. Clean Bottom Navigation */}
      <div className="ward-minimal-bottom-nav">
        <Link to="/wards" className="ward-minimal-back-link">
          <ArrowLeft size={16} />
          <span>Back to All Wards (ವಾಡೆ)</span>
        </Link>

        <div className="ward-minimal-prev-next">
          {prevWard && (
            <Link
              to={`/wards/${prevWard.slug}`}
              className="ward-minimal-nav-btn"
              title={prevWard.name}
            >
              <ArrowLeft size={14} />
              <span>{prevWard.name.replace(' Ward', '')}</span>
            </Link>
          )}
          {nextWard && (
            <Link
              to={`/wards/${nextWard.slug}`}
              className="ward-minimal-nav-btn"
              title={nextWard.name}
            >
              <span>{nextWard.name.replace(' Ward', '')}</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Subcomponent: Minimal Wards List (All Wards Hub - Clean Thodambila Layout)
const WardsList = () => {
  const { wards } = useParishData();
  const [searchQuery, setSearchQuery] = useState('');


  // Filtered wards
  const filteredWards = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return wards;
    return wards.filter((w) => {
      return (
        w.name.toLowerCase().includes(q) ||
        w.konkaniName?.toLowerCase().includes(q) ||
        w.patronSaint?.toLowerCase().includes(q) ||
        w.konkaniPatron?.toLowerCase().includes(q) ||
        w.area?.toLowerCase().includes(q) ||
        w.gurkar?.name.toLowerCase().includes(q) ||
        w.gurkar?.konkaniName?.toLowerCase().includes(q) ||
        w.representatives?.some(
          (r) =>
            r.name.toLowerCase().includes(q) ||
            r.konkaniName?.toLowerCase().includes(q)
        )
      );
    });
  }, [searchQuery, wards]);

  return (
    <div className="ward-hub-minimal-wrapper">
      {/* 1. Clean Centered Header */}
      <motion.div
        className="ward-hub-minimal-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className="ward-hub-minimal-subtitle">
          Small Christian Communities (SCC) • Our Lady of Loretto Church
        </p>

        <motion.div
          className="ward-hub-minimal-pill"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <span>{wards.length} Wards (ವಾಡೆ)</span>
        </motion.div>
      </motion.div>

      {/* 2. Simple Centered Search */}
      <motion.div
        className="ward-hub-search-box"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Search size={16} className="ward-hub-search-icon" />
        <input
          type="text"
          className="ward-hub-search-input"
          placeholder="Search ward name, patron saint, or gurkar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search parish wards"
        />
        {searchQuery && (
          <button
            className="ward-search__clear"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </motion.div>

      {/* 3. Minimal Ward Cards Grid with Staggered Entrance */}
      {filteredWards.length > 0 ? (
        <motion.div
          className="ward-hub-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={searchQuery}
        >
          {filteredWards.map((ward) => (
            <motion.div
              key={ward.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Link
                to={`/wards/${ward.slug}`}
                className="ward-hub-card"
                aria-label={`View details for ${ward.name}`}
              >
                <div className="ward-hub-card__top">
                  <h3 className="ward-hub-card__konkani">{ward.konkaniName}</h3>
                  <span className="ward-hub-card__english">{ward.name}</span>
                </div>

                <div className="ward-hub-card__info">
                  <div className="ward-hub-card__row">
                    <span className="ward-hub-card__label">ಆಶೀರ್ವಾದಕ್ (Patron):</span>
                    <span className="ward-hub-card__val">{ward.patronSaint}</span>
                  </div>

                  {ward.gurkar && (
                    <div className="ward-hub-card__row">
                      <span className="ward-hub-card__label">ಗುರ್ಕಾರ್ (Gurkar):</span>
                      <span className="ward-hub-card__val">{ward.gurkar.konkaniName || ward.gurkar.name}</span>
                    </div>
                  )}
                </div>

                <div className="ward-hub-card__footer">
                  <span className="ward-hub-card__link">
                    <span>View Details</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="ward-empty"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ padding: '2.5rem 1rem' }}
        >
          <ShieldAlert size={36} className="ward-empty__icon" />
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown-primary)' }}>
            No Wards Found
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            No parish ward matching "{searchQuery}".
          </p>
          <button className="btn btn--outline" onClick={() => setSearchQuery('')}>
            Reset Search
          </button>
        </motion.div>
      )}
    </div>
  );
};

// Main Wards Page Controller
const WardsPage = () => {
  const { wards } = useParishData();
  const { slug } = useParams();
  const selectedWard = slug ? wards.find((w) => w.slug === slug) : null;

  return (
    <main className="inner-page">
      {/* Dynamic Page Hero */}
      <section className="page-hero">
        <div className="page-hero__content container">
          <div className="ward-bilingual-title">
            {selectedWard && selectedWard.konkaniName && (
              <span className="ward-bilingual-title__konkani">{selectedWard.konkaniName}</span>
            )}
            <h1 className="page-hero__title">
              {selectedWard ? selectedWard.name : 'Parish Wards (ವಾಡೆ)'}
            </h1>
          </div>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span>{' '}
            {selectedWard ? (
              <>
                <Link to="/wards">Wards</Link> <span>/</span>{' '}
                <span>{selectedWard.name}</span>
              </>
            ) : (
              <span>Wards</span>
            )}
          </div>
        </div>
      </section>

      {/* Page Body */}
      <section className="section section--cream">
        <div className="container">
          {slug ? (
            selectedWard ? (
              <WardDetail ward={selectedWard} />
            ) : (
              <div className="ward-empty">
                <ShieldAlert size={48} className="ward-empty__icon" />
                <h2 className="ward-empty__title">Ward Not Found</h2>
                <p className="ward-empty__desc">
                  The parish ward you are looking for does not exist or may have been renamed.
                </p>
                <Link to="/wards" className="btn btn--primary">
                  ← Back to All Wards
                </Link>
              </div>
            )
          ) : (
            <WardsList />
          )}
        </div>
      </section>
    </main>
  );
};

export default WardsPage;
