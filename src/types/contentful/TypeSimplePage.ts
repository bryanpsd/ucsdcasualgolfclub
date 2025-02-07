import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSimplePageFields {
    title?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    class?: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.RichText;
}

export type TypeSimplePageSkeleton = EntrySkeletonType<TypeSimplePageFields, "simplePage">;
export type TypeSimplePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSimplePageSkeleton, Modifiers, Locales>;

export function isTypeSimplePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeSimplePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'simplePage'
}
