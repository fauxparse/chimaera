import { forwardRef, useEffect, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import Proton from '@/components/Proton';
import { Orientation } from '@/types/orientation';
import { extractVariants } from '@/types/variants';

import { SWITCH_VARIANTS, SwitchProps } from './Switch.types';
import useDragInteraction from './useDragInteraction';

import './Switch.css';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ skeletonProps = {}, indeterminate, ...props }, ref) => {
    const ownRef = useRef<HTMLInputElement>(null);

    const { orientation = Orientation.HORIZONTAL, ...switchProps } = extractVariants(
      SWITCH_VARIANTS,
      props
    );

    useDragInteraction(ownRef);

    useEffect(() => {
      if (ownRef.current && indeterminate !== undefined) {
        ownRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <Proton
        as="input"
        ref={mergeRefs([ref, ownRef])}
        type="checkbox"
        role="switch"
        baseClassName="switch"
        data-orientation={orientation}
        skeletonProps={{
          width: 'var(--switch-track-length)',
          height: 'var(--switch-height)',
          borderRadius: 'var(--switch-height)',
          ...skeletonProps,
        }}
        {...switchProps}
      />
    );
  }
);

export default Switch;
