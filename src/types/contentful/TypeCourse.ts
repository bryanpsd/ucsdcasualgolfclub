import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from 'contentful'

import type { TypeTournamentSkeleton } from './TypeTournament'

export interface TypeCourseFields {
	courseName?: EntryFieldTypes.Symbol
	course?: EntryFieldTypes.Symbol
	coursePar?: EntryFieldTypes.Symbol
	slug?: EntryFieldTypes.Symbol
	courseSite?: EntryFieldTypes.Symbol
	courseImage?: EntryFieldTypes.AssetLink
	summary?: EntryFieldTypes.RichText
	address?: EntryFieldTypes.Location
	tournaments?: EntryFieldTypes.Array<
		EntryFieldTypes.EntryLink<TypeTournamentSkeleton>
	>
	courseScorecard?: EntryFieldTypes.Object
}

export type TypeCourseSkeleton = EntrySkeletonType<TypeCourseFields, 'course'>
export type TypeCourse<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCourseSkeleton, Modifiers, Locales>

export function isTypeCourse<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode,
>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeCourse<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === 'course'
}

export type TypeCourseProps = TypeCourse<
	'WITHOUT_UNRESOLVABLE_LINKS',
	'en-US'
>['fields']
