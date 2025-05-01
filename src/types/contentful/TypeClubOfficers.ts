import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeLeadersSkeleton } from './TypeLeaders'

export interface TypeClubOfficersFields {
  role?: EntryFieldTypes.Symbol
  name?: EntryFieldTypes.EntryLink<TypeLeadersSkeleton>
}

export type TypeClubOfficersSkeleton = EntrySkeletonType<TypeClubOfficersFields, 'clubOfficers'>
export type TypeClubOfficers<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeClubOfficersSkeleton, Modifiers, Locales>

export function isTypeClubOfficers<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeClubOfficers<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'clubOfficers'
}
