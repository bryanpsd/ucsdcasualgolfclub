import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful"

export interface TypeSeasonRecapFields {
	title?: EntryFieldTypes.Symbol
	year?: EntryFieldTypes.Integer
	summary?: EntryFieldTypes.RichText
	winners?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
}

export type TypeSeasonRecapSkeleton = EntrySkeletonType<
	TypeSeasonRecapFields,
	"seasonRecap"
>
export type TypeSeasonRecap<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeSeasonRecapSkeleton, Modifiers, Locales>

export function isTypeSeasonRecap<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode,
>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeSeasonRecap<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "seasonRecap"
}

export type TypeSeasonRecapProps = TypeSeasonRecap<
	"WITHOUT_UNRESOLVABLE_LINKS",
	"en-US"
>["fields"]
