import { globalStyle } from "@vanilla-extract/css"

globalStyle("html", {
	fontSize: 16,
	boxSizing: "border-box",
	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale",
	fontFamily: "Roboto, Arial, sans-serif",
})

globalStyle("*, *::after, *::before", {
	boxSizing: "inherit",
})

globalStyle("body", {
	color: "#000000",
	margin: 0,
	fontSize: "1rem",
	lineHeight: 1.5,
	fontFamily: "inherit",
	background: "#fff",
	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale",
})

globalStyle("strong, b", {
	fontWeight: 700,
})

globalStyle(".sr-only", {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: 0,
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0,0,0,0)",
	border: 0,
})
