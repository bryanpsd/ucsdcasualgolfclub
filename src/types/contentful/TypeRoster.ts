import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

import type { TypeLeadersSkeleton } from './TypeLeaders'

export interface TypeRosterFields {
  title?: EntryFieldTypes.Symbol
  year?: EntryFieldTypes.Number
  players?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLeadersSkeleton>>
}

export type TypeRosterSkeleton = EntrySkeletonType<TypeRosterFields, 'roster'>
export type TypeRoster<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeRosterSkeleton, Modifiers, Locales>

export function isTypeRoster<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeRoster<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'roster'
}

export type TypeRosterProps = TypeRoster<'WITHOUT_UNRESOLVABLE_LINKS', 'en-US'>['fields']
