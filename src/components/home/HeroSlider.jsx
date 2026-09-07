import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowRight, Calendar } from 'lucide-react';
import { useParishData } from '../../context/ParishContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './HeroSlider.css';

const HeroSlider = () => {
  const { siteSettings } = useParishData();
  const slides = siteSettings.heroSlides || [];

  return (
    <section className="hero" aria-label="Hero image carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop
        speed={1200}
        className="hero__swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="hero__slide">
            <div
              className="hero__image"
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label={`Church photo: ${slide.title}`}
            />
            <div className="hero__burgundy-overlay" aria-hidden="true" />
            
            <div className="hero__content-wrapper">
              <div className="container">
                <div className="hero__content">
                  <span className="hero__eyebrow">{slide.eyebrow}</span>
                  <h1 className="hero__title">{slide.title}</h1>
                  <div className="hero__gold-divider" aria-hidden="true" />
                  <p className="hero__subtitle">{slide.subtitle}</p>
                  
                  <div className="hero__cta-group">
                    <Link to={slide.primaryCtaTo || '/'} className="btn btn--primary hero__btn-primary">
                      {slide.primaryCtaText}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <Link to={slide.secondaryCtaTo || '/'} className="btn btn--outline-light hero__btn-secondary">
                      <Calendar size={15} aria-hidden="true" />
                      {slide.secondaryCtaText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile-only hero content — static message over the rotating imagery */}
      <div className="hero__mobile-layer">
        <h1 className="hero__m-title">Welcome to {siteSettings.churchName}</h1>
        <div className="hero__m-divider" aria-hidden="true" />
        <p className="hero__m-support">
          Faith <span className="hero__m-dot" aria-hidden="true">•</span> Family{' '}
          <span className="hero__m-dot" aria-hidden="true">•</span> Fellowship
        </p>
        <Link to="/about/our-parish" className="hero__m-cta">
          Explore Church
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSlider;
