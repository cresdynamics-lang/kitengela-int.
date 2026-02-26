import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sermons = await prisma.sermon.findMany({
      orderBy: { date: 'desc' },
    })

    return NextResponse.json({ success: true, data: sermons })
  } catch (error) {
    console.error('Error fetching sermons:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sermons' },
      { status: 500 },
    )
  }
}

