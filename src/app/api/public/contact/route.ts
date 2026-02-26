import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { name?: string; email?: string; message?: string }

    const name = (body.name || '').toString().slice(0, 200)
    const email = (body.email || '').toString().slice(0, 200)
    const message = (body.message || '').toString().slice(0, 5000)

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 },
      )
    }

    await sendContactEmail({ name, email, message })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error handling contact form submission:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 },
    )
  }
}

