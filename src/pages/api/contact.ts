/* global fetch */
import { validateCaptcha } from '~actions/utils/captcha'

export default async function handler(
  req: {
    method: string
    body: { name: string; email: string; message: string; captchaToken: string }
  },
  res: {
    status: (code: number) => {
      end: () => any
      json: (body: any) => any
    }
  }
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, message, captchaToken } = req.body

  try {
    // Validate captcha on the server
    const captchaResponse = await validateCaptcha({ token: captchaToken })
    if (!captchaResponse || captchaResponse.tokenProperties?.valid !== true) {
      return res.status(400).json({ error: 'Captcha validation failed.' })
    }

    // --- Netlify form submission logic ---
    const netlifyFormData = new URLSearchParams({
      'form-name': 'contact',
      name,
      email,
      message,
    })

    // Post to your own Netlify site to trigger Netlify Forms
    const netlifyResponse = await fetch('https://ucsdcasualgolfclub.netlify.app/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: netlifyFormData.toString(),
    })

    if (!netlifyResponse.ok) {
      return res.status(500).json({ error: 'Failed to submit to Netlify Forms.' })
    }

    return res.status(200).json({ success: true })
  } catch {
    return res.status(500).json({ error: 'Server error. Please try again.' })
  }
}
