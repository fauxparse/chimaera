import { UnwantedInputProps } from '../Radio/Radio.types';
import { ProtonProps } from '@/components/Proton';
import { Orientation } from '@/types/orientation';
import { PropsWithVariants } from '@/types/variants';

export const SWITCH_VARIANTS = {
  orientation: {
    values: Orientation,
    defaultValue: Orientation.HORIZONTAL,
  },
};

export type SwitchProps = Omit<ProtonProps<'input'>, UnwantedInputProps | 'type'> &
  PropsWithVariants<typeof SWITCH_VARIANTS> & {
    indeterminate?: boolean;
  };
