import React, { createContext, useContext, useState, useEffect } from 'react';
import { leadership as initialLeadership } from '../data/leadership';
import { historyTimeline as initialTimeline, parishFacts as initialFacts } from '../data/history';
import { galleryImages as initialGalleryImages, galleryCategories as initialGalleryCategories } from '../data/gallery';
import { wards as initialWards } from '../data/wards';
import { ministries as initialMinistries } from '../data/ministries';
import { news as initialNews } from '../data/news';
import { events as initialEvents } from '../data/events';
import { newsletters as initialNewsletters } from '../data/newsletter';
import { obituaries as initialObituaries } from '../data/obituaries';
import { initialInstitutions } from '../data/institutions';

const ParishContext = createContext(null);

const STORAGE_KEYS = {
  LEADERSHIP: 'loretto_parish_leadership',
  HISTORY_TIMELINE: 'loretto_parish_history_timeline',
  PARISH_FACTS: 'loretto_parish_facts',
  OFFICE: 'loretto_parish_office',
  GALLERY: 'loretto_parish_gallery',
  WARDS: 'loretto_parish_wards',
  ORGANIZATIONS: 'loretto_parish_organizations',
  NEWS: 'loretto_parish_news',
  EVENTS: 'loretto_parish_events',
  NEWSLETTERS: 'loretto_parish_newsletters',
  OBITUARIES: 'loretto_parish_obituaries',
  INSTITUTIONS: 'loretto_parish_institutions',
  AUTH: 'loretto_admin_auth',
};

const initialOfficeData = {
  address: 'Our Lady of Loretto Church, Loretto, Bantwal, Mangalore, Karnataka — 574211',
  phone: '+91 824 2345678',
  email: 'office@lorettochurch.org',
  weekdayHours: '9:00 AM – 12:00 PM | 4:00 PM – 6:00 PM',
  weekendHours: 'Closed after Morning Mass (Sundays & Feast Days)',
  notes: 'The Parish Office handles administrative matters including sacrament certificate requests, Mass intention bookings, baptismal registrations, and general parish assistance.',
};

