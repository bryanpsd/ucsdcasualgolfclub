import { style } from '@vanilla-extract/css';
import { tokens } from '../../styles/designTokens.css';
import { body as textBlockSectionBody } from '../../components/TextBlockSection/TextBlockSection.css';

export const body = style([textBlockSectionBody, { maxWidth: 'none' }]);

export const textBlock = style([
  tokens({
    marginTop: 48,
    marginX: 'auto',
  }),
]);
