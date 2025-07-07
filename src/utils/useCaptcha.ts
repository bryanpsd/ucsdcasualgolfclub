import { actions } from 'astro:actions'
import { useEffect, useState } from 'react'
import { getInstance, load, type ReCaptchaInstance } from 'recaptcha-v3'

let CACHED_CONFIG = { SITE_KEY: '', USE_ENTERPRISE: true }

async function getConfig() {
  if (CACHED_CONFIG.SITE_KEY) return CACHED_CONFIG
  const { error, data } = await actions.getCaptchaConfig()

  if (error || !data) {
    throw new Error('Unable to get Captcha Config')
  }

  CACHED_CONFIG = data

  return CACHED_CONFIG
}

type CaptchaConfig = Awaited<ReturnType<typeof getConfig>>

export const useCaptcha = () => {
  const [captcha, setCaptcha] = useState<ReCaptchaInstance>(getInstance())
  const [config, setConfig] = useState<CaptchaConfig>()

  useEffect(() => {
    async function loadConfig() {
      const config = await getConfig()
      setConfig(config)
    }
    loadConfig()
  }, [])

  useEffect(() => {
    if (config) {
      const { SITE_KEY } = config
      if (captcha) {
        // Page transitions unload the captcha container.
        // We need to check if it exists and re-render
        const current = document.getElementsByClassName('grecaptcha-badge')
        if (current.length === 0 && SITE_KEY) {
          window.grecaptcha.enterprise.render({ sitekey: SITE_KEY })
        }
      } else {
        const loadCaptcha = async () => {
          const captchaInstance = await load(SITE_KEY)
          setCaptcha(captchaInstance)
        }
        loadCaptcha()
      }
    }
  }, [config])

  return captcha
}
