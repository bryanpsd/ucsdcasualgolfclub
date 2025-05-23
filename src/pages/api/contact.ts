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

    // Only use your production domain
    const netlifyUrl = 'https://ucsdcasualgolfclub.com/'

    let netlifyResponse, netlifyText, lastError

    try {
      netlifyResponse = await fetch(netlifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyFormData.toString(),
      })
      netlifyText = await netlifyResponse.text()
      console.log('Netlify response status:', netlifyResponse.status)
      console.log('Netlify response body:', netlifyText)
    } catch (err) {
      lastError = err
      console.error('Netlify Forms POST error:', err)
    }

    if (!netlifyResponse?.ok) {
      return new Response(
        JSON.stringify({
          error: 'Failed to submit to Netlify Forms.',
          netlifyStatus: netlifyResponse?.status,
          netlifyBody: netlifyText,
          netlifyError: lastError ? String(lastError) : undefined,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Server error:', err)
    return new Response(JSON.stringify({ error: 'Server error. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
