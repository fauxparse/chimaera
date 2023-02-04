import type { StoryObj } from '@storybook/react';

import Button from './Button';
import { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

type Story = StoryObj<typeof Button>;

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    text: {
      table: {
        type: {
          summary: 'string | ReactNode',
        },
      },
      control: {
        type: 'text',
      },
    },
    size: {
      table: {
        type: {
          summary: 'ButtonSize',
        },
        defaultValue: {
          summary: 'MEDIUM',
        },
      },
      options: Object.values(ButtonSize),
      control: {
        type: 'inline-radio',
      },
    },
    variant: {
      table: {
        type: {
          summary: 'ButtonVariant',
        },
        defaultValue: {
          summary: 'SECONDARY',
        },
      },
      options: Object.values(ButtonVariant),
      control: {
        type: 'inline-radio',
      },
    },
    ...Object.values(ButtonSize).reduce(
      (acc, size) => ({
        ...acc,
        [size]: { table: { disable: true } },
      }),
      {}
    ),
    ...Object.values(ButtonVariant).reduce(
      (acc, variant) => ({
        ...acc,
        [variant]: { table: { disable: true } },
      }),
      {}
    ),
    as: {
      table: {
        defaultValue: {
          summary: 'button',
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
    text: 'Button',
  },
  render: (args: ButtonProps) => <Button {...args} />,
};

export const Default: Story = {
  args: {},
};

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: ButtonVariant.PRIMARY,
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: ButtonVariant.SECONDARY,
  },
};
