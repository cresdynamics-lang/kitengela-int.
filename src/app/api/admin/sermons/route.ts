import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSermonSchema } from '@/lib/schemas'
import { getAdminFromRequest, unauthorizedResponse } from '../_auth'

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const sermons = await prisma.sermon.findMany({
      orderBy: { date: 'desc' },
    })

    return NextResponse.json({ success: true, data: sermons })
  } catch (error) {
    console.error('Error fetching sermons (admin):', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sermons' },
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
    const body = createSermonSchema.parse(await req.json())

    const sermon = await prisma.sermon.create({
      data: {
        ...body,
        date: new Date(body.date),
        updatedBy: admin.id,
      },
    })

    return NextResponse.json({ success: true, data: sermon })
  } catch (err: any) {
    console.error('Error creating sermon:', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid sermon data' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create sermon' },
      { status: 500 },
    )
  }
}

