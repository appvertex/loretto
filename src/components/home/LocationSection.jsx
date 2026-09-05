import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Navigation, ExternalLink } from 'lucide-react';
import { useParishData } from '../../context/ParishContext';
import './LocationSection.css';

const LocationSection = () => {
  const { office } = useParishData();

  return (
    <section className="location-section section section--white" aria-label="Our Location">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">Our Location</h2>
          <p className="section-heading__subtitle">
            Visit Our Lady of Loretto Church in Loretto, Mangalore
          </p>
        </div>

        <div className="location-section__grid">
          <motion.div
            className="location-section__map-col"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="location-section__map-frame">
              {/* Google Maps Embed iframe with exact Loretto Church coordinates (12.921981171794092, 75.03659875610606) */}
              <iframe
                title="Our Lady of Loretto Church Location Map"
                src="https://maps.google.com/maps?q=12.921981171794092,75.03659875610606&hl=en&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.div
            className="location-section__info-col"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="location-info-card">
              <h3 className="location-info-card__title">Our Lady of Loretto Church</h3>
              <p className="location-info-card__subtitle">Diocese of Mangalore</p>
              
              <ul className="location-info-card__list">
                <li>
                  <MapPin className="location-info-card__icon" />
                  <div>
                    <strong>Address</strong>
                    <p>{office.address}</p>
                  </div>
                </li>
                <li>
                  <Phone className="location-info-card__icon" />
                  <div>
                    <strong>Parish Office Phone</strong>
                    <p>{office.phone}</p>
                  </div>
                </li>
                <li>
                  <Mail className="location-info-card__icon" />
                  <div>
                    <strong>Email Address</strong>
                    <p>{office.email}</p>
                  </div>
                </li>
              </ul>

              <div className="location-info-card__actions">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=12.921981171794092,75.03659875610606"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--gold"
                >
                  <Navigation size={16} />
                  Get Directions
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
