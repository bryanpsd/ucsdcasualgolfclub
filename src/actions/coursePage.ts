import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { contentfulClient } from "../services/contentful/contentful";
import type { TypeCourseSkeleton } from "../types/contentful/TypeCourse";
import { generateSlugWithYear } from "../utils/contentfulTransformers";

export const getCoursePage = defineAction({
	input: z.string(),
	handler: async (slug: string) => {
		const pageData = await contentfulClient.withoutUnresolvableLinks.getEntries<TypeCourseSkeleton>(
			{
				content_type: "course",
				"fields.slug": slug.toLowerCase(),
				include: 3, // Reduced from 10 to 3 for better performance
				limit: 1,
			},
		);

		if (!pageData.items.length) {
			return { error: true, data: null };
		}

		const fields = pageData.items[0]?.fields;
		if (!fields) {
			return { error: true, data: null };
		}

		return {
			error: false,
			data: {
				...fields,
				slug: generateSlugWithYear(fields),
			},
		};
	},
});
