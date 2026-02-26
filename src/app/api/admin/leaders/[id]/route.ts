import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateLeaderSchema } from '@/lib/schemas'
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
    const body = updateLeaderSchema.parse(await req.json())

    const leader = await prisma.leader.update({
      where: { id },
      data: { ...body, updatedBy: admin.id },
    })

    return NextResponse.json({ success: true, data: leader })
  } catch (err: any) {
    console.error('Error updating leader:', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid leader data' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update leader' },
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
    await prisma.leader.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Leader deleted' })
  } catch (error) {
    console.error('Error deleting leader:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete leader' },
      { status: 500 },
    )
  }
}

