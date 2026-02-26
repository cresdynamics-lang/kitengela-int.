# Quick Start Guide

## Installation & Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd dashboard
npm install
```

### 3. Configure Environment Variables

Copy the `.env.example` file to `.env` in the root directory and update with your configuration:

```bash
cp .env.example .env
```

Edit `.env` with your actual values.

### 4. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend API will be available at `http://localhost:3001`

### 5. Start the Frontend Server

In a new terminal:

```bash
cd dashboard
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Access Points

- **Landing Page**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **API Health Check**: http://localhost:3001/health
- **API Landing Info**: http://localhost:3001/api/landing/info

## Project Structure

```
kitengela/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── config/       # Constants (church info, colors, services)
│   │   ├── controllers/ # Request handlers
│   │   ├── routes/      # API routes
│   │   └── server.js    # Main server file
│   └── package.json
│
├── dashboard/            # Next.js frontend
│   ├── src/
│   │   ├── app/         # Next.js pages (App Router)
│   │   └── components/  # React components
│   ├── public/          # Static assets (images, logo)
│   └── package.json
│
└── public/              # Shared public assets
    ├── logo/
    └── *.jpeg          # Service images for carousel
```

## Features Implemented

✅ **Landing Page Components**:
- Header with logo and navigation
- Homepage carousel with service images
- Services section with all church services
- Core values section
- Contact section with phone numbers and location
- Footer with church information

✅ **Dashboard**:
- Admin dashboard page
- Quick action cards
- Statistics display

✅ **Backend API**:
- Church information endpoint
- Services endpoint
- Core values endpoint
- Carousel images endpoint
- Contact information endpoint

## Brand Colors

The website uses the following brand colors extracted from church images:

- **Primary Dark Blue**: #1a1a2e
- **Navy Blue**: #16213e
- **Purple**: #4C004C
- **Accent Yellow/Gold**: #FFD700
- **Accent Red**: #DC143C
- **Secondary Green**: #228B22

## Church Information

All church information has been extracted from the provided images:

- **Name**: VOSH CHURCH INT'L KITENGELA
- **Location**: Kitengela, Along Baraka Road / Treewa Road, Next to Balozi Junior Academy
- **Phone Numbers**: 9 contact numbers included
- **Services**: 7 services with times and details
- **Core Values**: Prayer, Stewardship, Holiness, Advocacy, Unity
- **Logo**: Located at `/public/logo/chuurchlogo.jpeg`

## Next Steps

1. Customize the `.env` file with your actual credentials
2. Add database integration if needed
3. Implement authentication for the dashboard
4. Add more dashboard features (member management, events, etc.)
5. Deploy to production

## Troubleshooting

### Port Already in Use
If port 3000 or 3001 is already in use, you can change it:

**Backend**: Set `PORT` in `.env` or modify `backend/src/server.js`
**Frontend**: Run `npm run dev -- -p 3002` or modify `dashboard/package.json`

### Images Not Loading
Make sure the `public` folder is properly copied to `dashboard/public/` and contains all the images.

### API Connection Issues
Ensure the backend is running before starting the frontend. The frontend will use fallback data if the API is unavailable.
