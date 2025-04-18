import { BLOCKS } from '@contentful/rich-text-types';
import { type Options } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';
import { type TypographyProps, Typography } from '~components/Typography';
import { TextBlockSection } from '../../components/TextBlockSection';
import { List } from '../../components/TextBlockSection/List';
import {
  textBlock,
  body,
  seasonRecap,
  seasonRecapList,
  image,
} from './RichText.css';
import { ResponsiveHeadline } from '~components/ResponsiveHeadline';

const BODY_TYPOGRAPHY_VARIANT: TypographyProps['variant'] = 'bodyMd';

const options: Options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => (
      <ResponsiveHeadline size={2} as="h2">
        {children}
      </ResponsiveHeadline>
    ),

    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <Typography variant={BODY_TYPOGRAPHY_VARIANT} className={body}>
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
      const { url, fileName } = node.data.target.fields.file;
      return <img className={image} src={url} alt={fileName} />;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      if (node.data.target.sys.contentType.sys.id === 'seasonRecap') {
        const { summary } = node.data.target.fields;
        const { winners } = node.data.target.fields;
        return (
          <div className={seasonRecap}>
            <RichText richText={summary} />
            <ul className={seasonRecapList}>
              {winners.map(
                (winner: { fields: { title: string; file: any } }) => {
                  const { title, file } = winner.fields;
                  return (
                    <li key={title}>
                      <img
                        className={image}
                        src={file.url}
                        alt={file.title}
                        width={file.details.image.width}
                        height={file.details.image.height}
                      />
                      <ResponsiveHeadline size={1} as="h3">
                        {title}
                      </ResponsiveHeadline>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        );
      }
    },
  },
};

interface RichTextProps {
  richText?: Document;
}

export const RichText = ({ richText }: RichTextProps) => {
  return (
    <TextBlockSection className={textBlock} text={richText} options={options} />
  );
};
