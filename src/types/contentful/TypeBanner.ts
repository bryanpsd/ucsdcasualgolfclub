import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeBannerFields {
	name?: EntryFieldTypes.Symbol;
	body?: EntryFieldTypes.RichText;
	global?: EntryFieldTypes.Boolean;
	pages?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeBannerSkeleton = EntrySkeletonType<TypeBannerFields, "banner">;
export type TypeBanner<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeBannerSkeleton, Modifiers, Locales>;

export function isTypeBanner<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeBanner<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "banner";
}

export type TypeBannerProps = TypeBanner<"WITHOUT_UNRESOLVABLE_LINKS", "en-US">["fields"];
