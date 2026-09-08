import React from 'react';
import { Link } from 'react-router-dom';
import { useParishData } from '../../context/ParishContext';
import './Footer.css';

const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
  </svg>
);

const CrossMotif = () => (
  <div className="footer__cross-motif" aria-hidden="true">
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2V22M4 8H16" stroke="var(--burgundy-primary)" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="10" cy="8" r="2" stroke="var(--gold-antique)" strokeWidth="1" fill="none"/>
    </svg>
  </div>
);

const CathedralSilhouette = () => (
  <svg className="footer__cathedral-bg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Line art silhouette of Cathedral facade in subtle gold/burgundy tint */}
    <path d="M200 10 L200 30 M192 18 L208 18 M200 30 L160 70 L160 270 L240 270 L240 70 Z" stroke="var(--gold-antique)" strokeWidth="1.2" opacity="0.25"/>
    <path d="M175 95 A 25 25 0 0 1 225 95 L225 140 L175 140 Z" stroke="var(--gold-antique)" strokeWidth="1" opacity="0.2"/>
    <circle cx="200" cy="105" r="16" stroke="var(--gold-antique)" strokeWidth="1" opacity="0.25"/>
    <path d="M200 89 L200 121 M184 105 L216 105" stroke="var(--gold-antique)" strokeWidth="1" opacity="0.2"/>
    <path d="M182 180 C 182 155, 218 155, 218 180 L218 270 L182 270 Z" stroke="var(--gold-antique)" strokeWidth="1" opacity="0.22"/>
    <path d="M110 120 L160 70 M240 70 L290 120 M100 120 L160 120 M240 120 L300 120 M100 120 L100 270 M300 120 L300 270" stroke="var(--gold-antique)" strokeWidth="1" opacity="0.18"/>
    <path d="M45 170 L100 120 M300 120 L355 170 M35 170 L365 170 M35 170 L35 270 M365 170 L365 270 M20 270 L380 270" stroke="var(--gold-antique)" strokeWidth="1" opacity="0.15"/>
  </svg>
);

const Footer = () => {
  const { siteSettings } = useParishData();
  const churchName = siteSettings.churchName || 'Our Lady of Loretto Church';
  const currentYear = new Date().getFullYear();
  const logoUrl = `${import.meta.env.BASE_URL}favicon.png`;

  return (
    <footer className="footer" role="contentinfo">
      {/* Royal Arch Top Boundary with Medallion Notch */}
      <div className="footer__arch-top" aria-hidden="true">
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 72 C 400 10, 600 10, 660 28 C 690 38, 750 38, 780 28 C 840 10, 1040 10, 1440 72 L 1440 72 L 0 72 Z" fill="var(--cream-soft)"/>
          <path d="M0 71 C 400 9, 600 9, 660 27 C 690 37, 750 37, 780 27 C 840 9, 1040 9, 1440 71" stroke="var(--gold-antique)" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      <div className="container">
        <div className="footer__content">
          {/* Subtle Cathedral Background Silhouette */}
          <CathedralSilhouette />

          {/* Architectural Medallion Logo Frame + Brand & Identity */}
          <div className="footer__brand">
            <div className="footer__medallion">
              <CrossMotif />
              <img src={logoUrl} alt={`${churchName} Logo`} className="footer__logo" />
            </div>

            <div className="footer__title-wrapper">
              <span className="footer__title-line footer__title-line--left" aria-hidden="true" />
              <h2 className="footer__title">{churchName}</h2>
              <span className="footer__title-line footer__title-line--right" aria-hidden="true" />
            </div>
            
            <p className="footer__subtitle">Loretto • Mangalore • Diocese of Mangalore</p>
          </div>

          {/* Clean Horizontal Links */}
          <nav className="footer__nav" aria-label="Footer navigation">
            <Link to="/about/our-parish">About</Link>
            <Link to="/faith/mass-timings">Mass Timings</Link>
            <Link to="/events">Events</Link>
            <Link to="/news">News</Link>
            <Link to="/obituary">Obituary</Link>
            <Link to="/institutions">Institutions</Link>
            <Link to="/media/gallery">Gallery</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Social Icons */}
          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="Facebook" rel="noopener noreferrer">
              <FacebookIcon />
            </a>
            <a href="#" className="footer__social-link" aria-label="YouTube" rel="noopener noreferrer">
              <YoutubeIcon />
            </a>
          </div>

          {/* Thin Gold Horizontal Divider Line */}
          <div className="footer__gold-line" aria-hidden="true" />
        </div>
      </div>

      {/* Dark Burgundy Bottom Copyright Bar */}
      <div className="footer__bottom-bar">
        <div className="container">
          <div className="footer__bottom">
            <p className="footer__copyright">
              © {currentYear} {churchName}, Loretto, Mangalore. All rights reserved.
            </p>
            <p className="footer__credit">
              Powered by{' '}
              <a
                href="https://appvertex.in"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__credit-brand"
              >
                AppVertex
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
