import { style } from "@vanilla-extract/css";
import { tokens } from "../../../styles/designTokens.css";
import { color } from "../../../styles/designTokens/colors";

export const courseCardInfo = style([
  tokens({
    display: "flex",
    flexDirection: "column",
    alignItems: { "xs-min": "center", "md-min": "flex-start" },
    justifyContent: { "xs-min": "center", "md-min": "flex-start" },
    width: { "xs-min": "col-12", "md-min": "col-5" },
    gap: 8,
  }),
  {},
]);

export const courseCardList = style([
  tokens({
    display: "flex",
  }),
]);

export const courseCardListItem = style([
  tokens({
    display: "flex",
    paddingX: 4,
    alignItems: "center",
  }),
  {
    borderRight: `1px solid ${color.brand.navy}`,
    selectors: {
      "&:first-child": {
        paddingLeft: 0,
      },
      "&:last-child": {
        borderRight: "none",
      },
    },
  },
]);

export const coursePrice = style({
  color: color.outline.success,
});
