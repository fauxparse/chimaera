---
to: src/components/<%= h.inflection.pluralize(type) %>/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.stories.tsx
---
<% Name = h.changeCase.pascal(name) -%>
import type { StoryObj } from '@storybook/react';

import { <%= Name %> } from './<%= Name %>';
import { <%= Name %>Props } from './<%= Name %>.types';

type Story = StoryObj<typeof <%= Name %>>;

export default {
  title: '<%= h.inflection.capitalize(h.inflection.pluralize(type)) %>/<%= Name %>',
  component: <%= Name %>,
  argTypes: {
    as: {
      table: {
        defaultValue: {
          summary: 'div',
        },
        category: 'Proton',
      },
      control: {
        disable: true,
      },
    },
    theme: {
      table: {
        disable: true,
      },
    },
    ref: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    text: '<%= Name %>',
  },
  render: (args: <%= Name %>Props) => <<%= Name %> {...args} />,
};

export const Default: Story = {
  args: {
    //
  },
};
