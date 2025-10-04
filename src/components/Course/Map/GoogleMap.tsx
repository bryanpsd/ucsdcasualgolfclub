import { useEffect } from "react"

interface GoogleMapProps {
	latitude: number
	longitude: number
	zoom?: number
	apiKey: string
	style?: React.CSSProperties
	className?: string
}

export const GoogleMap = ({
	latitude,
	longitude,
	zoom = 17,
	apiKey,
	style,
	className,
}: GoogleMapProps) => {
	let mapDiv: HTMLDivElement | null = null

	useEffect(() => {
		if (!mapDiv) return
		if (!window.google || !window.google.maps) {
			// Dynamically load the Google Maps script if not already present
			const script = document.createElement("script")
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=&v=weekly`
			script.async = true
			script.defer = true
			window.initMap = () => {
				if (mapDiv) {
					new window.google.maps.Map(mapDiv, {
						center: { lat: latitude, lng: longitude },
						zoom,
					})
				}
			}
			document.body.appendChild(script)
			return () => {
				// Clean up script and global callback
				script.remove()
				window.initMap = () => {}
			}
		} else {
			if (mapDiv) {
				new window.google.maps.Map(mapDiv, {
					center: { lat: latitude, lng: longitude },
					zoom,
				})
			}
		}
	}, [latitude, longitude, zoom, apiKey, mapDiv])

	return (
		<div
			ref={(node) => {
				mapDiv = node
			}}
			style={{ minHeight: 300, borderRadius: 10, width: "100%", ...style }}
			className={className}
		/>
	)
}

// Add types to window for Google Maps callback
type GoogleMaps = {
	Map: new (
		el: HTMLElement,
		opts: { center: { lat: number; lng: number }; zoom: number }
	) => unknown
}

declare global {
	interface Window {
		google: {
			maps: GoogleMaps
		}
		initMap: () => void
	}
}
