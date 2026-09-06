import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import { useParishData } from '../../context/ParishContext';
import './PatronessAndPriestSection.css';

const PatronessAndPriestSection = () => {
  const { parishPriest } = useParishData();

  return (
    <section
      className="combined-section"
      aria-label="Our Patroness and Message from Parish Priest"
    >
      <div className="combined-section__inner">

        {/* ── LEFT: Our Patroness ── */}
        <motion.div
          className="combined-section__patroness"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative Mary image */}
          <div className="combined-section__patroness-img-wrap">
            <img
              src={`${import.meta.env.BASE_URL}images/patroness-mary.jpg`}
              alt="Our Lady of Loretto Statue and Marian Devotion"
              className="combined-section__patroness-img"
            />
            <div className="combined-section__patroness-img-overlay" aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="combined-section__patroness-body">
            <span className="combined-section__eyebrow">Our Patroness</span>
            <h2 className="combined-section__patroness-title">Our Lady of Loretto</h2>

            <blockquote className="combined-section__patroness-quote">
              "OUR LADY OF LORETTO, PRAY FOR US."
            </blockquote>

            <p className="combined-section__patroness-text">
              Our Lady of Loretto is the title given to the Blessed Virgin Mary associated with
              the Holy House of Loreto. According to Catholic tradition, this is the very house
              in Nazareth where the Annunciation took place and where the Holy Family resided.
            </p>
            <p className="combined-section__patroness-text">
              For generations, the faithful of Loretto, Mangalore have sought Mother Mary's
              maternal intercession, placing their families, intentions, and parish under her
              gentle mantle of grace and protection.
            </p>

            <div className="combined-section__patroness-feast">
              <span className="combined-section__feast-label">Annual Feast Day</span>
              <span className="combined-section__feast-date">December 10</span>
            </div>

            <Link to="/about/our-patroness" className="combined-section__btn combined-section__btn--gold">
              Explore Devotion &amp; History
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        {/* Vertical Divider */}
        <div className="combined-section__divider" aria-hidden="true" />

        {/* ── RIGHT: Parish Priest Message ── */}
        <motion.div
          className="combined-section__priest"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="combined-section__eyebrow combined-section__eyebrow--gold">
            From the Pulpit
          </span>
          <h2 className="combined-section__priest-heading">
            Message from Our Parish Priest
          </h2>
          <div className="combined-section__priest-rule" aria-hidden="true" />

          {/* Priest portrait */}
          <div className="combined-section__priest-portrait-wrap">
            <div className="combined-section__priest-portrait-frame">
              <div
                className="combined-section__priest-photo"
                style={{ backgroundImage: `url(${parishPriest.image})` }}
                role="img"
                aria-label={`Photo of ${parishPriest.designation} ${parishPriest.name}`}
              />
              <div className="combined-section__priest-accent" aria-hidden="true" />
            </div>
            <div className="combined-section__priest-name-block">
              <span className="combined-section__priest-desig">{parishPriest.designation}</span>
              <strong className="combined-section__priest-name">{parishPriest.name}</strong>
              <span className="combined-section__priest-title">{parishPriest.title}</span>
            </div>
          </div>

          {/* Quote */}
          <div className="combined-section__priest-quote-wrap">
            <Quote className="combined-section__priest-quote-icon" size={30} aria-hidden="true" />
            <p className="combined-section__priest-text">
              {parishPriest.shortMessage}
            </p>
          </div>

          <Link to="/parish/parish-priest" className="combined-section__btn combined-section__btn--outline">
            Read Full Message
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default PatronessAndPriestSection;
