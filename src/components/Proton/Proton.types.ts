import { ElementType } from 'react';

import { Polymorphic, WithDisplayName } from '@/types/polymorphic.types';

export type ProtonProps<C extends ElementType = 'div'> = Polymorphic<
  C,
  {
    /** Class name applied to the base element */
    baseClassName?: string;
    /* Provide a skeleton when the component is loading */
    loading?: boolean;
  }
>;

export type ProtonComponent = WithDisplayName<
  <C extends ElementType = 'div'>(props: ProtonProps<C>) => React.ReactElement | null
>;
