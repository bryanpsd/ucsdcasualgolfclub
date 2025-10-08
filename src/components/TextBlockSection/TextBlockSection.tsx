import {
	documentToReactComponents,
	type Options,
} from "@contentful/rich-text-react-renderer"
import type { Block, Document, Inline } from "@contentful/rich-text-types"
import type { CSSProperties } from "react"
import { Link } from "~components/Link"
import { ResponsiveHeadline } from "~components/ResponsiveHeadline"
import * as styles from "~components/TextBlockSection/TextBlockSection.css"
import { Typography, type TypographyProps } from "~components/Typography"
import { concatClasses } from "~utils/concatClasses"
import { replaceAllSpecialChars } from "~utils/StringUtils"
import { List, ListItem } from "./List"

const BLOCKS = {
	HEADING_1: "heading-1",
	HEADING_2: "heading-2",
	HEADING_3: "heading-3",
	HEADING_4: "heading-4",
	PARAGRAPH: "paragraph",
	UL_LIST: "unordered-list",
	OL_LIST: "ordered-list",
	LIST_ITEM: "list-item",
}
const INLINES = { HYPERLINK: "hyperlink" }
const MARKS = { BOLD: "bold", SUBSCRIPT: "subscript", UNDERLINE: "underline" }

const BODY_TYPOGRAPHY_VARIANT: TypographyProps["variant"] = "bodyMd"

export type TextBlockSectionProps = {
	text?: Document
	options?: Options
	id?: string
	className?: string
	style?: CSSProperties
}

function generateId(node: Block | Inline): string {
	const { content } = node
	const value = content[0] && "value" in content[0] ? content[0].value : ""
	return replaceAllSpecialChars(value, "-")
}

const textBlockSectionOptions: Options = {
	renderNode: {
		[BLOCKS.HEADING_1]: (node, children) => (
			<ResponsiveHeadline size={3} as="h1" id={generateId(node)}>
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_2]: (node, children) => (
			<ResponsiveHeadline size={2} as="h2" id={generateId(node)}>
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_3]: (node, children) => (
			<ResponsiveHeadline size={1} as="h3" id={generateId(node)}>
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_4]: (node, children) => (
			<Typography
				variant="bodyLg"
				fontWeight={500}
				as="h4"
				id={generateId(node)}
			>
				{children}
			</Typography>
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
		[BLOCKS.LIST_ITEM]: (_node, children) => <ListItem>{children}</ListItem>,
		[INLINES.HYPERLINK]: (node, children) => {
			const isJumpLink = node.data.uri.startsWith("#")
			return (
				<Link
					className={styles.link}
					href={node.data.uri}
					jumpLink={isJumpLink}
				>
					{children}
				</Link>
			)
		},
	},
	renderMark: {
		[MARKS.BOLD]: (children) => (
			<span style={{ fontWeight: 500 }}>{children}</span>
		),
		[MARKS.SUBSCRIPT]: (children) => (
			<Typography
				as="span"
				variant="inherit"
				color="inherit"
				data-disclaimer-style="true"
			>
				{children}
			</Typography>
		),
		[MARKS.UNDERLINE]: (children) => (
			<span style={{ textDecoration: "underline" }}>{children}</span>
		),
	},
}

export const TextBlockSection = ({
	id,
	className,
	style,
	text,
	options,
}: TextBlockSectionProps) => {
	if (!text) return null

	return (
		<div
			id={id}
			className={concatClasses([styles.richTextContainer, className])}
			style={style}
		>
			{documentToReactComponents(text, {
				...textBlockSectionOptions,
				...options,
				renderNode: {
					...textBlockSectionOptions.renderNode,
					...options?.renderNode,
				},
				renderMark: {
					...textBlockSectionOptions.renderMark,
					...options?.renderMark,
				},
			})}
		</div>
	)
}
