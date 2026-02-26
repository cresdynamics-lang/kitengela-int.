import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst({
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site settings' },
      { status: 500 },
    )
  }
}

