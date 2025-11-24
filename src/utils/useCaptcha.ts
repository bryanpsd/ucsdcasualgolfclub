import { actions } from "astro:actions";
import { useEffect, useState } from "react";

let CONFIG_CACHE: { SITE_KEY?: string; USE_ENTERPRISE?: boolean } = {};

async function retry<T>(fn: () => Promise<T>, attempts = 2, delayMs = 250): Promise<T> {
	let lastError: unknown;
	for (let i = 0; i < attempts; i++) {
		try {
			return await fn();
		} catch (err) {
			lastError = err;
			if (i < attempts - 1) await new Promise((r) => setTimeout(r, delayMs));
		}
	}
	throw lastError;
}

async function fetchConfig() {
	if (CONFIG_CACHE.SITE_KEY) return CONFIG_CACHE;
	const res = (await retry(() => actions.getCaptchaConfig())) as {
		data?: { SITE_KEY?: string; USE_ENTERPRISE?: boolean };
	};
	CONFIG_CACHE = res?.data ?? {};
	return CONFIG_CACHE;
}

type GrecaptchaLike = {
	ready?: (cb: () => void) => void;
	execute?: ((...args: unknown[]) => Promise<string> | string) | undefined;
	enterprise?:
		| { execute?: ((...args: unknown[]) => Promise<string> | string) | undefined }
		| undefined;
};

export const useCaptcha = () => {
	const [ready, setReady] = useState(false);
	const [siteKey, setSiteKey] = useState<string | undefined>(undefined);
	const [useEnterprise, setUseEnterprise] = useState<boolean>(false);

	useEffect(() => {
		let mounted = true;

		(async () => {
			try {
				const cfg = await fetchConfig();
				const key = cfg.SITE_KEY;
				const ue = !!cfg.USE_ENTERPRISE;
				if (!mounted) return;
				setSiteKey(key);
				setUseEnterprise(ue);
				if (!key) return;

				const scriptSrc = ue
					? `https://www.google.com/recaptcha/enterprise.js?render=${key}`
					: `https://www.google.com/recaptcha/api.js?render=${key}`;

				if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
					const s = document.createElement("script");
					s.src = scriptSrc;
					s.async = true;
					s.setAttribute("data-ucsd-recaptcha", "1");
					document.head.appendChild(s);
				}

				const waitForGre = async (timeoutMs = 7000) => {
					const start = Date.now();
					while (Date.now() - start < timeoutMs) {
						const w = window as unknown as Window & {
							grecaptcha?: GrecaptchaLike;
							___grecaptcha?: GrecaptchaLike;
						};
						const gre = w.grecaptcha ?? w.___grecaptcha;
						if (gre && typeof gre === "object") return gre as GrecaptchaLike;
						await new Promise((r) => setTimeout(r, 200));
					}
					return null;
				};

				const gre = await waitForGre();
				if (!mounted) return;
				if (!gre) {
					if (import.meta.env.DEV)
						console.warn("useCaptcha: grecaptcha not found after script inject");
					return;
				}

				try {
					// persist a reference so client-side navigation that mutates
					// globals won't remove our ability to access the library.
					try {
						const w = window as unknown as Window & { ___grecaptcha?: GrecaptchaLike };
						w.___grecaptcha = gre;
					} catch {
						/* ignore */
					}

					if (typeof gre.ready === "function") {
						gre.ready(() => {
							if (!mounted) return;
							setReady(true);
						});
					} else {
						setReady(true);
					}
				} catch (e) {
					if (import.meta.env.DEV) console.warn("useCaptcha: gre.ready threw", e);
					setReady(true);
				}
			} catch {
				// Initialization failed - set ready to allow form to work without captcha
				setReady(true);
			}
		})();

		return () => {
			mounted = false;
		};
	}, []);

	const execute = async (action = "submit") => {
		try {
			const w = window as unknown as Window & {
				grecaptcha?: GrecaptchaLike;
				___grecaptcha?: GrecaptchaLike;
			};
			const gre = w.grecaptcha ?? w.___grecaptcha;
			if (!gre) return "";
			const execTarget = useEnterprise && gre.enterprise ? gre.enterprise : gre;
			if (!execTarget || typeof execTarget.execute !== "function") return "";

			// prefer (siteKey, { action }) signature if available
			const execFn = execTarget.execute as (...args: unknown[]) => Promise<string> | string;
			const argCount = (execFn as unknown as { length?: number }).length ?? 0;
			type ExecFn = (...args: unknown[]) => Promise<string> | string;
			const callable = execFn as ExecFn;
			if (siteKey && argCount > 1) {
				const maybe = callable(siteKey, { action });
				return String(await Promise.resolve(maybe));
			}

			const maybe = callable(action);
			return String(await Promise.resolve(maybe));
		} catch {
			// reCAPTCHA execution failed - return empty string
			return "";
		}
	};

	return { execute, ready } as { execute: (action?: string) => Promise<string>; ready: boolean };
};
