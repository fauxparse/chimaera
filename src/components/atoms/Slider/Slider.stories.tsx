import { useState } from 'react';
import type { StoryObj } from '@storybook/react';

import { Slider } from './Slider';
import { RangeValue, SingleValue, SliderProps } from './Slider.types';

type Story = StoryObj<typeof Slider>;

export default {
  title: 'Atoms/Slider',
  component: Slider,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
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
  args: {},
  render: function Render(args: SliderProps) {
    const [value, setValue] = useState(args.value as SingleValue);
    return <Slider {...args} value={value} onChange={setValue} />;
  },
};

export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
  },
};

export const Ranged: Story = {
  args: {
    value: [25, 75] satisfies RangeValue,
    min: 0,
    max: 100,
  },
  render: function Render(args: SliderProps) {
    const [value, setValue] = useState(args.value as RangeValue);
    return <Slider {...args} value={value} onChange={setValue} />;
  },
};

export const RTL: Story = {
  args: {
    value: [10, 60] satisfies RangeValue,
    min: 0,
    max: 100,
  },
  render: function Render(args: SliderProps) {
    const [value, setValue] = useState(args.value as RangeValue);
    return <Slider dir="rtl" {...args} value={value} onChange={setValue} />;
  },
};
