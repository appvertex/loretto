import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './OurPatronessSection.css';

const OurPatronessSection = () => {
  return (
    <section className="patroness section section--dark" aria-label="Our Patroness Our Lady of Loretto">
      <div className="container">
        <div className="patroness__grid">
          <motion.div
            className="patroness__content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="patroness__title">Our Lady of Loretto</h2>
            
            <blockquote className="patroness__quote">
              <span>"OUR LADY OF LORETTO, PRAY FOR US."</span>
            </blockquote>

            <p className="patroness__text">
              Our Lady of Loretto is the title given to the Blessed Virgin Mary associated with the Holy House of Loreto. According to Catholic tradition, this is the very house in Nazareth where the Annunciation took place and where the Holy Family resided.
            </p>

            <p className="patroness__text">
              For generations, the faithful of Loretto, Mangalore have sought Mother Mary’s maternal intercession, placing their families, intentions, and parish under her gentle mantle of grace and protection.
            </p>

            <div className="patroness__feast-badge">
              <div className="patroness__feast-info">
                <span className="patroness__feast-label">Annual Feast Day</span>
                <span className="patroness__feast-date">December 10</span>
              </div>
            </div>

            <div className="patroness__cta">
              <Link to="/about/our-patroness" className="btn btn--gold">
                Explore Devotion & History
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="patroness__image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/patroness-mary.jpg`}
              alt="Our Lady of Loretto Statue and Marian Devotion"
              className="patroness__image"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurPatronessSection;
