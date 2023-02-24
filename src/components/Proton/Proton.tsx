import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import clsx from 'clsx';

import { As, PolymorphicRef } from '@/types/polymorphic.types';

import { ProtonComponent, ProtonProps } from './Proton.types';

import './Proton.css';
import 'react-loading-skeleton/dist/skeleton.css';

const DEFAULT_SKELETON_PROPS: SkeletonProps = {
  inline: true,
  width: '6rem',
  containerClassName: 'react-loading-skeleton__container',
};

type WrapperProps<C extends ElementType> = ComponentPropsWithoutRef<C> & As<C>;

const SkeletonWrapper = <C extends ElementType = 'div'>({ as, ...props }: WrapperProps<C>) =>
  function Wrapper({ children }: ComponentPropsWithoutRef<C>) {
    const Component = (as || 'div') as ElementType;
    return <Component {...props}>{children}</Component>;
  };

export const Proton: ProtonComponent = forwardRef(
  <C extends ElementType = 'div'>(
    { as, theme, baseClassName, className, loading, skeletonProps, ...props }: ProtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'div';

    const classNames = clsx(baseClassName, className) || undefined;

    if (loading) {
      const Wrapper =
        skeletonProps?.wrapper ||
        (SkeletonWrapper({
          ...props,
          className: classNames,
        }) as SkeletonProps['wrapper']);

      return (
        <Skeleton
          {...DEFAULT_SKELETON_PROPS}
          wrapper={Wrapper}
          {...(skeletonProps || {})}
          {...props}
        />
      );
    }

    return (
      <Component ref={ref} className={classNames} data-theme={theme || undefined} {...props} />
    );
  }
);

Proton.displayName = 'Proton';

export default Proton;
