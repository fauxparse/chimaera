import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from 'react';

import { ProtonProps } from '@/components/Proton';

export type SingleValue = number;

export type RangeValue = [number, number];

export type SingleOnChange = (value: SingleValue) => void | Dispatch<SetStateAction<SingleValue>>;
export type RangeOnChange = (value: RangeValue) => void | Dispatch<SetStateAction<RangeValue>>;

type SingleSlider = {
  value: SingleValue;
  onChange: SingleOnChange;
};

type RangeSlider = {
  value: RangeValue;
  onChange: RangeOnChange;
};

type BaseSliderProps = Omit<ProtonProps, 'onChange'> & {
  min?: number;
  max?: number;
  step?: number;
  jump?: number;
  disabled?: boolean;
  onFormatValue?: (value: number) => string;
};

export type SingleSliderProps = BaseSliderProps & SingleSlider;
export type RangeSliderProps = BaseSliderProps & RangeSlider;

export type SliderProps = SingleSliderProps | RangeSliderProps;

export const isRangeSlider = (
  props: SingleSliderProps | RangeSliderProps
): props is RangeSliderProps => {
  return Array.isArray(props.value);
};

export type DraggableProps = Omit<ComponentPropsWithoutRef<'span'>, 'onChange' | 'onDrag'> & {
  value: number;
  width?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  onStartDrag?: () => void;
  onEndDrag?: () => void;
  onDrag?: () => void;
};
