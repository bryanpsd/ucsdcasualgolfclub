import type { APIRoute } from 'astro'
import { validateCaptcha } from '~actions/utils/captcha'

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message, captchaToken } = await request.json()

    // Validate captcha on the server
    const captchaResponse = await validateCaptcha({ token: captchaToken })
    if (
      !captchaResponse ||
      typeof (captchaResponse as { success?: boolean }).success !== 'boolean' ||
      (captchaResponse as { success: boolean }).success !== true
    ) {
      return new Response(JSON.stringify({ error: 'Captcha validation failed.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // --- Netlify form submission logic ---
    const netlifyFormData = new URLSearchParams({
      'form-name': 'contact',
      name,
      email,
      message,
    })

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
