import { defineAction } from "astro:actions";

const SITE_KEY = import.meta.env.RECAPTCHA_SITE_KEY;
const USE_ENTERPRISE = import.meta.env.RECAPTCHA_USE_ENTERPRISE === "true";

export const getCaptchaConfig = defineAction({
	handler: () => {
		return { SITE_KEY, USE_ENTERPRISE };
	},
});
