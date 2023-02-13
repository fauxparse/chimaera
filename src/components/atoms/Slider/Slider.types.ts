import { ProtonProps } from '@/components/Proton';

export type SingleValue = number;

export type RangeValue = [number, number];

type SingleOnChange = (value: number) => void;
type RangeOnChange = (value: [number, number]) => void;

type SingleSlider = {
  value: SingleValue;
  onChange: SingleOnChange;
};

type RangeSlider = {
  value: RangeValue;
  onChange: RangeOnChange;
};

type BaseSliderProps = Omit<ProtonProps, 'onChange'> & {
  min: number;
  max: number;
};

export type SingleSliderProps = BaseSliderProps & SingleSlider;
export type RangeSliderProps = BaseSliderProps & RangeSlider;

export type SliderProps = SingleSliderProps | RangeSliderProps;

export const isRangeSlider = (
  props: SingleSliderProps | RangeSliderProps
): props is RangeSliderProps => {
  return Array.isArray(props.value);
};
