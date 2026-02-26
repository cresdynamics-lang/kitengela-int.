import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const cursor = searchParams.get('cursor') || undefined
    const limitParam = searchParams.get('limit') || '20'
    const limit = Number.isNaN(Number(limitParam)) ? 20 : parseInt(limitParam, 10)

    const events = await prisma.event.findMany({
      take: limit + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      orderBy: { date: 'desc' },
    })

    const hasMore = events.length > limit
    const data = hasMore ? events.slice(0, -1) : events
    const nextCursor = hasMore && data.length > 0 ? data[data.length - 1].id : null

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        nextCursor,
        hasMore,
      },
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 },
    )
  }
}

