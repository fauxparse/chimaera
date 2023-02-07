import type { StoryObj } from '@storybook/react';

import Radio from './Radio';
import { RadioProps } from './Radio.types';

type Story = StoryObj<typeof Radio>;

export default {
  title: 'Atoms/Radio',
  component: Radio,
  argTypes: {
    ref: {
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
  render: (args: RadioProps) => <Radio {...args} />,
};

export const Default: Story = {
  args: {},
};
