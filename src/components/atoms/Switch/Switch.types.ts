import { UnwantedInputProps } from '../Radio/Radio.types';
import { ProtonProps } from '@/components/Proton';
import { PropsWithVariants } from '@/types/variants';

/* c8 ignore next */
export enum SwitchOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export const SWITCH_VARIANTS = {
  orientation: {
    values: SwitchOrientation,
    defaultValue: SwitchOrientation.HORIZONTAL,
  },
};

export type SwitchProps = Omit<ProtonProps<'input'>, UnwantedInputProps | 'type'> &
  PropsWithVariants<typeof SWITCH_VARIANTS> & {
    indeterminate?: boolean;
  };
