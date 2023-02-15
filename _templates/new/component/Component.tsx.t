---
to: src/components/<%= h.inflection.pluralize(type) %>/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---
<% Name = h.changeCase.pascal(name) -%>
import { ElementType, forwardRef } from 'react';

import Proton from '@/components/Proton';

import { <%= Name %>Component } from './<%= Name %>.types';

import './<%= Name %>.css';

export const <%= Name %>: <%= Name %>Component = forwardRef(({ as, ...props }, ref) => {
  const Component = (as || 'div') as ElementType;

  return (
    <Proton
      as={Component}
      ref={ref}
      baseClassName="<%= h.changeCase.snake(name).replace(/_/g, '-') %>"
      {...props}
    />
  );
});

<%= Name %>.displayName = '<%= Name %>';

export default <%= Name %>;
