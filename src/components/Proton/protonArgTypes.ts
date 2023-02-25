import { ArgTypes } from '@storybook/react';
import { merge } from 'lodash-es';

import { ProtonProps } from './Proton.types';

type HiddenArgs<T extends string> = Record<T, { table: { disable: true } }>;

export const hideArgs = <T extends string>(props: T[]): HiddenArgs<T> =>
  props.reduce(
    (acc, prop) => ({ ...acc, [prop]: { table: { disable: true } } }),
    {} as HiddenArgs<T>
  );

const ProtonArgTypes = <T extends ProtonProps>(
  args: Partial<ArgTypes<T>> = {}
): Partial<ArgTypes<T>> =>
  merge(
    {},
    {
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
      as: {
        description: 'HTML element or component to render as',
        table: {
          type: {
            summary: 'ReactElement',
          },
          category: 'Proton',
        },
        control: {
          disable: true,
        },
      },
      ...hideArgs(['ref', 'baseClassName']),
    },
    args
  );

export default ProtonArgTypes;
