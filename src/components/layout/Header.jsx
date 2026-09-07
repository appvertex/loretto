import React from 'react';
import { Link } from 'react-router-dom';
import { useParishData } from '../../context/ParishContext';
import './Header.css';

const Header = () => {
  const { siteSettings } = useParishData();
  const logoUrl = `${import.meta.env.BASE_URL}favicon.png`;
  const churchName = siteSettings.churchName || 'Our Lady of Loretto Church';

  return (
    <header className="site-header" role="banner">
      <div className="site-header__texture" aria-hidden="true" />
      <div className="container">
        <div className="site-header__inner">
          <Link to="/" className="site-header__brand-link" aria-label={`${churchName} Home`}>
            <img
              src={logoUrl}
                alt={`${churchName} Logo`}
              className="site-header__logo"
            />
            <div className="site-header__identity">
              <h1 className="site-header__name">
                <span className="site-header__title-text">{churchName}</span>
              </h1>

              <div className="site-header__location">
                <span className="site-header__location-item">{siteSettings.location || 'Loretto, Bantwal'}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="site-header__gold-line" aria-hidden="true">
        <div className="site-header__gold-line-inner" />
        <span className="site-header__gold-line-diamond">✦</span>
      </div>
    </header>
  );
};

export default Header;
