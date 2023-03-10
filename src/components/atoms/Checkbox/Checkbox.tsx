import { forwardRef, useEffect, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import Icon from '../Icon';
import Radio from '../Radio';

import { CheckboxProps } from './Checkbox.types';

import './Checkbox.css';

const CheckboxIcon = () => (
  <Icon>
    <rect x={3} y={3} width={18} height={18} rx={2} />
    <path d="m7.5 12 3 3 6-6" pathLength={1} />
  </Icon>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ baseClassName = 'checkbox', indeterminate, children = <CheckboxIcon />, ...props }, ref) => {
    const ownRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (ownRef.current && indeterminate !== undefined) {
        ownRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <Radio
        ref={mergeRefs([ref, ownRef])}
        type="checkbox"
        baseClassName={baseClassName}
        {...props}
      >
        {children}
      </Radio>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
