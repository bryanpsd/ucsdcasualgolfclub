import { globalStyle } from '@vanilla-extract/css';
import { fontFamily } from './designTokens';
import { theme } from '~styles/theme.css';

globalStyle('html', {
  fontFamily: fontFamily.base,
  background: '#ffffff',
  scrollBehavior: 'smooth',
  minWidth: '20rem',
});

globalStyle('*', {
  boxSizing: 'border-box',
  outlineColor: theme.palette.blue[50],
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

globalStyle('.skip-link', {
  position: 'absolute',
  top: '-40px',
  left: '0',
});

globalStyle('.skip-link:focus', {
  top: '0px',
  zIndex: 2000,
});