export const ParishProvider = ({ children }) => {
  // 1. Leadership State
  const [leadership, setLeadership] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADERSHIP);
      return saved ? JSON.parse(saved) : initialLeadership;
    } catch {
      return initialLeadership;
    }
  });

  // 2. History Timeline State
  const [historyTimeline, setHistoryTimeline] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY_TIMELINE);
      return saved ? JSON.parse(saved) : initialTimeline;
    } catch {
      return initialTimeline;
    }
  });

  // 3. Parish Facts State
  const [parishFacts, setParishFacts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PARISH_FACTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialFacts.map(fact => {
      if (fact.label === 'Parish Priest') {
        return {
          ...fact,
          value: `${initialLeadership.parishPriest.designation} ${initialLeadership.parishPriest.name}`,
        };
      }
      return fact;
    });
  });

  // 4. Office Details State
  const [office, setOffice] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OFFICE);
      return saved ? JSON.parse(saved) : initialOfficeData;
    } catch {
      return initialOfficeData;
    }
  });

  // 5. Gallery Images State
  const [galleryImages, setGalleryImages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : initialGalleryImages;
    } catch {
      return initialGalleryImages;
    }
  });

  const [galleryCategories] = useState(initialGalleryCategories);

  // 6. Wards State
  const [wards, setWards] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WARDS);
      return saved ? JSON.parse(saved) : initialWards;
    } catch {
      return initialWards;
    }
  });

  // 7. Organizations State
  const [organizations, setOrganizations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORGANIZATIONS);
      return saved ? JSON.parse(saved) : initialMinistries;
    } catch {
      return initialMinistries;
    }
  });

  // 8. News State
  const [news, setNews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
      return saved ? JSON.parse(saved) : initialNews;
    } catch {
      return initialNews;
    }
  });

  // 9. Events State
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : initialEvents;
    } catch {
      return initialEvents;
    }
  });

  // 10. Newsletters State
  const [newsletters, setNewsletters] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWSLETTERS);
      return saved ? JSON.parse(saved) : initialNewsletters;
    } catch {
      return initialNewsletters;
    }
  });

  // 11. Obituaries State
  const [obituaries, setObituaries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OBITUARIES);
      return saved ? JSON.parse(saved) : initialObituaries;
    } catch {
      return initialObituaries;
    }
  });

  // 12. Institutions State
  const [institutions, setInstitutions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INSTITUTIONS);
      return saved ? JSON.parse(saved) : initialInstitutions;
    } catch {
      return initialInstitutions;
    }
  });

  // 13. Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Save changes to LocalStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADERSHIP, JSON.stringify(leadership));
    } catch (e) {
      console.error('Failed to save leadership to localStorage:', e);
    }
  }, [leadership]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY_TIMELINE, JSON.stringify(historyTimeline));
    } catch (e) {
      console.error('Failed to save history timeline to localStorage:', e);
    }
  }, [historyTimeline]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PARISH_FACTS, JSON.stringify(parishFacts));
    } catch (e) {
      console.error('Failed to save parish facts to localStorage:', e);
    }
  }, [parishFacts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFICE, JSON.stringify(office));
    } catch (e) {
      console.error('Failed to save office data to localStorage:', e);
    }
  }, [office]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(galleryImages));
    } catch (e) {
      console.error('Failed to save gallery images to localStorage:', e);
    }
  }, [galleryImages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WARDS, JSON.stringify(wards));
    } catch (e) {
      console.error('Failed to save wards to localStorage:', e);
    }
  }, [wards]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORGANIZATIONS, JSON.stringify(organizations));
    } catch (e) {
      console.error('Failed to save organizations to localStorage:', e);
    }
  }, [organizations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    } catch (e) {
      console.error('Failed to save news to localStorage:', e);
    }
  }, [news]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error('Failed to save events to localStorage:', e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWSLETTERS, JSON.stringify(newsletters));
    } catch (e) {
      console.error('Failed to save newsletters to localStorage:', e);
    }
  }, [newsletters]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OBITUARIES, JSON.stringify(obituaries));
    } catch (e) {
      console.error('Failed to save obituaries to localStorage:', e);
    }
  }, [obituaries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INSTITUTIONS, JSON.stringify(institutions));
    } catch (e) {
      console.error('Failed to save institutions to localStorage:', e);
    }
  }, [institutions]);

  // Auth helper methods
  const loginAdmin = (passcode) => {
    const storedPasscode = localStorage.getItem('loretto_admin_passcode') || 'admin123';
    if (passcode === storedPasscode) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const changeAdminPasscode = (newPasscode) => {
    localStorage.setItem('loretto_admin_passcode', newPasscode);
  };

  // Helper 1: Update Parish Priest Name & Details (Globally updates everywhere!)
  const updateParishPriest = (updatedPriestData) => {
    setLeadership(prev => {
      const newPriest = {
        ...prev.parishPriest,
        ...updatedPriestData,
      };

      const fullNameWithPrefix = `${newPriest.designation} ${newPriest.name}`.trim();

      // Synchronize Pastoral Team
      const updatedPastoralTeam = prev.pastoralTeam.map(member => {
        if (member.position === 'Parish Priest' || member.id === 1) {
          return {
            ...member,
            name: newPriest.name,
            designation: newPriest.designation,
            image: newPriest.image || member.image,
          };
        }
        return member;
      });

      // Synchronize Parish Council Ex-Officio President
      const updatedParishCouncil = prev.parishCouncil.map(member => {
        if (member.position.includes('Ex-officio') || member.id === 1) {
          return {
            ...member,
            name: fullNameWithPrefix,
            image: newPriest.image || member.image,
          };
        }
        return member;
      });

      return {
        ...prev,
        parishPriest: newPriest,
        pastoralTeam: updatedPastoralTeam,
        parishCouncil: updatedParishCouncil,
      };
    });

    // Synchronize Parish Facts Table
    setParishFacts(prevFacts =>
      prevFacts.map(fact => {
        if (fact.label === 'Parish Priest') {
          return {
            ...fact,
            value: `${updatedPriestData.designation || leadership.parishPriest.designation} ${updatedPriestData.name || leadership.parishPriest.name}`.trim(),
          };
        }
        return fact;
      })
    );
  };

  // Helper 2: Update Priest Messages
  const updatePriestMessages = ({ message, shortMessage }) => {
    setLeadership(prev => ({
      ...prev,
      parishPriest: {
        ...prev.parishPriest,
        ...(message !== undefined && { message }),
        ...(shortMessage !== undefined && { shortMessage }),
      },
    }));
  };

  // Helper 3: Update History Timeline
  const updateHistoryTimeline = (newTimeline) => {
    setHistoryTimeline(newTimeline);
  };

  // Helper 4: Update Parish Facts
  const updateParishFacts = (newFacts) => {
    setParishFacts(newFacts);
  };

  // Helper 5: Update Parish Council
  const updateParishCouncil = (newCouncilMembers) => {
    setLeadership(prev => ({
      ...prev,
      parishCouncil: newCouncilMembers,
    }));
  };

  // Helper 6: Update Parish Office
  const updateParishOffice = (updatedOffice) => {
    setOffice(prev => ({
      ...prev,
      ...updatedOffice,
    }));
  };

  // Helper 7: Update Gallery Images
  const updateGalleryImages = (newImages) => {
    setGalleryImages(newImages);
  };

  // Helper 8: Ward Management Handlers
  const updateWards = (newWards) => {
    setWards(newWards);
  };

  const addWard = (wardData) => {
    const slug = wardData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const emptyOfficer = { name: '', konkaniName: '', phone: '', address: '', photo: '' };
    const newWard = {
      id: Date.now(),
      slug,
      householdsCount: 0,
      meetingSchedule: '1st Sunday of every month at 4:00 PM',
      description: '',
      fullDescription: '',
      image: `${import.meta.env.BASE_URL}images/hero-exterior.jpg`,
      gurkar: { name: '', konkaniName: '', role: 'Gurkar (Ward Leader)', phone: '', address: '' },
      representatives: [],
      president: { ...emptyOfficer },
      vicePresident: { ...emptyOfficer },
      secretary: { ...emptyOfficer },
      families: [],
      contributions: [],
      wardGallery: [],
      activities: [],
      ...wardData,
    };
    setWards(prev => [...prev, newWard]);
    return newWard;
  };

  const updateWard = (wardId, updatedWardData) => {
    setWards(prev => prev.map(w => w.id === wardId ? { ...w, ...updatedWardData } : w));
  };

  const deleteWard = (wardId) => {
    setWards(prev => prev.filter(w => w.id !== wardId));
  };

  const addPersonToWard = (wardId, personData) => {
    setWards(prev => prev.map(w => {
      if (w.id === wardId) {
        const families = w.families || [];
        const newFamily = {
          id: Date.now(),
          members: 4,
          ...personData,
        };
        const updatedFamilies = [...families, newFamily];
        return {
          ...w,
          families: updatedFamilies,
          householdsCount: updatedFamilies.length,
        };
      }
      return w;
    }));
  };

  const updatePersonInWard = (wardId, personId, personData) => {
    setWards(prev => prev.map(w => {
      if (w.id === wardId) {
        const updatedFamilies = (w.families || []).map(f => f.id === personId ? { ...f, ...personData } : f);
        return { ...w, families: updatedFamilies };
      }
      return w;
    }));
  };

  const deletePersonFromWard = (wardId, personId) => {
    setWards(prev => prev.map(w => {
      if (w.id === wardId) {
        const updatedFamilies = (w.families || []).filter(f => f.id !== personId);
        return {
          ...w,
          families: updatedFamilies,
          householdsCount: updatedFamilies.length,
        };
      }
      return w;
    }));
  };

  const addContributionToWard = (wardId, contributionData) => {
    setWards(prev => prev.map(w => {
      if (w.id === wardId) {
        const contributions = w.contributions || [];
        const newContribution = {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          ...contributionData,
        };
        return { ...w, contributions: [newContribution, ...contributions] };
      }
      return w;
    }));
  };

  const deleteContributionFromWard = (wardId, contributionId) => {
    setWards(prev => prev.map(w => {
      if (w.id === wardId) {
        const updated = (w.contributions || []).filter(c => c.id !== contributionId);
        return { ...w, contributions: updated };
      }
      return w;
    }));
  };

  const addWardImage = (wardId, imageData) => {
    setWards(prev => prev.map(w => {
      if (w.id === wardId) {
        const wardGallery = w.wardGallery || [];
        const newImg = {
          id: Date.now(),
          ...imageData,
        };
        return { ...w, wardGallery: [newImg, ...wardGallery] };
      }
      return w;
    }));
  };

  const deleteWardImage = (wardId, imageId) => {
    setWards(prev => prev.map(w => {
      if (w.id === wardId) {
        const updated = (w.wardGallery || []).filter(img => img.id !== imageId);
        return { ...w, wardGallery: updated };
      }
      return w;
    }));
  };

  // Helper 9: Organization Management Handlers
  const updateOrganizations = (newOrgs) => {
    setOrganizations(newOrgs);
  };

  const addOrganization = (orgData) => {
    const slug = orgData.slug || orgData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newOrg = {
      id: Date.now(),
      slug,
      name: '',
      shortName: '',
      konkaniName: '',
      category: 'Lay Association',
      motto: '',
      tagline: '',
      description: '',
      fullDescription: '',
      image: `${import.meta.env.BASE_URL}images/hero-community.jpg`,
      targetGroup: '',
      meetingDay: '',
      venue: '',
      spiritualDirector: 'Rev. Fr. Parish Priest',
      officeBearers: [],
      objectives: [],
      activities: [],
      howToJoin: '',
      ...orgData,
    };
    setOrganizations(prev => [...prev, newOrg]);
    return newOrg;
  };

  const updateOrganization = (orgId, updatedOrgData) => {
    setOrganizations(prev => prev.map(o => o.id === orgId ? { ...o, ...updatedOrgData } : o));
  };

  const deleteOrganization = (orgId) => {
    setOrganizations(prev => prev.filter(o => o.id !== orgId));
  };

  const addOfficeBearerToOrg = (orgId, bearerData) => {
    setOrganizations(prev => prev.map(o => {
      if (o.id === orgId) {
        const bearers = o.officeBearers || [];
        const newBearer = {
          id: Date.now(),
          ...bearerData
        };
        return { ...o, officeBearers: [...bearers, newBearer] };
      }
      return o;
    }));
  };

  const updateOfficeBearerInOrg = (orgId, bearerIndex, updatedBearerData) => {
    setOrganizations(prev => prev.map(o => {
      if (o.id === orgId) {
        const bearers = [...(o.officeBearers || [])];
        if (bearerIndex >= 0 && bearerIndex < bearers.length) {
          bearers[bearerIndex] = { ...bearers[bearerIndex], ...updatedBearerData };
        }
        return { ...o, officeBearers: bearers };
      }
      return o;
    }));
  };

  const deleteOfficeBearerFromOrg = (orgId, bearerIndex) => {
    setOrganizations(prev => prev.map(o => {
      if (o.id === orgId) {
        const bearers = (o.officeBearers || []).filter((_, idx) => idx !== bearerIndex);
        return { ...o, officeBearers: bearers };
      }
      return o;
    }));
  };

  const addObjectiveToOrg = (orgId, objectiveString) => {
    setOrganizations(prev => prev.map(o => {
      if (o.id === orgId) {
        const objectives = o.objectives || [];
        return { ...o, objectives: [...objectives, objectiveString] };
      }
      return o;
    }));
  };

  const updateObjectiveInOrg = (orgId, index, objectiveString) => {
    setOrganizations(prev => prev.map(o => {
      if (o.id === orgId) {
        const objectives = [...(o.objectives || [])];
        objectives[index] = objectiveString;
        return { ...o, objectives };
      }
      return o;
    }));
  };

  const deleteObjectiveFromOrg = (orgId, index) => {
    setOrganizations(prev => prev.map(o => {
      if (o.id === orgId) {
        const objectives = (o.objectives || []).filter((_, idx) => idx !== index);
        return { ...o, objectives };
      }
      return o;
    }));
  };

  const addActivityToOrg = (orgId, activityString) => {
    setOrganizations(prev => prev.map(o => {
      if (o.id === orgId) {
        const activities = o.activities || [];
        return { ...o, activities: [...activities, activityString] };
      }
      return o;
    }));
  };

  const updateActivityInOrg = (orgId, index, activityString) => {
    setOrganizations(prev => prev.map(o => {
      if (o.id === orgId) {
        const activities = [...(o.activities || [])];
        activities[index] = activityString;
        return { ...o, activities };
      }
      return o;
    }));
  };

  const deleteActivityFromOrg = (orgId, index) => {
    setOrganizations(prev => prev.map(o => {
      if (o.id === orgId) {
        const activities = (o.activities || []).filter((_, idx) => idx !== index);
        return { ...o, activities };
      }
      return o;
    }));
  };

  // Helper 10: News & Announcements Handlers
  const addNewsItem = (newsData) => {
    const slug = newsData.slug || newsData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const dateObj = newsData.date ? new Date(newsData.date) : new Date();
    const displayDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const newArticle = {
      id: Date.now(),
      title: '',
      slug,
      date: new Date().toISOString().split('T')[0],
      displayDate,
      category: 'Parish',
      excerpt: '',
      content: '',
      image: `${import.meta.env.BASE_URL}images/hero-community.jpg`,
      featured: false,
      ...newsData,
    };
    setNews(prev => [newArticle, ...prev]);
    return newArticle;
  };

  const updateNewsItem = (newsId, updatedNewsData) => {
    setNews(prev => prev.map(n => {
      if (n.id === newsId) {
        let displayDate = n.displayDate;
        if (updatedNewsData.date && updatedNewsData.date !== n.date) {
          const dateObj = new Date(updatedNewsData.date);
          displayDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
        return {
          ...n,
          ...updatedNewsData,
          displayDate: updatedNewsData.displayDate || displayDate,
        };
      }
      return n;
    }));
  };

  const deleteNewsItem = (newsId) => {
    setNews(prev => prev.filter(n => n.id !== newsId));
  };

  // Helper 11: Events Handlers
  const parseEventDateFields = (dateStr) => {
    if (!dateStr) return {};
    try {
      const dateObj = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
      const displayDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
      return { displayDate, day, month };
    } catch {
      return {};
    }
  };

  const addEventItem = (eventData) => {
    const dateFields = parseEventDateFields(eventData.date);
    const newEvent = {
      id: Date.now(),
      title: '',
      date: new Date().toISOString().split('T')[0],
      displayDate: '',
      day: '',
      month: '',
      time: '',
      location: '',
      category: 'Parish',
      description: '',
      image: `${import.meta.env.BASE_URL}images/hero-community.jpg`,
      featured: false,
      ...eventData,
      ...dateFields,
    };
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEventItem = (eventId, updatedEventData) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        let dateFields = {};
        if (updatedEventData.date && updatedEventData.date !== ev.date) {
          dateFields = parseEventDateFields(updatedEventData.date);
        }
        return {
          ...ev,
          ...updatedEventData,
          ...dateFields,
        };
      }
      return ev;
    }));
  };

  const deleteEventItem = (eventId) => {
    setEvents(prev => prev.filter(ev => ev.id !== eventId));
  };

  // Helper 12: Newsletter Handlers
  const parseNewsletterDate = (dateStr) => {
    if (!dateStr) return { year: new Date().getFullYear(), displayDate: '' };
    try {
      const dateObj = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
      const displayDate = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      const year = dateObj.getFullYear();
      return { year, displayDate };
    } catch {
      return { year: new Date().getFullYear(), displayDate: dateStr };
    }
  };

  const addNewsletterItem = (newsletterData) => {
    const { year, displayDate } = parseNewsletterDate(newsletterData.date);
    const newNewsletter = {
      id: Date.now(),
      title: '',
      edition: 'Vol. 1, Issue 1',
      date: new Date().toISOString().split('T')[0],
      displayDate,
      year,
      image: `${import.meta.env.BASE_URL}images/newsletter-cover.jpg`,
      description: '',
      pdfUrl: '#',
      readUrl: '#',
      featured: false,
      ...newsletterData,
    };

    setNewsletters(prev => {
      let updated = [newNewsletter, ...prev];
      if (newNewsletter.featured) {
        updated = updated.map(item => item.id === newNewsletter.id ? item : { ...item, featured: false });
      }
      return updated;
    });

    return newNewsletter;
  };

  const updateNewsletterItem = (newsletterId, updatedData) => {
    setNewsletters(prev => {
      return prev.map(n => {
        if (n.id === newsletterId) {
          let dateFields = {};
          if (updatedData.date && updatedData.date !== n.date) {
            dateFields = parseNewsletterDate(updatedData.date);
          }
          return { ...n, ...updatedData, ...dateFields };
        }
        if (updatedData.featured && n.id !== newsletterId) {
          return { ...n, featured: false };
        }
        return n;
      });
    });
  };

  const deleteNewsletterItem = (newsletterId) => {
    setNewsletters(prev => prev.filter(n => n.id !== newsletterId));
  };

  // Helper 14: Obituary Handlers
  const addObituary = (obData) => {
    const newObituary = {
      id: Date.now(),
      name: '',
      konkaniName: '',
      photo: '',
      age: '',
      dateOfDeath: new Date().toISOString().split('T')[0],
      ward: '',
      funeralDetails: '',
      survivedBy: '',
      tribute: '',
      candlesCount: 0,
      ...obData,
    };
    setObituaries(prev => [newObituary, ...prev]);
    return newObituary;
  };

  const updateObituary = (id, updatedData) => {
    setObituaries(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
  };

  const deleteObituary = (id) => {
    setObituaries(prev => prev.filter(item => item.id !== id));
  };

  const lightObituaryCandle = (id) => {
    setObituaries(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, candlesCount: (item.candlesCount || 0) + 1 };
      }
      return item;
    }));
  };

  // Helper 15: Institution Handlers
  const addInstitution = (instData) => {
    const newInst = {
      id: Date.now(),
      name: '',
      konkaniName: '',
      category: 'Educational Institution',
      established: '',
      head: '',
      phone: '',
      email: '',
      address: '',
      description: '',
      image: `${import.meta.env.BASE_URL}images/hero-community.jpg`,
      facilities: [],
      ...instData,
    };
    setInstitutions(prev => [...prev, newInst]);
    return newInst;
  };

  const updateInstitution = (id, updatedData) => {
    setInstitutions(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
  };

  const deleteInstitution = (id) => {
    setInstitutions(prev => prev.filter(item => item.id !== id));
  };

  // Helper 16: Reset All Data to Defaults
  const resetToDefaults = () => {
    setLeadership(initialLeadership);
    setHistoryTimeline(initialTimeline);
    setParishFacts(
      initialFacts.map(fact => {
        if (fact.label === 'Parish Priest') {
          return {
            ...fact,
            value: `${initialLeadership.parishPriest.designation} ${initialLeadership.parishPriest.name}`,
          };
        }
        return fact;
      })
    );
    setOffice(initialOfficeData);
    setGalleryImages(initialGalleryImages);
    setWards(initialWards);
    setOrganizations(initialMinistries);
    setNews(initialNews);
    setEvents(initialEvents);
    setNewsletters(initialNewsletters);
    setObituaries(initialObituaries);
    setInstitutions(initialInstitutions);

    localStorage.removeItem(STORAGE_KEYS.LEADERSHIP);
    localStorage.removeItem(STORAGE_KEYS.HISTORY_TIMELINE);
    localStorage.removeItem(STORAGE_KEYS.PARISH_FACTS);
    localStorage.removeItem(STORAGE_KEYS.OFFICE);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.WARDS);
    localStorage.removeItem(STORAGE_KEYS.ORGANIZATIONS);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.NEWSLETTERS);
    localStorage.removeItem(STORAGE_KEYS.OBITUARIES);
    localStorage.removeItem(STORAGE_KEYS.INSTITUTIONS);
  };

  return (
    <ParishContext.Provider
      value={{
        leadership,
        parishPriest: leadership.parishPriest,
        pastoralTeam: leadership.pastoralTeam,
        parishCouncil: leadership.parishCouncil,
        historyTimeline,
        parishFacts,
        office,
        galleryImages,
        galleryCategories,
        wards,
        organizations,
        news,
        events,
        newsletters,
        obituaries,
        institutions,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        changeAdminPasscode,
        updateParishPriest,
        updatePriestMessages,
        updateHistoryTimeline,
        updateParishFacts,
        updateParishCouncil,
        updateParishOffice,
        updateGalleryImages,
        updateWards,
        addWard,
        updateWard,
        deleteWard,
        addPersonToWard,
        updatePersonInWard,
        deletePersonFromWard,
        addWardImage,
        deleteWardImage,
        updateOrganizations,
        addOrganization,
        updateOrganization,
        deleteOrganization,
        addOfficeBearerToOrg,
        updateOfficeBearerInOrg,
        deleteOfficeBearerFromOrg,
        addObjectiveToOrg,
        updateObjectiveInOrg,
        deleteObjectiveFromOrg,
        addActivityToOrg,
        updateActivityInOrg,
        deleteActivityFromOrg,
        addNewsItem,
        updateNewsItem,
        deleteNewsItem,
        addEventItem,
        updateEventItem,
        deleteEventItem,
        addNewsletterItem,
        updateNewsletterItem,
        deleteNewsletterItem,
        addObituary,
        updateObituary,
        deleteObituary,
        lightObituaryCandle,
        addInstitution,
        updateInstitution,
        deleteInstitution,
        resetToDefaults,
      }}
    >
      {children}
    </ParishContext.Provider>
  );
};

export const useParishData = () => {
  const context = useContext(ParishContext);
  if (!context) {
    throw new Error('useParishData must be used within a ParishProvider');
  }
  return context;
};
