import type { EntryFieldTypes } from "contentful";
import * as contentful from "contentful";

export interface SimplePage {
	contentTypeId: "simplePage";
	fields: {
		title: EntryFieldTypes.Text;
		slug: EntryFieldTypes.Text;
		class: EntryFieldTypes.Text;
		content: EntryFieldTypes.RichText;
	};
}

// Determine if we should use preview mode
export const usePreview =
	import.meta.env.CONTENTFUL_USE_PREVIEW === "true" ||
	import.meta.env.CONTENTFUL_USE_PREVIEW === true;

// In CI, always use delivery token. Otherwise, use preview if enabled
const shouldUsePreview = !import.meta.env.CI && usePreview;

export const contentfulClient = contentful.createClient({
	space: import.meta.env.CONTENTFUL_SPACE_ID,
	accessToken: shouldUsePreview
		? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
		: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
	host: shouldUsePreview ? "preview.contentful.com" : "cdn.contentful.com",
});

// Simple fetch helper for pages; useful for bypassing cache in preview mode
export async function fetchSimplePage(slug: string) {
	const entries = await contentfulClient.getEntries({
		content_type: "simplePage",
		"fields.slug": slug,
		limit: 1,
	});
	return entries;
}
