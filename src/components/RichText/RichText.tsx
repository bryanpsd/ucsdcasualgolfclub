import type { Options } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import type { ComponentType } from "react";
import { Button } from "~components/Button";
import { ContentfulImage } from "~components/Image/ContentfulImage";
import { Link } from "~components/Link/Link";
import { ResponsiveHeadline } from "~components/ResponsiveHeadline";
import { TextBlockSection } from "~components/TextBlockSection";
import { List } from "~components/TextBlockSection/List";
import type { TypographyProps } from "~components/Typography";
import { Typography } from "~components/Typography";
import type { TypeLinkFields } from "~types/contentful";
import type { FileType, FileWithDetails } from "~types/FileTypes";

import * as styles from "./RichText.css";

const BLOCKS = {
	DOCUMENT: "document",
	PARAGRAPH: "paragraph",
	HEADING_1: "heading-1",
	HEADING_2: "heading-2",
	HEADING_3: "heading-3",
	HEADING_4: "heading-4",
	HEADING_5: "heading-5",
	HEADING_6: "heading-6",
	OL_LIST: "ordered-list",
	UL_LIST: "unordered-list",
	LIST_ITEM: "list-item",
	QUOTE: "blockquote",
	HR: "hr",
	EMBEDDED_ENTRY: "embedded-entry-block",
	EMBEDDED_ASSET: "embedded-asset-block",
	TABLE: "table",
	TABLE_ROW: "table-row",
	TABLE_CELL: "table-cell",
	TABLE_HEADER_CELL: "table-header-cell",
};

const INLINES = {
	HYPERLINK: "hyperlink",
	ENTRY_HYPERLINK: "entry-hyperlink",
	ASSET_HYPERLINK: "asset-hyperlink",
	EMBEDDED_ENTRY: "embedded-entry-inline",
};

const MARKS = {
	BOLD: "bold",
	ITALIC: "italic",
	UNDERLINE: "underline",
	CODE: "code",
};

const BODY_TYPOGRAPHY_VARIANT: TypographyProps["variant"] = "bodyMd";

function hasImageDetails(file: FileType): file is FileWithDetails {
	if (!("details" in file)) return false;
	const details = (file as Partial<FileWithDetails>).details;
	if (!details || typeof details !== "object") return false;
	return "image" in details;
}

const iconMap: Record<string, ComponentType<Record<string, unknown>>> = {};

type MinimalEntry<F = unknown> = {
	sys?: { contentType?: { sys?: { id?: string } } };
	fields?: F;
};

type MinimalAsset = {
	sys?: { type?: string };
	fields?: {
		file?: {
			url?: string;
			fileName?: string;
			details?: { image?: { width?: number; height?: number } };
		};
	};
};

type SeasonRecapFields = {
	summary?: Document;
	winners?: Array<{ fields: { title: string; file: FileType } }>;
};

function getTarget(node: unknown): unknown {
	return (node as { data?: { target?: unknown } } | undefined)?.data?.target;
}

function isEntryOf<F>(target: unknown, contentTypeId: string): target is MinimalEntry<F> {
	if (typeof target !== "object" || target === null) return false;
	const id = (target as MinimalEntry).sys?.contentType?.sys?.id;
	return typeof id === "string" && id === contentTypeId;
}

function isAsset(target: unknown): target is MinimalAsset {
	if (typeof target !== "object" || target === null) return false;
	const file = (target as MinimalAsset).fields?.file;
	return typeof file?.url === "string";
}

