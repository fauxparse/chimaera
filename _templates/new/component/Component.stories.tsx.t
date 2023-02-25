---
to: src/components/<%= h.inflection.pluralize(type) %>/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.stories.tsx
---
<% Name = h.changeCase.pascal(name) -%>
import type { StoryObj, Meta } from '@storybook/react';

import protonArgTypes from '@/components/Proton/protonArgTypes';

import { <%= Name %> } from './<%= Name %>';
import { <%= Name %>Props } from './<%= Name %>.types';

type Story = StoryObj<typeof <%= Name %>>;

export default {
  title: '<%= h.inflection.capitalize(h.inflection.pluralize(type)) %>/<%= Name %>',
  component: <%= Name %>,
  argTypes: {
    ...protonArgTypes({
      as: {
        table: {
          defaultValue: {
            summary: 'div',
          },
        },
      },
    }),
  },
  args: {
    text: '<%= Name %>',
  },
  render: (args: <%= Name %>Props) => <<%= Name %> {...args} />,
} satisfies Meta<typeof <%= Name %>>;

export const Default: Story = {
  args: {
    //
  },
};
