import React from 'react';
import { Link } from 'react-router-dom';
import { news as fallbackNews } from '../../data/news';
import { useParishData } from '../../context/ParishContext';
import './NoticeTicker.css';

const NoticeTicker = () => {
  const { news } = useParishData();
  const activeNews = (news && news.length > 0) ? news : fallbackNews;
  // Duplicate items so the scroll loops seamlessly
  const items = [...activeNews, ...activeNews];

  return (
    <div className="notice-ticker" role="region" aria-label="Latest parish news">
      {/* Left label badge */}
      <div className="notice-ticker__label" aria-hidden="true">
        <span className="notice-ticker__label-dot" />
        <span>Latest News</span>
      </div>

      {/* Scrolling track */}
      <div className="notice-ticker__track-wrapper">
        <ul className="notice-ticker__track" aria-live="off">
          {items.map((item, idx) => (
            <li key={`${item.id}-${idx}`} className="notice-ticker__item">
              <span className="notice-ticker__category">{item.category}</span>
              <Link
                to={`/news#${item.slug}`}
                className="notice-ticker__text"
                tabIndex={idx < activeNews.length ? 0 : -1}
              >
                {item.title}
              </Link>
              <span className="notice-ticker__sep" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoticeTicker;
