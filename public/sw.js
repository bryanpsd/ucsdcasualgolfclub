// Minimal service worker for Astro PWA
self.addEventListener("install", () => {
	self.skipWaiting();
});
self.addEventListener("activate", () => {
	self.clients.claim();
});
self.addEventListener("fetch", () => {
	// Default: just pass through
});
