# Church Website Redesign - Complete Implementation Guide

## Phase 1: Setup & Configuration

### 1.1 Install Dependencies
```bash
npm install
# Dependencies added to package.json:
# - Tailwind CSS
# - Framer Motion
# - Lucide React Icons
# - Supabase JS
# - Yet Another React Lightbox
```

### 1.2 Environment Variables
Create a `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:3001
```

### 1.3 Database Setup

#### Tables Created:
1. **live_services** - Store YouTube/Facebook/Zoom links
2. **prayers** - Prayer sessions with Zoom/Google Meet links
3. **gallery_images** - Church photos and images
4. **testimonials** - Member testimonials
5. **admins** - Admin user management (expanded)

#### Prisma Migration
```bash
npx prisma migrate dev --name add_new_tables
npx prisma generate
```

## Phase 2: Component Structure

### Core Reusable Components
- `HeroSection` - Full-width hero with image & overlay
- `FeatureSection` - 3-column feature grid
- `LiveServiceCard` - Live service display card
- `PrayerSession` - Interactive prayer UI
- `GalleryGrid` - Image gallery with lightbox
- `AdminLayout` - Admin dashboard layout

### Admin Dashboard Components
- `AdminLogin` - Authentication page
- `AdminLiveServices` - Manage live services
- `AdminGallery` - Image upload & management
- Similar components for prayers, events, sermons

## Phase 3: Page Structure

### Public Pages
```
/                    - Home (redesigned)
/about              - About Us
/ministries         - Ministries/Services
/prayer             - Prayer Section
/gallery            - Full Gallery
/sermons           - Sermon Archive
/contact           - Contact Form
/live              - Watch Live
```

### Admin Pages
```
/admin/login       - Admin Authentication
/admin/dashboard   - Dashboard Home
/admin/live-services
/admin/prayers
/admin/gallery
/admin/events
/admin/sermons
/admin/leaders
/admin/settings
```

## Phase 4: Design System

### Colors
- Primary: #2165c7 (Church Blue)
- Accent: #f97066 (Action Red)
- Neutral: White, Gray (50-900)

### Typography
- Headings: Poppins (600-700 weight)
- Body: Inter (400-500 weight)

### Spacing Scale
- xs: 0.5rem (8px)
- sm: 1rem (16px)
- md: 1.5rem (24px)
- lg: 2rem (32px)
- xl: 3rem (48px)

## Phase 5: Key Features

### 1. Live Services
- Admin posts YouTube/Facebook/Google Meet/Zoom links
- Countdown timer to service start
- "Watch Live" button on homepage
- Embedded video player for YouTube

### 2. Prayer System
- Join prayer sessions with audio stream
- Zoom/Google Meet link integration
- Background worship audio
- Live participant count
- Session timer

### 3. Gallery System
- Admin can upload images by category
- Lazy loading for performance
- Lightbox viewer (full-screen preview)
- Categories: Events, Ministries, Sermons, Prayers

### 4. Admin Dashboard
- Supabase Auth integration
- CRUD operations for all content
- Image upload to Supabase Storage
- Real-time updates

## Phase 6: Implementation Steps

### Step 1: Update Package.json
✓ Already done - includes Tailwind, Framer Motion, Lucide, Supabase

### Step 2: Configure Tailwind CSS
✓ Already done - tailwind.config.js and postcss.config.js created

### Step 3: Update Global Styles
✓ Already done - updated index.css with Tailwind directives

### Step 4: Create Core Components
Files created:
- src/components/HeroSection.tsx
- src/components/FeatureSection.tsx
- src/components/LiveServiceCard.tsx
- src/components/PrayerSession.tsx
- src/components/GalleryGrid.tsx
- src/lib/supabase.ts

### Step 5: Create Admin Components
Files created:
- src/components/admin/AdminLayout.tsx
- src/components/admin/AdminLogin.tsx
- src/components/admin/AdminLiveServices.tsx
- src/components/admin/AdminGallery.tsx

### Step 6: Update Prisma Schema
✓ Already done - added new tables

