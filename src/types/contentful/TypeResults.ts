import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';

import type { TypeCourseSkeleton } from './TypeCourse';

export interface TypeResultsFields {
  title?: EntryFieldTypes.Symbol;
  course?: EntryFieldTypes.EntryLink<TypeCourseSkeleton>;
  flight?: EntryFieldTypes.Symbol<'First Flight' | 'Second Flight'>;
  gross?: EntryFieldTypes.Integer;
  courseHandicap?: EntryFieldTypes.Integer;
  net?: EntryFieldTypes.Integer;
  putts?: EntryFieldTypes.Integer;
  closestTo?: EntryFieldTypes.Integer;
  longDrive?: EntryFieldTypes.Symbol<'F' | 'M'>;
}

export type TypeResultsSkeleton = EntrySkeletonType<
  TypeResultsFields,
  'results'
>;
export type TypeResults<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeResultsSkeleton, Modifiers, Locales>;

export function isResults<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeResults<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'results';
}

export type TypeResultsProps = TypeResults<
  'WITHOUT_UNRESOLVABLE_LINKS',
  'en-US'
>['fields'];
