import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createProgramSchema } from '@/lib/schemas'
import { getAdminFromRequest, unauthorizedResponse } from '../_auth'

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const programs = await prisma.program.findMany({
      orderBy: [{ day: 'asc' }, { orderIndex: 'asc' }],
    })

    return NextResponse.json({ success: true, data: programs })
  } catch (error) {
    console.error('Error fetching programs (admin):', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch programs' },
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
    const body = createProgramSchema.parse(await req.json())

    const program = await prisma.program.create({
      data: { ...body, updatedBy: admin.id },
    })

    return NextResponse.json({ success: true, data: program })
  } catch (err: any) {
    console.error('Error creating program:', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid program data' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create program' },
      { status: 500 },
    )
  }
}

