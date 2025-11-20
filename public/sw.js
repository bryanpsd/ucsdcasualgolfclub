// Minimal service worker for Astro PWA
self.addEventListener("install", (_event) => {
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		Promise.all([
			// Disable navigation preload if it's enabled
			self.registration.navigationPreload
				? self.registration.navigationPreload.disable()
				: Promise.resolve(),
			self.clients.claim()
		])
	);
});

self.addEventListener("fetch", (event) => {
	// Don't intercept navigation requests (e.g., page loads, redirects to external URLs)
	if (event.request.mode === 'navigate') {
		return;
	}

	// For other requests, just pass through to network
	event.respondWith(fetch(event.request));
});
