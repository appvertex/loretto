import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Bell, ChevronRight, FileText, Sparkles } from 'lucide-react';

import HeroSlider from '../components/home/HeroSlider';
import WelcomeSection from '../components/home/WelcomeSection';
import OurPatronessSection from '../components/home/OurPatronessSection';
import PriestMessageSection from '../components/home/PriestMessageSection';
import SpecialCelebrationsSection from '../components/home/SpecialCelebrationsSection';
import GallerySection from '../components/home/GallerySection';
import MassTimesStrip from '../components/home/MassTimesStrip';
import LocationSection from '../components/home/LocationSection';

import { news } from '../data/news';

import './HomePage.css';

/* Quick notice bulletin items */
const quickNotices = [
  { id: 1, title: 'Catechism Classes Begin for New Academic Year', date: 'Aug 10', tag: 'Catechism' },
  { id: 2, title: 'Youth Group Blood Donation Drive Success', date: 'Aug 05', tag: 'Youth' },
  { id: 3, title: 'Parish Council Meeting & Pastoral Planning', date: 'Aug 18', tag: 'Notice' },
];

/* ================================================================
   HOME PAGE — Clean, Spacious & Focused Layout
   Sections (in exact requested order):
   1. Hero Slider
   2. Welcome to Our Lady of Loretto (Church introduction)
   3. Our Patroness (Devotion & History highlight)
   4. Message from Parish Priest (Pastoral greeting)
   5. Editorial Bento Grid: News & Announcements
   6. Special Celebrations (Feast banner)
   7. Photo Gallery Highlight (6 photos)
   8. Mass Times Strip (Sits above the map as "Plan Your Visit" info)
   9. Our Location (Map & Parish Address)
================================================================ */
const HomePage = () => {
  const featured = news.find((n) => n.featured) || news[0];
  const sideNews = news.filter((n) => n.id !== featured.id).slice(0, 2);

  return (
    <main id="main-content">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Welcome to Our Lady of Loretto (Church introduction) */}
      <WelcomeSection />

      {/* 3. Our Patroness (Devotion & History highlight) */}
      <OurPatronessSection />

      {/* 4. Message from Parish Priest (Pastoral greeting) */}
      <PriestMessageSection />

      {/* 5. Editorial Bento Grid: News & Announcements */}
      <section className="bento-news-section" aria-label="Parish News and Announcements">
        <div className="container">
          {/* Header */}
          <div className="bento-news-header text-center">
            <div className="bento-news-badge">
              <Sparkles size={14} aria-hidden="true" />
              <span>PARISH CHRONICLE</span>
            </div>
            <h2 className="bento-news-title">News & Announcements</h2>
            <div className="gold-divider-center" aria-hidden="true" />
            <p className="bento-news-subtitle">
              Stay connected with spiritual updates, parish notices, and community celebrations.
            </p>
          </div>

          {/* Bento Layout Grid */}
          <div className="bento-news-grid">
            {/* Featured Hero Story */}
            <motion.article
              className="bento-card bento-card--featured"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="bento-featured__bg"
                style={{ backgroundImage: `url(${featured.image})` }}
                role="img"
                aria-label={featured.title}
              />
              <div className="bento-featured__gradient" aria-hidden="true" />

              <div className="bento-featured__content">
                <div className="bento-tags">
                  <span className="bento-tag bento-tag--gold">
                    <Sparkles size={11} aria-hidden="true" /> FEATURED STORY
                  </span>
                  <span className="bento-tag bento-tag--glass">{featured.category}</span>
                </div>

                <div className="bento-date">
                  <Calendar size={13} aria-hidden="true" />
                  <span>{featured.displayDate}</span>
                </div>

                <h3 className="bento-featured__title">
                  <Link to={`/news#${featured.slug}`}>{featured.title}</Link>
                </h3>

                <p className="bento-featured__excerpt">{featured.excerpt}</p>

                <Link to={`/news#${featured.slug}`} className="bento-btn-primary">
                  <span>Read Full Story</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </motion.article>

            {/* Side Column: 2 Standard News Cards */}
            <div className="bento-col-side">
              {sideNews.map((item, idx) => (
                <motion.article
                  key={item.id}
                  className="bento-card bento-card--side"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx + 1) * 0.1 }}
                >
                  <div
                    className="bento-side__img"
                    style={{ backgroundImage: `url(${item.image})` }}
                    role="img"
                    aria-label={item.title}
                  />
                  <div className="bento-side__body">
                    <div className="bento-side__header">
                      <span className="bento-tag bento-tag--burgundy">{item.category}</span>
                      <span className="bento-side__date">
                        <Calendar size={11} aria-hidden="true" /> {item.displayDate}
                      </span>
                    </div>

                    <h4 className="bento-side__title">
                      <Link to={`/news#${item.slug}`}>{item.title}</Link>
                    </h4>

                    <p className="bento-side__excerpt">{item.excerpt}</p>

                    <Link to={`/news#${item.slug}`} className="bento-link-more">
                      <span>Read More</span>
                      <ChevronRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Right Column: Quick Notices & Parish Bulletin Board */}
            <motion.aside
              className="bento-card bento-card--bulletin"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bento-bulletin__header">
                <div className="bento-bulletin__icon">
                  <Bell size={18} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="bento-bulletin__heading">Parish Notices</h3>
                  <span className="bento-bulletin__subheading">Quick Community Updates</span>
                </div>
              </div>

              <ul className="bento-bulletin__list">
                {quickNotices.map((notice) => (
                  <li key={notice.id} className="bento-bulletin__item">
                    <div className="bento-bulletin__item-top">
                      <span className="bento-bulletin__tag">{notice.tag}</span>
                      <span className="bento-bulletin__date">{notice.date}</span>
                    </div>
                    <p className="bento-bulletin__item-text">{notice.title}</p>
                  </li>
                ))}
              </ul>

              <div className="bento-bulletin__footer">
                <Link to="/news" className="bento-bulletin__cta">
                  <FileText size={15} aria-hidden="true" />
                  <span>View All Notices & News</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* 6. Special Celebrations (Feast banner) */}
      <SpecialCelebrationsSection />

      {/* 7. Photo Gallery Highlight (6 photos) */}
      <GallerySection />

      {/* 8. Mass Times Strip (Sits naturally as "Plan Your Visit" info right above the map) */}
      <MassTimesStrip />

      {/* 9. Our Location (Map & Parish Address) */}
      <LocationSection />
    </main>
  );
};

export default HomePage;
