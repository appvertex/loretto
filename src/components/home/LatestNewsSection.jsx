import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { news as fallbackNews } from '../../data/news';
import { useParishData } from '../../context/ParishContext';
import './LatestNewsSection.css';

const NEWS_PER_PAGE = 6;

const LatestNewsSection = () => {
  const { news } = useParishData();
  const [currentPage, setCurrentPage] = useState(1);
  const activeNews = (news && news.length > 0) ? news : fallbackNews;
  const latestNews = [...activeNews].sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
  const totalPages = Math.max(1, Math.ceil(latestNews.length / NEWS_PER_PAGE));
  const pageNews = latestNews.slice(
    (currentPage - 1) * NEWS_PER_PAGE,
    currentPage * NEWS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  return (
    <section className="latest-news section section--cream" aria-label="Latest News & Announcements">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">News & Announcements</h2>
          <p className="section-heading__subtitle">
            Stay informed with current events, parish notices, and pastoral updates
          </p>
        </div>

        <div className="latest-news__grid">
          {pageNews.map((item, index) => (
            <motion.article
              key={item.id}
              className="news-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <div className="news-card__image-container">
                <div
                  className="news-card__image"
                  style={{ backgroundImage: `url(${item.image})` }}
                  role="img"
                  aria-label={item.title}
                />
                <span className="news-card__category">{item.category}</span>
              </div>

              <div className="news-card__body">
                <div className="news-card__date">
                  <Calendar size={13} className="news-card__date-icon" />
                  <span>{item.displayDate}</span>
                </div>

                <h3 className="news-card__title">
                  <Link to={`/news/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="news-card__excerpt">{item.excerpt}</p>

                <div className="news-card__footer">
                  <Link to={`/news/${item.slug}`} className="news-card__read-more">
                    <span>Read Announcement</span>
                    <ArrowRight size={14} className="news-card__arrow" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="latest-news__pagination" aria-label="News pagination">
            <button
              type="button"
              className="latest-news__page-button"
              onClick={() => setCurrentPage((page) => page - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} aria-hidden="true" /> Previous
            </button>
            <span className="latest-news__page-status" aria-live="polite">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              className="latest-news__page-button"
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight size={16} aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default LatestNewsSection;
