import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const leaders = await prisma.leader.findMany({
      orderBy: { orderIndex: 'asc' },
    })

    return NextResponse.json({ success: true, data: leaders })
  } catch (error) {
    console.error('Error fetching leaders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaders' },
      { status: 500 },
    )
  }
}

