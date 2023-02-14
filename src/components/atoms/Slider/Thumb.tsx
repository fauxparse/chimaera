import { useContext } from 'react';

import Draggable from './Draggable';
import SliderContext from './SliderContext';

type ThumbProps = {
  value: number;
  onChange: (value: number) => void;
};

const Thumb: React.FC<ThumbProps> = ({ value, onChange }) => {
  const { min, max, onFormatValue } = useContext(SliderContext);

  return (
    <Draggable
      className="slider__thumb"
      role="slider"
      tabIndex={0}
      value={value}
      onChange={onChange}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      data-value={onFormatValue(value)}
    />
  );
};

export default Thumb;
