import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import type {
  TypeCourseProps,
  TypeCourseSkeleton,
} from '../types/contentful/TypeCourse';

import { contentfulClient } from '../lib/contentful';

const courseMapper = (course?: TypeCourseProps) => {
  if (!course) return null;

  return {
    ...course,
  } as const;
};

export const getCourse = defineAction({
  input: z.string(),
  handler: async (course) => {
    const courseData =
      await contentfulClient.withoutUnresolvableLinks.getEntries<TypeCourseSkeleton>(
        {
          content_type: 'course',
          'fields.course': course,
          include: 10,
        }
      );

    if (courseData.errors || !courseData.items[0]?.fields) {
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'Unable to fetch content: ' + JSON.stringify(courseData.errors),
      });
    }

    return courseMapper(courseData.items[0].fields);
  },
});
