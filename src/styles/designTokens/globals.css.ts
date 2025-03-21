import { globalFontFace, globalStyle } from '@vanilla-extract/css';
import { ucsdRobotoFontFaces } from '../../styles/typography';

ucsdRobotoFontFaces.forEach((font) => {
  globalFontFace(font.fontFamily, font);
});

const ucsdRobotoFallback = 'Roboto Fallback';
globalFontFace(ucsdRobotoFallback, {
  sizeAdjust: '105%',
  src: 'local(arial)',
});

globalStyle('html', {
  fontSize: 16,
  boxSizing: 'border-box',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('*, *::after, *::before', {
  boxSizing: 'inherit',
  fontFamily: ['Roboto', 'serif', ucsdRobotoFallback].join(', '),
});

globalStyle('strong, b', {
  fontWeight: 700,
});

globalStyle('body', {
  color: '#000000',
  margin: 0,
  fontSize: '1.2rem',
});

globalStyle('.sr-only', {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  border: 0,
});
