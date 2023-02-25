import { forwardRef } from 'react';

import Proton from '@/components/Proton';

import { IconProps } from './Icon.types';

import './Icon.css';

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ viewBox = '0 0 24 24', children, ...props }, ref) => (
    <Proton as="svg" ref={ref} baseClassName="icon" viewBox={viewBox} {...props}>
      {children}
    </Proton>
  )
);

Icon.displayName = 'Icon';

export default Icon;
