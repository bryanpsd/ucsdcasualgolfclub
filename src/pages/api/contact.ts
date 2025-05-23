import type { APIRoute } from 'astro'
import { validateCaptcha } from '~actions/utils/captcha'

export const CAPTCHA_THRESHOLD = Number(import.meta.env.RECAPTCHA_THRESHOLD) || 0.1

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message, captchaToken, 'bot-field': botField } = await request.json()

    // Honeypot check
    if (botField) {
      return new Response(JSON.stringify({ error: 'Bot detected.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Validate captcha on the server
    const captchaResponse = await validateCaptcha({ token: captchaToken })

    // Use CAPTCHA_THRESHOLD to check the score if available
    if (
      !captchaResponse ||
      typeof (captchaResponse as any).success !== 'boolean' ||
      (captchaResponse as any).success !== true ||
      (typeof captchaResponse.score === 'number' && captchaResponse.score < CAPTCHA_THRESHOLD)
    ) {
      return new Response(JSON.stringify({ error: 'Captcha validation failed.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Prepare Netlify form data
    const netlifyFormData = new URLSearchParams({
      'form-name': 'contact',
      name,
      email,
      message,
    })

    // Forward to Netlify Forms (use your production domain)
    const netlifyResponse = await fetch('https://ucsdcasualgolfclub.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: netlifyFormData.toString(),
    })

    if (!netlifyResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to submit to Netlify Forms.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
