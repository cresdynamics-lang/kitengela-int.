# VOSH Church International Kitengela - Website

A modern website for VOSH Church International Kitengela, featuring a Node.js/Express backend API and a Next.js frontend dashboard.

## Project Structure

```
kitengela/
├── backend/          # Node.js/Express API for landing pages
│   ├── src/
│   │   ├── config/   # Configuration and constants
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── dashboard/        # Next.js dashboard application
│   ├── src/
│   │   ├── app/      # Next.js app router pages
│   │   └── components/
│   └── package.json
└── public/           # Static assets (images, logo)
```

## Features

### Landing Page
- **Homepage Carousel**: Dynamic carousel showcasing church services and events
- **Services Section**: Display of all church services with times and details
- **Core Values**: Showcase of church core values (Prayer, Stewardship, Holiness, Advocacy, Unity)
- **Contact Section**: Phone numbers, email, location, and social media links
- **Responsive Design**: Mobile-friendly layout

### Dashboard
- Admin dashboard for managing church content
- Service management
- Event management
- Member management
- Sermon management
- Prayer request management

## Church Information

### Location
- **City**: Kitengela, Kenya
- **Address**: Along Baraka Road / Treewa Road, Next to Balozi Junior Academy

### Contact
- **Phone Numbers**:
  - +254 722 566 399
  - +254 720 276 162
  - +254 720 977 189
  - +254 775 036 515
  - +254 703 182 203
  - +254 733 566 398
  - +254 722 620 160
  - +254 111 687 277
  - +254 722 625 084
- **Email**: info@voshkitengela.org
- **Website**: www.voshchurchinternational.org

### Services
1. **Watch Hour**: Daily, 6:00 AM - 8:00 AM
2. **Bible Study**: Sunday, 8:00 AM - 9:00 AM
3. **SB1 Service**: Sunday, 9:00 AM - 10:30 AM
4. **Word Manifest**: Sunday, 10:30 AM - 1:00 PM
5. **Discipleship**: Sunday, 2:30 PM - 4:00 PM
6. **Tefillah Night**: Friday, 8:00 PM - Dawn (Rev. Evans Kochoo)
7. **Online Connect Fellowship**: Thursday, 8:30 PM - 9:30 PM (Google Meet)

### Core Values
- Prayer
- Stewardship
- Holiness
- Advocacy
- Unity

### Brand Colors
- **Primary**: Dark Blue (#1a1a2e), Navy Blue (#16213e), Purple (#4C004C)
- **Accent**: Yellow/Gold (#FFD700), Red (#DC143C), Magenta (#993399)
- **Secondary**: Green (#228B22), Light Blue (#87CEEB), Teal (#008080)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend API will run on `http://localhost:3001`

### Frontend Setup

```bash
cd dashboard
npm install
npm run dev
```

The Next.js app will run on `http://localhost:3000`

### Environment Variables

Copy `.env.example` to `.env` and configure:
- Database connection
- JWT secrets
- Cloudinary credentials (for image uploads)
- Email configuration
- API URLs

## API Endpoints

### Landing Page API
- `GET /api/landing/info` - Get church information
- `GET /api/landing/services` - Get all services
- `GET /api/landing/core-values` - Get core values
- `GET /api/landing/carousel` - Get carousel images
- `GET /api/landing/contact` - Get contact information

## Technologies Used

### Backend
- Node.js
- Express.js
- CORS
- Helmet (security)
- Compression

### Frontend
- Next.js 14
- React 18
- TypeScript
- CSS Modules

## Development

### Running in Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd dashboard
npm run dev
```

## License

© 2024 VOSH Church International Kitengela. All rights reserved.

## Hashtags
#House_of_Solutions #MANIFESTING_CHRIST
