import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "~styles";

export const backToTopButton = style([
	tokens({
		position: "fixed",
		borderRadius: "round",
		width: 32,
		height: 32,
	}),
	{
		bottom: "2rem",
		right: "2rem",
		zIndex: 1000,
		translate: "100px 0",
		transition: "translate 0.3s ease, background 0.2s",
		selectors: {
			"body.mobile-nav-open &": {
				display: "none",
			},
		},
	},
]);

export const backToTopButtonIcon = style([
	tokens({
		display: "block",
	}),
]);

// Add container query with scroll-state in global styles
globalStyle(`.${backToTopButton}`, {
	"@container page scroll-state(scrollable: top)": {
		translate: "0 0",
	},
});
