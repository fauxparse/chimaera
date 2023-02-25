import type { Meta, StoryObj } from '@storybook/react';

import Proton from '.';

export default {
  title: 'Components/Proton',
  component: Proton,
  argTypes: {
    as: {
      table: {
        default: {
          summary: 'div',
        },
      },
      control: {
        disable: true,
      },
    },
    ref: {
      control: {
        disable: true,
      },
    },
  },
  args: {
    children: 'Proton',
  },
} satisfies Meta<typeof Proton>;

type Story = StoryObj<typeof Proton>;

export const Default: Story = {
  args: {},
};

export const Button: Story = {
  args: {
    as: 'button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
