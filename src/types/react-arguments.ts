// eslint-disable-next-line unused-imports/no-unused-imports
import React from 'react';

declare module 'react' {
  function forwardRef<T, P = unknown>(
    render: (props: P, ref: ForwardedRef<T>) => ReactElement | null
  ): (props: P & RefAttributes<T>) => ReactElement | null;
}
