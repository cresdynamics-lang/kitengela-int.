import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createLeaderSchema } from '@/lib/schemas'
import { getAdminFromRequest, unauthorizedResponse } from '../_auth'

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const leaders = await prisma.leader.findMany({
      orderBy: { orderIndex: 'asc' },
    })

    return NextResponse.json({ success: true, data: leaders })
  } catch (error) {
    console.error('Error fetching leaders (admin):', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaders' },
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
    const body = createLeaderSchema.parse(await req.json())

    const leader = await prisma.leader.create({
      data: { ...body, updatedBy: admin.id },
    })

    return NextResponse.json({ success: true, data: leader })
  } catch (err: any) {
    console.error('Error creating leader:', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid leader data' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create leader' },
      { status: 500 },
    )
  }
}

