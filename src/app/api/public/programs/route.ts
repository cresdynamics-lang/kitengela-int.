import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const day = searchParams.get('day') || undefined

    const programs = await prisma.program.findMany({
      where: {
        isActive: true,
        ...(day && { day }),
      },
      orderBy: [{ orderIndex: 'asc' }],
    })

    return NextResponse.json({ success: true, data: programs })
  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch programs' },
      { status: 500 },
    )
  }
}

