import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminFromRequest, unauthorizedResponse } from '../_auth'

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const links = await prisma.updateLink.findMany({
      orderBy: { orderIndex: 'asc' },
    })

    return NextResponse.json({ success: true, data: links })
  } catch (error) {
    console.error('Error fetching update links (admin):', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch update links' },
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
    const body = (await req.json()) as {
      title: string
      url: string
      description?: string
      category?: string
      is_active?: boolean
      display_order?: number
    }

    const link = await prisma.updateLink.create({
      data: {
        title: body.title,
        url: body.url,
        description: body.description ?? '',
        category: body.category ?? 'General',
        isActive: body.is_active ?? true,
        orderIndex: body.display_order ?? 0,
        updatedBy: admin.id,
      },
    })

    return NextResponse.json({ success: true, data: link })
  } catch (error) {
    console.error('Error creating update link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create update link' },
      { status: 500 },
    )
  }
}

