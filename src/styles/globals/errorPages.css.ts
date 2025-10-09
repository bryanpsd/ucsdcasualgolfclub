import { style } from "@vanilla-extract/css";
import { tokens } from "../index";

export const contentPadding = style([
	tokens({
		paddingY: { "xs-min": 16, "md-min": 24, "lg-min": 48 },
		paddingX: { "xs-min": 16, "md-min": 24, "lg-min": 48 },
	}),
]);
