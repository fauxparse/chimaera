import { CSSProperties, forwardRef, useCallback, useContext, useEffect, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import clsx from 'clsx';

import { DraggableProps } from './Slider.types';
import SliderContext from './SliderContext';

const getStyle = (element: HTMLElement, prop: string, defaultValue = 0): number => {
  const result = parseInt(window.getComputedStyle(element).getPropertyValue(prop));
  /* c8 ignore next */
  return isNaN(result) ? defaultValue : result;
};

const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  (
    {
      className,
      value,
      width = 0,
      disabled,
      onChange,
      onStartDrag,
      onEndDrag,
      onDrag,
      style = {},
      ...props
    },
    ref
  ) => {
    const { min, max, step, jump } = useContext(SliderContext);

    const draggable = useRef<HTMLDivElement>(null);

    const position = useRef((value - min) / (max - min));

    const currentValue = useRef(value);

    useEffect(() => {
      currentValue.current = value;
    }, [value]);

    const pointerDown = (e: React.PointerEvent) => {
      /* c8 ignore next 2 */
      const el = draggable.current;
      if (!el || disabled) return;

      e.stopPropagation();
      el.focus();

      const track = el.parentElement!;
      const fullRange = max - min;
      const paddingStart = getStyle(track, 'padding-inline-start', 0);
      const paddingEnd = getStyle(track, 'padding-inline-end', 0);
      const marginStart = getStyle(el, 'margin-inline-start', 0);
      const direction = getStyle(el, '--ltr', 1);

      const trackLength = track.offsetWidth - paddingStart - paddingEnd;

      const { offsetX } = e.nativeEvent;

      const offset = direction < 0 ? offsetX - marginStart - el.offsetWidth : offsetX + marginStart;

      track.querySelectorAll('.slider__draggable').forEach((el) => {
        const style = (el as HTMLElement).style;
        style.setProperty('pointer-events', 'none');
        style.setProperty('transition-duration', '0s');
      });

      const pointerMove = (e: PointerEvent) => {
        const p = (e.offsetX - offset - paddingStart) / trackLength;
        position.current = Math.max(0, Math.min(1 - width / fullRange, direction < 0 ? 1 - p : p));

        onDrag?.();
        el.style.setProperty('--position', position.current.toString());
        const newValue = Math.round(((max - min) * position.current) / step) + min;

        if (newValue !== currentValue.current) onChange(newValue);
      };

      const pointerUp = () => {
        track.querySelectorAll('.slider__draggable').forEach((el) => {
          const style = (el as HTMLElement).style;
          style.removeProperty('pointer-events');
          style.removeProperty('transition-duration');
        });

        track.style.removeProperty('--dragging');
        track.removeEventListener('pointermove', pointerMove);
        window.removeEventListener('pointerup', pointerUp);
        onEndDrag?.();
      };

      track.style.setProperty('--dragging', '1');
      track.addEventListener('pointermove', pointerMove);
      window.addEventListener('pointerup', pointerUp, { once: true });

      onStartDrag?.();
    };

    useEffect(() => {
      /* c8 ignore next */
      if (!draggable.current) return;
      position.current = value / (max - min);
      draggable.current.style.setProperty('--position', position.current.toString());
    }, [value, min, max]);

    const keyDown = useCallback(
      (e: React.KeyboardEvent<HTMLSpanElement>) => {
        const direction = getStyle(e.currentTarget, '--ltr', 1);

        const changed = (delta: number) => {
          const track = draggable.current?.parentElement;
          if (!track) return;

          const newValue = Math.max(min, Math.min(max - width, value + delta));

          if (newValue !== value) {
            track.style.setProperty('--dragging', '1');
            onChange(newValue);
            window.addEventListener('keyup', () => track.style.removeProperty('--dragging'), {
              once: true,
            });
          }
        };

        switch (e.key) {
          case 'ArrowLeft':
            changed(step * -direction);
            break;
          case 'ArrowRight':
            changed(step * direction);
            break;
          case 'ArrowUp':
            changed(step);
            break;
          case 'ArrowDown':
            changed(-step);
            break;
          case 'PageUp':
            changed(jump);
            break;
          case 'PageDown':
            changed(-jump);
            break;
          case 'Home':
            changed(-value);
            break;
          case 'End':
            // Because changed takes a delta, we need to calculate the difference
            changed(max - value - width);
            break;
        }
      },
      [min, max, value, width, onChange, step, jump]
    );

    return (
      <div
        ref={mergeRefs([ref, draggable])}
        className={clsx('slider__draggable', className)}
        style={{ ...style, '--position': position.current } as CSSProperties}
        {...props}
        onKeyDown={keyDown}
        onPointerDown={pointerDown}
      />
    );
  }
);

Draggable.displayName = 'Slider.Draggable';

export default Draggable;
