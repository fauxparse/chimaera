import { ElementType, forwardRef } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import clsx from 'clsx';

import { PolymorphicRef } from '@/types/polymorphic.types';

import { ProtonComponent, ProtonProps } from './Proton.types';

import './Proton.css';
import 'react-loading-skeleton/dist/skeleton.css';

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
