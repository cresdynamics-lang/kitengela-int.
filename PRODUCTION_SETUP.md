# Production-Ready VOSH Church Kitengela - Setup Guide

## 🏗️ Architecture Overview

This is a **monorepo** structure with:
- `/apps/web` - Next.js frontend (maintaining existing design)
- `/apps/api` - Fastify API backend (TypeScript)
- `/packages/shared` - Shared types and Zod schemas

## 📋 Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 17+ (or use Docker)
- Redis (or use Docker)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

### 4. Development

```bash
# Start all services (web + api)
npm run dev

# Or start individually:
cd apps/api && npm run dev
cd apps/web && npm run dev
```

### 5. Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📁 Project Structure

```
vosh-kitengela/
├── apps/
│   ├── api/              # Fastify API
│   │   ├── src/
│   │   │   ├── routes/   # API routes
│   │   │   ├── plugins/ # Fastify plugins
│   │   │   └── scripts/ # Seed scripts
│   │   └── prisma/      # Prisma schema
│   └── web/             # Next.js frontend
│       ├── src/
│       │   ├── app/     # App router pages
│       │   └── components/
├── packages/
│   └── shared/          # Shared types & schemas
└── docker-compose.yml
```

## 🔐 Admin Access

- **URL**: http://localhost:3000/admin/login
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`

**⚠️ Change password immediately after first login!**

## 🎨 Design System

The website maintains the existing design:
- **Colors**: Dark Blue (#1a1a2e), Gold (#FFD700), Red (#DC143C)
- **Fonts**: System fonts (Segoe UI, Roboto, etc.)
- **Style**: Modern, mobile-first, responsive

## 📡 API Endpoints

### Public (Cached)
- `GET /api/public/site` - Site settings
- `GET /api/public/programs/weekly` - Weekly programs
- `GET /api/public/programs?day=Sunday` - Programs by day
- `GET /api/public/events/upcoming` - Upcoming events
- `GET /api/public/events?cursor=&limit=` - Paginated events
- `GET /api/public/live` - Live stream status
- `GET /api/public/sermons/source` - Sermon sources
- `GET /api/public/leaders` - Leadership team

### Admin (Protected)
- `POST /api/admin/login` - Admin login
- `GET/PUT /api/admin/site` - Site settings
- `CRUD /api/admin/programs` - Programs management
- `CRUD /api/admin/events` - Events management
- `GET/PUT /api/admin/live` - Live stream management
- `GET/PUT /api/admin/sermons/source` - Sermon source
- `CRUD /api/admin/leaders` - Leaders management
- `CRUD /api/admin/admins` - Admin users (super admin only)

## 🗄️ Database Models

- **SiteSettings** - Church info, socials, contact
- **Program** - Weekly programs/services
- **Event** - Church events
- **LiveStream** - Live streaming status
- **SermonSource** - YouTube playlist & latest sermon
- **Leader** - Leadership team
- **Admin** - Admin users

## 🔒 Security Features

- ✅ Argon2 password hashing
- ✅ JWT authentication (to be implemented)
- ✅ Rate limiting on public endpoints
- ✅ Helmet security headers
- ✅ CORS configuration
- ✅ Zod input validation
- ✅ Redis caching for performance

## 📦 Deployment

### Docker Compose

```bash
docker-compose up -d
```

Services:
- **PostgreSQL**: Port 5432
- **Redis**: Port 6379
- **API**: Port 3001
- **Web**: Port 3000

### Environment Variables

See `.env.example` for all required variables.

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
cd apps/api && npx tsc --noEmit
cd apps/web && npx tsc --noEmit
```

## 📝 Next Steps

1. ✅ Monorepo structure created
2. ✅ Prisma schema defined
3. ✅ Fastify API setup
4. ✅ Shared package created
5. ⏳ Next.js frontend (maintaining design)
6. ⏳ Admin CMS dashboard
7. ⏳ Cloudinary integration
8. ⏳ JWT authentication implementation

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Check connection
psql -U postgres -d voshkitengela -h localhost
```

### Redis Connection Issues
```bash
# Check Redis is running
docker-compose ps redis

# Test connection
redis-cli ping
```

### Build Issues
```bash
# Clean and rebuild
rm -rf node_modules apps/*/node_modules packages/*/node_modules
npm install
npm run build
```

## 📚 Documentation

- [Admin Guide](./ADMIN_GUIDE.md)
- [API Documentation](./API_DOCS.md) (to be created)
- [Deployment Guide](./DEPLOYMENT.md) (to be created)
