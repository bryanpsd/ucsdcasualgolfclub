import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
	cleanup();
});

// Mock environment variables
vi.mock("astro:env/client", () => ({
	PUBLIC_GOOGLE_MAP_ID_LIGHT: "test-map-id-light",
	PUBLIC_GOOGLE_MAP_ID_DARK: "test-map-id-dark",
}));

// Mock Astro actions
vi.mock("astro:actions", () => ({
	actions: {
		getCaptchaConfig: vi.fn().mockResolvedValue({
			data: {
				SITE_KEY: "test-site-key",
				USE_ENTERPRISE: true,
			},
		}),
	},
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	takeRecords() {
		return [];
	}
	unobserve() {}
} as unknown as typeof global.IntersectionObserver;

// Mock scrollTo
window.scrollTo = vi.fn();
