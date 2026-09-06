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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    try {
      // ----------------------------------------------------
      // R2 IMAGE SERVING ROUTE: GET /images/:key
      // ----------------------------------------------------
      if (pathname.startsWith('/images/') && request.method === 'GET') {
        const key = pathname.replace('/images/', '');
        if (!env.IMAGES_BUCKET) {
          return jsonResponse({ error: 'R2 Bucket not configured' }, 500);
        }
        const object = await env.IMAGES_BUCKET.get(key);
        if (!object) {
          return new Response('Image not found', { status: 404 });
        }
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Access-Control-Allow-Origin', '*');
        return new Response(object.body, { headers });
      }

      // ----------------------------------------------------
      // R2 IMAGE UPLOAD ROUTE: POST /api/images/upload
      // ----------------------------------------------------
      if (pathname === '/api/images/upload' && request.method === 'POST') {
        if (!env.IMAGES_BUCKET) {
          return jsonResponse({ error: 'R2 Bucket not configured' }, 500);
        }
        const formData = await request.formData();
        const file = formData.get('file');
        if (!file) {
          return jsonResponse({ error: 'No file provided' }, 400);
        }
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`;
        await env.IMAGES_BUCKET.put(filename, file.stream(), {
          httpMetadata: { contentType: file.type || 'image/jpeg' },
        });

        const imagePublicUrl = `${url.origin}/images/${filename}`;
        return jsonResponse({ success: true, key: filename, url: imagePublicUrl });
      }

      // ----------------------------------------------------
      // D1 DATABASE ROUTES
      // ----------------------------------------------------
      if (!env.DB) {
        return jsonResponse({ error: 'D1 Database binding (DB) not configured' }, 500);
      }

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
