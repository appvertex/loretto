import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Calendar, Tag } from 'lucide-react';
import { useParishData } from '../../context/ParishContext';
import { events as initialEvents, eventCategories } from '../../data/events';
import './UpcomingEventsSection.css';

const UpcomingEventsSection = () => {
  const { events = initialEvents } = useParishData();
  const location = useLocation();
  const isEventsPage = location.pathname.startsWith('/events');

  const [activeCategory, setActiveCategory] = useState('All');

  // Filter events based on active category if on /events page
  const displayEvents = isEventsPage
    ? events.filter(e => activeCategory === 'All' || e.category === activeCategory)
    : events.slice(0, 3);

  return (
    <section className="upcoming-events section section--white" aria-label="Upcoming Events">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">
            {isEventsPage ? 'Parish Events & Celebrations' : 'Events & Parish Life'}
          </h2>
          <p className="section-heading__subtitle">
            Gather with our parish community for spiritual celebrations, feast days, and ministry gatherings
          </p>
        </div>

        {/* Category Filter Pills on Events Page */}
        {isEventsPage && (
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            {eventCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: '24px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: activeCategory === cat ? '1px solid var(--gold-antique)' : '1px solid var(--border-beige)',
                  backgroundColor: activeCategory === cat ? 'var(--brown-primary)' : 'var(--cream)',
                  color: activeCategory === cat ? 'var(--gold-light)' : 'var(--brown-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeCategory === cat ? '0 3px 10px rgba(53,21,27,0.15)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {displayEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--brown-muted)' }}>
            <Calendar size={40} style={{ opacity: 0.4, marginBottom: '1rem' }} />
            <p style={{ fontSize: '1.1rem' }}>No events found in this category.</p>
          </div>
        ) : (
          <div className="upcoming-events__grid">
            {displayEvents.map((item, index) => (
              <motion.div
                key={item.id}
                id={`event-${item.id}`}
                className="event-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="event-card__header">
                  <div className="event-card__date-badge">
                    <span className="event-card__day">{item.day || '10'}</span>
                    <span className="event-card__month">{item.month || 'DEC'}</span>
                  </div>
                  <span className="event-card__category">{item.category}</span>
                </div>

                <div className="event-card__body">
                  <h3 className="event-card__title">{item.title}</h3>
                  <p className="event-card__desc">{item.description}</p>
                  
                  <div className="event-card__meta">
                    {item.time && (
                      <div className="event-card__meta-item">
                        <Clock size={14} className="event-card__icon" />
                        <span>{item.time}</span>
                      </div>
                    )}
                    {item.location && (
                      <div className="event-card__meta-item">
                        <MapPin size={14} className="event-card__icon" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="event-card__footer">
                  <span className="event-card__link" style={{ color: 'var(--gold-antique)', fontWeight: 600 }}>
                    <Calendar size={14} /> {item.displayDate || item.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isEventsPage && (
          <div className="upcoming-events__cta">
            <Link to="/events" className="btn btn--outline">
              <Calendar size={16} /> Explore All Events
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
