# Kitengela Church Website - Modern Redesign

A production-ready, full-featured church website built with React, Tailwind CSS, and Supabase.

## Features

### 🎨 Modern UI/UX
- Clean, professional design with Tailwind CSS
- Smooth animations with Framer Motion
- Fully responsive (mobile-first)
- Dark overlay on hero sections for readability
- Inter and Poppins fonts

### 📱 Public Pages
- **Home** - Hero section with latest live services
- **About** - Church story and core values
- **Ministries** - Programs and service schedule
- **Prayer** - Prayer sessions with Zoom/Google Meet integration
- **Gallery** - Church photos with lightbox viewer
- **Sermons** - Sermon archive
- **Contact** - Contact form and location

### 🔴 Live Services
- Admin posts YouTube/Facebook/Zoom/Google Meet links
- Countdown timer to service start
- "Watch Live" button on homepage
- Embedded video player support
- Platform-specific formatting

### 🙏 Prayer System
- Interactive prayer session interface
- Join via Zoom or Google Meet
- Background worship audio playback
- Live participant counter
- Session timer
- Prayer request submission form

### 🖼️ Gallery System
- Category-based image filtering
- Lazy loading for performance
- Lightbox full-screen viewer
- Admin can upload and organize images
- Support for event, ministry, sermon, and prayer galleries

### 👨‍💼 Admin Dashboard
- Secure authentication with email/password
- Dashboard home with statistics
- CRUD operations for all content:
  - Live services management
  - Prayer sessions
  - Gallery image uploads
  - Event management
  - Sermon library
  - Leader profiles
  - Site settings
- Image upload to Supabase Storage
- Real-time content updates

### 🔐 Security
- Admin authentication via JWT
- Row-Level Security (RLS) on Supabase
- Password hashing with bcrypt
- Role-based access control

### ⚡ Performance
- Image lazy loading
- Code splitting for admin pages
- Optimized bundle with Tailwind CSS purging
- Efficient database queries with Prisma

### 📊 SEO & Accessibility
- Meta tags for social sharing
- Proper heading hierarchy
- ARIA labels on interactive elements
- Schema markup ready
- Mobile-friendly design

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Vite** - Build tool & dev server
- **Lucide React** - Icons

### Backend
- **Express.js** - API server
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Infrastructure
- **Supabase** - Database & Storage
- **Vercel** - Deployment
- **Docker** - Containerization (optional)

## Project Structure

```
src/
  ├── components/
  │   ├── HeroSection.tsx
  │   ├── FeatureSection.tsx
  │   ├── LiveServiceCard.tsx
  │   ├── PrayerSession.tsx
  │   ├── GalleryGrid.tsx
  │   └── admin/
  │       ├── AdminLayout.tsx
  │       ├── AdminLogin.tsx
  │       ├── AdminLiveServices.tsx
  │       └── AdminGallery.tsx
  ├── pages/
  │   ├── HomePage.tsx
  │   ├── AboutPage.tsx
  │   ├── MinistriesPage.tsx
  │   ├── PrayerPage.tsx
  │   ├── GalleryPage.tsx
  │   ├── ContactPage.tsx
  │   └── admin/
  │       ├── AdminLoginPage.tsx
  │       └── AdminDashboardPage.tsx
  ├── lib/
  │   ├── api.ts
  │   ├── supabase.ts
  │   └── schemas.ts
  ├── App.tsx
  ├── index.css
  └── main.tsx

server/
  ├── db.ts
  └── index.ts

prisma/
  └── schema.prisma

public/
  └── assets/

tailwind.config.js
postcss.config.js
vite.config.ts
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- PostgreSQL database (or Supabase)
- Supabase account (for storage & auth)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd kitengela-int
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:3001

DATABASE_URL=postgresql://user:password@localhost:5432/church_db
JWT_SECRET=your-super-secret-key
```

