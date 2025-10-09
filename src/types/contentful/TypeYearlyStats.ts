import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeYearlyStatsFields {
	title?: EntryFieldTypes.Symbol;
	year?: EntryFieldTypes.Integer;
	gross?: EntryFieldTypes.Integer;
	net?: EntryFieldTypes.Integer;
}

export type TypeYearlyStatsSkeleton = EntrySkeletonType<TypeYearlyStatsFields, "yearlyStats">;
export type TypeYearlyStats<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeYearlyStatsSkeleton, Modifiers, Locales>;

export function isTypeYearlyStats<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeYearlyStats<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "yearlyStats";
}

export type TypeYearlyStatsProps = TypeYearlyStats<"WITHOUT_UNRESOLVABLE_LINKS", "en-US">["fields"];
