import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateProgramSchema } from '@/lib/schemas'
import { getAdminFromRequest, unauthorizedResponse } from '../../_auth'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const { id } = await params
    const body = updateProgramSchema.parse(await req.json())

    const program = await prisma.program.update({
      where: { id },
      data: { ...body, updatedBy: admin.id },
    })

    return NextResponse.json({ success: true, data: program })
  } catch (err: any) {
    console.error('Error updating program:', err)

    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid program data' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update program' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return unauthorizedResponse()
  }

  try {
    const { id } = await params
    await prisma.program.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Program deleted' })
  } catch (error) {
    console.error('Error deleting program:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete program' },
      { status: 500 },
    )
  }
}

