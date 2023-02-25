import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/atoms/Button';
import Input, { InputSize } from '@/components/atoms/Input';
import protonArgTypes, { hideArgs } from '@/components/Proton/protonArgTypes';

import { InputGroup } from '.';

type Story = StoryObj<typeof InputGroup>;

export default {
  title: 'Molecules/InputGroup',
  component: InputGroup,
  argTypes: {
    ...protonArgTypes({
      as: {
        defaultValue: {
          summary: 'fieldset',
        },
      },
    }),
    ...hideArgs(Object.values(InputSize)),
    size: {
      description: 'Size of the components within the input group',
      table: {
        type: {
          summary: 'InputSize',
        },
      },
    },
    disabled: {
      description: 'Disables the input group',
      table: {
        type: {
          summary: 'boolean',
        },
      },
      control: 'boolean',
    },
  },
  args: {},
  render: (args) => <InputGroup {...args} />,
} satisfies Meta<typeof InputGroup>;

export const Default: Story = {
  args: {
    children: (
      <>
        <InputGroup.AddOn>Text</InputGroup.AddOn>
        <Input type="text" placeholder="Placeholder" />
        <InputGroup.AddOn>Text</InputGroup.AddOn>
      </>
    ),
  },
};

export const WithButton: Story = {
  args: {
    children: (
      <>
        <Input type="text" placeholder="Placeholder" />
        <Button>Search</Button>
      </>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <InputGroup.Icon>
          <path
            className="icon__fill"
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
          />
          <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" />
        </InputGroup.Icon>
        <InputGroup.Icon>
          <path
            className="icon__fill"
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
          />
          <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" />
        </InputGroup.Icon>
        <Input type="text" placeholder="Search…" />
        <InputGroup.Icon position="end">
          <path
            className="icon__fill"
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
          />
          <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" />
        </InputGroup.Icon>
        <InputGroup.Icon position="end">
          <path
            className="icon__fill"
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
          />
          <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" />
        </InputGroup.Icon>
      </>
    ),
  },
};
