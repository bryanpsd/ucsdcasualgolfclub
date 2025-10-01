import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise"

const CAPTCHA_SITE_KEY = import.meta.env.RECAPTCHA_SITE_KEY || ""
const DISABLE_CAPTCHA_VALIDATION =
	import.meta.env.DISABLE_CAPTCHA_VALIDATION === "true"
const GCP_CREDENTIALS =
	(import.meta.env.GCP_CREDENTIALS &&
		JSON.parse(import.meta.env.GCP_CREDENTIALS)) ||
	{}

type ValidateCaptchaArgs = {
	token: string
}

export const validateCaptcha = async ({ token }: ValidateCaptchaArgs) => {
	if (DISABLE_CAPTCHA_VALIDATION) {
		return {
			success: true,
			score: 1.0,
			challenge_ts: new Date().toISOString(),
			hostname: "HOSTNAME_NOT_VALIDATED",
			tokenProperties: { valid: true },
		}
	}

	if (!token)
		return { success: false, "error-codes": ["no-captcha-token-provided"] }
	const client = new RecaptchaEnterpriseServiceClient({
		credentials: GCP_CREDENTIALS,
	})
	const projectPath = client.projectPath("ucsdcgc-map")

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
		// Return all relevant properties for validation in your API route
		return {
			success: true,
			score: res.riskAnalysis?.score ?? 0,
			reasons: res.riskAnalysis?.reasons ?? [],
			tokenProperties: res.tokenProperties,
			challenge_ts: res.tokenProperties?.createTime,
			hostname: res.tokenProperties?.hostname,
		}
	} catch (err) {
		let message = err
		if (err instanceof Error) {
			message = err.message
		}
		return {
			success: false,
			"error-codes": ["unable-to-validate-captcha-token"],
			message,
		}
	} finally {
		client.close()
	}
}
