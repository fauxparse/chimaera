import { ElementType, forwardRef, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Polymorphic, PolymorphicRef, WithDisplayName } from 'types/polymorphic.types';

export type ProtonProps<C extends ElementType> = Polymorphic<
  C,
  PropsWithChildren<{
    /** Class name applied to the base element */
    baseClassName?: string;
  }>
>;

type ProtonComponent = WithDisplayName<
  <C extends ElementType = 'div'>(props: ProtonProps<C>) => React.ReactElement | null
>;

export const Proton: ProtonComponent = forwardRef(
  <C extends ElementType = 'div'>(
    { as, theme, baseClassName, className, ...props }: ProtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'div';

    return (
      <Component
        ref={ref}
        className={clsx(baseClassName, className) || undefined}
        data-theme={theme || undefined}
        {...props}
      />
    );
  }
);

Proton.displayName = 'Proton';

export default Proton;
