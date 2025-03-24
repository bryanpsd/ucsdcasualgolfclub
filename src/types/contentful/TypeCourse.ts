import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';
import type { TypeLeadersSkeleton } from './TypeLeaders';

export interface TypeCourseFields {
  courseName?: EntryFieldTypes.Symbol;
  course?: EntryFieldTypes.Symbol;
  slug?: EntryFieldTypes.Symbol;
  date?: EntryFieldTypes.Date;
  price?: EntryFieldTypes.Symbol;
  players?: EntryFieldTypes.Symbol;
  type?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  amenities?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<'Balls' | 'Cart'>>;
  courseSite?: EntryFieldTypes.Symbol;
  summary?: EntryFieldTypes.RichText;
  notes?: EntryFieldTypes.Symbol;
  isSpecial?: EntryFieldTypes.Boolean;
  firstFlight?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeLeadersSkeleton>
  >;
  secondFlight?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeLeadersSkeleton>
  >;
  address?: EntryFieldTypes.Location;
  results?: EntryFieldTypes.AssetLink;
  winners?: EntryFieldTypes.RichText;
}

export type TypeCourseSkeleton = EntrySkeletonType<TypeCourseFields, 'course'>;
export type TypeCourse<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeCourseSkeleton, Modifiers, Locales>;

export function isTypeCourse<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeCourse<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'course';
}

export type TypeCourseProps = TypeCourse<
  'WITHOUT_UNRESOLVABLE_LINKS',
  'en-US'
>['fields'];
