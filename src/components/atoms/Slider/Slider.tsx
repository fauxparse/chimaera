import { CSSProperties, forwardRef, useLayoutEffect, useReducer, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { FloatingDelayGroup } from '@floating-ui/react';
import { set } from 'lodash-es';

import Proton from '@/components/Proton';

import Range from './Range';
import { isRangeSlider, RangeValue, SingleValue, SliderProps } from './Slider.types';
import SliderContext from './SliderContext';
import Thumb from './Thumb';

import './Slider.css';

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const ownRef = useRef<HTMLDivElement>(null);

  const isRanged = isRangeSlider(props);

  const {
    min = 0,
    max = 100,
    step = 1,
    jump = 10,
    value,
    disabled = false,
    onChange,
    onFormatValue = String,
    style = {},
    ...otherProps
  } = props;

  const flipped = useRef(false);

  const thumbs: RangeValue | [SingleValue] = isRanged
    ? flipped.current
      ? [props.value[1], props.value[0]]
      : props.value
    : [props.value];

  const [dragging, setDragging] = useReducer(
    (state: [boolean, boolean], action: { [key in '0' | '1']?: boolean }) => {
      return [action[0] ?? state[0], action[1] ?? state[1]] as [boolean, boolean];
    },
    [false, false]
  );

  /* c8 ignore next 17 */
  useLayoutEffect(() => {
    const slider = ownRef.current;
    if (!slider) return;

    setTimeout(() => slider.style.removeProperty('--dragging'), 50);

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

  const changed = (index: number, value: number) => {
    if (isRanged) {
      const newValue: RangeValue = set([...props.value], index, value);
      if (flipped.current) {
        if (newValue[0] < newValue[1]) {
          flipped.current = false;
        } else {
          newValue.reverse();
        }
      } else if (newValue[0] > newValue[1]) {
        flipped.current = true;
        newValue.reverse();
      }
      props.onChange(newValue);
    } else {
      props.onChange(value);
    }
  };

  const rangeChanged = (range: RangeValue) => {
    if (!isRanged) return;
    flipped.current = false;
    props.onChange(range);
  };

  return (
    <SliderContext.Provider value={{ min, max, step, jump, onFormatValue }}>
      <FloatingDelayGroup delay={{ open: 500, close: 500 }}>
        <Proton
          baseClassName="slider"
          ref={mergeRefs([ref, ownRef])}
          style={{ ...style, '--dragging': 1 } as CSSProperties}
          aria-disabled={disabled || undefined}
          {...otherProps}
        >
          {isRanged && (
            <Range
              range={props.value}
              disabled={disabled}
              onStartDrag={() => setDragging({ 0: true, 1: true })}
              onEndDrag={() => setDragging({ 0: false, 1: false })}
              onChange={rangeChanged}
            />
          )}
          {thumbs.map((value, index) => (
            <Thumb
              key={index}
              value={value}
              dragging={dragging[index]}
              disabled={disabled}
              onStartDrag={() => setDragging({ [index]: true })}
              onEndDrag={() => setDragging({ [index]: false })}
              onChange={(value) => changed(index, value)}
            />
          ))}
        </Proton>
      </FloatingDelayGroup>
    </SliderContext.Provider>
  );
});

Slider.displayName = 'Slider';

export default Slider;
