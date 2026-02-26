import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'argon2'
import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/lib/schemas'

export async function POST(req: NextRequest) {
  try {
    const body = loginSchema.parse((await req.json()) || {})

    const admin = await prisma.admin.findFirst({
      where: {
        OR: [{ username: body.username }, { email: body.username }],
      },
    })

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 },
      )
    }

    const isValid = await verify(admin.passwordHash, body.password)
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 },
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        token: admin.id,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          isSuperAdmin: admin.isSuperAdmin,
        },
      },
    })
  } catch (err: any) {
    console.error('Login error', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Username and password are required.' },
        { status: 400 },
      )
    }

    if (err?.code === 'P2021' || err?.message?.includes?.('does not exist')) {
      return NextResponse.json(
        { success: false, error: 'Database not ready.' },
        { status: 503 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Login failed. Please try again.' },
      { status: 500 },
    )
  }
}

