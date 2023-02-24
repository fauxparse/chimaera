import { ArgTypes } from '@storybook/react';

import { ProtonProps } from './Proton.types';

type HiddenArgs<T extends string> = Record<T, { table: { disable: true } }>;

export const hideArgs = <T extends string>(props: T[]): HiddenArgs<T> =>
  props.reduce(
    (acc, prop) => ({ ...acc, [prop]: { table: { disable: true } } }),
    {} as HiddenArgs<T>
  );

const ProtonArgTypes = ({ as: asProp }: { as?: string } = {}): Partial<ArgTypes<ProtonProps>> => ({
  loading: {
    description: 'If set to `true`, display in a loading state',
    table: {
      category: 'Proton',
      type: {
        summary: 'boolean',
      },
    },
    control: 'boolean',
  },
  ...hideArgs(['ref']),
  ...(asProp
    ? {
        as: {
          description: 'HTML element or component to render as',
          table: {
            type: {
              summary: 'ReactElement',
            },
            defaultValue: {
              summary: asProp,
            },
            category: 'Proton',
          },
          control: {
            disable: true,
          },
        },
      }
    : {}),
});

export default ProtonArgTypes;
