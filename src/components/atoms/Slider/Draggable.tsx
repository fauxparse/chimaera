import {
  ComponentPropsWithoutRef,
  CSSProperties,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import clsx from 'clsx';

import SliderContext from './SliderContext';

type DraggableProps = Omit<ComponentPropsWithoutRef<'span'>, 'onChange'> & {
  value: number;
  width?: number;
  onChange: (value: number) => void;
};

const getStyle = (element: HTMLElement, prop: string, defaultValue = 0): number => {
  const result = parseInt(window.getComputedStyle(element).getPropertyValue(prop));
  return isNaN(result) ? defaultValue : result;
};

const Draggable = forwardRef<HTMLSpanElement, DraggableProps>(
  ({ className, value, width = 0, onChange, style = {}, ...props }, ref) => {
    const { min, max } = useContext(SliderContext);

    const draggable = useRef<HTMLSpanElement>(null);

    const position = useRef((value - min) / (max - min));

    const currentValue = useRef(value);

    useEffect(() => {
      currentValue.current = value;
    }, [value]);

    useEffect(() => {
      const el = draggable.current;
      if (!el) return;

      const pointerDown = (e: PointerEvent) => {
        e.stopPropagation();
        el.focus();

        const track = el.parentElement!;
        const fullRange = max - min;
        const paddingStart = getStyle(track, 'padding-inline-start');
        const paddingEnd = getStyle(track, 'padding-inline-end');
        const marginStart = getStyle(el, 'margin-inline-start');
        const direction = getStyle(el, '--ltr');

        const trackLength = track.offsetWidth - paddingStart - paddingEnd;
        const offset =
          direction < 0 ? e.offsetX - marginStart - el.offsetWidth : e.offsetX + marginStart;

        track.querySelectorAll('.slider__draggable').forEach((el) => {
          (el as HTMLElement).style.setProperty('pointer-events', 'none');
        });

        const pointerMove = (e: PointerEvent) => {
          const x = el.contains(e.target as HTMLElement)
            ? e.offsetX + position.current * trackLength
            : e.offsetX;
          const p = (x - offset - paddingStart) / trackLength;
          position.current = Math.max(
            0,
            Math.min(1 - width / fullRange, direction < 0 ? 1 - p : p)
          );

          el.style.setProperty('--position', position.current.toString());
          const newValue = Math.round((max - min) * position.current + min);
          if (newValue !== currentValue.current) onChange(newValue);
        };

        const pointerUp = () => {
          track.querySelectorAll('.slider__draggable').forEach((el) => {
            (el as HTMLElement).style.removeProperty('pointer-events');
          });
          track.removeEventListener('pointermove', pointerMove);
          window.removeEventListener('pointerup', pointerUp);
        };

        track.addEventListener('pointermove', pointerMove);
        window.addEventListener('pointerup', pointerUp, { once: true });
      };

      el.addEventListener('pointerdown', pointerDown);

      return () => el.removeEventListener('pointerdown', pointerDown);
    }, [min, max, width, onChange]);

    useEffect(() => {
      if (!draggable.current) return;
      position.current = value / (max - min);
      draggable.current.style.setProperty('--position', position.current.toString());
    }, [value, min, max]);

    return (
      <span
        ref={mergeRefs([ref, draggable])}
        className={clsx('slider__draggable', className)}
        style={{ ...style, '--position': position.current } as CSSProperties}
        {...props}
      />
    );
  }
);

Draggable.displayName = 'Slider.Draggable';

export default Draggable;
