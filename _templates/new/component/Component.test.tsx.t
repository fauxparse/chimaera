---
to: src/components/<%= h.inflection.pluralize(type) %>/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.test.tsx
---
<% Name = h.changeCase.pascal(name) -%>
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import <%= Name %> from '.';

describe('<%= Name %>', () => {
  it('...', () => {
    render(<<%= Name %> />);
    // expect(...).toBe(...);
  });
});
