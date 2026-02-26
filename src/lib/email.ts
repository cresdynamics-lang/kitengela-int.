import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY

if (!resendApiKey) {
  console.warn('[email] RESEND_API_KEY is not set – email sending is disabled.')
}

const resend = resendApiKey ? new Resend(resendApiKey) : null

const DEFAULT_TO = 'voshchurchkitengela70@gmail.com'
const DEFAULT_FROM = 'VOSH Kitengela <onboarding@resend.dev>'

export async function sendContactEmail(options: {
  name: string
  email: string
  message: string
}) {
  if (!resend) {
    console.warn('[email] Resend client not initialised – skipping sendContactEmail')
    return
  }

  const { name, email, message } = options

  await resend.emails.send({
    from: DEFAULT_FROM,
    to: DEFAULT_TO,
    subject: `New contact message from ${name || 'Website Visitor'}`,
    replyTo: email || undefined,
    html: `
      <h2>New contact message from the VOSH Kitengela website</h2>
      <p><strong>Name:</strong> ${name || 'N/A'}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br />')}</p>
    `,
  })
}

