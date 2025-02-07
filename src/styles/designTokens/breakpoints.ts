export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  max: 1920, // max inner content width
} as const;

export const mediaQuery = (
  minBreakpoint: keyof typeof breakpoints | number,
  maxBreakpoint?: keyof typeof breakpoints | number
) => {
  return `screen and (min-width: ${
    typeof minBreakpoint === 'number'
      ? minBreakpoint
      : breakpoints[minBreakpoint]
  }px) ${
    maxBreakpoint
      ? `and (max-width: ${
          typeof maxBreakpoint === 'number'
            ? maxBreakpoint
            : breakpoints[maxBreakpoint]
        }px)`
      : ''
  }`;
};
