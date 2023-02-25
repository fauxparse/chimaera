import type { Meta, StoryObj } from '@storybook/react';

import Icon from '../Icon';
import protonArgTypes, { hideArgs } from '@/components/Proton/protonArgTypes';

import Button from './Button';
import { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

type Story = StoryObj<typeof Button>;

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    ...protonArgTypes({
      as: {
        table: {
          defaultValue: {
            summary: 'button',
          },
        },
      },
    }),
    text: {
      table: {
        type: {
          summary: 'string | ReactNode',
        },
      },
      control: 'text',
    },
    size: {
      description: 'Size to render',
      table: {
        type: {
          summary: 'ButtonSize',
        },
        defaultValue: {
          summary: 'ButtonSize.MEDIUM',
        },
      },
      options: Object.values(ButtonSize),
      control: 'radio',
    },
    variant: {
      description: 'Variant to render',
      table: {
        type: {
          summary: 'ButtonVariant',
        },
        defaultValue: {
          summary: 'ButtonVariant.SECONDARY',
        },
      },
      options: Object.values(ButtonVariant),
      control: 'radio',
    },
    disabled: {
      description: 'Whether to disable the button',
      table: {
        type: {
          summary: 'boolean',
        },
      },
      control: 'boolean',
    },
    icon: {
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    ...hideArgs([...Object.values(ButtonSize), ...Object.values(ButtonVariant)]),
  },
  args: {
    text: 'Button',
  },
  render: (args: ButtonProps) => <Button {...args} />,
} satisfies Meta<typeof Button>;

export const Default: Story = {
  args: {},
};

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: ButtonVariant.PRIMARY,
  } as ButtonProps,
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: ButtonVariant.SECONDARY,
  } as ButtonProps,
};

export const Toolbar: Story = {
  args: {
    ...Default.args,
    variant: ButtonVariant.TOOLBAR,
  } as ButtonProps,
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: ButtonSize.SMALL,
  } as ButtonProps,
};

export const Medium: Story = {
  args: {
    ...Default.args,
    size: ButtonSize.MEDIUM,
  } as ButtonProps,
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: ButtonSize.LARGE,
  } as ButtonProps,
};

export const Link: Story = {
  args: {
    ...Default.args,
    as: 'a',
    href: 'https://example.com',
  } as ButtonProps<'a'>,
};

export const TextAndIcon: Story = {
  args: {
    ...Default.args,
    icon: (
      <Icon>
        <path
          className="icon__fill"
          d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z"
        />
        <path
          className="icon__line"
          d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
        />
      </Icon>
    ),
  } as ButtonProps,
};

export const IconOnly: Story = {
  args: {
    ...Default.args,
    text: undefined,
    icon: (
      <Icon>
        <path
          className="icon__fill"
          d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z"
        />
        <path
          className="icon__line"
          d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
        />
      </Icon>
    ),
  } as ButtonProps,
};
