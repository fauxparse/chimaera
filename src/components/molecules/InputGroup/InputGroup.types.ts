import { ElementType, ReactElement } from 'react';

import { AllInputVariants } from '@/components/atoms/Input/Input.types';
import { ProtonProps } from '@/components/Proton';
import { WithDisplayName } from '@/types/polymorphic.types';

import { Icon } from './Icon';

export type InputGroupProps<C extends ElementType = 'fieldset'> = ProtonProps<C> & AllInputVariants;

export type AddOnProps<C extends ElementType = 'fieldset'> = ProtonProps<C> & AllInputVariants;

export type AddOnComponent = WithDisplayName<
  <C extends ElementType = 'fieldset'>(props: AddOnProps<C>) => ReactElement | null
>;

export type InputGroupComponent = WithDisplayName<
  <C extends ElementType = 'fieldset'>(props: InputGroupProps<C>) => ReactElement | null
>;

export type InputGroupIconPosition = 'start' | 'end';

export type InputGroupWithAddon = InputGroupComponent & {
  AddOn: AddOnComponent;
  Icon: typeof Icon;
};
