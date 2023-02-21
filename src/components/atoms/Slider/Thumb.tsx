import { useContext, useRef } from 'react';

import Tooltip, { TooltipHandle } from '@/components/helpers/Tooltip';

import Draggable from './Draggable';
import { DraggableProps } from './Slider.types';
import SliderContext from './SliderContext';

type ThumbProps = Omit<DraggableProps, 'width'> & { dragging?: boolean };

const Thumb: React.FC<ThumbProps> = ({ value, disabled, dragging, ...props }) => {
  const { min, max, onFormatValue } = useContext(SliderContext);

  const tooltip = useRef<TooltipHandle>(null);

  return (
    <Tooltip
      ref={tooltip}
      trigger={disabled ? 'manual' : ['manual', 'focus', 'hover']}
      open={dragging}
      content={onFormatValue(value)}
    >
      <Draggable
        className="slider__thumb"
        role="slider"
        tabIndex={0}
        value={value}
        disabled={disabled}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        data-value={onFormatValue(value)}
        onDrag={() => tooltip.current?.update()}
        {...props}
      />
    </Tooltip>
  );
};

export default Thumb;
