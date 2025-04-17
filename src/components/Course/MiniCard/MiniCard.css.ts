import { style } from "@vanilla-extract/css";
import { tokens } from "../../../styles/designTokens.css";
import { color } from "../../../styles/designTokens/colors";

export const miniCardWrapper = style([
  tokens({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }),
  {
    backgroundColor: color.brand.navy,
  },
]);

export const miniCardTitle = style([
  tokens({
    padding: 10,
  }),
  {
    color: color.brand.white,
  },
]);

export const miniCardCourse = style({
  color: color.brand.white,
});

export const miniCard = style([
  tokens({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "col-12",
    gap: 8,
    padding: 10,
  }),
  {
    borderTop: `1px solid ${color.brand.black}`,
  },
]);

export const dateTimeWrapper = style([
  tokens({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "col-12",
    gap: 2,
  }),
  {
    color: color.brand.yellow,
  },
]);
