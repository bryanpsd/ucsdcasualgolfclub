import type { PointerEventHandler } from "react"

const disableHoverInteraction: PointerEventHandler<HTMLElement> = (e) => {
	e.preventDefault()
}

export const disableHover = {
	onPointerMove: disableHoverInteraction,
	onPointerLeave: disableHoverInteraction,
}
