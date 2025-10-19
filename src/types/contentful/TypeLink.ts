import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeLinkFields {
	name?: EntryFieldTypes.Symbol;
	label?: EntryFieldTypes.Symbol;
	ctaLink?: EntryFieldTypes.Symbol;
	openInNewWindow?: EntryFieldTypes.Boolean;
	type?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"button" | "icon" | "link">>;
	asset?: EntryFieldTypes.AssetLink;
}

export type TypeLinkSkeleton = EntrySkeletonType<TypeLinkFields, "link">;
export type TypeLink<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeLinkSkeleton, Modifiers, Locales>;

export function isTypeLink<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeLink<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "link";
}

export type TypeLinkProps = TypeLink<"WITHOUT_UNRESOLVABLE_LINKS", "en-US">["fields"];
