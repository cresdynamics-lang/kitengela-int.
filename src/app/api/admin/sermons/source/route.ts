import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateSermonSourceSchema } from '@/lib/schemas'
import { getAdminFromRequest, unauthorizedResponse } from '../../_auth'

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const source = await prisma.sermonSource.findFirst({
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: source })
  } catch (error) {
    console.error('Error fetching sermon source (admin):', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sermon source' },
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
    const body = updateSermonSourceSchema.parse(await req.json())

    const source = await prisma.sermonSource.upsert({
      where: { id: 'default' },
      update: { ...body, updatedBy: admin.id },
      create: { id: 'default', ...body, updatedBy: admin.id },
    })

    return NextResponse.json({ success: true, data: source })
  } catch (err: any) {
    console.error('Error updating sermon source:', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid sermon source data' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update sermon source' },
      { status: 500 },
    )
  }
}

