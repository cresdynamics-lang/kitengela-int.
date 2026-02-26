import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateLiveStreamSchema } from '@/lib/schemas'
import { getAdminFromRequest, unauthorizedResponse } from '../_auth'

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const live = await prisma.liveStream.findFirst({
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: live })
  } catch (error) {
    console.error('Error fetching live stream (admin):', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch live stream' },
      { status: 500 },
    )
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const body = updateLiveStreamSchema.parse(await req.json())

    const live = await prisma.liveStream.upsert({
      where: { id: 'default' },
      update: {
        ...body,
        ...(body.scheduleTime && { scheduleTime: new Date(body.scheduleTime) }),
        updatedBy: admin.id,
      },
      create: {
        id: 'default',
        ...body,
        ...(body.scheduleTime && { scheduleTime: new Date(body.scheduleTime) }),
        updatedBy: admin.id,
      },
    })

    return NextResponse.json({ success: true, data: live })
  } catch (err: any) {
    console.error('Error updating live stream:', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid live stream data' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update live stream' },
      { status: 500 },
    )
  }
}

