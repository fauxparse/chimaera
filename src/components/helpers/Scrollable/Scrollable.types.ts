import { ElementType, ReactElement } from 'react';

import { ProtonProps } from '@/components/Proton';
import { Orientation } from '@/types/orientation';
import { WithDisplayName } from '@/types/polymorphic.types';
import { PropsWithVariants } from '@/types/variants';

export const SCROLLABLE_VARIANTS = {
  orientation: {
    values: Orientation,
    defaultValue: Orientation.VERTICAL,
  },
};

export type BaseScrollableProps = PropsWithVariants<typeof SCROLLABLE_VARIANTS>;

export type ScrollableProps<C extends ElementType = 'div'> = Omit<
  ProtonProps<C>,
  keyof BaseScrollableProps
> &
  BaseScrollableProps;

export type ScrollableComponent = WithDisplayName<
  <C extends ElementType = 'div'>(props: ScrollableProps<C>) => ReactElement | null
>;