### Step 7: Create Page Components
Need to create:
- Updated Home page with hero + live services section
- About page
- Ministries page
- Prayer page
- Gallery page
- Admin pages

### Step 8: Create API Routes
Need backend endpoints:
- POST /api/admin/auth/login
- GET /api/public/live-services
- POST/PUT/DELETE /api/admin/live-services/:id
- GET/POST /api/admin/gallery
- Similar for prayers, events, sermons

### Step 9: Update Routing
Add new routes to your Router (React Router v6):

```typescript
import { HomePage } from './pages/home';
import { AboutPage } from './pages/about';
import { AdminLoginPage } from './pages/admin/login';
// ... more imports

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  // ... add all routes
];
```

## Phase 7: Supabase Setup

### Create Buckets
1. `church-gallery` - For image uploads
2. `thumbnails` - For generated thumbnails

### Row Level Security (RLS) Policies
```sql
-- Enable RLS on all tables
ALTER TABLE live_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read for live services
CREATE POLICY "Public read live services" ON live_services
FOR SELECT USING (true);

-- Admin only for write operations
CREATE POLICY "Admin manage live services" ON live_services
FOR ALL USING (auth.role() = 'authenticated');
```

## Phase 8: SEO & Performance

### SEO Improvements
- Meta tags (title, description, OG)
- Proper heading hierarchy (h1 > h2 > h3)
- Sitemap generation
- Schema markup (ld+json for Organization)

### Performance
- Image lazy loading (included in components)
- Code splitting for admin pages
- Caching strategy for gallery images
- Optimized bundle size (Tailwind purges unused CSS)

## Phase 9: Deployment

### Vercel Setup
```bash
# Add vercel.json (already in repo)
npm run build
vercel deploy
```

### Environment Variables (Vercel)
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_API_URL

## Next Steps

1. ✓ Install dependencies: `npm install`
2. ✓ Set up Tailwind CSS & PostCSS
3. ✓ Create core components
4. ✓ Create admin components
5. □ Create page components (next)
6. □ Create API routes (next)
7. □ Set up Supabase tables & RLS
8. □ Test all functionality
9. □ Deploy to Vercel

## API Endpoints to Implement

### Public API
```
GET  /api/public/live-services        # Get active live services
GET  /api/public/prayers              # Get active prayer sessions
GET  /api/public/gallery              # Get gallery images
GET  /api/public/sermons              # Get sermon list
GET  /api/public/events               # Get events
```

### Admin API
```
POST   /api/admin/auth/login
POST   /api/admin/live-services       # Create
GET    /api/admin/live-services/:id   # Read
PUT    /api/admin/live-services/:id   # Update
DELETE /api/admin/live-services/:id   # Delete

# Similar endpoints for:
# - /api/admin/prayers
# - /api/admin/gallery
# - /api/admin/events
# - /api/admin/sermons
```

## File Structure

```
src/
  ├── components/
  │   ├── HeroSection.tsx
  │   ├── FeatureSection.tsx
  │   ├── LiveServiceCard.tsx
  │   ├── PrayerSession.tsx
  │   ├── GalleryGrid.tsx
  │   ├── admin/
  │   │   ├── AdminLayout.tsx
  │   │   ├── AdminLogin.tsx
  │   │   ├── AdminLiveServices.tsx
  │   │   ├── AdminGallery.tsx
  │   │   └── ... (more admin components)
  ├── pages/
  │   ├── home.tsx (new)
  │   ├── about.tsx (new)
  │   ├── ministry.tsx (new)
  │   ├── prayer.tsx (new)
  │   ├── gallery.tsx (new)
  │   ├── sermons.tsx (new)
  │   ├── admin/
  │   │   ├── login.tsx (new)
  │   │   ├── dashboard.tsx (new)
  │   │   └── ... (more admin pages)
  ├── lib/
  │   ├── supabase.ts ✓
  │   ├── api.ts (update)
  │   └── schemas.ts (update)
  ├── App.tsx (update)
  └── index.css ✓

prisma/
  └── schema.prisma ✓

server/
  └── index.ts (add new routes)

tailwind.config.js ✓
postcss.config.js ✓
package.json ✓
