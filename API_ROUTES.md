# API Routes Implementation Guide

## Backend API Routes (Express.js)

Add these routes to your `server/index.ts`:

### 1. Public API Routes

```typescript
// GET /api/public/live-services
app.get('/api/public/live-services', async (req, res) => {
  try {
    const services = await prisma.liveService.findMany({
      orderBy: { scheduledAt: 'desc' },
      take: 10,
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch live services' });
  }
});

// GET /api/public/prayers
app.get('/api/public/prayers', async (req, res) => {
  try {
    const prayers = await prisma.prayer.findMany({
      where: { status: { in: ['scheduled', 'active'] } },
      orderBy: { scheduledAt: 'desc' },
    });
    res.json(prayers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prayers' });
  }
});

// GET /api/public/gallery
app.get('/api/public/gallery', async (req, res) => {
  try {
    const { category } = req.query;
    const where = {
      isPublished: true,
      ...(category !== 'all' && category ? { category: category as string } : {}),
    };

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { orderIndex: 'asc' },
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// POST /api/public/contact
app.post('/api/public/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Save to database and send email notification
    // For now, just return success
    res.json({ success: true, message: 'Thank you for your message' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// GET /api/public/sermons
app.get('/api/public/sermons', async (req, res) => {
  try {
    const sermons = await prisma.sermon.findMany({
      orderBy: { date: 'desc' },
      take: 20,
    });
    res.json(sermons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sermons' });
  }
});
```

### 2. Admin API Routes

```typescript
// POST /api/admin/auth/login
app.post('/api/admin/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find admin
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password (use bcrypt in production)
    const passwordMatch = await require('bcrypt').compare(password, admin.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = require('jsonwebtoken').sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      admin: { id: admin.id, email: admin.email, fullName: admin.fullName },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Middleware to verify JWT token
const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = require('jsonwebtoken').verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    );
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ===== LIVE SERVICES CRUD =====

// POST /api/admin/live-services (Create)
app.post('/api/admin/live-services', verifyToken, async (req, res) => {
  try {
    const { title, description, platform, youtubeUrl, facebookUrl, googleMeetUrl, zoomUrl, scheduledAt } = req.body;

    const service = await prisma.liveService.create({
      data: {
        title,
        description,
        platform,
        youtubeUrl,
        facebookUrl,
        googleMeetUrl,
        zoomUrl,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        updatedBy: req.admin.id,
      },
    });

    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create live service' });
  }
});

// GET /api/admin/live-services/:id (Read)
app.get('/api/admin/live-services/:id', verifyToken, async (req, res) => {
  try {
    const service = await prisma.liveService.findUnique({
      where: { id: req.params.id },
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// PUT /api/admin/live-services/:id (Update)
app.put('/api/admin/live-services/:id', verifyToken, async (req, res) => {
  try {
    const { title, description, platform, youtubeUrl, facebookUrl, googleMeetUrl, zoomUrl, scheduledAt, isLive } = req.body;

    const service = await prisma.liveService.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        platform,
        youtubeUrl,
        facebookUrl,
        googleMeetUrl,
        zoomUrl,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        isLive,
        updatedBy: req.admin.id,
      },
    });

    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE /api/admin/live-services/:id (Delete)
app.delete('/api/admin/live-services/:id', verifyToken, async (req, res) => {
  try {
    await prisma.liveService.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// ===== GALLERY CRUD (Similar pattern) =====

// GET /api/admin/gallery (List all admin)
app.get('/api/admin/gallery', verifyToken, async (req, res) => {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { orderIndex: 'asc' },
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// POST /api/admin/gallery (Upload)
app.post('/api/admin/gallery', verifyToken, async (req, res) => {
  try {
    const { title, description, imageUrl, category } = req.body;

    const image = await prisma.galleryImage.create({
      data: {
        title,
        description,
        imageUrl,
        category,
        uploadedBy: req.admin.id,
      },
    });

    res.json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create gallery image' });
  }
});

// DELETE /api/admin/gallery/:id
app.delete('/api/admin/gallery/:id', verifyToken, async (req, res) => {
  try {
    await prisma.galleryImage.delete({
      where: { id: req.params.id },
    });
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// ===== PRAYERS CRUD (Similar pattern) =====

// POST /api/admin/prayers
app.post('/api/admin/prayers', verifyToken, async (req, res) => {
  try {
    const { title, description, status, joinUrl, audioUrl, platform, scheduledAt } = req.body;

    const prayer = await prisma.prayer.create({
      data: {
        title,
        description,
        status,
        joinUrl,
        audioUrl,
        platform,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        updatedBy: req.admin.id,
      },
    });

    res.json({ success: true, data: prayer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create prayer session' });
  }
});

// Similar PUT and DELETE routes for prayers...
```

## Frontend API Client

Update `src/lib/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Public endpoints
export const publicApi = {
  getLiveServices: () =>
    fetch(`${API_BASE_URL}/public/live-services`).then(r => r.json()),

  getPrayers: () =>
    fetch(`${API_BASE_URL}/public/prayers`).then(r => r.json()),

  getGallery: (category = 'all') =>
    fetch(`${API_BASE_URL}/public/gallery?category=${category}`).then(r => r.json()),

  getSermons: () =>
    fetch(`${API_BASE_URL}/public/sermons`).then(r => r.json()),

  submitContact: (data: any) =>
    fetch(`${API_BASE_URL}/public/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
};

// Admin endpoints
export const adminApi = {
  login: (email: string, password: string) =>
    fetch(`${API_BASE_URL}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(r => r.json()),

  // Live Services
  getLiveServices: (token: string) =>
    fetch(`${API_BASE_URL}/admin/live-services`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  createLiveService: (token: string, data: any) =>
    fetch(`${API_BASE_URL}/admin/live-services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  updateLiveService: (token: string, id: string, data: any) =>
    fetch(`${API_BASE_URL}/admin/live-services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  deleteLiveService: (token: string, id: string) =>
    fetch(`${API_BASE_URL}/admin/live-services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  // Similar methods for prayers, gallery, etc.
};
```

## Dependencies to Add

```bash
npm install bcrypt jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

## Environment Variables

```env
JWT_SECRET=your-super-secret-key-change-in-production
DATABASE_URL=postgresql://...
```

## Notes

- Replace placeholder JWT_SECRET with a strong random key
- Use HTTPS in production
- Implement rate limiting for login endpoint
- Consider using env variables for database connection
- Add proper error logging
- Validate all input on both client and server
