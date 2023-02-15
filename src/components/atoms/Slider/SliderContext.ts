import { createContext } from 'react';

type SliderContext = {
  min: number;
  max: number;
  step: number;
  jump: number;
  onFormatValue: (value: number) => string;
};

export default createContext({} as SliderContext);
