// Unified API Client for Loretto Church Web App
// Seamlessly connects to Cloudflare Worker backend (D1 & Cloudinary) with fallback to local static data

import { news } from '../data/news';
import { events } from '../data/events';
import { obituaries } from '../data/obituaries';

const API_BASE_URL = import.meta.env.VITE_WORKER_API_URL || '';
const ADMIN_TOKEN_STORAGE_KEY = 'loretto_admin_token';

function apiUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`;
}

function getAdminToken() {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Helper to fetch from Cloudflare Worker API with timeout and fallback
 */
async function fetchWithFallback(endpoint, staticFallback) {
  try {
    const res = await fetch(apiUrl(endpoint), {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`[Loretto API] Worker API unreachable (${endpoint}). Using fallback data.`, err);
    return staticFallback;
  }
}

export const api = {
  hasAdminSession() {
    return Boolean(getAdminToken());
  },

  clearAdminSession() {
    try {
      sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    } catch {}
  },

  // --- SHARED SITE CONTENT ---
  async getSiteContent() {
    const res = await fetchWithFallback('/api/content', { content: {}, count: 0 });
    return {
      content: res.content || {},
      count: res.count || 0,
    };
  },

  async saveSiteContent(contentKey, value) {
    const token = getAdminToken();
    if (!token) return { success: false, message: 'No admin session available.' };

    try {
      const res = await fetch(apiUrl(`/api/content/${contentKey}`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });
      const data = await res.json().catch(() => ({}));
      return {
        success: res.ok && Boolean(data.success),
        message: data.message || (res.ok ? 'Content saved.' : 'Unable to save content.'),
      };
    } catch (err) {
      console.warn(`[Loretto API] Content save error (${contentKey}):`, err);
      return { success: false, message: 'Could not reach the content API.' };
    }
  },

  // --- NEWS / ANNOUNCEMENTS ---
  async getNews() {
    const res = await fetchWithFallback('/api/news', { news });
    return res.news || res;
  },

  async createNews(newsItem) {
    const res = await fetch(apiUrl('/api/news'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsItem),
    });
    return res.json();
  },

  // --- EVENTS ---
  async getEvents() {
    const res = await fetchWithFallback('/api/events', { events });
    return res.events || res;
  },

  async createEvent(eventItem) {
    const res = await fetch(apiUrl('/api/events'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventItem),
    });
    return res.json();
  },

  // --- OBITUARIES ---
  async getObituaries() {
    const res = await fetchWithFallback('/api/obituaries', { obituaries });
    return res.obituaries || res;
  },

  async createObituary(obituaryItem) {
    const res = await fetch(apiUrl('/api/obituaries'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obituaryItem),
    });
    return res.json();
  },

  // --- PRAYER INTENTIONS / CONTACT ---
  async submitPrayerIntention(formData) {
    const res = await fetch(apiUrl('/api/intentions'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return res.json();
  },

  // --- CLOUDINARY IMAGE UPLOAD ---
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(apiUrl('/api/images/upload'), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAdminToken() || ''}`,
      },
      body: formData,
    });
    return res.json();
  },

  // --- ADMIN AUTHENTICATION ---
  async verifyAdminPasscode(passcode) {
    try {
      const res = await fetch(apiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      if (data.success && data.token) {
        try {
          sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, data.token);
        } catch {}
      }
      return Boolean(data.success);
    } catch (err) {
      console.warn('[Loretto API] Worker auth check error:', err);
      return false;
    }
  },

  async changeAdminPasscode(currentPasscode, newPasscode) {
    try {
      const res = await fetch(apiUrl('/api/admin/passcode'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPasscode, newPasscode }),
      });
      const data = await res.json().catch(() => ({}));
      return {
        success: res.ok && Boolean(data.success),
        message: data.message || (res.ok ? 'Passcode updated successfully.' : 'Unable to update passcode.'),
      };
    } catch (err) {
      console.warn('[Loretto API] Worker passcode update error:', err);
      return { success: false, message: 'Could not reach the admin API. Please try again.' };
    }
  },
};
