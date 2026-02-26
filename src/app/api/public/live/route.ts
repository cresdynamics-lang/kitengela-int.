import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const live = await prisma.liveStream.findFirst({
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: live })
  } catch (error) {
    console.error('Error fetching live stream:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch live stream' },
      { status: 500 },
    )
  }
}

