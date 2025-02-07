type Duration = typeof duration;
type DurationKey = keyof Duration;

type DurationMap = {
  [key in DurationKey]: `${Duration[key]}ms`;
};

export const duration = {
  instant: 0,
  short: 150,
  med: 300,
  long: 500,
} as const;

const durationMs: DurationMap = {
  instant: '0ms',
  short: '150ms',
  med: '300ms',
  long: '500ms',
};

export const transitionDuration = durationMs;
export const animationDuration = durationMs;

export const transition = {
  'link.button': 'color ease-out',
  'button.background': 'background ease-out',
  transform: 'transform',
};
