import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import type {
  TypeCourseProps,
  TypeCourseSkeleton,
} from '../types/contentful/TypeCourse';

import { contentfulClient } from '../lib/contentful';

const courseMapper = (fields?: TypeCourseProps) => {
  if (!fields) return null;
  return {
    ...fields,
    courseImage: fields.courseImage?.fields?.file?.url,
  };
};

export const getCourse = defineAction({
  handler: async () => {
    const courseData =
      await contentfulClient.withoutUnresolvableLinks.getEntries<TypeCourseSkeleton>(
        {
          content_type: 'course',
          include: 10,
        }
      );

    return courseMapper(courseData.items[0]?.fields);
  },
});
