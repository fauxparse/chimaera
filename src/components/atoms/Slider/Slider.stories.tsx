import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button';

import { Slider } from './Slider';
import { RangeValue, SingleValue, SliderProps } from './Slider.types';

type Story = StoryObj<typeof Slider>;

const meta = {
  title: 'Atoms/Slider',
  component: Slider,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    ref: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    style: {
      marginTop: '4rem',
    },
    onFormatValue: String,
  },
  render: function Render(args: SliderProps) {
    const [value, setValue] = useState(args.value as SingleValue);
    return <Slider {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof Slider>;

export default meta;

export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
  },
  render: function Render(args: SliderProps) {
    const [value, setValue] = useState(args.value as SingleValue);

    return (
      <>
        <Slider {...args} value={value} onChange={setValue} />
        <Button text="Reset" onClick={() => setValue(50)} />
      </>
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
