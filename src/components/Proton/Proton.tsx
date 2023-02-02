import { ElementType, forwardRef, PropsWithChildren } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import clsx from 'clsx';
import { Polymorphic, PolymorphicRef, WithDisplayName } from 'types/polymorphic.types';

import './Proton.css';
import 'react-loading-skeleton/dist/skeleton.css';

export type ProtonProps<C extends ElementType> = Polymorphic<
  C,
  PropsWithChildren<{
    /** Class name applied to the base element */
    baseClassName?: string;
    /* Provide a skeleton when the component is loading */
    loading?: boolean;
    /* Custom props for the skeleton */
    skeletonProps?: Partial<SkeletonProps>;
  }>
>;

type ProtonComponent = WithDisplayName<
  <C extends ElementType = 'div'>(props: ProtonProps<C>) => React.ReactElement | null
>;

const DEFAULT_SKELETON_PROPS: SkeletonProps = {
  inline: true,
  width: '6rem',
  containerClassName: 'react-loading-skeleton__container',
};

export const Proton: ProtonComponent = forwardRef(
  <C extends ElementType = 'div'>(
    { as, theme, baseClassName, className, loading, skeletonProps, ...props }: ProtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'div';

    const classNames = clsx(baseClassName, className) || undefined;

    if (loading) {
      return <Skeleton className={classNames} {...DEFAULT_SKELETON_PROPS} {...skeletonProps} />;
    }

    return (
      <Component ref={ref} className={classNames} data-theme={theme || undefined} {...props} />
    );
  }
);

Proton.displayName = 'Proton';

export default Proton;
