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

export const contentfulClient = contentful.createClient({
	space: import.meta.env.CONTENTFUL_SPACE_ID,
	accessToken:
		// In CI environments, always use delivery token even in dev mode
		import.meta.env.CI || !import.meta.env.DEV
			? import.meta.env.CONTENTFUL_DELIVERY_TOKEN
			: import.meta.env.CONTENTFUL_PREVIEW_TOKEN,
	host:
		import.meta.env.CI || !import.meta.env.DEV ? "cdn.contentful.com" : "preview.contentful.com",
});