4. **Set up the database**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Set up Supabase**
- Create tables (see `SUPABASE_SETUP.md`)
- Enable Row-Level Security
- Create storage buckets
- Generate API keys

6. **Start development servers**
```bash
# In one terminal - Start Express backend
npm run dev:server

# In another terminal - Start Vite frontend
npm run dev:client

# Or run both together
npm run dev
```

Visit `http://localhost:5173` (frontend) and `http://localhost:3001` (API)

## Key Pages & Routes

### Public Routes
- `/` - Home
- `/about` - About Us
- `/ministries` - Ministries & Schedule
- `/prayer` - Prayer Sessions
- `/gallery` - Gallery
- `/sermons` - Sermons
- `/contact` - Contact

### Admin Routes
- `/admin/login` - Login
- `/admin/dashboard` - Dashboard
- `/admin/live-services` - Manage live services
- `/admin/prayers` - Manage prayer sessions
- `/admin/gallery` - Upload images
- `/admin/events` - Manage events
- `/admin/sermons` - Upload sermons
- `/admin/leaders` - Manage leaders
- `/admin/settings` - Site settings

## API Endpoints

### Public API
```
GET  /api/public/live-services
GET  /api/public/prayers
GET  /api/public/gallery?category=all|events|ministries|sermons|prayers
GET  /api/public/sermons
GET  /api/public/events
POST /api/public/contact
```

### Admin API
```
POST /api/admin/auth/login

# Live Services
GET    /api/admin/live-services
POST   /api/admin/live-services
GET    /api/admin/live-services/:id
PUT    /api/admin/live-services/:id
DELETE /api/admin/live-services/:id

# Prayer Sessions
GET    /api/admin/prayers
POST   /api/admin/prayers
PUT    /api/admin/prayers/:id
DELETE /api/admin/prayers/:id

# Gallery
GET    /api/admin/gallery
POST   /api/admin/gallery
DELETE /api/admin/gallery/:id

# Similar endpoints for events, sermons, leaders
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Go to vercel.com
- Import project from GitHub
- Add environment variables
- Deploy

3. **Deploy backend**
```bash
# Option 1: Deploy to Heroku
npm run build
heroku create church-api
git push heroku main

# Option 2: Deploy to Railway, Render, etc.
```

4. **Alternative: Docker**
```bash
docker build -t church-app .
docker push your-registry/church-app
```

## Configuration

### Tailwind CSS
Customized colors and utilities in `tailwind.config.js`:
- Primary: `#2165c7` (Church Blue)
- Accent: `#f97066` (Action Red)
- Custom animations and typography

### Email Configuration
To enable email notifications:
1. Set up Resend or SendGrid
2. Add API key to `.env`
3. Implement in contact form & notifications

### Image Optimization
- Use Supabase for image storage
- Implement image compression
- Generate thumbnails for gallery

## Database Schema

All tables and relationships are defined in `prisma/schema.prisma`:
- `site_settings` - Church information
- `live_services` - YouTube/Zoom/Facebook links
- `prayers` - Prayer sessions with meeting links
- `gallery_images` - Church photos
- `testimonials` - Member testimonials
- `admins` - User management
- `events` - Church events
- `sermons` - Sermon library
- `leaders` - Church leaders
- `programs` - Weekly programs

See `SUPABASE_SETUP.md` for SQL setup and RLS policies.

## Security Best Practices

✅ Implemented:
- JWT authentication
- Password hashing with bcrypt
- Row-Level Security on Supabase
- HTTPS in production
- Secure headers

📋 TODO:
- Two-factor authentication
- Rate limiting
- CORS configuration
- SQL injection prevention (via Prisma)
- XSS protection

## Performance Optimization

- Image lazy loading
- Code splitting
- CSS purging with Tailwind
- Caching strategy
- CDN for static assets (Vercel)
- Database query optimization

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License

Private project for Kitengela International Church

## Support

For issues or questions, contact the development team.

---

**Built with ❤️ for Kitengela International Church**
