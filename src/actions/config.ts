import { defineAction } from 'astro:actions'

const SITE_KEY = import.meta.env.RECAPTCHA_SITE_KEY

export const getCaptchaConfig = defineAction({
  handler: () => {
    return { SITE_KEY }
  },
})
