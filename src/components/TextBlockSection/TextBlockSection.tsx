import {
	documentToReactComponents,
	type Options,
} from '@contentful/rich-text-react-renderer'
import {
	BLOCKS,
	type Block,
	type Document,
	INLINES,
	type Inline,
	MARKS,
} from '@contentful/rich-text-types'
import type { CSSProperties } from 'react'
import { Link } from '~components/Link'
import { ResponsiveHeadline } from '~components/ResponsiveHeadline'
import * as styles from '~components/TextBlockSection/TextBlockSection.css'
import { Typography, type TypographyProps } from '~components/Typography'
import { concatClasses } from '~utils/concatClasses'
import { replaceAllSpecialChars } from '~utils/StringUtils'
import { List, ListItem } from './List'

const BODY_TYPOGRAPHY_VARIANT: TypographyProps['variant'] = 'bodyMd'

export type TextBlockSectionProps = {
	text?: Document
	options?: Options
	id?: string
	className?: string
	style?: CSSProperties
}

function generateId(node: Block | Inline): string {
	const { content } = node
	const value = content[0] && 'value' in content[0] ? content[0].value : ''
	return replaceAllSpecialChars(value, '-')
}

/**
 * Configuration for how rich text will be rendered.
 *
 * Note: If options are added/removed from the Contentful rich text authoring experience
 * be sure to also update the `Disclaimer` rich text.
 */
const textBlockSectionOptions: Options = {
	renderNode: {
		// headings
		[BLOCKS.HEADING_1]: (node, children) => (
			<ResponsiveHeadline
				className={styles.h1}
				size={3}
				as="h1"
				id={generateId(node)}
			>
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_2]: (node, children) => (
			<ResponsiveHeadline
				className={styles.h2}
				size={2}
				as="h2"
				id={generateId(node)}
			>
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_3]: (node, children) => (
			<ResponsiveHeadline
				className={styles.h3}
				size={1}
				as="h3"
				id={generateId(node)}
			>
				{children}
			</ResponsiveHeadline>
		),

		[BLOCKS.HEADING_4]: (node, children) => (
			<Typography
				className={styles.h4}
				variant="bodyLg"
				fontWeight={500}
				as="h4"
				id={generateId(node)}
			>
				{children}
			</Typography>
		),

		// body
		[BLOCKS.PARAGRAPH]: (_node, children) => (
			<Typography variant={BODY_TYPOGRAPHY_VARIANT} className={styles.body}>
				{children}
			</Typography>
		),
		// List
		[BLOCKS.UL_LIST]: (_node, children) => (
			<List variant={BODY_TYPOGRAPHY_VARIANT}>{children}</List>
		),
		[BLOCKS.OL_LIST]: (_node, children) => (
			<List variant={BODY_TYPOGRAPHY_VARIANT} ordered>
				{children}
			</List>
		),
		[BLOCKS.LIST_ITEM]: (_node, children) => <ListItem>{children}</ListItem>,

		// Links
		[INLINES.HYPERLINK]: (node, children) => {
			const isJumpLink = node.data.uri.startsWith('#')
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
			// Subscript is being used to apply disclaimer text styling. In order to get the text styling
			// to apply to the `Disclaimer` popover `linkText` the styles needed to be applied to the
			// parent container. See the `body` style in `TextBlockSection.css.ts` for more details.
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
			<span style={{ textDecoration: 'underline' }}>{children}</span>
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
