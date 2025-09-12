const DEFAULT_REM_BASE = 16

type pxRemConvertOptions = {
	withUnit?: boolean
	base?: number
}

export const remToPx = (
	rem: number | `${number}rem`,
	opts: pxRemConvertOptions = {}
) => {
	const { withUnit = false, base = DEFAULT_REM_BASE } = opts
	const remVal = typeof rem === "number" ? rem : Number(rem.split("rem"))
	const pxVal = remVal * base
	return withUnit ? (`${pxVal}px` as const) : pxVal
}

export const pxToRem = (
	px: number | `${number}px`,
	opts: pxRemConvertOptions = {}
) => {
	const { withUnit = false, base = DEFAULT_REM_BASE } = opts
	const pxVal = typeof px === "number" ? px : Number(px.replace("px", ""))
	const remVal = pxVal / base
	return withUnit ? (`${remVal}rem` as const) : remVal
}
