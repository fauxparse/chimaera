import { CSSProperties } from 'react';
import type { StoryObj } from '@storybook/react';

import Switch from './Switch';
import { SwitchOrientation, SwitchProps } from './Switch.types';

type Story = StoryObj<typeof Switch>;

type HiddenProps<T extends string> = Record<T, { table: { disable: true } }>;

const hideProps = <T extends string>(props: T[]): HiddenProps<T> =>
  props.reduce(
    (acc, prop) => ({ ...acc, [prop]: { table: { disable: true } } }),
    {} as HiddenProps<T>
  );

export default {
  title: 'Atoms/Switch',
  component: Switch,
  argTypes: {
    ...hideProps(['ref', 'as', 'baseClassName', 'horizontal', 'vertical', 'skeletonProps']),
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
  render: (args: SwitchProps) => <Switch {...args} />,
};

export const Default: Story = {
  args: {
    orientation: SwitchOrientation.HORIZONTAL,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    style: {
      '--switch-height': '1rem',
    } as CSSProperties,
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    style: {
      '--switch-height': '2.5rem',
      '--switch-track-padding': '0.25rem',
    } as CSSProperties,
  },
};

export const Long: Story = {
  args: {
    ...Default.args,
    style: {
      '--switch-track-length': '6rem',
    } as CSSProperties,
  },
};

export const RTL: Story = {
  args: {
    ...Default.args,
    dir: 'rtl',
  },
};

export const Vertical: Story = {
  args: {
    orientation: SwitchOrientation.VERTICAL,
  },
};

export const Indeterminate: Story = {
  args: {
    ...Default.args,
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    ...Default.args,
    disabled: true,
    checked: true,
  },
};

export const Squareish: Story = {
  args: {
    ...Default.args,
    style: { '--switch-border-radius': '0.25rem' } as CSSProperties,
  },
};
