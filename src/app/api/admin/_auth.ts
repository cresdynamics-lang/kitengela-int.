import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export interface AdminContext {
  id: string
  username: string
  role: string
  isSuperAdmin: boolean
}

export async function getAdminFromRequest(req: NextRequest): Promise<AdminContext | null> {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7)

    const admin = await prisma.admin.findFirst({
      where: { id: token },
    })

    if (!admin) {
      return null
    }

    return {
      id: admin.id,
      username: admin.username,
      role: admin.role,
      isSuperAdmin: admin.isSuperAdmin,
    }
  } catch {
    return null
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

