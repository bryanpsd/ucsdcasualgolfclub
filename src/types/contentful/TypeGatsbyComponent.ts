import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeGatsbyComponentFields {
    name?: EntryFieldTypes.Symbol;
    externalName?: EntryFieldTypes.Symbol;
    component?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
}

export type TypeGatsbyComponentSkeleton = EntrySkeletonType<TypeGatsbyComponentFields, "gatsbyComponent">;
export type TypeGatsbyComponent<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeGatsbyComponentSkeleton, Modifiers, Locales>;

export function isTypeGatsbyComponent<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeGatsbyComponent<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'gatsbyComponent'
}
