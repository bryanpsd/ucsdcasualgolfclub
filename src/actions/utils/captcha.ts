import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise'

const CAPTCHA_SITE_KEY = import.meta.env.RECAPTCHA_SITE_KEY || ''
const DISABLE_CAPTCHA_VALIDATION = import.meta.env.DISABLE_CAPTCHA_VALIDATION === 'true'
const GCP_CREDENTIALS =
  (import.meta.env.GCP_CREDENTIALS && JSON.parse(import.meta.env.GCP_CREDENTIALS)) || {}

type ValidateCaptchaArgs = {
  token: string
}

export const validateCaptcha = async ({ token }: ValidateCaptchaArgs) => {
  if (DISABLE_CAPTCHA_VALIDATION) {
    return {
      success: true,
      score: 1.0,
      challenge_ts: new Date().toISOString(),
      hostname: 'HOSTNAME_NOT_VALIDATED',
    }
  }

  if (!token) return { success: false, 'error-codes': ['no-captcha-token-provided'] }
  const client = new RecaptchaEnterpriseServiceClient({
    credentials: GCP_CREDENTIALS,
  })

  if (!CAPTCHA_SITE_KEY) {
    throw new Error('CAPTCHA_SITE_KEY is not defined')
  }

  const projectPath = client.projectPath('ucsdcgc-map')

  try {
    const [res] = await client.createAssessment({
      parent: projectPath,
      assessment: {
        event: {
          token: token,
          siteKey: CAPTCHA_SITE_KEY,
        },
      },
    })
    if (res.tokenProperties && !res.tokenProperties?.valid) {
      throw new Error(
        `The CreateAssessment call failed because the token was: ${res.tokenProperties.invalidReason}`
      )
    }
    return res.riskAnalysis
  } catch (err) {
    let message = err

    if (err instanceof Error) {
      message = err.message
    }

    return {
      success: false,
      'error-codes': ['unable-to-validate-captcha-token'],
    }
  } finally {
    client.close()
  }
}
