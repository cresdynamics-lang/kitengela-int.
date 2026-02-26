import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const links = await prisma.updateLink.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: 'asc' },
    })

    return NextResponse.json({ success: true, data: links })
  } catch (error) {
    console.error('Error fetching update links:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch links' },
      { status: 500 },
    )
  }
}

