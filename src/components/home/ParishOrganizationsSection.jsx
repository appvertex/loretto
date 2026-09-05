import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, HeartHandshake, Music, Shield, BookOpen, UsersRound, HandHeart, ArrowRight } from 'lucide-react';
import { ministries as fallbackMinistries } from '../../data/ministries';
import { useParishData } from '../../context/ParishContext';
import './ParishOrganizationsSection.css';

// Map icons to ministries
const ministryIcons = {
  icym: Users,
  ycs: BookOpen,
  'catholic-sabha': UsersRound,
  'stree-sanghatan': HeartHandshake,
  'parish-choir': Music,
  'altar-servers': Shield,
  'eucharistic-ministers': HandHeart,
  'franciscan-third-order': HeartHandshake,
};

const ParishOrganizationsSection = () => {
  const { organizations } = useParishData();
  const activeMinistries = (organizations && organizations.length > 0) ? organizations : fallbackMinistries;
  return (
    <section className="organizations section section--cream" aria-label="Community Ministries and Organizations">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">Associations</h2>
          <p className="section-heading__subtitle">
            Groups that bring our parish family together in faith and service
          </p>
        </div>

        <div className="organizations__grid">
          {activeMinistries.map((org, index) => {
            const Icon = ministryIcons[org.slug] || Users;
            return (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Link to={`/organizations/${org.slug}`} className="org-minimal-card">
                  <div className="org-minimal-card__icon-box">
                    <Icon size={24} className="org-minimal-card__icon" />
                  </div>
                  <div className="org-minimal-card__content">
                    <h3 className="org-minimal-card__title">{org.name}</h3>
                    <span className="org-minimal-card__link">
                      View association <ArrowRight size={14} className="org-minimal-card__arrow" />
                    </span>
                  </div>
                  <div className="org-minimal-card__gold-accent" aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="organizations__cta">
          <Link to="/organizations" className="btn btn--outline">
            View All Parish Organizations
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ParishOrganizationsSection;
