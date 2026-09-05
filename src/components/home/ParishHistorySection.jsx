import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Landmark, MapPin, Church, Compass } from 'lucide-react';
import './ParishHistorySection.css';

const ParishHistorySection = () => {
  return (
    <section className="parish-history section section--cream" aria-label="Our Parish and History">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">Our Parish & History</h2>
          <p className="section-heading__subtitle">
            A sanctuary of Catholic faith in Loretto, Diocese of Mangalore
          </p>
        </div>

        <div className="parish-history__grid">
          <motion.div
            className="parish-history__card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="parish-history__icon-wrapper">
              <Church className="parish-history__icon" />
            </div>
            <h3>Catholic Identity</h3>
            <p>
              Deeply rooted in Konkani Catholic traditions while embracing all cultures and languages, our parish stands as a testament to living faith in Mangalore.
            </p>
          </motion.div>

          <motion.div
            className="parish-history__card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="parish-history__icon-wrapper">
              <Landmark className="parish-history__icon" />
            </div>
            <h3>Diocese of Mangalore</h3>
            <p>
              Proudly serving under the jurisdiction of the Roman Catholic Diocese of Mangalore, in active communion with the universal Church.
            </p>
          </motion.div>

          <motion.div
            className="parish-history__card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="parish-history__icon-wrapper">
              <MapPin className="parish-history__icon" />
            </div>
            <h3>Loretto Location</h3>
            <p>
              Nestled in Loretto, Mangalore, Karnataka, our parish offers a peaceful atmosphere for prayer, reflection and community worship.
            </p>
          </motion.div>

          <motion.div
            className="parish-history__card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="parish-history__icon-wrapper">
              <Compass className="parish-history__icon" />
            </div>
            <h3>Parish Mission</h3>
            <p>
              To proclaim the Good News, foster spiritual growth across generations, support parish organizations, and serve those in need.
            </p>
          </motion.div>
        </div>

        <div className="parish-history__cta-box">
          <div className="parish-history__cta-text">
            <h3>Discover Our Journey Through Time</h3>
            <p>Explore the history, foundation milestones, and growth of Our Lady of Loretto Parish.</p>
          </div>
          <Link to="/about/history" className="btn btn--gold">
            Read Our History
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ParishHistorySection;
