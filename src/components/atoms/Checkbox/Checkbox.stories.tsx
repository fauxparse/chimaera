import type { StoryObj } from '@storybook/react';

import Icon from '../Icon';

import Checkbox from './Checkbox';
import { CheckboxProps } from './Checkbox.types';

type Story = StoryObj<typeof Checkbox>;

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    ref: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    checked: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {},
  render: (args: CheckboxProps) => <Checkbox {...args} />,
};

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const DisabledIndeterminate: Story = {
  args: { disabled: true, indeterminate: true },
};

export const Custom: Story = {
  args: {
    children: (
      <Icon>
        <rect x={3} y={3} width={18} height={18} rx={2} />
        <path d="M9 9l6 6l-3-3l3-3l-6 6" pathLength={1} />
      </Icon>
    ),
  },
};
