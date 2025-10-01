// Type guard for file with details
type FileBasic = { url: string; title: string }
type FileWithDetails = {
	url: string
	title: string
	details: { image?: { width?: number; height?: number } }
}
type FileType = FileBasic | FileWithDetails

function hasImageDetails(file: FileType): file is FileWithDetails {
	return (
		"details" in file &&
		typeof file.details === "object" &&
		file.details !== null &&
		"image" in file.details
	)
}

import type { Options } from "@contentful/rich-text-react-renderer"
import type { Document } from "@contentful/rich-text-types"
import { ContentfulImage } from "~components/Image/ContentfulImage"
import { ResponsiveHeadline } from "~components/ResponsiveHeadline"
import { TextBlockSection } from "~components/TextBlockSection"
import { List } from "~components/TextBlockSection/List"
import type { TypographyProps } from "~components/Typography"
import { Typography } from "~components/Typography"

import * as styles from "./RichText.css"

// Contentful rich text constants (ESM-compatible)
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
}

const BODY_TYPOGRAPHY_VARIANT: TypographyProps["variant"] = "bodyMd"

const options: Options = {
	renderNode: {
		[BLOCKS.HEADING_2]: (_node, children) => (
			<ResponsiveHeadline size={2} as="h2">
				{children}
			</ResponsiveHeadline>
		),

		[BLOCKS.PARAGRAPH]: (_node, children) => (
			<Typography variant={BODY_TYPOGRAPHY_VARIANT} className={styles.body}>
				{children}
			</Typography>
		),

		[BLOCKS.UL_LIST]: (_node, children) => (
			<List variant={BODY_TYPOGRAPHY_VARIANT}>{children}</List>
		),

		[BLOCKS.OL_LIST]: (_node, children) => (
			<List variant={BODY_TYPOGRAPHY_VARIANT} ordered>
				{children}
			</List>
		),

		[BLOCKS.EMBEDDED_ASSET]: (node) => {
			const { url, fileName, details } = node.data.target.fields.file
			const width = details?.image?.width
			const height = details?.image?.height
			return (
				<ContentfulImage
					className={styles.image}
					src={url}
					alt={fileName}
					width={width}
					height={height}
				/>
			)
		},
		[BLOCKS.EMBEDDED_ENTRY]: (node) => {
			if (node.data.target.sys.contentType.sys.id === "seasonRecap") {
				const { summary } = node.data.target.fields
				const { winners } = node.data.target.fields
				return (
					<div className={styles.seasonRecap}>
						<RichText richText={summary} />
						<ul className={styles.seasonRecapList}>
							{winners.map(
								(winner: {
									fields: {
										title: string
										file: { url: string; title: string }
									}
								}) => {
									const { title, file } = winner.fields
									return (
										<li key={title}>
											<ContentfulImage
												className={styles.image}
												src={file.url}
												alt={file.title}
												width={
													hasImageDetails(file)
														? file.details?.image?.width
														: undefined
												}
												height={
													hasImageDetails(file)
														? file.details?.image?.height
														: undefined
												}
											/>
											<ResponsiveHeadline size={1} as="h3">
												{title}
											</ResponsiveHeadline>
										</li>
									)
								}
							)}
						</ul>
					</div>
				)
			}
		},
	},
}

interface RichTextProps {
	richText?: Document
}

export const RichText = ({ richText }: RichTextProps) => {
	return (
		<TextBlockSection
			className={styles.textBlock}
			text={richText}
			options={options}
		/>
	)
}
