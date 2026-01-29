import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeUpdateDateFields {
	title?: EntryFieldTypes.Symbol;
	date?: EntryFieldTypes.Date;
}

export type TypeUpdateDateSkeleton = EntrySkeletonType<TypeUpdateDateFields, "updateDate">;
export type TypeUpdateDate<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeUpdateDateSkeleton, Modifiers, Locales>;

export function isTypeUpdateDate<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeUpdateDate<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "yearlyStats";
}

export type TypeUpdateDateProps = TypeUpdateDate<"WITHOUT_UNRESOLVABLE_LINKS", "en-US">["fields"];
