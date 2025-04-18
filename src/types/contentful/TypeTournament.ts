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
  players?: EntryFieldTypes.Integer;
  type?: EntryFieldTypes.Symbol;
  amenities?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"Balls" | "Cart">>;
  firstFlight?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeLeadersSkeleton>
  >;
  secondFlight?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeLeadersSkeleton>
  >;
  results?: EntryFieldTypes.AssetLink;
  clubChampionship?: EntryFieldTypes.Boolean;
  coursePar?: EntryFieldTypes.Integer;
  mensTees?: EntryFieldTypes.Symbol;
  womensTees?: EntryFieldTypes.Symbol;
}

export type TypeTournamentSkeleton = EntrySkeletonType<
  TypeTournamentFields,
  "tournament"
>;
export type TypeTournament<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeTournamentSkeleton, Modifiers, Locales>;

export function isTournament<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeTournament<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "course";
}

export type TypeTournamentProps = TypeTournament<
  "WITHOUT_UNRESOLVABLE_LINKS",
  "en-US"
>["fields"];
