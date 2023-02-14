import { forwardRef, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { isEqual, set } from 'lodash-es';

import Proton from '@/components/Proton';

import Range from './Range';
import { isRangeSlider, RangeValue, SliderProps } from './Slider.types';
import SliderContext from './SliderContext';
import Thumb from './Thumb';

import './Slider.css';

type SliderState = [number] | [number, number];

type SliderAction =
  | {
      index: number;
      value: number;
    }
  | SliderState;

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const ownRef = useRef<HTMLDivElement>(null);

  const isRanged = isRangeSlider(props);

  const { min, max, step = 1, jump = 10, value, onChange, ...otherProps } = props;

  const [flipped, setFlipped] = useState(false);

  const [values, dispatch] = useReducer(
    (state: SliderState, action: SliderAction) => {
      if (Array.isArray(action)) return isEqual(action, state) ? state : action;
      if (state[action.index] === action.value) return state;
      return set([...state] as SliderState, action.index, action.value);
    },
    isRanged ? props.value : [props.value]
  );

  useEffect(() => {
    if (isRanged) {
      const [a, b] = values as RangeValue;
      setFlipped(a > b);
      const newValues: RangeValue = flipped ? [b, a] : [a, b];
      if (!isEqual(newValues, props.value)) props.onChange(newValues);
    } else {
      if (values[0] !== props.value) props.onChange(values[0]);
    }
  }, [isRanged, values, flipped, props]);

  useLayoutEffect(() => {
    const slider = ownRef.current;
    if (!slider) return;

    const resized = () => {
      const { width } = slider.getBoundingClientRect();
      const computed = getComputedStyle(slider);
      const paddingStart = parseInt(computed.paddingInlineStart, 10);
      const paddingEnd = parseInt(computed.paddingInlineEnd, 10);
      slider.style.setProperty('--slider-length', `${width - paddingStart - paddingEnd}px`);
    };

    const resizeObserver = new ResizeObserver(resized);
    resizeObserver.observe(slider);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <SliderContext.Provider value={{ min, max, step, jump }}>
      <Proton baseClassName="slider" ref={mergeRefs([ref, ownRef])} {...otherProps}>
        {isRanged && <Range range={values as RangeValue} onChange={dispatch} />}
        {values.map((value, index) => (
          <Thumb key={index} value={value} onChange={(value) => dispatch({ index, value })} />
        ))}
      </Proton>
    </SliderContext.Provider>
  );
});

Slider.displayName = 'Slider';

export default Slider;
