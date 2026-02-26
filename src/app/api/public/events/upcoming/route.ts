import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: {
        isUpcoming: true,
        date: { gte: new Date() },
      },
      orderBy: { date: 'asc' },
      take: 10,
    })

    return NextResponse.json({ success: true, data: events })
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch upcoming events' },
      { status: 500 },
    )
  }
}

