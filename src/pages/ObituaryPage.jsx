import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Search,
  X,
  Calendar,
  MapPin,
  Church,
  Heart,
  Users,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import { useParishData } from '../context/ParishContext';
import './ObituaryPage.css';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

// Subcomponent: Memorial Photo or Initials fallback
const MemorialPhoto = ({ photo, name }) => {
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
      <div className="obituary-card__photo-fallback">
        <Flame size={22} style={{ opacity: 0.8 }} />
        <span className="obituary-card__photo-initials">{initials || '✝'}</span>
      </div>
    );
  }

  return (
    <img
      src={photo}
      alt={name}
      className="obituary-card__photo"
      onError={() => setErr(true)}
      loading="lazy"
    />
  );
};

const ObituaryPage = () => {
  const { obituaries, wards, siteSettings } = useParishData();
  const officePhone = siteSettings.officePhone || '+91 824 2345678';
  const officePhoneHref = `tel:${officePhone.replace(/[^+\d]/g, '')}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWard, setSelectedWard] = useState('all');

  // Filter obituaries based on search query & selected ward
  const filteredObituaries = useMemo(() => {
    return obituaries.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.konkaniName && item.konkaniName.toLowerCase().includes(q)) ||
        (item.ward && item.ward.toLowerCase().includes(q)) ||
        (item.survivedBy && item.survivedBy.toLowerCase().includes(q));

      const matchesWard =
        selectedWard === 'all' ||
        (item.ward && item.ward.toLowerCase() === selectedWard.toLowerCase());

      return matchesSearch && matchesWard;
    });
  }, [obituaries, searchQuery, selectedWard]);

  // Extract unique ward names for filter dropdown
  const wardOptions = useMemo(() => {
    const set = new Set();
    obituaries.forEach((o) => {
      if (o.ward) set.add(o.ward);
    });
    return Array.from(set);
  }, [obituaries]);

  return (
    <main className="inner-page">
      {/* ── 1. PAGE HERO BANNER ── */}
      <section className="page-hero">
        <div className="page-hero__content container">
          <div className="obituary-hero-icon">
            <Flame size={28} />
          </div>
          <span className="page-hero__label">Rest In Peace</span>
          <h1 className="page-hero__title">Parish Obituaries</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Obituary</span>
          </div>
        </div>
      </section>

      {/* ── 2. PAGE BODY CONTENT ── */}
      <section className="section section--cream">
        <div className="obituary-wrapper">

          {/* Controls Strip (Search & Filter Bar) */}
          <div className="obituary-controls-card">
            <div className="obituary-search-group">
              <Search size={16} className="obituary-search-icon" />
              <input
                type="text"
                className="obituary-search-input"
                placeholder="Search deceased by name, Konkani title, or ward..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search obituaries"
              />
              {searchQuery && (
                <button
                  className="obituary-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="obituary-filter-group">
              <select
                className="obituary-select"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                aria-label="Filter by Ward"
              >
                <option value="all">All Parish Wards</option>
                {wardOptions.map((wardName) => (
                  <option key={wardName} value={wardName}>
                    {wardName}
                  </option>
                ))}
              </select>

              <span className="obituary-count-badge">
                {filteredObituaries.length} Memorial Record{filteredObituaries.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>

          {/* Memorial Cards Grid */}
          {filteredObituaries.length > 0 ? (
            <motion.div
              className="obituary-grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              key={searchQuery + selectedWard}
            >
              {filteredObituaries.map((item) => (
                <motion.article
                  key={item.id}
                  className="obituary-card"
                  variants={cardVariants}
                >
                  {/* Top Banner with Ward Name */}
                  {item.ward && (
                    <div className="obituary-card__banner">
                      <span className="obituary-card__ward-badge">
                        📍 {item.ward}
                      </span>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="obituary-card__body">
                    <div className="obituary-card__profile">
                      {/* Photo Frame */}
                      <div className="obituary-card__photo-frame">
                        <MemorialPhoto photo={item.photo} name={item.name} />
                      </div>

                      {/* Name & Meta Tags */}
                      <div className="obituary-card__identity">
                        {item.konkaniName && (
                          <h3 className="obituary-card__konkani-name">{item.konkaniName}</h3>
                        )}
                        <h4 className="obituary-card__english-name">{item.name}</h4>

                        <div className="obituary-card__meta-tags">
                          {item.age && (
                            <span className="obituary-card__age-tag">
                              Age: {item.age} Yrs
                            </span>
                          )}
                          {item.dateOfDeath && (
                            <span className="obituary-card__date-tag">
                              <Calendar size={11} /> {item.dateOfDeath}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Funeral Mass & Burial Details Box */}
                    {item.funeralDetails && (
                      <div className="obituary-card__funeral-box">
                        <div className="obituary-card__funeral-title">
                          <Church size={12} /> Funeral Services & Burial
                        </div>
                        <p>{item.funeralDetails}</p>
                      </div>
                    )}

                    {/* Survived By / Family Info */}
                    {item.survivedBy && (
                      <div className="obituary-card__family">
                        <div className="obituary-card__family-title">Bereaved Family / Relatives:</div>
                        <div>{item.survivedBy}</div>
                      </div>
                    )}

                    {/* Tribute / Prayer Note */}
                    {item.tribute && (
                      <p className="obituary-card__tribute">
                        "{item.tribute}"
                      </p>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="obituary-empty">
              <Flame size={44} style={{ opacity: 0.5, marginBottom: '0.75rem', color: 'var(--gold-antique)' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown-primary)', marginBottom: '0.5rem' }}>
                No Memorial Records Found
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                No parish obituary notice matching "{searchQuery}".
              </p>
              <button
                className="btn btn--outline"
                onClick={() => { setSearchQuery(''); setSelectedWard('all'); }}
                style={{ marginTop: '1rem' }}
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* Notice Banner for Parishioners */}
          <div className="obituary-notice-banner">
            <h3>Announcing a Demise in Loretto Parish</h3>
            <p>
              To report the passing of a parishioner, request funeral arrangements, or publish obituary notices on the parish portal, please contact the Parish Priest or Parish Office immediately.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/parish/office" className="btn btn--gold">
                <Church size={15} /> Contact Parish Office
              </Link>
              <a href={officePhoneHref} className="btn btn--outline" style={{ color: 'var(--gold-light)', borderColor: 'var(--gold-antique)' }}>
                <PhoneCall size={15} /> Call Office ({officePhone})
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default ObituaryPage;
