import { ucsd } from "~styles/ucsd"

const gutterWidth = "2.4rem"
const outerMarginWidth = "3.2rem"
const smallOuterMarginWidth = "1.6rem"

const constants = {
	snackbarSize: {
		width: "33.6rem",
		minHeight: "6.8rem",
	},
	snackbarGridStyles: { display: "flex", alignItems: "center" },
	snackbarIconStyles: {
		marginRight: "0.9rem",
		height: "2.4rem",
		width: "2.4rem",
	},
	headerAppBar: {
		height: "6.4rem",
		width: "100%",
		backgroundColor: "#ffffff",
		color: "#000000",
		padding: 0,
	},
	headerHeight: "6.4rem",
	smallHeaderLogo: {
		width: "3.4rem",
	},
	headerLogoContainer: {
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		width: "21rem",
	},
	headerLogo: {
		width: "9.3rem",
		height: "4.3rem",
	},
	drawerWidth: "21rem",
	drawerWidthCondensed: "7.2rem",
	tabPadding: {
		default: "0.4rem 1.2rem",
		small: "0 0.9rem",
	},
	tabMinWidthPx: 160,
	buttonPadding: {
		medium: "1.1rem 1rem",
		small: "0.6rem",
		large: "1.8rem 1.6rem",
	},
	pillHeight: {
		small: "1.6rem",
		default: "2.0rem",
	},
	buttonMinWidth: "9.6rem",
	buttonTextSmallPadding: "0.2rem 0",
	buttonIconSmall: "1.6rem",
	buttonIconSmallMargin: "0.4rem",
	buttonTouchRippleMargin: "-0.2rem",
	border: (width: number, color: string): string =>
		`0.${width}rem solid ${color}`,
	radioBoxMinHeight: "7rem",
	radioBoxWidth: "36.8rem",
	radioBoxLabelMaxWidth: "28.9rem",
	radioBoxSpacing: {
		root: "1.4rem",
		column: "2rem 0 0",
		row: "2rem 1.6rem 0 0",
		rowLastChild: "2rem 0 0 0",
		titleBottom: "0.4rem",
		none: "0",
	},
	fullModalMaxWidth: "192rem",
	fullModalMinWidth: "96rem",
	fullModalControlButtonPadding: `2.4rem ${outerMarginWidth} 3.2rem`,
	fullModalChildMinHeight: "51rem",
	fullModalChildPadding: `0 ${gutterWidth}`,
	fullModalTitleMargin: "2.6rem",
	fullModalTitlePadding: `0 ${gutterWidth}`,
	fullModalStepperWidth: "31.2rem",
	fullModalStepperMargin: `-${gutterWidth}`,
	fullModalDisclaimerHeight: "4.4rem",
	fullModalDisclaimerWidth: "calc(100% - 4.8rem)",
	fullModalDisclaimerMargin: `3.8rem ${gutterWidth} 6.6rem`,
	fullModalCtaPlacement: { top: 0, right: 0 },
	containedModalMinWidth: "80.2rem",
	containedModalMinHeight: "55.2rem",
	containedChildMinHeight: "37.8rem",
	containedModalSpacingPadding: `3.2rem ${outerMarginWidth}`,
	containedModalChildMargin: "0.8rem 0",
	tableCellSpacing: {
		cellPaddingRight: "1.6rem",
		cellPaddingLeft: "1.6rem",
		headerCellPaddingRight: "0.8rem",
		headerCellPaddingLeft: "1.6rem",
	},
	tableMinHeight: {
		small: "17.5rem",
		normal: "56.1rem",
	},
	tableMaxHeight: {
		containedModal: "30.7rem",
		fullModal: "36.5rem",
	},
	alertWidth: "38.9rem",
	alertSpacing: {
		boxPadding: smallOuterMarginWidth,
		buttonPadding: "0.7rem",
	},
	alertButtonWidth: "17rem",
	alertDividerWidth: "0.2rem",
	alertDividerHeight: "3.2rem",
	borderRadius: {
		small: "0.4rem",
		medium: "0.6rem",
		large: "0.8rem",
		round: "50%",
	},
	messageIconSize: "6rem",
	signInMessageMargin: "10rem",
	signInMessageBodyMargin: "1rem",
	signInMessageBodyWidth: "42.7rem",
	signInMessageButtonMargin: "4rem",
	faqPaperPadding: outerMarginWidth,
	faqPageTitleMargin: `4.1rem ${gutterWidth} 3.2rem`,
	faqDisclaimerMarginTop: "4.8rem",
	faqTermsMarginTop: "1.2rem",
	faqTermsMarginBottom: "4.8rem",
	questionTitleMargin: gutterWidth,
	nextStepsNumberFont: {
		fontWeight: 700,
		fontSize: "1.3rem",
	},
	nextStepsNumberSize: "2.1rem",
	nextStepsNumberPadding: "0.4rem",
	nextStepsTitlePadding: "2.5rem", // nextStepNumberSize + nextStepsNumberPadding
	nextStepsTitleMarginBottom: "2.4rem",
	nextStepMarginTop: "6.1rem",
	nextStepsStepsWidth: {
		steps2: {
			default: "75%",
			small: "100%",
		},
		steps3: {
			default: "100%",
			small: "125%",
			negativeMargin: "-12.5%",
		},
	},
	extraTypography: {
		caption: ucsd.typography.variants.caption,
	},
	typography: {
		h1: ucsd.typography.variants.headline,
		h2: ucsd.typography.variants.pageTitle,
		h3: ucsd.typography.variants.title,
		h4: ucsd.typography.variants.heroTitle,
		h5: ucsd.typography.variants.sectionTitle,
		h6: ucsd.typography.variants.largeBody,
		subtitle1: ucsd.typography.variants.disclaimer,
		subtitle2: ucsd.typography.variants.navigation,
		caption: {},
		body1: ucsd.typography.variants.body,
		body2: ucsd.typography.variants.smallBody,
		button: {},
		overline: {},
	},
	columnInfo: {
		"& > .MuiGrid-item": {
			marginBottom: "1.6rem",
		},
	},
	paperInfo: {
		width: "100%",
		margin: "2.2rem 0 1.6rem",
		padding: "3.2rem",
	},
	detailHeader: {
		display: "flex",
		alignItems: "center",
		"& > .MuiButton-root": {
			marginRight: "1.6rem",
		},
	},
} as const

export { constants }
