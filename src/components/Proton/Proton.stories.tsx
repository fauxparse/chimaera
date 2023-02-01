import type { Meta, StoryObj } from '@storybook/react';

import Proton from '.';

const meta: Meta<typeof Proton> = {
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
};

export default meta;

type Story = StoryObj<typeof Proton>;

export const Default: Story = {
  args: {},
};

export const Button: Story = {
  args: {
    as: 'button',
  },
};
