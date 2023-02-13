import { ElementType, forwardRef, useContext } from 'react';
import { set } from 'lodash-es';

import { InputGroupContext } from '@/components/molecules/InputGroup';
import Proton from '@/components/Proton';
import { extractVariants } from '@/types/variants';

import { AllInputVariants, INPUT_VARIANTS, InputComponent, InputSize } from './Input.types';

import './Input.css';

const useCustomInput = <T extends AllInputVariants>(props: T, defaultSize: InputSize): T =>
  extractVariants(set(INPUT_VARIANTS, 'size.defaultValue', defaultSize), props);

export const Input: InputComponent = forwardRef(({ as, iconBefore, iconAfter, ...props }, ref) => {
  const Component = (as || 'input') as ElementType;

  const { size: inputGroupSize } = useContext(InputGroupContext);

  const { size, ...inputProps } = useCustomInput(props, inputGroupSize || InputSize.MEDIUM);

  return <Proton as={Component} ref={ref} baseClassName="input" data-size={size} {...inputProps} />;
});

Input.displayName = 'Input';

export default Input;
