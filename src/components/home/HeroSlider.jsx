import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowRight, Calendar } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    image: `${import.meta.env.BASE_URL}images/hero-exterior.jpg`,
    eyebrow: 'WELCOME TO LORETTO CHURCH',
    title: 'A Community of Faith, Hope & Love',
    subtitle: 'Rooted in Catholic tradition, living out the Gospel in communion and service.',
    primaryCta: { text: 'Discover Our Parish', to: '/about/our-parish' },
    secondaryCta: { text: 'Mass Schedule', to: '/faith/mass-timings' },
  },
  {
    id: 2,
    image: `${import.meta.env.BASE_URL}images/hero-interior.jpg`,
    eyebrow: 'A SACRED SANCTUARY',
    title: 'Encounter Grace & Fellowship',
    subtitle: 'Gather with us for the Holy Sacrifice of the Mass and spiritual renewal.',
    primaryCta: { text: 'View Mass Schedule', to: '/faith/mass-timings' },
    secondaryCta: { text: 'Our Sacraments', to: '/faith/sacraments' },
  },
  {
    id: 3,
    image: `${import.meta.env.BASE_URL}images/hero-marian.jpg`,
    eyebrow: 'OUR PATRONESS',
    title: 'Under Mother Mary’s Protection',
    subtitle: 'Seeking the maternal intercession of Our Lady of Loretto for our families.',
    primaryCta: { text: 'Our Patroness', to: '/about/our-patroness' },
    secondaryCta: { text: 'Parish History', to: '/about/history' },
  },
  {
    id: 4,
    image: `${import.meta.env.BASE_URL}images/hero-community.jpg`,
    eyebrow: 'PARISH FELLOWSHIP',
    title: 'Serving Christ in One Another',
    subtitle: 'Vibrant ministries, active youth, and community celebrations for all ages.',
    primaryCta: { text: 'Upcoming Events', to: '/events' },
    secondaryCta: { text: 'Our Ministries', to: '/organizations' },
  },
];

const HeroSlider = () => {
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
                    <Link to={slide.primaryCta.to} className="btn btn--primary hero__btn-primary">
                      {slide.primaryCta.text}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <Link to={slide.secondaryCta.to} className="btn btn--outline-light hero__btn-secondary">
                      <Calendar size={15} aria-hidden="true" />
                      {slide.secondaryCta.text}
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
        <h1 className="hero__m-title">Welcome to Loretto Church</h1>
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
