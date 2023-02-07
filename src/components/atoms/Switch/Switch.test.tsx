import React, { ChangeEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { describe, expect, it, Mock, vi } from 'vitest';
import { axe } from 'vitest-axe';

import Switch, { SwitchProps } from '.';

import '../../../index.css';

const renderSwitch = (props: Partial<SwitchProps> = {}): HTMLInputElement => {
  render(<Switch {...props} />);
  const input = screen.getByRole('switch') as HTMLInputElement;
  Object.defineProperty(input, 'clientWidth', { configurable: true, value: 40 });
  Object.defineProperty(input, 'offsetWidth', { configurable: true, value: 40 });
  Object.defineProperty(input, 'clientHeight', { configurable: true, value: 24 });
  return input;
};

const drag = (input: HTMLInputElement, stops: number[]) => {
  const [initial, ...rest] = stops;
  input.dispatchEvent(new MouseEvent('pointerdown', { clientX: initial }));
  rest.forEach((clientX) => {
    input.dispatchEvent(new MouseEvent('pointermove', { clientX }));
  });
  input.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }));
  vi.runAllTimers();
};

describe('Switch', () => {
  let input: HTMLInputElement;
  let user: UserEvent;
  let onChange: Mock<[ChangeEvent<HTMLInputElement>], void>;

  it('renders a switch', () => {
    input = renderSwitch();
    expect(input.tagName).toBe('INPUT');
  });

  it('changes on click', async () => {
    user = userEvent.setup();
    onChange = vi.fn();
    input = renderSwitch({ onChange });

    await user.click(input);
    expect(input).toBeChecked();
    expect(onChange).toHaveBeenCalled();
  });

  it('requires a label', async () => {
    const { container } = render(<Switch />);
    const { violations } = await axe(container);

    expect(violations).toContainEqual(
      expect.objectContaining({
        description: 'Ensures every form element has a label',
      })
    );
  });

  describe('checked', () => {
    beforeEach(() => {
      user = userEvent.setup();
      onChange = vi.fn();
      input = renderSwitch({ checked: true, onChange });
    });

    it('changes on click', async () => {
      expect(input).toBeChecked();
      await user.click(input);
      expect(input).not.toBeChecked();
      expect(onChange).toHaveBeenCalled();
    });

    it('changes on space bar', async () => {
      await user.type(input, '[space]');
      expect(input).not.toBeChecked();
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('disabled', () => {
    it('does not change on click', async () => {
      user = userEvent.setup();
      onChange = vi.fn();
      input = renderSwitch({ disabled: true, onChange });

      await user.click(input);
      expect(input).not.toBeChecked();
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('indeterminate', () => {
    it('changes on click', async () => {
      user = userEvent.setup();
      input = renderSwitch({ indeterminate: true });

      expect(input.indeterminate).toBe(true);
      await user.click(input);
      expect(input).toBeChecked();
      expect(input.indeterminate).toBe(false);
    });
  });

  describe('dragging', () => {
    let onClick: Mock<[React.MouseEvent<HTMLInputElement>], void>;
    beforeEach(() => {
      vi.useFakeTimers();
      user = userEvent.setup();
      onChange = vi.fn();
      onClick = vi.fn();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    describe('off => on', () => {
      beforeEach(() => {
        input = renderSwitch({ onChange, onClick });
      });

      it('slides to the on position', async () => {
        drag(input, [0, 24]);
        expect(input).toBeChecked();
      });

      it('slides back to the off position', async () => {
        drag(input, [0, 24, 0]);
        expect(input).not.toBeChecked();
      });
    });

    describe('on => off', () => {
      let onClick: Mock<[React.MouseEvent<HTMLInputElement>], void>;

      beforeEach(() => {
        input = renderSwitch({ checked: true, onChange, onClick });
      });

      it('slides to the off position', async () => {
        expect(input).toBeChecked();
        drag(input, [24, 0]);
        expect(input).not.toBeChecked();
      });
    });

    describe('right to left', () => {
      describe('off => on', () => {
        beforeEach(() => {
          input = renderSwitch({
            onChange,
            onClick,
            dir: 'rtl',
          });
        });

        it('slides to the on position', async () => {
          expect(input).not.toBeChecked();
          drag(input, [32, 0]);
          expect(input).toBeChecked();
        });
      });

      describe('on => off', () => {
        beforeEach(() => {
          input = renderSwitch({
            checked: true,
            onChange,
            onClick,
            dir: 'rtl',
          });
        });

        it('slides to the off position', async () => {
          expect(input).toBeChecked();
          drag(input, [0, 100]);
          expect(input).not.toBeChecked();
        });
      });
    });
  });

  describe('inside a label', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <label>
          <Switch /> Enable
        </label>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('with an associated label', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <>
          <Switch id="switch" />
          <label htmlFor="switch">Enable</label>
        </>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('with an aria-label attribute', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Switch id="switch" aria-label="Enable" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
