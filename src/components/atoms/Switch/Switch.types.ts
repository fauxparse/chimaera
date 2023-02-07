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

type UnwantedInputProps =
  | 'accept'
  | 'alt'
  | 'capture'
  | 'dirname'
  | 'formaction'
  | 'formenctype'
  | 'formmethod'
  | 'formnovalidate'
  | 'formtarget'
  | 'height'
  | 'list'
  | 'max'
  | 'maxlength'
  | 'min'
  | 'minlength'
  | 'multiple'
  | 'pattern'
  | 'placeholder'
  | 'readonly'
  | 'size'
  | 'src'
  | 'step'
  | 'type'
  | 'width';

export type SwitchProps = Omit<ProtonProps<'input'>, UnwantedInputProps> &
  PropsWithVariants<typeof SWITCH_VARIANTS> & {
    indeterminate?: boolean;
  };
