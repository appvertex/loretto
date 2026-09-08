// Cloudflare Worker Backend for Loretto Church API

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(),
    },
  });
}

const ADMIN_CREDENTIAL_ID = 'primary';
const PASSCODE_ITERATIONS = 100000;
const PASSCODE_MIN_LENGTH = 6;
const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 8;
const CONTENT_KEYS = new Set([
  'leadership',
  'historyTimeline',
  'parishFacts',
  'office',
  'galleryImages',
  'wards',
  'organizations',
  'news',
  'events',
  'newsletters',
  'obituaries',
  'institutions',
  'siteSettings',
  'aboutContent',
]);

const fallbackNewsMetadata = {
  'parish-feast-preparations': { title: 'Parish Feast Preparations Underway', image: '/images/hero-community.jpg' },
  'catechism-new-year': { title: 'New Catechism Year Begins', image: '/images/quick-groups.jpg' },
  'youth-blood-donation': { title: 'Youth Group Organises Blood Donation Camp', image: '/images/quick-groups.jpg' },
  'newsletter-august-2026': { title: 'Parish Newsletter - August 2026', image: '/images/newsletter-cover.jpg' },
  'womens-association-feast': { title: "Women's Association Celebrates Feast of Our Lady", image: '/images/hero-community.jpg' },
  'church-renovation': { title: 'Church Renovation Work Completed', image: '/images/hero-exterior.jpg' },
};

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

async function getNewsMetadata(db, slug) {
  const fallback = fallbackNewsMetadata[slug];
  try {
    const row = await db.prepare('SELECT content_json FROM site_content WHERE content_key = ?')
      .bind('news')
      .first();
    const articles = row?.content_json ? JSON.parse(row.content_json) : [];
    const article = Array.isArray(articles) ? articles.find((item) => item.slug === slug) : null;
    if (article) {
      return {
        title: article.title,
        description: article.excerpt || article.content || '',
        image: article.image || fallback?.image || '/images/hero-community.jpg',
      };
    }
  } catch {
    // Use the bundled fallback metadata when shared content is unavailable.
  }
  return fallback || null;
}

function injectNewsMetadata(html, metadata, requestUrl) {
  const url = new URL(requestUrl);
  const imageUrl = new URL(metadata.image, url.origin).href;
  const articleUrl = url.href;
  const title = `${metadata.title} | Our Lady of Loretto Church`;
  const description = metadata.description || 'Parish news from Our Lady of Loretto Church.';
  const tags = [
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}">`,
    `<meta property="og:url" content="${escapeHtml(articleUrl)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}">`,
  ].join('\n    ');
  return html.replace('</head>', `    ${tags}\n  </head>`);
}

function bytesToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function generateSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPasscode(passcode, salt, iterations = PASSCODE_ITERATIONS) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passcode),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations,
      hash: 'SHA-256',
    },
    key,
    256
  );
  return bytesToHex(bits);
}

function timingSafeEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function ensureAdminCredentialsTable(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS admin_credentials (
      id TEXT PRIMARY KEY,
      passcode_hash TEXT NOT NULL,
      passcode_salt TEXT NOT NULL,
      hash_algorithm TEXT NOT NULL DEFAULT 'PBKDF2-SHA256',
      iterations INTEGER NOT NULL DEFAULT 100000,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

async function getAdminCredentials(db) {
  await ensureAdminCredentialsTable(db);
  return db.prepare('SELECT * FROM admin_credentials WHERE id = ?')
    .bind(ADMIN_CREDENTIAL_ID)
    .first();
}

async function verifyAdminPasscode(db, passcode) {
  const credentials = await getAdminCredentials(db);
  if (!credentials) {
    return false;
  }

  const attemptedHash = await hashPasscode(
    passcode,
    credentials.passcode_salt,
    credentials.iterations || PASSCODE_ITERATIONS
  );
  return timingSafeEqual(attemptedHash, credentials.passcode_hash);
}

async function updateAdminPasscode(db, newPasscode) {
  const salt = generateSalt();
  const passcodeHash = await hashPasscode(newPasscode, salt);

  await db.prepare(`
    INSERT INTO admin_credentials (id, passcode_hash, passcode_salt, iterations, updated_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      passcode_hash = excluded.passcode_hash,
      passcode_salt = excluded.passcode_salt,
      iterations = excluded.iterations,
      updated_at = CURRENT_TIMESTAMP
  `).bind(ADMIN_CREDENTIAL_ID, passcodeHash, salt, PASSCODE_ITERATIONS).run();
}

async function sha256Hex(value) {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return bytesToHex(buffer);
}

function generateAdminToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function ensureAdminSessionsTable(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token_hash TEXT PRIMARY KEY,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expires_at TEXT NOT NULL
    )
  `).run();
}

async function createAdminSession(db) {
  await ensureAdminSessionsTable(db);
  const token = generateAdminToken();
  const tokenHash = await sha256Hex(token);
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_DURATION_SECONDS * 1000).toISOString();

  await db.prepare('DELETE FROM admin_sessions WHERE expires_at <= ?')
    .bind(new Date().toISOString())
    .run();
  await db.prepare('INSERT INTO admin_sessions (token_hash, expires_at) VALUES (?, ?)')
    .bind(tokenHash, expiresAt)
    .run();

  return { token, expiresAt };
}

async function verifyAdminSession(db, request) {
  await ensureAdminSessionsTable(db);
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!token) return false;

  const tokenHash = await sha256Hex(token);
  const session = await db.prepare('SELECT token_hash FROM admin_sessions WHERE token_hash = ? AND expires_at > ?')
    .bind(tokenHash, new Date().toISOString())
    .first();
  return Boolean(session);
}

async function ensureSiteContentTable(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS site_content (
      content_key TEXT PRIMARY KEY,
      content_json TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

export default {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const isApiRequest = pathname.startsWith('/api/');

    // Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    try {
      if (!isApiRequest && env.ASSETS) {
        let assetResponse = await env.ASSETS.fetch(request);
        const acceptsHtml = request.headers.get('Accept')?.includes('text/html');
        const pathnameHasFileExtension = pathname.includes('.');

        // Serve the SPA shell for client-side routes on direct browser requests.
        if (assetResponse.status === 404 && request.method === 'GET' && acceptsHtml && !pathnameHasFileExtension) {
          assetResponse = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
        }

        const newsMatch = pathname.match(/^\/news\/([^/]+)$/);
        if (assetResponse.ok && request.method === 'GET' && acceptsHtml && newsMatch) {
          const metadata = await getNewsMetadata(env.DB, decodeURIComponent(newsMatch[1]));
          if (metadata) {
            const html = injectNewsMetadata(await assetResponse.text(), metadata, request.url);
            return new Response(html, {
              status: assetResponse.status,
              headers: new Headers(assetResponse.headers),
            });
          }
        }

        return assetResponse;
      }

      if (!env.DB) {
        return jsonResponse({ error: 'D1 Database binding (DB) not configured' }, 500);
      }

      if (pathname.startsWith('/api/share/news/') && request.method === 'GET') {
        const slug = decodeURIComponent(pathname.replace('/api/share/news/', ''));
        const metadata = await getNewsMetadata(env.DB, slug);
        if (!metadata) return new Response('News article not found', { status: 404 });

        const articleUrl = new URL(`/news/${encodeURIComponent(slug)}`, request.url).href;
        const imageUrl = new URL(metadata.image, request.url).href;
        const title = `${metadata.title} | Our Lady of Loretto Church`;
        const description = metadata.description || 'Parish news from Our Lady of Loretto Church.';
        const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:image" content="${escapeHtml(imageUrl)}">
    <meta property="og:url" content="${escapeHtml(articleUrl)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}">
    <meta http-equiv="refresh" content="0;url=${escapeHtml(articleUrl)}">
  </head>
  <body>
    <p>Opening <a href="${escapeHtml(articleUrl)}">${escapeHtml(metadata.title)}</a>...</p>
    <script>window.location.replace(${JSON.stringify(articleUrl)});</script>
  </body>
</html>`;

        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'public, max-age=300',
          },
        });
      }

      // ----------------------------------------------------
      // ADMIN AUTHENTICATION ROUTE: POST /api/admin/login
      // ----------------------------------------------------
      if (pathname === '/api/admin/login' && request.method === 'POST') {
        const body = await request.json();
        if (body?.passcode && await verifyAdminPasscode(env.DB, body.passcode)) {
          const session = await createAdminSession(env.DB);
          return jsonResponse({
            success: true,
            message: 'Authenticated successfully',
            token: session.token,
            expiresAt: session.expiresAt,
          });
        } else {
          return jsonResponse({ success: false, message: 'Incorrect passcode' }, 401);
        }
      }

      // ----------------------------------------------------
      // ADMIN PASSCODE UPDATE ROUTE: PUT /api/admin/passcode
      // ----------------------------------------------------
      if (pathname === '/api/admin/passcode' && request.method === 'PUT') {
        const body = await request.json();

        if (!body?.currentPasscode || !body?.newPasscode) {
          return jsonResponse({ success: false, message: 'Current and new passcodes are required.' }, 400);
        }

        if (String(body.newPasscode).length < PASSCODE_MIN_LENGTH) {
          return jsonResponse({ success: false, message: `New passcode must be at least ${PASSCODE_MIN_LENGTH} characters.` }, 400);
        }

        const isCurrentPasscodeValid = await verifyAdminPasscode(env.DB, body.currentPasscode);
        if (!isCurrentPasscodeValid) {
          return jsonResponse({ success: false, message: 'Current passcode is incorrect.' }, 401);
        }

        await updateAdminPasscode(env.DB, body.newPasscode);
        return jsonResponse({ success: true, message: 'Passcode updated successfully.' });
      }

      // ----------------------------------------------------
      // SHARED SITE CONTENT ROUTES
      // ----------------------------------------------------
      if (pathname === '/api/content' && request.method === 'GET') {
        await ensureSiteContentTable(env.DB);
        const { results } = await env.DB.prepare('SELECT content_key, content_json, updated_at FROM site_content').all();
        const content = {};

        for (const row of results || []) {
          try {
            content[row.content_key] = JSON.parse(row.content_json);
          } catch {
            content[row.content_key] = null;
          }
        }

        return jsonResponse({ content, count: results?.length || 0 });
      }

      if (pathname.startsWith('/api/content/') && request.method === 'PUT') {
        const contentKey = pathname.replace('/api/content/', '');
        if (!CONTENT_KEYS.has(contentKey)) {
          return jsonResponse({ success: false, message: 'Unknown content section.' }, 400);
        }

        if (!await verifyAdminSession(env.DB, request)) {
          return jsonResponse({ success: false, message: 'Admin session expired. Please log in again.' }, 401);
        }

        const body = await request.json();
        if (!body || !Object.hasOwn(body, 'value')) {
          return jsonResponse({ success: false, message: 'Content value is required.' }, 400);
        }

        await ensureSiteContentTable(env.DB);
        await env.DB.prepare(`
          INSERT INTO site_content (content_key, content_json, updated_at)
          VALUES (?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(content_key) DO UPDATE SET
            content_json = excluded.content_json,
            updated_at = CURRENT_TIMESTAMP
        `).bind(contentKey, JSON.stringify(body.value)).run();

        return jsonResponse({ success: true, key: contentKey });
      }

      // ----------------------------------------------------
      // CLOUDINARY IMAGE UPLOAD ROUTE: POST /api/images/upload
      // ----------------------------------------------------
      if (pathname === '/api/images/upload' && request.method === 'POST') {
        if (!await verifyAdminSession(env.DB, request)) {
          return jsonResponse({ error: 'Unauthorized' }, 401);
        }

        const cloudName = env.CLOUDINARY_CLOUD_NAME;
        const apiKey = env.CLOUDINARY_API_KEY;
        const apiSecret = env.CLOUDINARY_API_SECRET;
        if (!cloudName || !apiKey || !apiSecret) {
          return jsonResponse({ error: 'Cloudinary is not configured' }, 500);
        }

        const formData = await request.formData();
        const file = formData.get('file');
        if (!file) {
          return jsonResponse({ error: 'No file provided' }, 400);
        }

        const timestamp = Math.floor(Date.now() / 1000);
        const uploadParams = { folder: 'loretto', timestamp: String(timestamp) };
        const signatureText = Object.entries(uploadParams)
          .sort(([left], [right]) => left.localeCompare(right))
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
        const signatureBuffer = await crypto.subtle.digest(
          'SHA-1',
          new TextEncoder().encode(`${signatureText}${apiSecret}`)
        );
        const signature = bytesToHex(signatureBuffer);

        const cloudinaryForm = new FormData();
        cloudinaryForm.append('file', file);
        cloudinaryForm.append('api_key', apiKey);
        cloudinaryForm.append('timestamp', String(timestamp));
        cloudinaryForm.append('folder', 'loretto');
        cloudinaryForm.append('signature', signature);

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`,
          { method: 'POST', body: cloudinaryForm }
        );
        const cloudinaryData = await cloudinaryResponse.json();
        if (!cloudinaryResponse.ok) {
          return jsonResponse({ error: cloudinaryData.error?.message || 'Cloudinary upload failed' }, 502);
        }

        return jsonResponse({
          success: true,
          key: cloudinaryData.public_id,
          url: cloudinaryData.secure_url,
        });
      }

      // ----------------------------------------------------
      // D1 DATABASE ROUTES
      // ----------------------------------------------------
      // GET /api/news
      if (pathname === '/api/news' && request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM news ORDER BY created_at DESC').all();
        return jsonResponse({ news: results });
      }

      // POST /api/news
      if (pathname === '/api/news' && request.method === 'POST') {
        const body = await request.json();
        const id = body.id || `news-${Date.now()}`;
        await env.DB.prepare(
          'INSERT INTO news (id, title, date, category, summary, content, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).bind(id, body.title, body.date, body.category || 'General', body.summary, body.content || body.summary, body.image_url || null).run();
        return jsonResponse({ success: true, id }, 201);
      }

      // GET /api/events
      if (pathname === '/api/events' && request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM events ORDER BY date ASC').all();
        return jsonResponse({ events: results });
      }

      // POST /api/events
      if (pathname === '/api/events' && request.method === 'POST') {
        const body = await request.json();
        const id = body.id || `event-${Date.now()}`;
        await env.DB.prepare(
          'INSERT INTO events (id, title, date, time, location, category, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(id, body.title, body.date, body.time || '', body.location || '', body.category || 'General', body.description || '', body.image_url || null).run();
        return jsonResponse({ success: true, id }, 201);
      }

      // GET /api/obituaries
      if (pathname === '/api/obituaries' && request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM obituaries ORDER BY passed_away_date DESC').all();
        return jsonResponse({ obituaries: results });
      }

      // POST /api/obituaries
      if (pathname === '/api/obituaries' && request.method === 'POST') {
        const body = await request.json();
        const id = body.id || `obit-${Date.now()}`;
        await env.DB.prepare(
          'INSERT INTO obituaries (id, name, age, ward, passed_away_date, funeral_date, funeral_time, photo_url, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(id, body.name, body.age || 0, body.ward || '', body.passed_away_date || '', body.funeral_date || '', body.funeral_time || '', body.photo_url || null, body.details || '').run();
        return jsonResponse({ success: true, id }, 201);
      }

      // POST /api/intentions
      if (pathname === '/api/intentions' && request.method === 'POST') {
        const body = await request.json();
        const id = `intention-${Date.now()}`;
        await env.DB.prepare(
          'INSERT INTO prayer_intentions (id, full_name, phone, email, intention_type, message) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(id, body.full_name, body.phone || '', body.email || '', body.intention_type || 'general', body.message).run();
        return jsonResponse({ success: true, message: 'Prayer intention submitted successfully', id }, 201);
      }

      // Default 404 Route
      return jsonResponse({ error: 'Endpoint not found', pathname }, 404);
    } catch (err) {
      return jsonResponse({ error: err.message, stack: err.stack }, 500);
    }
  },
};
