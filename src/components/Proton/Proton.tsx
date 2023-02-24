import { ElementType, forwardRef } from 'react';
import clsx from 'clsx';

import { PolymorphicRef } from '@/types/polymorphic.types';

import { ProtonComponent, ProtonProps } from './Proton.types';

import './Proton.css';

export const Proton: ProtonComponent = forwardRef(
  <C extends ElementType = 'div'>(
    { as, theme, baseClassName, className, loading, ...props }: ProtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'div';

    const classNames = clsx(baseClassName, className, loading && 'skeleton') || undefined;

    const dataProps = Object.entries(props).reduce(
      (acc, [key, value]) => (key.startsWith('data-') ? { ...acc, [key]: value } : acc),
      { 'data-loading': true }
    );

    if (loading) {
      return <div className={classNames} aria-busy {...dataProps} />;
    }

    return (
      <Component ref={ref} className={classNames} data-theme={theme || undefined} {...props} />
    );
  }
);

Proton.displayName = 'Proton';

export default Proton;
