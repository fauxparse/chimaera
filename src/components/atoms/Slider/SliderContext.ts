import { createContext } from 'react';

type SliderContext = {
  min: number;
  max: number;
};

export default createContext({} as SliderContext);
