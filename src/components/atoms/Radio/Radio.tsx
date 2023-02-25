import { forwardRef, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import Icon from '../Icon';
import Proton from '@/components/Proton';

import { RadioProps } from './Radio.types';

import './Radio.css';

const RadioIcon = () => (
  <Icon>
    <circle cx={12} cy={12} r={10} />
    <path d="M12 7a5 5 0 0 1 0 10a5 5 0 0 1 0-10" />
  </Icon>
);

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { baseClassName = 'radio', type = 'radio', loading, children = <RadioIcon />, ...props },
    ref
  ) => {
    const ownRef = useRef<HTMLInputElement>(null);

    return (
      <Proton as="span" baseClassName={baseClassName} loading={loading}>
        {!loading && (
          <>
            <input type={type} ref={mergeRefs([ref, ownRef])} {...props} />
            {children}
          </>
        )}
      </Proton>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
