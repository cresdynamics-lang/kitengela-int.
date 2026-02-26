import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'argon2'
import { prisma } from '@/lib/prisma'
import { createAdminSchema } from '@/lib/schemas'
import { getAdminFromRequest, unauthorizedResponse } from '../_auth'

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  if (!admin.isSuperAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        role: true,
        isSuperAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ success: true, data: admins })
  } catch (error) {
    console.error('Error fetching admins:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admins' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  if (!admin.isSuperAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = createAdminSchema.parse(await req.json())
    const passwordHash = await hash(body.password)

    const newAdmin = await prisma.admin.create({
      data: {
        ...body,
        passwordHash,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        role: true,
        isSuperAdmin: true,
      },
    })

    return NextResponse.json({ success: true, data: newAdmin })
  } catch (err: any) {
    console.error('Error creating admin:', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid admin data' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create admin' },
      { status: 500 },
    )
  }
}

