// Unified API Client for Loretto Church Web App
// Seamlessly connects to Cloudflare Worker backend (D1 & R2) with fallback to local static data

import { news } from '../data/news';
import { events } from '../data/events';
import { obituaries } from '../data/obituaries';

const WORKER_API_URL = import.meta.env.VITE_WORKER_API_URL || '';

/**
 * Helper to fetch from Cloudflare Worker API with timeout and fallback
 */
async function fetchWithFallback(endpoint, staticFallback) {
  if (!WORKER_API_URL) {
    return staticFallback;
  }
  try {
    const res = await fetch(`${WORKER_API_URL}${endpoint}`, {
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
  // --- NEWS / ANNOUNCEMENTS ---
  async getNews() {
    const res = await fetchWithFallback('/api/news', { news });
    return res.news || res;
  },

  async createNews(newsItem) {
    if (!WORKER_API_URL) return { success: false, message: 'Worker API URL not set' };
    const res = await fetch(`${WORKER_API_URL}/api/news`, {
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
    if (!WORKER_API_URL) return { success: false, message: 'Worker API URL not set' };
    const res = await fetch(`${WORKER_API_URL}/api/events`, {
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
    if (!WORKER_API_URL) return { success: false, message: 'Worker API URL not set' };
    const res = await fetch(`${WORKER_API_URL}/api/obituaries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obituaryItem),
    });
    return res.json();
  },

  // --- PRAYER INTENTIONS / CONTACT ---
  async submitPrayerIntention(formData) {
    if (!WORKER_API_URL) {
      console.log('[Loretto API Simulated Intention Submission]:', formData);
      return { success: true, message: 'Prayer intention recorded locally' };
    }
    const res = await fetch(`${WORKER_API_URL}/api/intentions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return res.json();
  },

  // --- R2 IMAGE UPLOAD ---
  async uploadImage(file) {
    if (!WORKER_API_URL) throw new Error('Worker API URL not configured');
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${WORKER_API_URL}/api/images/upload`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  // --- ADMIN AUTHENTICATION ---
  async verifyAdminPasscode(passcode) {
    // 1. Try Cloudflare Worker API if configured
    if (WORKER_API_URL) {
      try {
        const res = await fetch(`${WORKER_API_URL}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) return true;
        }
      } catch (err) {
        console.warn('[Loretto API] Worker auth check error, falling back to env/local:', err);
      }
    }

    // 2. Check Cloudflare Pages Build Environment Variable VITE_ADMIN_PASSCODE
    const cloudflareEnvPasscode = import.meta.env.VITE_ADMIN_PASSCODE;
    if (cloudflareEnvPasscode) {
      return passcode === cloudflareEnvPasscode;
    }

    // 3. Check custom passcode changed by user in local storage
    const storedPasscode = localStorage.getItem('loretto_admin_passcode');
    if (storedPasscode) {
      return passcode === storedPasscode;
    }

    return false;
  },
};
