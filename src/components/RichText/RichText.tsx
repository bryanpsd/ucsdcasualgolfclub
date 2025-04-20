import { BLOCKS } from '@contentful/rich-text-types';
import { type Options } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';

import { type TypographyProps, Typography } from '~components/Typography';
import { TextBlockSection } from '../../components/TextBlockSection';
import { List } from '../../components/TextBlockSection/List';
import { ResponsiveHeadline } from '~components/ResponsiveHeadline';

import * as styles from './RichText.css';

const BODY_TYPOGRAPHY_VARIANT: TypographyProps['variant'] = 'bodyMd';

const options: Options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => (
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
      const { url, fileName } = node.data.target.fields.file;
      return <img className={styles.image} src={url} alt={fileName} />;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      if (node.data.target.sys.contentType.sys.id === 'seasonRecap') {
        const { summary } = node.data.target.fields;
        const { winners } = node.data.target.fields;
        return (
          <div className={styles.seasonRecap}>
            <RichText richText={summary} />
            <ul className={styles.seasonRecapList}>
              {winners.map(
                (winner: { fields: { title: string; file: any } }) => {
                  const { title, file } = winner.fields;
                  return (
                    <li key={title}>
                      <img
                        className={styles.image}
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
    <TextBlockSection
      className={styles.textBlock}
      text={richText}
      options={options}
    />
  );
};
