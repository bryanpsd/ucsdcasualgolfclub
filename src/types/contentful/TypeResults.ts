import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful"

import type { TypeCourseSkeleton } from "./TypeCourse"

export interface TypeResultsFields {
	title?: EntryFieldTypes.Symbol
	course?: EntryFieldTypes.EntryLink<TypeCourseSkeleton>
	date?: EntryFieldTypes.Date
	flight?: EntryFieldTypes.Symbol<"First Flight" | "Second Flight">
	index?: EntryFieldTypes.Number
	gross?: EntryFieldTypes.Integer
	courseHandicap?: EntryFieldTypes.Integer
	net?: EntryFieldTypes.Integer
	putts?: EntryFieldTypes.Integer
	closestTo?: EntryFieldTypes.Array<
		EntryFieldTypes.Symbol<
			| "1"
			| "10"
			| "11"
			| "12"
			| "13"
			| "14"
			| "15"
			| "16"
			| "17"
			| "18"
			| "2"
			| "3"
			| "4"
			| "5"
			| "6"
			| "7"
			| "8"
			| "9"
		>
	>
	longDrive?: EntryFieldTypes.Symbol<"F" | "M" | "B">
}

export type TypeResultsSkeleton = EntrySkeletonType<
	TypeResultsFields,
	"results"
>
export type TypeResults<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeResultsSkeleton, Modifiers, Locales>

export function isTypeResults<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode,
>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeResults<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "results"
}

export type TypeResultsProps = TypeResults<
	"WITHOUT_UNRESOLVABLE_LINKS",
	"en-US"
>["fields"]
