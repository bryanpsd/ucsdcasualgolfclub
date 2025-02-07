import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLeadersFields {
    playerName?: EntryFieldTypes.Symbol;
    index?: EntryFieldTypes.Symbol;
    gross?: EntryFieldTypes.Integer;
    net?: EntryFieldTypes.Number;
    flight?: EntryFieldTypes.Symbol<"1st Flight" | "2nd Flight">;
    roundsCheck?: EntryFieldTypes.Boolean;
    guest?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"Yes">>;
}

export type TypeLeadersSkeleton = EntrySkeletonType<TypeLeadersFields, "leaders">;
export type TypeLeaders<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLeadersSkeleton, Modifiers, Locales>;

export function isTypeLeaders<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLeaders<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'leaders'
}
