import { createContext } from 'react';

type SliderContext = {
  min: number;
  max: number;
  step: number;
  jump: number;
};

export default createContext({} as SliderContext);
