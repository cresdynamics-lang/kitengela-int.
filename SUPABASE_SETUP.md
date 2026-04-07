# Supabase Setup Guide

## Database Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- ===== SITE SETTINGS =====
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  church_name TEXT NOT NULL,
  tagline TEXT,
  location_text TEXT,
  map_link TEXT,
  logo_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  twitter_url TEXT,
  phone_numbers TEXT[] DEFAULT '{}',
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===== LIVE SERVICES =====
CREATE TABLE IF NOT EXISTS live_services (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  is_live BOOLEAN DEFAULT FALSE,
  platform TEXT, -- youtube, facebook, googlemeet, zoom
  youtube_url TEXT,
  facebook_url TEXT,
  google_meet_url TEXT,
  zoom_url TEXT,
  scheduled_at TIMESTAMP,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  thumbnail_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by TEXT
);

-- ===== PRAYERS =====
CREATE TABLE IF NOT EXISTS prayers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'scheduled', -- scheduled, active, completed
  is_live BOOLEAN DEFAULT FALSE,
  join_url TEXT,
  audio_url TEXT,
  platform TEXT, -- zoom, googlemeet, custom
  scheduled_at TIMESTAMP,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  participant_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by TEXT
);

-- ===== GALLERY IMAGES =====
CREATE TABLE IF NOT EXISTS gallery_images (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT DEFAULT 'general', -- general, events, ministries, sermons, prayers
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  uploaded_by TEXT
);

-- ===== TESTIMONIALS =====
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  author_name TEXT NOT NULL,
  title TEXT,
  message TEXT NOT NULL,
  image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===== ADMINS =====
CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin', -- admin, moderator, editor
  is_super_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===== INDEXES =====
CREATE INDEX idx_live_services_status ON live_services(is_live, scheduled_at);
CREATE INDEX idx_prayers_status ON prayers(status, scheduled_at);
CREATE INDEX idx_gallery_category ON gallery_images(category, is_published, order_index);
CREATE INDEX idx_testimonials_published ON testimonials(is_published, order_index);
```

## Row Level Security (RLS) Policies

Enable RLS on all tables:

```sql
-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- ===== SITE SETTINGS POLICIES =====
-- Public can read
CREATE POLICY "Public read site settings" ON site_settings
  FOR SELECT USING (true);

-- Only admins can update
CREATE POLICY "Admin update site settings" ON site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ===== LIVE SERVICES POLICIES =====
-- Public can read
CREATE POLICY "Public read live services" ON live_services
  FOR SELECT USING (true);

-- Authenticated users (admins) can insert/update/delete
CREATE POLICY "Admin manage live services" ON live_services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update live services" ON live_services
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete live services" ON live_services
  FOR DELETE USING (auth.role() = 'authenticated');

-- ===== PRAYERS POLICIES =====
-- Public can read
CREATE POLICY "Public read prayers" ON prayers
  FOR SELECT USING (true);

-- Authenticated users can manage
CREATE POLICY "Admin manage prayers" ON prayers
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update prayers" ON prayers
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete prayers" ON prayers
  FOR DELETE USING (auth.role() = 'authenticated');

-- ===== GALLERY POLICIES =====
-- Public can read published images
CREATE POLICY "Public read gallery" ON gallery_images
  FOR SELECT USING (is_published = true);

-- Admins can see all (including unpublished)
CREATE POLICY "Admin read all gallery" ON gallery_images
  FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated users can manage
CREATE POLICY "Admin manage gallery" ON gallery_images
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update gallery" ON gallery_images
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete gallery" ON gallery_images
  FOR DELETE USING (auth.role() = 'authenticated');

-- ===== TESTIMONIALS POLICIES =====
-- Public can read published
CREATE POLICY "Public read testimonials" ON testimonials
  FOR SELECT USING (is_published = true);

-- Admins can see all
CREATE POLICY "Admin read all testimonials" ON testimonials
  FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated users can manage
CREATE POLICY "Admin manage testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update testimonials" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete testimonials" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

-- ===== ADMINS POLICIES =====
-- Only admins can read admin table
CREATE POLICY "Admin read admins" ON admins
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only super admins can manage admin users
CREATE POLICY "Super admin manage admins" ON admins
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Super admin update admins" ON admins
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Super admin delete admins" ON admins
  FOR DELETE USING (auth.role() = 'authenticated');
```

## Storage Buckets

Create in Supabase Storage:

### 1. Church Gallery Bucket
- Name: `church-gallery`
- Public: Yes
- File size limit: 50MB

Policies:
```sql
-- Public read gallery images
CREATE POLICY "Public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'church-gallery');

-- Authenticated can upload
CREATE POLICY "Auth upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'church-gallery' AND
    auth.role() = 'authenticated'
  );
```

### 2. Thumbnails Bucket
- Name: `thumbnails`
- Public: Yes
- File size limit: 5MB

## Environment Variables

Add to `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:3001
```

## Initial Data Setup

Insert default site settings:

```sql
INSERT INTO site_settings (
  church_name,
  tagline,
  location_text,
  email,
  phone_numbers,
  facebook_url,
  instagram_url,
  youtube_url
) VALUES (
  'Kitengela International Church',
  'A House of Solutions — Manifesting Christ in Our Community',
  'Along Baraka Road / Treewa Road, Next to Balozi Junior Academy, Kitengela',
  'info@kitengela.church',
  ARRAY['+254 722 566 399', '+254 720 276 162', '+254 720 977 189'],
  'https://facebook.com/...',
  'https://instagram.com/...',
  'https://youtube.com/...'
);
```

## Create Admin User

For now, create an admin manually:

```sql
-- Hash password using bcrypt (e.g., from bcrypt.net)
INSERT INTO admins (
  username,
  email,
  password_hash,
  full_name,
  is_super_admin
) VALUES (
  'admin',
  'admin@church.com',
  '$2b$12$...',  -- bcrypt hash of password
  'Church Admin',
  TRUE
);
```

## Notes

- RLS policies use `auth.role() = 'authenticated'` which means any logged-in user via Supabase Auth
- For public API routes, you don't need authentication
- For admin routes, implement your own authentication middleware
- Consider using Supabase Admin SDK on the backend for management operations
