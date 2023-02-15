import { ElementType } from 'react';
import { SkeletonProps } from 'react-loading-skeleton';

import { Polymorphic, WithDisplayName } from '@/types/polymorphic.types';

export type ProtonProps<C extends ElementType = 'div'> = Polymorphic<
  C,
  {
    /** Class name applied to the base element */
    baseClassName?: string;
    /* Provide a skeleton when the component is loading */
    loading?: boolean;
    /* Custom props for the skeleton */
    skeletonProps?: Partial<SkeletonProps>;
  }
>;

export type ProtonComponent = WithDisplayName<
  <C extends ElementType = 'div'>(props: ProtonProps<C>) => React.ReactElement | null
>;
