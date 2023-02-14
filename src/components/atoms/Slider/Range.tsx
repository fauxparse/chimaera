import {
  ComponentPropsWithoutRef,
  CSSProperties,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { sortBy } from 'lodash-es';

import Draggable from './Draggable';
import { RangeValue } from './Slider.types';
import SliderContext from './SliderContext';

type RangeProps = Omit<ComponentPropsWithoutRef<'span'>, 'onChange'> & {
  range: RangeValue;
  onChange: (value: RangeValue) => void;
};

const Range = forwardRef<HTMLSpanElement, RangeProps>(({ range, style, onChange }, ref) => {
  const [start, end] = sortBy(range);

  const draggable = useRef<HTMLSpanElement>(null);

  const { min, max } = useContext(SliderContext);

  const width = useRef(end - start);

  useEffect(() => {
    width.current = end - start;
  }, [start, end]);

  const changed = useCallback(
    (start: number) => {
      onChange([start, start + width.current]);
    },
    [onChange, width]
  );

  useEffect(() => {
    /* c8 ignore next 2 */
    const el = draggable.current;
    if (!el) return;
    el.style.setProperty('--position', (start / (max - min)).toString());
    el.style.setProperty('--width', ((end - start) / (max - min)).toString());
  }, [start, end, min, max]);

  return (
    <Draggable
      ref={mergeRefs([ref, draggable])}
      className="slider__range"
      value={start}
      width={end - start}
      onChange={changed}
      style={{ ...style, '--width': `${(end - start) / (max - min)}` } as CSSProperties}
    />
  );
});

export default Range;
