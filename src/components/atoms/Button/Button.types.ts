import { ElementType, ReactElement, ReactNode } from 'react';

import { WithDisplayName } from '../../../types/polymorphic.types';
import { ProtonProps } from '@/components/Proton';
import { PropsWithVariants } from '@/types/variants';

/* c8 ignore next */
export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

/* c8 ignore next */
export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export const BUTTON_VARIANTS = {
  size: {
    values: ButtonSize,
    defaultValue: ButtonSize.MEDIUM,
  },
  variant: {
    values: ButtonVariant,
    defaultValue: ButtonVariant.SECONDARY,
  },
} as const;

export type AllButtonVariants = PropsWithVariants<typeof BUTTON_VARIANTS>;

export type BaseButtonProps = AllButtonVariants & {
  /**
   * Text content to render inside the button
   * @type string | ReactNode
   */
  text?: string | ReactNode;
};

export type ButtonProps<C extends ElementType = 'button'> = Omit<
  ProtonProps<C>,
  keyof BaseButtonProps
> &
  BaseButtonProps;

export type ButtonComponent = WithDisplayName<
  <C extends ElementType = 'button'>(props: ButtonProps<C>) => ReactElement | null
>;

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Describe: ButtonProps
 */

// @ts-expect-no-error - No required props
const testEmptyProps: ButtonProps = {};

// @ts-expect-error - `href` is not a valid prop
const testInvalidProperty: ButtonProps<'button'> = { href: 'https://example.com' };

// @ts-expect-no-error - `href` is a valid prop
const testValidProperty: ButtonProps<'a'> = { href: 'https://example.com' };

// @ts-expect-no-error - Can specify size as a named prop
const testNamedSize: ButtonProps = { size: ButtonSize.SMALL };

// @ts-expect-no-error - Can specify size as a shorthand prop
const testShorthandSize: ButtonProps = { [ButtonSize.SMALL]: true };

// @ts-expect-error - Can't specify two sizes
const testDoubleSize: ButtonProps = { size: ButtonSize.SMALL, [ButtonSize.SMALL]: true };

// @ts-expect-no-error - Can specify size as a named prop
const testNamedVariant: ButtonProps = { variant: ButtonVariant.PRIMARY };

// @ts-expect-no-error - Can specify variant as a shorthand prop
const testShorthandVariant: ButtonProps = { [ButtonVariant.PRIMARY]: true };

// @ts-expect-error - Can't specify two variants
const testDoubleVariant: ButtonProps = {
  variant: ButtonVariant.PRIMARY,
  [ButtonVariant.PRIMARY]: true,
};
