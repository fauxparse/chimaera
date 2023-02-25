import type { Meta, StoryObj } from '@storybook/react';

import protonArgTypes, { hideArgs } from '@/components/Proton/protonArgTypes';

import { Input } from './Input';
import { InputProps, InputSize } from './Input.types';

type Story = StoryObj<typeof Input>;

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    ...protonArgTypes({
      as: {
        table: {
          defaultValue: {
            summary: 'input',
          },
        },
      },
    }),
    ...hideArgs(Object.values(InputSize)),
    size: {
      description: 'Size of the input',
      table: {
        type: {
          summary: 'InputSize',
        },
        defaultValue: {
          summary: 'InputSize.MEDIUM',
        },
      },
    },
    disabled: {
      description: 'Whether to disable the input',
      table: {
        type: {
          summary: 'boolean',
        },
      },
      control: 'boolean',
    },
    htmlSize: {
      description: 'Value to pass to the underlying input’s `size` attribute',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
  },
  render: (args: InputProps) => <Input {...args} />,
} satisfies Meta<typeof Input>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: InputSize.SMALL,
  } as InputProps,
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: InputSize.LARGE,
  } as InputProps,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    value: 'Read only',
    readOnly: true,
  },
};
