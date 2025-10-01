export const concatClasses = (classes: Array<string | undefined>) => {
	return classes.filter(Boolean).join(" ")
}
