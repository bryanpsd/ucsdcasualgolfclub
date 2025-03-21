import { BLOCKS } from '@contentful/rich-text-types';
import { type Options } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';
import { type TypographyProps, Typography } from '~components/Typography';
import { TextBlockSection } from '../../components/TextBlockSection';
import { List } from '../../components/TextBlockSection/List';
import { textBlock, body } from './RichText.css';

const BODY_TYPOGRAPHY_VARIANT: TypographyProps['variant'] = 'bodyLg';

const options: Options = {
  renderNode: {
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
      return <img src={url} alt={fileName} />;
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
