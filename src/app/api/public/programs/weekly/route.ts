import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      orderBy: [{ day: 'asc' }, { orderIndex: 'asc' }],
    })

    return NextResponse.json({ success: true, data: programs })
  } catch (error) {
    console.error('Error fetching weekly programs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weekly programs' },
      { status: 500 },
    )
  }
}

