import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminFromRequest, unauthorizedResponse } from '../_auth'

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const settings = await prisma.siteSettings.findFirst({
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error('Error fetching site settings (admin):', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site settings' },
      { status: 500 },
    )
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const body = (await req.json()) as any

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: { ...body, updatedAt: new Date() },
      create: { ...body, id: 'default' },
    })

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error('Error updating site settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update site settings' },
      { status: 500 },
    )
  }
}

