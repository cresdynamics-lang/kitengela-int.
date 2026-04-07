import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

import express from 'express'
import cors from 'cors'
import { prisma } from './db.js'
import { verify } from 'argon2'
import { loginSchema } from '../src/lib/schemas'

const app = express()
app.use(cors({ origin: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

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
      orderBy: { orderIndex: 'asc' },
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

const parseContacts = (value: unknown): string => {
  if (Array.isArray(value)) {
    return JSON.stringify(value.map((v) => String(v)).filter(Boolean))
  }
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return '[]'
    try {
      const parsed = JSON.parse(trimmed)
      if (Array.isArray(parsed)) return JSON.stringify(parsed.map((v) => String(v)).filter(Boolean))
    } catch {
      // Fall back to comma-separated parsing
    }
    return JSON.stringify(trimmed.split(',').map((v) => v.trim()).filter(Boolean))
  }
  return '[]'
}

const mapUpdateLinkInput = (body: any) => ({
  title: body?.title,
  url: body?.url,
  description: body?.description ?? '',
  category: body?.category ?? 'General',
  isActive: typeof body?.is_active === 'boolean' ? body.is_active : body?.isActive ?? true,
  orderIndex:
    typeof body?.display_order === 'number'
      ? body.display_order
      : typeof body?.orderIndex === 'number'
      ? body.orderIndex
      : 0,
})

app.get('/api/admin/programs', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const programs = await prisma.program.findMany({ orderBy: [{ day: 'asc' }, { orderIndex: 'asc' }] })
    res.json({ success: true, data: programs })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch programs' })
  }
})

app.post('/api/admin/programs', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const body = req.body || {}
    const program = await prisma.program.create({
      data: {
        title: body.title,
        day: body.day,
        startTime: body.startTime,
        endTime: body.endTime,
        venue: body.venue,
        contacts: parseContacts(body.contacts),
        description: body.description ?? null,
        posterImageUrl: body.posterImageUrl ?? null,
        isActive: typeof body.isActive === 'boolean' ? body.isActive : true,
        orderIndex: typeof body.orderIndex === 'number' ? body.orderIndex : 0,
        updatedBy: admin.id,
      },
    })
    res.json({ success: true, data: program })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to create program' })
  }
})

app.put('/api/admin/programs/:id', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const body = req.body || {}
    const program = await prisma.program.update({
      where: { id: req.params.id },
      data: {
        title: body.title,
        day: body.day,
        startTime: body.startTime,
        endTime: body.endTime,
        venue: body.venue,
        contacts: parseContacts(body.contacts),
        description: body.description ?? null,
        posterImageUrl: body.posterImageUrl ?? null,
        isActive: typeof body.isActive === 'boolean' ? body.isActive : undefined,
        orderIndex: typeof body.orderIndex === 'number' ? body.orderIndex : undefined,
        updatedBy: admin.id,
      },
    })
    res.json({ success: true, data: program })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to update program' })
  }
})

app.delete('/api/admin/programs/:id', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    await prisma.program.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to delete program' })
  }
})

app.get('/api/admin/live', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const live = await prisma.liveStream.findFirst({ orderBy: { updatedAt: 'desc' } })
    res.json({ success: true, data: live })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch live' })
  }
})

app.put('/api/admin/live', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const body = req.body || {}
    const existing = await prisma.liveStream.findFirst({ orderBy: { updatedAt: 'desc' } })
    const data = {
      isLive: typeof body.isLive === 'boolean' ? body.isLive : false,
      platform: body.platform ?? null,
      youtubeLiveUrl: body.youtubeLiveUrl ?? null,
      facebookLiveUrl: body.facebookLiveUrl ?? null,
      googleMeetUrl: body.googleMeetUrl ?? null,
      title: body.title ?? null,
      scheduleTime: body.scheduleTime ? new Date(body.scheduleTime) : null,
      updatedBy: admin.id,
    }
    const live = existing
      ? await prisma.liveStream.update({ where: { id: existing.id }, data })
      : await prisma.liveStream.create({ data })
    res.json({ success: true, data: live })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to update live stream' })
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

app.post('/api/admin/sermons', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const sermon = await prisma.sermon.create({ data: req.body })
    res.json({ success: true, data: sermon })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to create sermon' })
  }
})

app.put('/api/admin/sermons/:id', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const sermon = await prisma.sermon.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json({ success: true, data: sermon })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to update sermon' })
  }
})

app.delete('/api/admin/sermons/:id', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    await prisma.sermon.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to delete sermon' })
  }
})

app.get('/api/admin/update-links', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const links = await prisma.updateLink.findMany({ orderBy: { orderIndex: 'asc' } })
    res.json({ success: true, data: links })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch links' })
  }
})

app.post('/api/admin/update-links', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const payload = mapUpdateLinkInput(req.body)
    const link = await prisma.updateLink.create({
      data: {
        ...payload,
        updatedBy: admin.id,
      },
    })
    res.json({ success: true, data: link })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to create link' })
  }
})

app.put('/api/admin/update-links/:id', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const payload = mapUpdateLinkInput(req.body)
    const link = await prisma.updateLink.update({
      where: { id: req.params.id },
      data: {
        ...payload,
        updatedBy: admin.id,
      },
    })
    res.json({ success: true, data: link })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to update link' })
  }
})

app.delete('/api/admin/update-links/:id', async (req, res) => {
  const admin = await getAdminFromToken(req.headers.authorization)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  try {
    await prisma.updateLink.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to delete link' })
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
    console.error(e)
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
    console.error(e)
    res.status(500).json({ success: false, error: 'Failed to fetch site' })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
