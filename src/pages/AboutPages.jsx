import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Landmark, Shield } from 'lucide-react';
import { useParishData } from '../context/ParishContext';

const replaceChurchName = (text, churchName) => (text || '').replaceAll('{churchName}', churchName);

export const OurParishPage = () => {
  const { parishFacts, siteSettings, aboutContent } = useParishData();
  const churchName = siteSettings.churchName || 'Our Lady of Loretto Church';
  const content = aboutContent.parish;

  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="page-hero__content container">
          <h1 className="page-hero__title">{content.heroTitle}</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>About</span> <span>/</span> <span>Our Parish</span>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 className="section-heading__title" style={{ marginBottom: '1.5rem' }}>{replaceChurchName(content.contentHeading, churchName)}</h2>

          {/* Church exterior photo */}
          <div style={{ position: 'relative', marginBottom: '2.5rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-strong)', border: '2px solid var(--gold-antique)' }}>
            <img
              src={content.image}
                alt={`${churchName}, Loretto, Mangalore`}
              style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(53,21,27,0.75) 0%, transparent 100%)', padding: '1.25rem 1.5rem' }}>
              <p style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0, letterSpacing: '0.03em' }}>
                {replaceChurchName(content.imageCaption, churchName)}
              </p>
            </div>
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
            {replaceChurchName(content.introduction, churchName)}
          </p>

          <div className="grid-2" style={{ margin: '2.5rem 0' }}>
            {parishFacts.map((fact, idx) => (
              <div key={idx} style={{ background: 'var(--cream)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-gold)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-antique)', fontWeight: 600 }}>{fact.label}</span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--brown-primary)', marginTop: '0.2rem' }}>{fact.value}</h4>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--brown-primary)', marginBottom: '1rem' }}>{content.missionHeading}</h3>
          <p style={{ lineHeight: '1.8' }}>
            {replaceChurchName(content.mission, churchName)}
          </p>
        </div>
      </section>
    </main>
  );
};

