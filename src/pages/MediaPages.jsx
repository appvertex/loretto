import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Check, Copy, Image as ImageIcon, Share2 } from 'lucide-react';
import { useEffect } from 'react';
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
  const [copied, setCopied] = useState(false);
  const articles = news?.length ? news : fallbackNews;
  const article = articles.find((item) => item.slug === slug);
  const articleUrl = article ? `${window.location.origin}/news/${article.slug}` : '';

  useEffect(() => {
    if (!article) return undefined;

    const previousTitle = document.title;
    const metadata = [
      ['property', 'og:title', article.title],
      ['property', 'og:description', article.excerpt || article.content || 'Parish news from Our Lady of Loretto Church.'],
      ['property', 'og:image', new URL(article.image, window.location.origin).href],
      ['property', 'og:url', articleUrl],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', article.title],
      ['name', 'twitter:description', article.excerpt || article.content || 'Parish news from Our Lady of Loretto Church.'],
      ['name', 'twitter:image', new URL(article.image, window.location.origin).href],
    ];
    const createdMetadata = metadata.map(([attribute, key, content]) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      const wasExisting = Boolean(element);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      const previousContent = element.getAttribute('content');
      element.setAttribute('content', content);
      return { element, wasExisting, previousContent };
    });
    document.title = `${article.title} | Our Lady of Loretto Church`;

    return () => {
      document.title = previousTitle;
      createdMetadata.forEach(({ element, wasExisting, previousContent }) => {
        if (wasExisting) element.setAttribute('content', previousContent || '');
        else element.remove();
      });
    };
  }, [article, articleUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
    } catch {
      const input = document.createElement('input');
      input.value = articleUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.excerpt || 'Read this parish news update.',
        url: articleUrl,
      });
      return;
    }
    await handleCopyLink();
  };

  const handleShareImage = async () => {
    try {
      const response = await fetch(new URL(article.image, window.location.origin).href);
      const blob = await response.blob();
      const file = new File([blob], `${article.slug || 'news-article'}.jpg`, {
        type: blob.type || 'image/jpeg',
      });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: article.title,
          text: `${article.title}\n${articleUrl}`,
        });
        return;
      }
    } catch {
      // Fall through to the image page and copied link for unsupported devices.
    }

    await handleCopyLink();
    window.open(new URL(article.image, window.location.origin).href, '_blank', 'noopener,noreferrer');
  };

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
            <div className="news-article__share-actions" aria-label="Share this news article">
              <button type="button" className="news-article__share-button" onClick={handleShare}>
                <Share2 size={15} /> Share Article
              </button>
              <button type="button" className="news-article__copy-button" onClick={handleCopyLink}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Link Copied' : 'Copy Link'}
              </button>
              <button type="button" className="news-article__copy-button" onClick={handleShareImage}>
                <ImageIcon size={15} /> Share Main Image
              </button>
            </div>
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
