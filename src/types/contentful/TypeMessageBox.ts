import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeMessageBoxFields {
	title?: EntryFieldTypes.Symbol;
	body?: EntryFieldTypes.Text;
}

export type TypeMessageBoxSkeleton = EntrySkeletonType<TypeMessageBoxFields, "messageBox">;
export type TypeMessageBox<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeMessageBoxSkeleton, Modifiers, Locales>;

export function isTypeMessageBox<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeMessageBox<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "messageBox";
}
