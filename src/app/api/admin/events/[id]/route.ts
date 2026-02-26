import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateEventSchema } from '@/lib/schemas'
import { getAdminFromRequest, unauthorizedResponse } from '../../_auth'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const { id } = await params
    const body = updateEventSchema.parse(await req.json())

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...body,
        ...(body.date && { date: new Date(body.date) }),
        updatedBy: admin.id,
      },
    })

    return NextResponse.json({ success: true, data: event })
  } catch (err: any) {
    console.error('Error updating event:', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid event data' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const { id } = await params
    await prisma.event.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Event deleted' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 },
    )
  }
}

