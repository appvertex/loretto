-- Initial D1 Database Schema for Loretto Church

-- News Table
CREATE TABLE IF NOT EXISTS news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Obituaries Table
CREATE TABLE IF NOT EXISTS obituaries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  ward TEXT NOT NULL,
  passed_away_date TEXT NOT NULL,
  funeral_date TEXT NOT NULL,
  funeral_time TEXT NOT NULL,
  photo_url TEXT,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prayer Intentions & Contact Messages Table
CREATE TABLE IF NOT EXISTS prayer_intentions (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  intention_type TEXT DEFAULT 'general',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Authentication Settings
CREATE TABLE IF NOT EXISTS admin_credentials (
  id TEXT PRIMARY KEY,
  passcode_hash TEXT NOT NULL,
  passcode_salt TEXT NOT NULL,
  hash_algorithm TEXT NOT NULL DEFAULT 'PBKDF2-SHA256',
  iterations INTEGER NOT NULL DEFAULT 100000,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Admin Passcode Seed
INSERT OR IGNORE INTO admin_credentials (id, passcode_hash, passcode_salt) VALUES
('primary', '5b8bc678f3df12733cadb8ffcd8b6de107f3589e610de8ce3962caee2d9e91e7', '66612fc51c16eaa27bfee036eb0e63aa');

-- Shared Website Content Edited From Admin Panel
CREATE TABLE IF NOT EXISTS site_content (
  content_key TEXT PRIMARY KEY,
  content_json TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Login Sessions For Saving Content
CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash TEXT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT NOT NULL
);

-- Initial Seed Data: News
INSERT OR IGNORE INTO news (id, title, date, category, summary, content, image_url) VALUES 
('1', 'Parish Annual Day Celebrations 2026', 'December 10, 2026', 'Feast', 'Join us for the annual feast of Our Lady of Loretto with solemn high mass and cultural programs.', 'The annual parish feast will commence with 9 days of novena starting December 1st. High Mass on Dec 10.', '/lorettochurch/images/news-1.jpg'),
('2', 'Catechism Registration Open', 'September 15, 2026', 'Education', 'Registrations for Sunday Catechism classes for the academic year 2026-27 are now open.', 'Parents are requested to register their children with their respective Ward Leaders or at the Parish Office.', '/lorettochurch/images/news-2.jpg');

-- Initial Seed Data: Events
INSERT OR IGNORE INTO events (id, title, date, time, location, category, description) VALUES
('1', 'Annual Parish Feast High Mass', '2026-12-10', '10:00 AM', 'Main Church Sanctuary', 'Feast', 'Solemn Concelebrated High Mass celebrating Our Lady of Loretto.'),
('2', 'Monti Fest Procession & Blessing', '2026-09-08T07:30:00', '07:30 AM', 'Church Grotto & Sanctuary', 'Feast', 'Blessing of new harvest (Novem) and flower offering by children.');

-- Initial Seed Data: Obituaries
INSERT OR IGNORE INTO obituaries (id, name, age, ward, passed_away_date, funeral_date, funeral_time, details) VALUES
('1', 'Benedict D''Souza', 78, 'St. Joseph Ward', '2026-08-28', '2026-08-30', '04:00 PM', 'Beloved husband of Mary D''Souza. Funeral mass at Our Lady of Loretto Church followed by burial.');
