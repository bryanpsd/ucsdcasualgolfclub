/**
 * Unchanged Eric Meyer's Reset CSS implemented with vanilla-extract:
 * https://meyerweb.com/eric/tools/css/reset/
 */

import { globalStyle } from '@vanilla-extract/css'

globalStyle(
  `html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video`,
  {
    margin: 0,
    padding: 0,
    border: 0,
    fontSize: '100%',
    font: 'inherit',
    verticalAlign: 'baseline',
  }
)

globalStyle(
  `article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section`,
  {
    display: 'block',
  }
)

globalStyle('body', {
  lineHeight: 1,
})

globalStyle('ol, ul', {
  listStyle: 'none',
})

globalStyle('blockquote, q', {
  quotes: 'none',
})

globalStyle(
  `blockquote:before, blockquote:after,
q:before, q:after`,
  {
    content: ["''", 'none'],
  }
)

globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
})

/** Unchanged normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css
 * implemented in Vanilla-Extract globalStyle entries
 */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

globalStyle('html', {
  lineHeight: 1.15 /* 1 */,
  WebkitTextSizeAdjust: '100%' /* 2 */,
})

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

globalStyle('body', {
  margin: 0,
})

/**
 * Render the `main` element consistently in IE.
 */

globalStyle('main', {
  display: 'block',
})

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

globalStyle('hr', {
  boxSizing: 'content-box' /* 1 */,
  height: 0 /* 1 */,
  overflow: 'visible' /* 2 */,
})

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

globalStyle('pre', {
  fontFamily: 'monospace, monospace' /* 1 */,
  fontSize: '1em' /* 2 */,
})

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

globalStyle('a', {
  backgroundColor: 'transparent',
})

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

globalStyle('abbr[title]', {
  borderBottom: 'none' /* 1 */,
  textDecoration: ['underline', 'underline dotted'] /* 2 */,
})

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

globalStyle('b, strong', {
  fontWeight: 'bolder',
})

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

globalStyle('code, kbd, samp', {
  fontFamily: 'monospace, monospace' /* 1 */,
  fontSize: '1em' /* 2 */,
})

/**
 * Add the correct font size in all browsers.
 */

globalStyle('small', {
  fontSize: '80%',
})

/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */

globalStyle('sub, sup', {
  fontSize: '75%',
  lineHeight: 0,
  position: 'relative',
  verticalAlign: 'baseline',
})

globalStyle('sub', {
  bottom: '-0.25em',
})

globalStyle('sup', {
  top: '-0.5em',
})

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

globalStyle('img', {
  borderStyle: 'none',
})

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

globalStyle('button, input, optgroup, select, textarea', {
  fontFamily: 'inherit' /* 1 */,
  fontSize: '100%' /* 1 */,
  lineHeight: 1.15 /* 1 */,
  margin: 0 /* 2 */,
  color: 'inherit',
})

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

globalStyle('button, input', {
  overflow: 'visible' /* 1 */,
})

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

globalStyle('button, select', {
  textTransform: 'none' /* 1 */,
})

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

globalStyle('button, [type="button"], [type="reset"], [type="submit"]', {
  WebkitAppearance: 'button',
})

/**
 * Remove the inner border and padding in Firefox.
 */

globalStyle(
  `button::-moz-focus-inner, 
[type="button"]::-moz-focus-inner, 
[type="reset"]::-moz-focus-inner, 
[type="submit"]::-moz-focus-inner`,
  {
    borderStyle: 'none',
    padding: 0,
  }
)

/**
 * Correct the padding in Firefox.
 */

globalStyle('fieldset', {
  padding: '0.35em 0.75em 0.625em',
})

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */

globalStyle('legend', {
  boxSizing: 'border-box' /* 1 */,
  color: 'inherit' /* 2 */,
  display: 'table' /* 1 */,
  maxWidth: '100%' /* 1 */,
  padding: 0 /* 3 */,
  whiteSpace: 'normal' /* 1 */,
})

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

globalStyle('progress', {
  verticalAlign: 'baseline',
})

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

globalStyle('textarea', {
  overflow: 'auto',
})

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

globalStyle('[type="checkbox"], [type="radio"]', {
  boxSizing: 'border-box' /* 1 */,
  padding: 0 /* 2 */,
})

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

globalStyle(
  `[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button`,
  {
    height: 'auto',
  }
)

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

globalStyle('[type="search"]', {
  WebkitAppearance: 'textfield' /* 1 */,
  outlineOffset: '-2px' /* 2 */,
})

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

globalStyle('[type="search"]::-webkit-search-decoration', {
  WebkitAppearance: 'none',
})

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */

globalStyle('::-webkit-file-upload-button', {
  WebkitAppearance: 'button' /* 1 */,
  font: 'inherit' /* 2 */,
})

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

globalStyle('details', {
  display: 'block',
})

/*
 * Add the correct display in all browsers.
 */

globalStyle('summary', {
  display: 'list-item',
})

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

globalStyle('template', {
  display: 'none',
})

/**
 * Add the correct display in IE 10.
 */

globalStyle('[hidden]', {
  display: 'none',
})
