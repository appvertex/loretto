import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollUpButton from './components/common/ScrollUpButton';

import { ParishProvider } from './context/ParishContext';
import HomePage from './pages/HomePage';
import { OurParishPage, HistoryPage, PatronessPage, DiocesePage } from './pages/AboutPages';
import { ParishPriestPage, ParishCouncilPage, WardsPage, ParishOfficePage } from './pages/ParishPages';
import { MassTimingsPage, SacramentsPage, CatechismPage, PrayerPage } from './pages/FaithPages';
import OrganizationsPage from './pages/OrganizationsPage';
import { NewsPage, NewsArticlePage, EventsPage, GalleryPage, VideosPage, NewsletterPage } from './pages/MediaPages';
import { ContactPage, NotFoundPage } from './pages/ContactPage';
import AdminDashboard from './pages/admin/AdminDashboard';

import ObituaryPage from './pages/ObituaryPage';
import InstitutionsPage from './pages/InstitutionsPage';

import './styles/global.css';
import './pages/Organizations.css';

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="app-layout">
      {!isAdminPage && <Header />}
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* About */}
        <Route path="/about" element={<OurParishPage />} />
        <Route path="/about/our-parish" element={<OurParishPage />} />
        <Route path="/about/history" element={<HistoryPage />} />
        <Route path="/about/our-patroness" element={<PatronessPage />} />
        <Route path="/about/diocese" element={<DiocesePage />} />

        {/* Parish */}
        <Route path="/parish" element={<ParishPriestPage />} />
        <Route path="/parish/parish-priest" element={<ParishPriestPage />} />
        <Route path="/parish/parish-council" element={<ParishCouncilPage />} />
        <Route path="/parish/wards" element={<WardsPage />} />
        <Route path="/parish/wards/:slug" element={<WardsPage />} />
        <Route path="/wards" element={<WardsPage />} />
        <Route path="/wards/:slug" element={<WardsPage />} />
        <Route path="/parish/office" element={<ParishOfficePage />} />

        {/* Faith */}
        <Route path="/faith" element={<MassTimingsPage />} />
        <Route path="/faith/mass-timings" element={<MassTimingsPage />} />
        <Route path="/faith/sacraments" element={<SacramentsPage />} />
        <Route path="/faith/catechism" element={<CatechismPage />} />
        <Route path="/faith/prayer" element={<PrayerPage />} />

        {/* Organizations */}
        <Route path="/organizations" element={<OrganizationsPage />} />
        <Route path="/organizations/:slug" element={<OrganizationsPage />} />

        {/* Institutions */}
        <Route path="/institutions" element={<InstitutionsPage />} />
        <Route path="/parish/institutions" element={<InstitutionsPage />} />

        {/* News & Events */}
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsArticlePage />} />
        <Route path="/events" element={<EventsPage />} />

        {/* Obituary */}
        <Route path="/obituary" element={<ObituaryPage />} />
        <Route path="/media/obituary" element={<ObituaryPage />} />

        {/* Media */}
        <Route path="/media" element={<GalleryPage />} />
        <Route path="/media/gallery" element={<GalleryPage />} />
        <Route path="/media/videos" element={<VideosPage />} />
        <Route path="/media/newsletter" element={<NewsletterPage />} />

        {/* Contact */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <ScrollUpButton />}
    </div>
  );
};

function App() {
  return (
    <ParishProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </ParishProvider>
  );
}

export default App;
