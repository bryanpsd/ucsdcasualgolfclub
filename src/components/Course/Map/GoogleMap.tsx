import { useEffect } from "react";

interface GoogleMapProps {
	latitude: number;
	longitude: number;
	zoom?: number;
	apiKey: string;
	style?: React.CSSProperties;
	className?: string;
}

export const GoogleMap = ({
	latitude,
	longitude,
	zoom = 17,
	apiKey,
	style,
	className,
}: GoogleMapProps) => {
	let mapDiv: HTMLDivElement | null = null;

	useEffect(() => {
		if (!mapDiv) return;

		const hasGoogleMaps = () => {
			const w = window as unknown as GoogleWindow;
			return typeof w.google !== "undefined" && typeof w.google?.maps !== "undefined";
		};

		const loadGoogleMaps = (key: string) => {
			return new Promise<void>((resolve, reject) => {
				if (hasGoogleMaps()) {
					return resolve();
				}

				const existing = document.querySelector(
					`script[src*="maps.googleapis.com/maps/api/js?key=${key}"]`,
				);
				if (existing) {
					// If an existing script tag is present but google.maps isn't ready yet,
					// wait for it to load.
					existing.addEventListener("load", () => resolve());
					return;
				}

				const script = document.createElement("script");
				script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&v=weekly&loading=async`;
				script.async = true;
				script.defer = true;
				script.addEventListener("load", () => resolve());
				script.addEventListener("error", (e) => reject(e));
				document.head.appendChild(script);
			});
		};

		let mounted = true;

		const waitForMaps = (timeout = 2000) => {
			return new Promise<void>((resolve, reject) => {
				const start = Date.now();
				const check = () => {
					const w = window as unknown as GoogleWindow;
					if (
						w.google?.maps &&
						typeof (w.google.maps as unknown as { Map?: unknown }).Map === "function"
					) {
						resolve();
						return;
					}
					if (Date.now() - start > timeout) {
						reject(new Error("Timed out waiting for google.maps.Map"));
						return;
					}
					setTimeout(check, 50);
				};
				check();
			});
		};

		loadGoogleMaps(apiKey)
			.then(() => waitForMaps(3000))
			.then(() => {
				if (!mounted) return;
				if (mapDiv) {
					const w = window as unknown as GoogleWindow;
					if (!w.google?.maps) return;
					new (w.google.maps as GoogleMaps).Map(mapDiv, {
						center: { lat: latitude, lng: longitude },
						zoom,
					});
				}
			})
			.catch(() => {
				// Silent failure - map is progressive enhancement
			});

		return () => {
			mounted = false;
			// keep the script in DOM to allow reuse across mounts
		};
	}, [latitude, longitude, zoom, apiKey, mapDiv]);

	return (
		<div
			ref={(node) => {
				mapDiv = node;
			}}
			style={{ minHeight: 300, borderRadius: 10, width: "100%", ...style }}
			className={className}
		/>
	);
};

// Add types to window for Google Maps callback
type GoogleMaps = {
	Map: new (
		el: HTMLElement,
		opts: { center: { lat: number; lng: number }; zoom: number },
	) => unknown;
};

declare global {
	interface Window {
		google: {
			maps: GoogleMaps;
		};
		initMap: () => void;
	}
}

type GoogleWindow = Window & {
	google?: { maps?: GoogleMaps };
};
