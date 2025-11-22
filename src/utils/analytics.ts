/**
 * Google Analytics 4 event tracking utilities
 * Provides type-safe wrappers around gtag for common events
 */

// Declare global gtag function for TypeScript
declare global {
	interface Window {
		gtag?: (
			command: "event" | "config" | "js",
			targetOrAction: string | Date,
			params?: Record<string, unknown>,
		) => void;
		dataLayer?: unknown[];
	}
}

/**
 * Track a custom GA4 event
 * @param eventName - The name of the event (e.g., 'click', 'button_click', 'link_click')
 * @param params - Additional event parameters
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
	if (typeof window === "undefined") return;
	if (typeof window.gtag !== "function") {
		console.warn("GA4 gtag not available. Event not tracked:", eventName, params);
		return;
	}

	try {
		window.gtag("event", eventName, params);
	} catch (error) {
		console.error("Failed to track GA4 event:", eventName, error);
	}
}

/**
 * Track a button click event
 * @param label - The button label or identifier
 * @param additionalParams - Optional additional parameters
 */
export function trackButtonClick(label: string, additionalParams?: Record<string, unknown>): void {
	trackEvent("button_click", {
		button_text: label,
		...additionalParams,
	});
}

/**
 * Track a link click event
 * @param url - The link destination URL
 * @param label - Optional link text/label
 * @param additionalParams - Optional additional parameters
 */
export function trackLinkClick(
	url: string,
	label?: string,
	additionalParams?: Record<string, unknown>,
): void {
	trackEvent("link_click", {
		link_url: url,
		link_text: label,
		...additionalParams,
	});
}

/**
 * Track an outbound link click (external link)
 * @param url - The external URL
 * @param label - Optional link text/label
 */
export function trackOutboundLink(url: string, label?: string): void {
	trackEvent("click", {
		event_category: "outbound",
		event_label: label || url,
		link_url: url,
		link_domain: extractDomain(url),
	});
}

/**
 * Extract domain from URL
 */
function extractDomain(url: string): string {
	try {
		const urlObj = new URL(url, window.location.origin);
		return urlObj.hostname;
	} catch {
		return url;
	}
}

/**
 * Check if a URL is external (different domain than current site)
 */
export function isExternalUrl(url: string): boolean {
	if (!url) return false;
	if (url.startsWith("/") || url.startsWith("#")) return false;
	try {
		const urlObj = new URL(url, window.location.origin);
		return urlObj.hostname !== window.location.hostname;
	} catch {
		return false;
	}
}

/**
 * Track navigation clicks in main or mobile nav
 * @param label - The navigation link text
 * @param href - The link destination URL
 * @param options - Navigation type and location
 */
export function trackNavClick(
	label: string,
	href?: string,
	options?: {
		navType?: "main" | "sub";
		navLocation?: "desktop_main_nav" | "mobile_nav";
	},
): void {
	trackEvent("navigation_click", {
		event_category: "navigation",
		event_label: label,
		nav_type: options?.navType || "main",
		nav_location: options?.navLocation || "desktop_main_nav",
		link_url: href,
	});
}

/**
 * Track player selection in Tournament Results
 * @param playerName - The selected player's name
 */
export function trackPlayerSelect(playerName: string): void {
	trackEvent("select_player", {
		event_category: "tournament_interaction",
		event_label: playerName,
		player_name: playerName,
	});
}
