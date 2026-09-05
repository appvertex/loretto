import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2,
  Search,
  X,
  Phone,
  Mail,
  MapPin,
  UserCheck,
  Calendar,
  Sparkles,
  GraduationCap,
  Church,
  ShieldCheck,
} from 'lucide-react';
import { useParishData } from '../context/ParishContext';
import './InstitutionsPage.css';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

const CATEGORIES = [
  'All Institutions',
  'Educational Institution',
  'Convent & Religious House',
  'Parish Facility',
];

const InstitutionsPage = () => {
  const { institutions } = useParishData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Institutions');

  const filteredInstitutions = useMemo(() => {
    return (institutions || []).filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.konkaniName && item.konkaniName.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.head && item.head.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'All Institutions' ||
        (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());

      return matchesSearch && matchesCat;
    });
  }, [institutions, searchQuery, selectedCategory]);

  return (
    <main className="inner-page">
      {/* ── HERO BANNER ── */}
      <section className="page-hero">
        <div className="page-hero__content container">
          <div className="institutions-hero-icon">
            <Building2 size={28} />
          </div>
          <span className="page-hero__label">Education & Service • (ಸಂಸ್ಥಾವೊ)</span>
          <h1 className="page-hero__title">Parish Institutions</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Institutions</span>
          </div>
        </div>
      </section>

      {/* ── PAGE BODY CONTENT ── */}
      <section className="section section--cream">
        <div className="institutions-wrapper">

          {/* Controls Strip (Search & Category Filters) */}
          <div className="institutions-controls">
            <div className="institutions-search-group">
              <Search size={16} className="institutions-search-icon" />
              <input
                type="text"
                className="institutions-search-input"
                placeholder="Search schools, convents, facilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search institutions"
              />
              {searchQuery && (
                <button
                  className="obituary-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="institutions-categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`institutions-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredInstitutions.length > 0 ? (
            <motion.div
              className="institutions-grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              key={searchQuery + selectedCategory}
            >
              {filteredInstitutions.map((inst) => (
                <motion.article
                  key={inst.id}
                  className="institution-card"
                  variants={cardVariants}
                >
                  {/* Card Header Image */}
                  <div className="institution-card__image-wrap">
                    <img
                      src={inst.image || `${import.meta.env.BASE_URL}images/hero-community.jpg`}
                      alt={inst.name}
                      className="institution-card__image"
                    />
                    <span className="institution-card__category-badge">
                      {inst.category || 'Institution'}
                    </span>
                    {inst.established && (
                      <span className="institution-card__est-badge">
                        Est. {inst.established}
                      </span>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="institution-card__body">
                    {inst.konkaniName && (
                      <h3 className="institution-card__konkani">{inst.konkaniName}</h3>
                    )}
                    <h2 className="institution-card__title">{inst.name}</h2>

                    {inst.description && (
                      <p className="institution-card__description">{inst.description}</p>
                    )}

                    {/* Metadata Details Box */}
                    <div className="institution-card__meta-box">
                      {inst.head && (
                        <div className="institution-card__meta-item">
                          <UserCheck size={14} className="institution-card__meta-icon" />
                          <span><strong>Head / Correspondent:</strong> {inst.head}</span>
                        </div>
                      )}
                      {inst.phone && (
                        <div className="institution-card__meta-item">
                          <Phone size={14} className="institution-card__meta-icon" />
                          <span><strong>Phone:</strong> {inst.phone}</span>
                        </div>
                      )}
                      {inst.email && (
                        <div className="institution-card__meta-item">
                          <Mail size={14} className="institution-card__meta-icon" />
                          <span><strong>Email:</strong> {inst.email}</span>
                        </div>
                      )}
                      {inst.address && (
                        <div className="institution-card__meta-item">
                          <MapPin size={14} className="institution-card__meta-icon" />
                          <span><strong>Address:</strong> {inst.address}</span>
                        </div>
                      )}
                    </div>

                    {/* Facility Tags */}
                    {inst.facilities && inst.facilities.length > 0 && (
                      <div className="institution-card__facilities">
                        {inst.facilities.map((fac, idx) => (
                          <span key={idx} className="institution-facility-tag">
                            ✦ {fac}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="obituary-empty">
              <Building2 size={44} style={{ opacity: 0.5, marginBottom: '0.75rem', color: 'var(--gold-antique)' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown-primary)', marginBottom: '0.5rem' }}>
                No Institutions Found
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                No parish institution records match "{searchQuery}".
              </p>
              <button
                className="btn btn--outline"
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Institutions'); }}
                style={{ marginTop: '1rem' }}
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default InstitutionsPage;
