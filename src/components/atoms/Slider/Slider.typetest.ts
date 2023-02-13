/* eslint-disable @typescript-eslint/no-unused-vars */

import { RangeValue, SingleValue, SliderProps } from './Slider.types';

// @ts-expect-no-error: Single slider
const singleProps: SliderProps = {
  min: 0,
  max: 100,
  value: 50,
  onChange: (value: number) => void 0,
};

// @ts-expect-no-error: Range slider
const rangeProps: SliderProps = {
  min: 0,
  max: 100,
  value: [25, 75],
  onChange: ([_a, _b]: RangeValue) => void 0,
};
// @ts-expect-error: Can't have a SingleValue and a RangeOnChange
const mixedProps: SliderProps = {
  min: 0,
  max: 100,
  value: 50,
  onChange: ([_a, _b]: RangeValue) => void 0,
};

// @ts-expect-error: Can't have a RangeValue and a SingleOnChange
const mixedProps: SliderProps = {
  min: 0,
  max: 100,
  value: [25, 75],
  onChange: (_value: SingleValue) => void 0,
};
