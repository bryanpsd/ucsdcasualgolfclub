import { theme } from '~styles/theme.css';

const { spacing } = theme;

type Spacing = typeof spacing;
type SpaceKey = keyof Spacing;

/**
 * Utility to map spacing subsets to the theme.spacing value
 */
export const spacingMapper = <SpaceMap extends readonly SpaceKey[]>(
  spaceKeys: SpaceMap
): Record<SpaceMap[number], Spacing[SpaceKey]> => {
  const spaceMap = {} as Record<number, Spacing[SpaceKey]>;
  spaceKeys.forEach((key) => (spaceMap[key] = spacing[key]));
  return spaceMap;
};