const options: Options = {
	renderMark: {
		[MARKS.ITALIC]: (_text) => <em>{_text}</em>,
		[MARKS.BOLD]: (_text) => <strong>{_text}</strong>,
	},
	renderNode: {
		[BLOCKS.HEADING_1]: (_node, children) => (
			<ResponsiveHeadline size={1} as="h1">
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_2]: (_node, children) => (
			<ResponsiveHeadline size={2} as="h2">
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_3]: (_node, children) => (
			<ResponsiveHeadline size={3} as="h3">
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_4]: (_node, children) => (
			<ResponsiveHeadline size={4} as="h4">
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_5]: (_node, children) => (
			<ResponsiveHeadline size={4} as="h5">
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_6]: (_node, children) => (
			<ResponsiveHeadline size={4} as="h6">
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.PARAGRAPH]: (_node, children) => (
			<Typography variant={BODY_TYPOGRAPHY_VARIANT}>{children}</Typography>
		),

		[BLOCKS.UL_LIST]: (_node, children) => (
			<List variant={BODY_TYPOGRAPHY_VARIANT}>{children}</List>
		),

		[BLOCKS.OL_LIST]: (_node, children) => (
			<List variant={BODY_TYPOGRAPHY_VARIANT} ordered>
				{children}
			</List>
		),
		[BLOCKS.QUOTE]: (_node, children) => <blockquote>{children}</blockquote>,
		[BLOCKS.HR]: () => <hr />,

		[BLOCKS.EMBEDDED_ASSET]: (node) => {
			const target = getTarget(node);
			if (!isAsset(target)) return null;
			const { url, fileName, details } = target.fields?.file ?? {};
			const width = details?.image?.width;
			const height = details?.image?.height;
			if (!url) return null;
			return (
				<ContentfulImage
					className={styles.image}
					src={url}
					alt={fileName ?? ""}
					width={width}
					height={height}
				/>
			);
		},
		[BLOCKS.EMBEDDED_ENTRY]: (node) => {
			const target = getTarget(node);
			if (isEntryOf<TypeLinkFields>(target, "link") && target.fields) {
				const fields = target.fields;
				const nameFallback = (fields as unknown as Record<string, unknown>).name as
					| string
					| undefined;
			const label = String(fields.label ?? nameFallback ?? "");
			const href = fields.ctaLink ? String(fields.ctaLink) : undefined;
			const typeValues = Array.isArray(fields.type) ? (fields.type as unknown as string[]) : [];
			const openInNewWindow = Boolean(fields.openInNewWindow);
			if (!href) return null;

			const isButton = typeValues.includes("button");
			const isIcon = typeValues.includes("icon");
			const isPlainLink = typeValues.includes("link") || (!isButton && !isIcon);

			if (isButton) {
				return (
					<Button
						as="a"
						href={href}
						size="small"
						color="primary"
						variant="contained"
						target={openInNewWindow ? "_blank" : undefined}
						rel={openInNewWindow ? "noopener noreferrer" : undefined}
						track={true}
						trackLabel={label}
						trackCategory="rich_text_button"
					>
						{label}
					</Button>
				);
			}

			if (isIcon) {
				const Icon = iconMap[label];
				return (
					<Button
						as="a"
						href={href}
						size="small"
						color="primary"
						variant="round"
						target={openInNewWindow ? "_blank" : undefined}
						rel={openInNewWindow ? "noopener noreferrer" : undefined}
						track={true}
						trackLabel={label}
						trackCategory="rich_text_icon_button"
					>
						{Icon ? (
							<>
								<Icon aria-hidden="true" focusable="false" />
								<span className="sr-only">{label}</span>
							</>
						) : (
							label
						)}
					</Button>
				);
			}

			if (isPlainLink) {
				return (
					<Link
						href={href}
						target={openInNewWindow ? "_blank" : undefined}
						rel={openInNewWindow ? "noopener noreferrer" : undefined}
						track={true}
						trackLabel={label}
						trackCategory="rich_text_link"
						variant="blue"
					>
						{label}
					</Link>
				);
			}
		}			if (
				isEntryOf<SeasonRecapFields>(target, "seasonRecap") &&
				(target as MinimalEntry<SeasonRecapFields>).fields
			) {
				const fields = (target as MinimalEntry<SeasonRecapFields>).fields as SeasonRecapFields;
				const { summary, winners } = fields;
				return (
					<div className={styles.seasonRecap}>
						<RichText richText={summary} />
						<ul className={styles.seasonRecapList}>
							{winners?.map((winner) => {
								const { title, file } = winner.fields;
								return (
									<li key={title}>
										<ContentfulImage
											className={styles.image}
											src={file.url}
											alt={file.title}
											width={hasImageDetails(file) ? file.details?.image?.width : undefined}
											height={hasImageDetails(file) ? file.details?.image?.height : undefined}
										/>
										<ResponsiveHeadline size={4} as="h3">
											{title}
										</ResponsiveHeadline>
									</li>
								);
							})}
						</ul>
					</div>
				);
			}

			return null;
		},
		[INLINES.EMBEDDED_ENTRY]: (node) => {
			const target = getTarget(node);
			if (isEntryOf<TypeLinkFields>(target, "link") && target.fields) {
				const fields = target.fields as TypeLinkFields;
				const nameFallback = (fields as unknown as Record<string, unknown>).name as
					| string
					| undefined;
				const label = String(fields.label ?? nameFallback ?? "");
				const href = fields.ctaLink ? String(fields.ctaLink) : undefined;
				const typeValues = Array.isArray(fields.type) ? (fields.type as unknown as string[]) : [];
				const openInNewWindow = Boolean(fields.openInNewWindow);
				if (!href) return null;

				const isButton = typeValues.includes("button");
				const isIcon = typeValues.includes("icon");
				const isPlainLink = typeValues.includes("link") || (!isButton && !isIcon);

				if (isButton) {
					return (
						<Button
							as="a"
							href={href}
							size="small"
							color="primary"
							variant="contained"
							target={openInNewWindow ? "_blank" : undefined}
							rel={openInNewWindow ? "noopener noreferrer" : undefined}
							track={true}
							trackLabel={label}
							trackCategory="rich_text_inline_button"
						>
							{label}
						</Button>
					);
				}

				if (isIcon) {
					const Icon = iconMap[label];
					return (
						<Button
							as="a"
							href={href}
							size="small"
							color="primary"
							variant="round"
							target={openInNewWindow ? "_blank" : undefined}
							rel={openInNewWindow ? "noopener noreferrer" : undefined}
							track={true}
							trackLabel={label}
							trackCategory="rich_text_inline_icon_button"
						>
							{Icon ? (
								<>
									<Icon aria-hidden="true" focusable="false" />
									<span className="sr-only">{label}</span>
								</>
							) : (
								label
							)}
						</Button>
					);
				}

				if (isPlainLink) {
					return (
						<Link
							href={href}
							target={openInNewWindow ? "_blank" : undefined}
							rel={openInNewWindow ? "noopener noreferrer" : undefined}
							track={true}
							trackLabel={label}
							trackCategory="rich_text_inline_link"
							variant="blue"
						>
							{label}
						</Link>
					);
				}
			}
			return null;
		},

		[INLINES.HYPERLINK]: (node, children) => {
			const uri = (node?.data as { uri?: string } | undefined)?.uri || "";
			if (uri.startsWith("https://")) {
				return (
					<Link variant="blue" target="_blank" rel="noopener noreferrer" href={uri}>
						{children}
					</Link>
				);
			}
			if (uri.startsWith("mailto:")) {
				return <Link href={uri}>{children}</Link>;
			}
			if (uri.startsWith("/") || uri.startsWith("#")) {
				return <Link href={uri}>{children}</Link>;
			}
			return null;
		},
	},
};

interface RichTextProps {
	richText?: Document;
}

export const RichText = ({ richText }: RichTextProps) => {
	return <TextBlockSection className={styles.textBlock} text={richText} options={options} />;
};
