import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise'

const CAPTCHA_SITE_KEY = import.meta.env.RECAPTCHA_SITE_KEY || ''

type ValidateCaptchaArgs = {
  token: string
}

export const validateCaptcha = async ({ token }: ValidateCaptchaArgs) => {
  if (!CAPTCHA_SITE_KEY) {
    throw new Error('CAPTCHA_SITE_KEY is not defined')
  }

  const client = new RecaptchaEnterpriseServiceClient()
  const projectName = `projects/${import.meta.env.RECAPTCHA_PROJECT_ID}`
  const request = {
    event: {
      token,
      siteKey: CAPTCHA_SITE_KEY,
      expectedAction: 'submit',
    },
    parent: projectName,
  }

  try {
    const [response] = await client.createAssessment(request)
    return response
  } catch (error) {
    console.error('Error validating captcha:', error)
    throw error
  }
}
