import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful"
import type { TypeResultsSkeleton } from "./TypeResults"
import type { TypeYearlyStatsSkeleton } from "./TypeYearlyStats"

export interface TypeLeadersFields {
	playerName?: EntryFieldTypes.Symbol
	handicapIndex?: EntryFieldTypes.Number
	gross?: EntryFieldTypes.Integer
	net?: EntryFieldTypes.Number
	flight?: EntryFieldTypes.Symbol<"First Flight" | "Second Flight">
	roundsCheck?: EntryFieldTypes.Boolean
	guest?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"Yes">>
	onCurrentRoster?: EntryFieldTypes.Boolean
	results?: EntryFieldTypes.Array<
		EntryFieldTypes.EntryLink<TypeResultsSkeleton>
	>
	yearlyStats?: EntryFieldTypes.Array<
		EntryFieldTypes.EntryLink<TypeYearlyStatsSkeleton>
	>
}

export type TypeLeadersSkeleton = EntrySkeletonType<
	TypeLeadersFields,
	"leaders"
>
export type TypeLeaders<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeLeadersSkeleton, Modifiers, Locales>

export function isTypeLeaders<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode,
>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeLeaders<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "leaders"
}

export type TypeLeadersProps = TypeLeaders<
	"WITHOUT_UNRESOLVABLE_LINKS",
	"en-US"
>["fields"]
