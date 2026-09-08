import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import LatestNewsSection from '../components/home/LatestNewsSection';
import UpcomingEventsSection from '../components/home/UpcomingEventsSection';
import GallerySection from '../components/home/GallerySection';
import VideoSection from '../components/home/VideoSection';
import NewsletterSection from '../components/home/NewsletterSection';
import { news as fallbackNews } from '../data/news';
import { useParishData } from '../context/ParishContext';
import Lightbox from '../components/common/Lightbox';
import './NewsArticlePage.css';

export const NewsPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <h1 className="page-hero__title">Latest News & Updates</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>News & Events</span> <span>/</span> <span>Latest News</span>
        </div>
      </div>
    </section>
    <LatestNewsSection />
  </main>
);

export const NewsArticlePage = () => {
  const { slug } = useParams();
  const { news } = useParishData();
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const articles = news?.length ? news : fallbackNews;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <main className="news-article-page">
        <section className="news-article__missing container">
          <h1>News article not found</h1>
          <p>The announcement may have been removed or the link may be out of date.</p>
          <Link to="/news" className="btn btn--primary">
            <ArrowLeft size={16} /> Back to News
          </Link>
        </section>
      </main>
    );
  }

  const articleImages = [article.image, ...(article.subImages || [])].filter(Boolean).map((src, index) => ({
    src,
    alt: `${article.title} image ${index + 1}`,
    title: article.title,
    category: article.category,
  }));

  const closeLightbox = () => setActiveImageIndex(null);
  const showPreviousImage = () => setActiveImageIndex((current) => (current - 1 + articleImages.length) % articleImages.length);
  const showNextImage = () => setActiveImageIndex((current) => (current + 1) % articleImages.length);

  return (
    <main className="news-article-page">
      <section className="page-hero">
        <div className="page-hero__content container">
          <span className="page-hero__label">{article.category}</span>
          <h1 className="page-hero__title">{article.title}</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <Link to="/news">News</Link> <span>/</span> <span>{article.title}</span>
          </div>
        </div>
      </section>

      <article className="news-article container">
        <Link to="/news" className="news-article__back">
          <ArrowLeft size={16} /> Back to all news
        </Link>

        <div className="news-article__layout">
          <div className="news-article__media">
            <button
              type="button"
              className="news-article__image-button"
              onClick={() => setActiveImageIndex(0)}
              aria-label={`Open image for ${article.title}`}
            >
              <img src={article.image} alt={article.title} />
            </button>
          </div>

          <div className="news-article__content">
            <div className="news-article__meta">
              <span className="news-article__category">{article.category}</span>
              <span className="news-article__date">
                <Calendar size={15} /> {article.displayDate || article.date}
              </span>
            </div>
            <h2>{article.title}</h2>
            {article.excerpt && <p className="news-article__excerpt">{article.excerpt}</p>}
            <div className="news-article__body">
              {(article.content || article.excerpt || '').split('\n').map((paragraph, index) => (
                <p key={`${article.id}-paragraph-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {article.subImages?.length > 0 && (
          <div className="news-article__gallery" aria-label="Additional news images">
            {article.subImages.map((image, index) => (
              <button
                type="button"
                className="news-article__image-button"
                key={`${image}-${index}`}
                onClick={() => setActiveImageIndex(index + 1)}
                aria-label={`Open additional image ${index + 1} for ${article.title}`}
              >
                <img src={image} alt={`${article.title} ${index + 2}`} />
              </button>
            ))}
          </div>
        )}
      </article>

      <Lightbox
        isOpen={activeImageIndex !== null}
        image={activeImageIndex === null ? null : articleImages[activeImageIndex]}
        index={activeImageIndex}
        total={articleImages.length}
        onClose={closeLightbox}
        onPrev={showPreviousImage}
        onNext={showNextImage}
      />
    </main>
  );
};

export const EventsPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <h1 className="page-hero__title">Upcoming & Past Events</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>News & Events</span> <span>/</span> <span>Events</span>
        </div>
      </div>
    </section>
    <UpcomingEventsSection />
  </main>
);

export const GalleryPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <h1 className="page-hero__title">Photo Gallery</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Media</span> <span>/</span> <span>Gallery</span>
        </div>
      </div>
    </section>
    <GallerySection />
  </main>
);

export const VideosPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <h1 className="page-hero__title">Parish Videos</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Media</span> <span>/</span> <span>Videos</span>
        </div>
      </div>
    </section>
    <VideoSection />
  </main>
);

export const NewsletterPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <h1 className="page-hero__title">Parish Newsletter</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Media</span> <span>/</span> <span>Newsletter</span>
        </div>
      </div>
    </section>
    <NewsletterSection />
  </main>
);
