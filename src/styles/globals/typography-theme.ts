import { constants } from "./constants"

const typography = {
	// @material-ui/core/styles/createTypography.d.ts
	htmlFontSize: 10, // html.fontSize set to 62.5% in `CssBaseline` override
	fontFamily: "Roboto, Arial, sans-serif",
	...constants.typography,
}

export { typography }
