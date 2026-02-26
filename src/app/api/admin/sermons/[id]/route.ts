import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateSermonSchema } from '@/lib/schemas'
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
    const body = updateSermonSchema.parse(await req.json())

    const sermon = await prisma.sermon.update({
      where: { id },
      data: {
        ...body,
        ...(body.date && { date: new Date(body.date) }),
        updatedBy: admin.id,
      },
    })

    return NextResponse.json({ success: true, data: sermon })
  } catch (err: any) {
    console.error('Error updating sermon:', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid sermon data' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update sermon' },
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
    await prisma.sermon.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Sermon deleted' })
  } catch (error) {
    console.error('Error deleting sermon:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete sermon' },
      { status: 500 },
    )
  }
}

