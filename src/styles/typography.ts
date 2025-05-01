const fonts = [
  '/fonts/Roboto-Regular.ttf',
  '/fonts/Roboto-Light.ttf',
  '/fonts/Roboto-Medium.ttf',
  '/fonts/Roboto-Bold.ttf',
  '/fonts/Roboto-Black.ttf',
  '/fonts/Roboto-Italic.ttf',
  '/fonts/Roboto-LightItalic.ttf',
  '/fonts/Roboto-MediumItalic.ttf',
  '/fonts/Roboto-BoldItalic.ttf',
  '/fonts/Roboto-BlackItalic.ttf',
];

/**
 * Generates a fontFace rule from a fontUrl and fontName
 * @param fontUrl Url to font file
 * @param fontName Name of font family collection
 * @returns @fontFace CSS rule
 */
const fontFaceGenerator = (fontUrl: string, fontName: string) => {
  let fontWeight;
  switch (true) {
    case fontUrl.toLocaleLowerCase().includes('light'):
      fontWeight = 300;
      break;
    case fontUrl.toLocaleLowerCase().includes('medium'):
      fontWeight = 500;
      break;
    case fontUrl.toLocaleLowerCase().includes('bold'):
      fontWeight = 700;
      break;
    case fontUrl.toLocaleLowerCase().includes('black'):
      fontWeight = 900;
      break;
    default:
      fontWeight = 400;
      break;
  }
  const fontStyle = fontUrl.toLocaleLowerCase().includes('italic')
    ? 'italic'
    : 'normal';

  return {
    fontFamily: fontName,
    fontStyle,
    fontWeight,
    fontDisplay: 'swap',
    src: `url(${fontUrl}) format('woff2')`,
  } as const;
};

const ucsdRobotoFontFaces = fonts.map((url) => {
  return fontFaceGenerator(url, 'Roboto');
});

export { ucsdRobotoFontFaces };
