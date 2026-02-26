import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
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
    const body = (await req.json()) as {
      title?: string
      url?: string
      description?: string
      category?: string
      is_active?: boolean
      display_order?: number
    }

    const link = await prisma.updateLink.update({
      where: { id },
      data: {
        ...(body.title != null && { title: body.title }),
        ...(body.url != null && { url: body.url }),
        ...(body.description != null && { description: body.description }),
        ...(body.category != null && { category: body.category }),
        ...(body.is_active != null && { isActive: body.is_active }),
        ...(body.display_order != null && { orderIndex: body.display_order }),
        updatedBy: admin.id,
      },
    })

    return NextResponse.json({ success: true, data: link })
  } catch (error) {
    console.error('Error updating update link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update update link' },
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
    await prisma.updateLink.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Link deleted' })
  } catch (error) {
    console.error('Error deleting update link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete update link' },
      { status: 500 },
    )
  }
}

