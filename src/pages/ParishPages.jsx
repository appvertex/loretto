import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Clock, Phone, Sparkles, HeartHandshake, Calendar, Quote, Users, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { useParishData } from '../context/ParishContext';
import './ParishPages.css';

export const ParishPriestPage = () => {
  const { parishPriest, pastoralTeam } = useParishData();
  const assistantPriest = pastoralTeam.find((m) => m.position === 'Assistant Parish Priest');

  return (
    <main className="inner-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero__content container">
          <h1 className="page-hero__title">Parish Priest</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Parish</span> <span>/</span> <span>Parish Priest</span>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="priest-page-section">
        <div className="container" style={{ maxWidth: '1080px' }}>
          
          {/* Main Priest Card */}
          <div className="priest-main-card">
            <div className="priest-sidebar">
              <div className="priest-image-wrap">
                <img
                  src={parishPriest.image}
                  alt={`${parishPriest.designation} ${parishPriest.name}`}
                  className="priest-image"
                  onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/priest-portrait.jpg`; }}
                />
                <div className="priest-image-border" aria-hidden="true" />
              </div>

              <div className="priest-info-header">
                <span className="priest-role-badge">
                  <Sparkles size={12} aria-hidden="true" /> {parishPriest.title}
                </span>
                <h2 className="priest-fullname">
                  <span className="priest-prefix">{parishPriest.designation}</span> {parishPriest.name}
                </h2>
                <p className="priest-subtitle">Spiritual Leader & Pastoral Director</p>
              </div>

              <div className="priest-quick-actions">
                <Link to="/parish/office" className="priest-action-btn priest-action-btn--primary">
                  <Mail size={15} aria-hidden="true" />
                  <span>Contact Office</span>
                </Link>
                <Link to="/faith/mass-timings" className="priest-action-btn priest-action-btn--outline">
                  <Clock size={15} aria-hidden="true" />
                  <span>Mass Schedule</span>
                </Link>
              </div>
            </div>

            <div className="priest-content-body">
              <div className="priest-message-header">
                <span className="priest-label">PASTORAL GREETING</span>
                <h3 className="priest-heading">Welcome to Our Lady of Loretto Parish</h3>
                <div className="gold-accent-line" aria-hidden="true" />
              </div>

              <div className="priest-letter-wrapper">
                <Quote size={36} className="priest-quote-icon" aria-hidden="true" />
                <div className="priest-letter-text">
                  <p>{parishPriest.message}</p>
                </div>

                <div className="priest-signature-block">
                  <p className="signature-valediction">In Christ's Grace & Blessing,</p>
                  <p className="signature-name">{parishPriest.designation} {parishPriest.name}</p>
                  <p className="signature-title">Parish Priest, Our Lady of Loretto Church</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assistant Parish Priest Card */}
          {assistantPriest && (
            <div className="assistant-section-wrap">
              <div className="section-title-wrap">
                <span className="section-title-tag">PASTORAL TEAM</span>
                <h2 className="section-title-heading">Assistant Parish Priest</h2>
                <div className="gold-accent-line" aria-hidden="true" />
              </div>

              <div className="assistant-main-card">
                <div className="assistant-image-col">
                  <img
                    src={assistantPriest.image}
                    alt={`${assistantPriest.designation} ${assistantPriest.name}`}
                    className="assistant-image"
                    onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/fr-jason-vijay-monis.jpg`; }}
                  />
                  <span className="assistant-role-badge">{assistantPriest.position}</span>
                  <h3 className="assistant-name">
                    <span className="assistant-prefix">{assistantPriest.designation}</span> {assistantPriest.name}
                  </h3>
                </div>

                <div className="assistant-details-col">
                  <h4 className="assistant-bio-heading">Pastoral Care & Ministry</h4>
                  <p className="assistant-bio-text">
                    Assisting in the pastoral care, spiritual formation, and administrative guidance of Our Lady of Loretto Parish. Working alongside the Parish Priest in administering the Holy Sacraments, conducting liturgical celebrations, guiding parish youth and ministries, and serving our community family.
                  </p>

                  <div className="assistant-highlights-grid">
                    <div className="highlight-item">
                      <HeartHandshake size={18} className="highlight-icon" />
                      <div>
                        <strong>Youth & Catechism</strong>
                        <span>Spiritual Guidance</span>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <Calendar size={18} className="highlight-icon" />
                      <div>
                        <strong>Liturgical Services</strong>
                        <span>Sacraments & Masses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Pastoral Care & Contact Strip */}
          <div className="priest-care-strip">
            <div className="care-strip-card">
              <Clock size={22} className="care-icon" />
              <div className="care-info">
                <h4>Meeting the Priest</h4>
                <p>Available for spiritual consultation and confession before weekday Masses or by prior appointment.</p>
              </div>
            </div>

            <div className="care-strip-card">
              <Phone size={22} className="care-icon" />
              <div className="care-info">
                <h4>Parish Office Assistance</h4>
                <p>For certificate requests, intentions, or urgent pastoral visits, please contact the Parish Office.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export const ParishCouncilPage = () => {
  const { parishCouncil } = useParishData();
  const president = parishCouncil.find((m) => m.position.includes('President')) || parishCouncil[0];
  const execMembers = parishCouncil.filter((m) => m.id !== president?.id);

  const commissions = [
    {
      icon: <Sparkles size={22} />,
      title: 'Liturgy & Worship',
      desc: 'Organising solemn Eucharistic celebrations, feast day liturgies, and spiritual devotion programs.',
    },
    {
      icon: <BookOpen size={22} />,
      title: 'Catechism & Faith Formation',
      desc: 'Nurturing Christian doctrine and Catholic values among parish children, youth, and families.',
    },
    {
      icon: <HeartHandshake size={22} />,
      title: 'Social Service & Caritas',
      desc: 'Reaching out with compassionate care to the needy, sick, and vulnerable members in our 18 wards.',
    },
    {
      icon: <ShieldCheck size={22} />,
      title: 'Finance & Property Stewardship',
      desc: 'Transparent management of parish accounts, building maintenance, and development projects.',
    },
  ];

  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="page-hero__content container">
          <h1 className="page-hero__title">Parish Council</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Parish</span> <span>/</span> <span>Parish Council</span>
          </div>
        </div>
      </section>

      <section className="council-page-section">
        <div className="container" style={{ maxWidth: '1080px' }}>
          
          {/* Intro Overview Card */}
          <div className="council-intro-card">
            <span className="council-intro-tag">
              <Users size={13} aria-hidden="true" /> PARISH GOVERNANCE & STEWARDSHIP
            </span>
            <h2 className="council-intro-title">Parish Pastoral Council</h2>
            <div className="gold-accent-line" style={{ margin: '0 auto 1.25rem' }} aria-hidden="true" />
            <p className="council-intro-text">
              The Parish Pastoral Council of Our Lady of Loretto Church is a representative body of priests, ward leaders, and organizational representatives collaborating in pastoral planning, spiritual growth, and community development.
            </p>
          </div>

          {/* Executive Office Bearers */}
          <div className="section-title-wrap">
            <span className="section-title-tag">EXECUTIVE BOARD</span>
            <h2 className="section-title-heading">Office Bearers & Leadership</h2>
            <div className="gold-accent-line" aria-hidden="true" />
          </div>

          {/* President Highlight Card */}
          {president && (
            <div className="council-member-card council-member-card--president">
              <div className="council-avatar-wrap">
                <img
                  src={president.image}
                  alt={president.name}
                  className="council-avatar-img"
                  onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/priest-portrait.jpg`; }}
                />
              </div>
              <span className="council-role-badge">EX-OFFICIO PRESIDENT</span>
              <h3 className="council-member-name">{president.name}</h3>
              <p className="council-member-position">Parish Priest</p>
            </div>
          )}

          {/* Rest of Executive Members */}
          <div className="council-exec-grid">
            {execMembers.map((member) => (
              <div key={member.id} className="council-member-card">
                <div className="council-avatar-wrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="council-avatar-img"
                    onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/hero-exterior.jpg`; }}
                  />
                </div>
                <span className="council-role-badge">{member.position}</span>
                <h3 className="council-member-name">{member.name}</h3>
                <p className="council-member-position">{member.position}</p>
              </div>
            ))}
          </div>

          {/* Commissions Breakdown */}
          <div className="section-title-wrap">
            <span className="section-title-tag">COMMISSIONS & COMMITTEES</span>
            <h2 className="section-title-heading">Key Pastoral Focus Areas</h2>
            <div className="gold-accent-line" aria-hidden="true" />
          </div>

          <div className="commissions-grid">
            {commissions.map((comm, idx) => (
              <div key={idx} className="commission-card">
                <div className="commission-icon-wrap" aria-hidden="true">
                  {comm.icon}
                </div>
                <h4 className="commission-title">{comm.title}</h4>
                <p className="commission-desc">{comm.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Information Strip */}
          <div className="council-info-strip">
            <div className="council-info-text">
              <h3>Ward Representation & Monthly Meetings</h3>
              <p>The council meets regularly to deliberate on parish affairs. Every parishioner can submit suggestions through their respective Ward Gurkar or Council Representative.</p>
            </div>
            <Link to="/wards" className="council-info-btn">
              <span>View All 18 Wards</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
};

import WardsPage from './WardsPage';
export { WardsPage };

export const ParishOfficePage = () => {
  const { office } = useParishData();

  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="page-hero__content container">
          <h1 className="page-hero__title">Parish Office</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Parish</span> <span>/</span> <span>Parish Office</span>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container" style={{ maxWidth: '850px' }}>
          <h2 className="section-heading__title" style={{ marginBottom: '1.5rem' }}>Parish Office Information</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            {office.notes}
          </p>

          <div className="grid-2">
            <div style={{ background: 'var(--cream)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--brown-primary)', marginBottom: '0.75rem' }}>Office Hours</h4>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
                <strong>Monday – Saturday:</strong><br />
                {office.weekdayHours}<br /><br />
                <strong>Sundays & Public Holidays:</strong><br />
                {office.weekendHours}
              </p>
            </div>

            <div style={{ background: 'var(--cream)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--brown-primary)', marginBottom: '0.75rem' }}>Office Contact</h4>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
                <strong>Address:</strong> {office.address}<br />
                <strong>Phone:</strong> {office.phone}<br />
                <strong>Email:</strong> {office.email}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
