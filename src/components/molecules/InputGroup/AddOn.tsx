import { ElementType, forwardRef } from 'react';

import Proton from '@/components/Proton';

import { AddOnComponent } from './InputGroup.types';

export const AddOn: AddOnComponent = forwardRef(({ as, children, ...props }, ref) => {
  const Component = (as || 'div') as ElementType;

  return (
    <Proton as={Component} ref={ref} baseClassName="input-group__add-on" {...props}>
      {children}
    </Proton>
  );
});

AddOn.displayName = 'InputGroup.AddOn';

export default AddOn;
