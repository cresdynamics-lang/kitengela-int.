import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createEventSchema } from '@/lib/schemas'
import { getAdminFromRequest, unauthorizedResponse } from '../_auth'

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'desc' },
    })

    return NextResponse.json({ success: true, data: events })
  } catch (error) {
    console.error('Error fetching events (admin):', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const body = createEventSchema.parse(await req.json())

    const event = await prisma.event.create({
      data: {
        ...body,
        date: new Date(body.date),
        updatedBy: admin.id,
      },
    })

    return NextResponse.json({ success: true, data: event })
  } catch (err: any) {
    console.error('Error creating event:', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid event data' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 },
    )
  }
}

