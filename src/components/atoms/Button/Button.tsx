import { AriaRole, Children, ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';

import Proton from '@/components/Proton';
import { PolymorphicRef } from '@/types/polymorphic.types';
import { extractVariants } from '@/types/variants';

import { AllButtonVariants, BUTTON_VARIANTS, ButtonComponent, ButtonProps } from './Button.types';

import './Button.css';

const useCustomButton = <T extends AllButtonVariants>(props: T): T =>
  extractVariants(BUTTON_VARIANTS, props);

type ExtraButtonProps = { 'data-icon-only'?: boolean } & (
  | { type: ComponentPropsWithoutRef<'button'>['type'] }
  | { role: AriaRole }
);

export const Button: ButtonComponent = forwardRef(
  <C extends ElementType = 'button'>(
    { text, icon, as, children, skeletonProps, ...props }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = (as ?? 'button') as ElementType;

    const { size, variant, ...buttonProps } = useCustomButton(props);

    const extraButtonProps: ExtraButtonProps =
      Component === 'button' ? { type: 'button' } : { role: 'button' };

    // Fallback for browsers that don't support :has() (only Firefox at the moment)
    if (!text && !!icon && (props.loading || !CSS.supports('selector(:has())'))) {
      extraButtonProps['data-icon-only'] = true;
    }

    // Auto-wrap plain text children
    const buttonChildren = Children.map(children, (child) =>
      typeof child === 'string' ? <span className="button__text">{child}</span> : child
    );

    return (
      <Proton
        as={Component}
        ref={ref}
        baseClassName="button"
        data-size={size}
        data-variant={variant}
        {...extraButtonProps}
        {...buttonProps}
      >
        {icon}
        {!!text && <span className="button__text">{text}</span>}
        {buttonChildren}
      </Proton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
