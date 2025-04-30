import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeLeadersSkeleton } from "./TypeLeaders";

export interface TypeTournamentFields {
  title: EntryFieldTypes.Symbol;
  date: EntryFieldTypes.Date;
  price?: EntryFieldTypes.Integer;
  prices?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  players?: EntryFieldTypes.Symbol;
  type?: EntryFieldTypes.Symbol;
  inclusions?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  firstFlight?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeLeadersSkeleton>
  >;
  secondFlight?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeLeadersSkeleton>
  >;
  results?: EntryFieldTypes.AssetLink;
  resultsJson?: EntryFieldTypes.Object;
  clubChampionship?: EntryFieldTypes.Boolean;
  tees?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeTournamentSkeleton = EntrySkeletonType<
  TypeTournamentFields,
  "tournament"
>;
export type TypeTournament<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeTournamentSkeleton, Modifiers, Locales>;

export function isTypeTournament<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeTournament<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "tournament";
}

export type TypeTournamentProps = TypeTournament<
  "WITHOUT_UNRESOLVABLE_LINKS",
  "en-US"
>["fields"];
