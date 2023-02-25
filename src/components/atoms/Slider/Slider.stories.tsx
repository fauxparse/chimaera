import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button';
import protonArgTypes from '@/components/Proton/protonArgTypes';

import { Slider } from './Slider';
import { RangeValue, SingleValue, SliderProps } from './Slider.types';

type Story = StoryObj<typeof Slider>;

export default {
  title: 'Atoms/Slider',
  component: Slider,
  argTypes: {
    ...protonArgTypes(),
    onChange: {
      description: 'Fired when the slider value changes',
    },
    value: {
      description: 'The current value(s) of the slider',
      table: {
        type: {
          summary: 'number | [number, number]',
        },
      },
    },
    step: {
      description: 'Minimum step size (granularity)',
    },
    jump: {
      description: 'Step when <kbd>PageUp</kbd>/<kbd>PageDown</kbd> is pressed',
    },
    min: {
      description: 'Minimum value',
    },
    max: {
      description: 'Maximum value',
    },
    onFormatValue: {
      description: 'Called to turn a slider value into a string',
    },
    disabled: {
      description: 'Whether the slider is disabled',
      control: 'boolean',
    },
  },
  args: {
    onFormatValue: String,
  },
  render: function Render(args: SliderProps) {
    const [value, setValue] = useState(args.value as SingleValue);
    return <Slider {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof Slider>;

export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
  },
  render: function Render(args: SliderProps) {
    const [value, setValue] = useState(args.value as SingleValue);

    return (
      <div style={{ marginBlock: '4rem' }}>
        <Slider {...args} value={value} onChange={setValue} />
        <Button text="Reset" onClick={() => setValue(50)} />
      </div>
    );
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

    useEffect(() => {
      setValue(args.value as RangeValue);
    }, [args.value]);

    return (
      <>
        <Slider {...args} value={value} onChange={setValue} />
        <Button text="Reset" onClick={() => setValue([25, 75])} />
      </>
    );
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
