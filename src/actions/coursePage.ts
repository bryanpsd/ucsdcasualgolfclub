import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import type {
  TypeCourseProps,
  TypeCourseSkeleton,
} from "../types/contentful/TypeCourse";

import { contentfulClient } from "../lib/contentful";

const mapContentfulFields = (fields?: TypeCourseProps) => {
  if (!fields) return null;

  // Extract tournament year and generate slug
  const tournamentYear = fields.tournaments
    ?.map((tournament) => {
      if (tournament && "fields" in tournament && tournament.fields.date) {
        return new Date(tournament.fields.date).getFullYear(); // Extract year
      }
      return null;
    })
    .filter(Boolean)[0]; // Get the first valid year

  const slugWithYear = tournamentYear
    ? `/${tournamentYear}/${fields.slug}`
    : `/${fields.slug}`; // Combine year and slug

  return {
    ...fields,
    slug: slugWithYear, // Add the generated slug with year
  };
};

export const getCoursePage = defineAction({
  input: z.string(),
  handler: async (slug) => {
    const pageData =
      await contentfulClient.withoutUnresolvableLinks.getEntries<TypeCourseSkeleton>(
        {
          content_type: "course",
          "fields.slug": slug.toLowerCase(),
          include: 10,
        }
      );

    if (!pageData.items.length) {
      return { error: true, data: null };
    }

    const mappedFields = mapContentfulFields(pageData.items[0]?.fields);

    return {
      error: false,
      data: mappedFields, // Return the mapped fields, including the generated slug
    };
  },
});
