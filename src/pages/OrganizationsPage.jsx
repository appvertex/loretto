import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Calendar,
  MapPin,
  Users,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  Clock,
  ShieldAlert,
  UserCheck,
  Award,
  BookOpen
} from 'lucide-react';
import { ministries as fallbackMinistries } from '../data/ministries';
import { useParishData } from '../context/ParishContext';
import './Organizations.css';

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

// Subcomponent: Image with graceful fallback placeholder
const OrgCardImage = ({ src, alt, category }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <div className="org-card__placeholder">
        <div className="org-card__placeholder-icon">
          <span>✝</span>
        </div>
        <span style={{ fontSize: '0.78rem', opacity: 0.9, letterSpacing: '0.04em' }}>
          {category || 'Parish Association'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="org-card__image"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
};

// Subcomponent: Office Bearer Avatar with Initials / Placeholder
const BearerAvatar = ({ photo, name, role }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !photo) {
    // Generate initials from name or role
    const getInitials = () => {
      if (role?.includes('Director') || role?.includes('Priest')) return '✝';
      if (role?.includes('President')) return 'PR';
      if (role?.includes('Secretary')) return 'SC';
      if (role?.includes('Treasurer')) return 'TR';
      if (role?.includes('Master')) return 'CM';
      if (role?.includes('Coordinator') || role?.includes('Animator')) return 'AN';
      return '★';
    };

    return (
      <div className="org-bearer-avatar__placeholder">
        <span className="org-bearer-avatar__icon">{getInitials()}</span>
      </div>
    );
  }

  return (
    <img
      src={photo}
      alt={name}
      className="org-bearer-avatar__img"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
};

// Subcomponent: Organizations List & Grid View (All Associations - Minimal Thodambila Layout)
const OrganizationsList = () => {
  const { organizations } = useParishData();
  const allOrgs = (organizations && organizations.length > 0) ? organizations : fallbackMinistries;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(allOrgs.map((m) => m.category).filter(Boolean))];
    return cats;
  }, [allOrgs]);

  // Filtered organizations
  const filteredMinistries = useMemo(() => {
    return allOrgs.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.shortName?.toLowerCase().includes(q) ||
        item.konkaniName?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.tagline?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.activities?.some((act) => act.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [allOrgs, searchQuery, selectedCategory]);

  return (
    <div className="org-hub-minimal-wrapper">
      {/* Stats Counter Pill */}
      <motion.div
        className="org-hub-minimal-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="org-hub-minimal-pill">
          <span>{allOrgs.length} Active Parish Associations</span>
        </div>
      </motion.div>

      {/* 2. Simple Centered Search */}
      <motion.div
        className="org-hub-search-box"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Search size={16} className="org-hub-search-icon" />
        <input
          type="text"
          className="org-hub-search-input"
          placeholder="Search association name, office bearers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search associations"
        />
        {searchQuery && (
          <button
            className="org-search__clear"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </motion.div>

      {/* 3. Category Filter Pills */}
      <div className="org-hub-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`org-category-pill ${selectedCategory === cat ? 'org-category-pill--active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. Minimal Ward-Style Cards Grid */}
      {filteredMinistries.length > 0 ? (
        <motion.div
          className="org-hub-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={`${searchQuery}-${selectedCategory}`}
        >
          {filteredMinistries.map((org) => (
            <motion.div
              key={org.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Link
                to={`/organizations/${org.slug}`}
                className="org-hub-card"
                aria-label={`View details of ${org.name}`}
              >
                <div className="org-hub-card__top">
                  {org.konkaniName && (
                    <h3 className="org-hub-card__konkani">{org.konkaniName}</h3>
                  )}
                  <span className="org-hub-card__english">{org.name}</span>
                </div>

                <div className="org-hub-card__info">
                  <p className="org-hub-card__desc">{org.description}</p>

                  {org.meetingDay && (
                    <div className="org-hub-card__row">
                      <span className="org-hub-card__label">ಜಮಾತ್ (Meeting):</span>
                      <span className="org-hub-card__val">
                        {org.meetingDay.split(' at ')[0].replace('after Morning Mass', '').replace('after 7:30 AM Mass', '')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="org-hub-card__footer">
                  <span className="org-hub-card__badge">{org.category || 'Association'}</span>
                  <span className="org-hub-card__link">
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
          className="org-empty"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ padding: '2.5rem 1rem' }}
        >
          <ShieldAlert size={36} className="org-empty__icon" />
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown-primary)' }}>
            No Associations Found
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            We couldn't find any associations matching your search "{searchQuery}".
          </p>
          <button
            className="btn btn--outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

// Subcomponent: Detailed Single Association View (Minimal Thodambila Aligned)
const OrganizationDetail = ({ org }) => {
  const { organizations } = useParishData();
  const allOrgs = (organizations && organizations.length > 0) ? organizations : fallbackMinistries;
  const currentIndex = allOrgs.findIndex((m) => m.slug === org.slug);
  const prevOrg = currentIndex > 0 ? allOrgs[currentIndex - 1] : null;
  const nextOrg = currentIndex < allOrgs.length - 1 ? allOrgs[currentIndex + 1] : null;

  return (
    <div className="org-minimal-wrapper">
      {/* 1. Clean Title Header */}
      <motion.div
        className="org-minimal-header"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {(org.category || org.meetingDay || org.venue) && (
          <div className="org-minimal-meta-strip">
            {org.category && (
              <span className="org-minimal-meta-item">
                <Sparkles size={14} className="org-minimal-meta-icon" />
                <span>{org.category}</span>
              </span>
            )}
            {org.meetingDay && (
              <>
                {org.category && <span className="org-minimal-meta-sep">•</span>}
                <span className="org-minimal-meta-item">
                  <Clock size={14} className="org-minimal-meta-icon" />
                  <span>{org.meetingDay}</span>
                </span>
              </>
            )}
            {org.venue && (
              <>
                {(org.category || org.meetingDay) && <span className="org-minimal-meta-sep">•</span>}
                <span className="org-minimal-meta-item">
                  <MapPin size={14} className="org-minimal-meta-icon" />
                  <span>{org.venue}</span>
                </span>
              </>
            )}
          </div>
        )}

        {/* Motto */}
        {org.motto && (
          <p className="org-minimal-motto">"{org.motto}"</p>
        )}
      </motion.div>

      {/* 2. Office Bearers Section (ಹುದ್ದೆದಾರ್ - Clean Cards Grid) */}
      <motion.div
        className="org-minimal-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="org-minimal-section-title">
          <Award size={18} />
          <span>ಹುದ್ದೆದಾರ್ • Office Bearers & Committee</span>
        </h3>

        {org.officeBearers && org.officeBearers.length > 0 ? (
          <motion.div
            className="org-minimal-bearers-grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {org.officeBearers.map((bearer, idx) => (
              <motion.div
                key={idx}
                className="org-minimal-bearer-card"
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <div className="org-minimal-avatar">
                  <BearerAvatar photo={bearer.photo} name={bearer.name} role={bearer.role} />
                </div>
                <h4 className="org-minimal-bearer-konkani-name">
                  {bearer.konkaniName || bearer.name}
                </h4>
                <p className="org-minimal-bearer-eng-name">{bearer.name}</p>
                <span
                  className={`org-minimal-role-badge ${
                    bearer.role?.includes('Director') || bearer.role?.includes('Priest')
                      ? 'org-minimal-role-badge--director'
                      : ''
                  }`}
                >
                  {bearer.konkaniRole || bearer.role}
                </span>

                {bearer.phone && (
                  <a
                    href={`tel:${bearer.phone.replace(/\s+/g, '')}`}
                    className="org-minimal-phone-btn"
                    title={`Call ${bearer.name}`}
                  >
                    <Phone size={12} />
                    <span>{bearer.phone}</span>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Office bearers list will be updated soon.
          </p>
        )}
      </motion.div>

      {/* 3. Brief About / Overview Section */}
      <motion.div
        className="org-minimal-card-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.15 }}
      >
        <h3 className="org-minimal-section-title">
          <BookOpen size={18} />
          <span>ಪರಿಚಯ್ • About {org.shortName || org.name}</span>
        </h3>
        <p className="org-minimal-about-text">
          {org.fullDescription || org.description}
        </p>
      </motion.div>

      {/* 4. Bottom Navigation */}
      <div className="org-minimal-bottom-nav">
        <Link to="/organizations" className="org-minimal-back-link">
          <ArrowLeft size={16} />
          <span>Back to All Associations (ಸಂಘಟನಾಂ)</span>
        </Link>

        <div className="org-minimal-prev-next">
          {prevOrg && (
            <Link
              to={`/organizations/${prevOrg.slug}`}
              className="org-minimal-nav-btn"
              title={prevOrg.name}
            >
              <ArrowLeft size={14} />
              <span>{prevOrg.shortName || prevOrg.name}</span>
            </Link>
          )}
          {nextOrg && (
            <Link
              to={`/organizations/${nextOrg.slug}`}
              className="org-minimal-nav-btn"
              title={nextOrg.name}
            >
              <span>{nextOrg.shortName || nextOrg.name}</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Organizations Page Controller
const OrganizationsPage = () => {
  const { slug } = useParams();
  const { organizations } = useParishData();
  const allOrgs = (organizations && organizations.length > 0) ? organizations : fallbackMinistries;
  const selectedOrg = slug ? allOrgs.find((m) => m.slug === slug) : null;

  return (
    <main className="inner-page">
      {/* Dynamic Page Hero */}
      <section className="page-hero">
        <div className="page-hero__content container">
          <div className="org-bilingual-title">
            {selectedOrg && selectedOrg.konkaniName && (
              <span className="org-bilingual-title__konkani">{selectedOrg.konkaniName}</span>
            )}
            <h1 className="page-hero__title">
              {selectedOrg ? selectedOrg.name : 'Parish Organizations (ಸಂಘಟನಾಂ)'}
            </h1>
          </div>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span>{' '}
            {selectedOrg ? (
              <>
                <Link to="/organizations">Organizations</Link> <span>/</span>{' '}
                <span>{selectedOrg.shortName || selectedOrg.name}</span>
              </>
            ) : (
              <span>Organizations</span>
            )}
          </div>
        </div>
      </section>

      {/* Page Body */}
      <section className="section section--cream">
        <div className="container">
          {slug ? (
            selectedOrg ? (
              <OrganizationDetail org={selectedOrg} />
            ) : (
              <div className="org-empty">
                <ShieldAlert size={48} className="org-empty__icon" />
                <h2 className="org-empty__title">Organization Not Found</h2>
                <p className="org-empty__desc">
                  The association you are looking for does not exist or may have been renamed.
                </p>
                <Link to="/organizations" className="btn btn--primary">
                  ← Back to All Organizations
                </Link>
              </div>
            )
          ) : (
            <OrganizationsList />
          )}
        </div>
      </section>
    </main>
  );
};

export default OrganizationsPage;