export const HistoryPage = () => {
  const { historyTimeline, aboutContent } = useParishData();
  const content = aboutContent.history;

  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="page-hero__content container">
          <h1 className="page-hero__title">{content.heroTitle}</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>About</span> <span>/</span> <span>History</span>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">{content.sectionHeading}</h2>
            <p className="section-heading__subtitle">{content.sectionSubtitle}</p>
          </div>

          {/* Church exterior photo banner */}
          <div style={{ maxWidth: '850px', margin: '0 auto 2.5rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-strong)', border: '2px solid var(--border-gold)' }}>
            <img
              src={content.image}
              alt={content.imageAlt}
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
            {historyTimeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  background: 'var(--warm-white)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  marginBottom: '2rem',
                  boxShadow: 'var(--shadow-soft)',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '1.5rem',
                  alignItems: 'center'
                }}
              >
                <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-beige)', paddingRight: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold-antique)' }}>{item.year}</span>
                  <span style={{ display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brown-muted)' }}>{item.era}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--brown-primary)', marginBottom: '0.4rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: '1.6' }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export const PatronessPage = () => {
  const { aboutContent } = useParishData();
  const content = aboutContent.patroness;

  return (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
          <h1 className="page-hero__title">{content.heroTitle}</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>About</span> <span>/</span> <span>Our Patroness</span>
        </div>
      </div>
    </section>

    <section className="section section--white">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <img
            src={content.image}
            alt={content.imageAlt}
            style={{ width: '260px', height: '360px', objectFit: 'cover', borderRadius: 'var(--radius-md)', margin: '0 auto 1.5rem', border: '2px solid var(--gold-antique)', boxShadow: 'var(--shadow-strong)' }}
          />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--gold-antique)' }}>&quot;{content.devotionalTitle}&quot;</h2>
          {/* Feast Day Badge */}
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '1.5rem',
            padding: '0',
          }}>
            {/* Top decorative line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.9rem' }}>
              <span style={{ display: 'block', width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, var(--gold-antique))' }} />
              <span style={{ color: 'var(--gold-antique)', fontSize: '0.75rem' }}>✦</span>
              <span style={{ display: 'block', width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, var(--gold-antique))' }} />
            </div>

            <div style={{
              border: '1.5px solid var(--gold-antique)',
              borderRadius: '12px',
              padding: '1rem 2.2rem',
              background: 'linear-gradient(135deg, rgba(198,161,91,0.07) 0%, rgba(198,161,91,0.02) 100%)',
              boxShadow: '0 2px 18px rgba(198,161,91,0.13), inset 0 0 0 1px rgba(198,161,91,0.08)',
              position: 'relative',
            }}>
              {/* Corner accents */}
              <span style={{ position: 'absolute', top: '6px', left: '8px', width: '8px', height: '8px', borderTop: '1.5px solid var(--gold-antique)', borderLeft: '1.5px solid var(--gold-antique)', borderRadius: '2px 0 0 0', opacity: 0.7 }} />
              <span style={{ position: 'absolute', top: '6px', right: '8px', width: '8px', height: '8px', borderTop: '1.5px solid var(--gold-antique)', borderRight: '1.5px solid var(--gold-antique)', borderRadius: '0 2px 0 0', opacity: 0.7 }} />
              <span style={{ position: 'absolute', bottom: '6px', left: '8px', width: '8px', height: '8px', borderBottom: '1.5px solid var(--gold-antique)', borderLeft: '1.5px solid var(--gold-antique)', borderRadius: '0 0 0 2px', opacity: 0.7 }} />
              <span style={{ position: 'absolute', bottom: '6px', right: '8px', width: '8px', height: '8px', borderBottom: '1.5px solid var(--gold-antique)', borderRight: '1.5px solid var(--gold-antique)', borderRadius: '0 0 2px 0', opacity: 0.7 }} />

              <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--gold-antique)', margin: '0 0 0.4rem', fontFamily: 'var(--font-sans)' }}>
                {content.feastLabel}
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', fontWeight: 600, color: 'var(--brown-primary)', margin: 0, letterSpacing: '0.02em', lineHeight: 1.1 }}>
                {content.feastDate}
              </p>
            </div>

            {/* Bottom decorative line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.9rem' }}>
              <span style={{ display: 'block', width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, var(--gold-antique))' }} />
              <span style={{ color: 'var(--gold-antique)', fontSize: '0.75rem' }}>✦</span>
              <span style={{ display: 'block', width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, var(--gold-antique))' }} />
            </div>
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--brown-primary)', marginBottom: '1rem' }}>{content.significanceHeading}</h3>
        <p style={{ lineHeight: '1.8', marginBottom: '1.25rem' }}>
          {content.significanceParagraphOne}
        </p>
        <p style={{ lineHeight: '1.8', marginBottom: '1.25rem' }}>
          {content.significanceParagraphTwo}
        </p>

        <div style={{ background: 'var(--cream)', border: '1px solid var(--border-gold)', padding: '2rem', borderRadius: 'var(--radius-md)', marginTop: '2rem' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--brown-primary)', marginBottom: '0.5rem' }}>{content.prayerHeading}</h4>
          <p style={{ fontStyle: 'italic', lineHeight: '1.8', color: 'var(--brown-primary)' }}>
            &quot;{content.prayer}&quot;
          </p>
        </div>
      </div>
    </section>
  </main>
  );
};

export const DiocesePage = () => {
  const { aboutContent } = useParishData();
  const content = aboutContent.diocese;

  return (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
          <h1 className="page-hero__title">{content.heroTitle}</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>About</span> <span>/</span> <span>Diocese</span>
        </div>
      </div>
    </section>

    <section className="section section--white">
      <div className="container" style={{ maxWidth: '850px' }}>
        <h2 className="section-heading__title" style={{ marginBottom: '1.5rem' }}>{content.sectionHeading}</h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          {content.introduction}
        </p>

        <div className="grid-2" style={{ gap: '1.5rem' }}>
          <div style={{ background: 'var(--cream)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-beige)' }}>
            <Shield size={24} style={{ color: 'var(--gold-antique)', marginBottom: '0.5rem' }} />
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--brown-primary)' }}>{content.regionTitle}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginTop: '0.4rem' }}>{content.regionDescription}</p>
          </div>
          <div style={{ background: 'var(--cream)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-beige)' }}>
            <Landmark size={24} style={{ color: 'var(--gold-antique)', marginBottom: '0.5rem' }} />
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--brown-primary)' }}>{content.governanceTitle}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginTop: '0.4rem' }}>{content.governanceDescription}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  );
};
