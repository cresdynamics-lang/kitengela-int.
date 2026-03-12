import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

import express from 'express'
import cors from 'cors'
import { prisma } from './db.js'
import { verify } from 'argon2'
import { loginSchema } from '../src/lib/schemas'

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

const PORT = Number(process.env.PORT) || 3001

// ---------- Public API ----------
app.get('/api/public/site', async (_req, res) => {
  try {
    const settings = await prisma.siteSettings.findFirst({ orderBy: { updatedAt: 'desc' } })
    res.json({ success: true, data: settings })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch site settings' })
  }
})

app.get('/api/public/live', async (_req, res) => {
  try {
    const live = await prisma.liveStream.findFirst({ orderBy: { updatedAt: 'desc' } })
    res.json({ success: true, data: live })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch live stream' })
  }
})

app.get('/api/public/programs/weekly', async (_req, res) => {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      orderBy: [{ day: 'asc' }, { orderIndex: 'asc' }],
    })
    res.json({ success: true, data: programs })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch programs' })
  }
})

app.get('/api/public/programs', async (req, res) => {
  try {
    const day = req.query.day as string | undefined
    const programs = await prisma.program.findMany({
      where: day ? { day, isActive: true } : { isActive: true },
      orderBy: [{ day: 'asc' }, { orderIndex: 'asc' }],
    })
    res.json({ success: true, data: programs })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch programs' })
  }
})

app.get('/api/public/sermons', async (_req, res) => {
  try {
    const sermons = await prisma.sermon.findMany({
      orderBy: { date: 'desc' },
    })
    res.json({ success: true, data: sermons })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch sermons' })
  }
})

app.get('/api/public/sermons/source', async (_req, res) => {
  try {
    const source = await prisma.sermonSource.findFirst({ orderBy: { updatedAt: 'desc' } })
    res.json({ success: true, data: source })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch sermon source' })
  }
})

app.get('/api/public/leaders', async (_req, res) => {
  try {
    const leaders = await prisma.leader.findMany({ orderBy: { orderIndex: 'asc' } })
    res.json({ success: true, data: leaders })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch leaders' })
  }
})

app.get('/api/public/links', async (_req, res) => {
  try {
    const links = await prisma.updateLink.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    })
    res.json({ success: true, data: links })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch links' })
  }
})

app.get('/api/public/events', async (_req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
    })
    res.json({ success: true, data: events })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch events' })
  }
})

app.get('/api/public/events/upcoming', async (_req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: { isUpcoming: true },
      orderBy: { date: 'asc' },
    })
    res.json({ success: true, data: events })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch upcoming events' })
  }
})

app.post('/api/public/contact', async (req, res) => {
  try {
    // Optional: send email via Resend; for now just acknowledge
    res.json({ success: true, data: { message: 'Thank you for your message.' } })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to send message' })
  }
})

// ---------- Admin API ----------
app.post('/api/admin/login', async (req, res) => {
  try {
    const body = loginSchema.parse(req.body || {})
    const admin = await prisma.admin.findFirst({
      where: { OR: [{ username: body.username }, { email: body.username }] },
    })
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' })
    }
    const isValid = await verify(admin.passwordHash, body.password)
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' })
    }
    res.json({
      success: true,
      data: {
        token: admin.id,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          isSuperAdmin: admin.isSuperAdmin,
        },
      },
    })
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      return res.status(400).json({ success: false, error: 'Username and password are required.' })
    }
    console.error(err)
    res.status(500).json({ success: false, error: 'Login failed. Please try again.' })
  }
})

// Admin routes that need auth - stub or implement as needed
const getAdminFromToken = async (authHeader: string | undefined) => {
  if (!authHeader?.startsWith('Bearer ')) return null
  const token = authHeader.slice(7)
  const admin = await prisma.admin.findFirst({ where: { id: token } })
  return admin
}

app.get('/api/admin/programs', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const programs = await prisma.program.findMany({ orderBy: [{ day: 'asc' }, { orderIndex: 'asc' }] })
    res.json({ success: true, data: programs })
  } catch (e) {
    res.status(500).json({ success: false, error: 'Failed to fetch programs' })
  }
})

app.get('/api/admin/live', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const live = await prisma.liveStream.findFirst({ orderBy: { updatedAt: 'desc' } })
    res.json({ success: true, data: live })
  } catch (e) {
    res.status(500).json({ success: false, error: 'Failed to fetch live' })
  }
})

app.get('/api/admin/sermons', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const sermons = await prisma.sermon.findMany({ orderBy: { date: 'desc' } })
    res.json({ success: true, data: sermons })
  } catch (e) {
    res.status(500).json({ success: false, error: 'Failed to fetch sermons' })
  }
})

app.get('/api/admin/update-links', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const links = await prisma.updateLink.findMany({ orderBy: { displayOrder: 'asc' } })
    res.json({ success: true, data: links })
  } catch (e) {
    res.status(500).json({ success: false, error: 'Failed to fetch links' })
  }
})

app.get('/api/admin/admins', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  if (!admin.isSuperAdmin) return res.status(403).json({ error: 'Forbidden' })
  try {
    const admins = await prisma.admin.findMany({ select: { id: true, username: true, email: true, role: true, isSuperAdmin: true } })
    res.json({ success: true, data: admins })
  } catch (e) {
    res.status(500).json({ success: false, error: 'Failed to fetch admins' })
  }
})

app.get('/api/admin/site', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const settings = await prisma.siteSettings.findFirst({ orderBy: { updatedAt: 'desc' } })
    res.json({ success: true, data: settings })
  } catch (e) {
    res.status(500).json({ success: false, error: 'Failed to fetch site' })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
