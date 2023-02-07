import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { describe, expect, it, Mock, vi } from 'vitest';
import { axe } from 'vitest-axe';

import Radio from '.';

describe('Radio', () => {
  it('renders a radio by default', () => {
    render(<Radio />);
    expect(screen.getByRole('radio').tagName).toBe('INPUT');
  });

  it('requires a label', async () => {
    const { container } = render(<Radio />);
    const { violations } = await axe(container);

    expect(violations).toContainEqual(
      expect.objectContaining({
        description: 'Ensures every form element has a label',
      })
    );
  });

  describe('when clicked', async () => {
    let onChange: Mock<[React.ChangeEvent<HTMLInputElement>], void>;
    let user: UserEvent;

    beforeEach(async () => {
      user = userEvent.setup();
      onChange = vi.fn();
      render(<Radio onChange={onChange} />);

      await user.click(screen.getByRole('radio'));
    });

    it('calls the onChange handler', async () => {
      expect(onChange).toHaveBeenCalled();
    });

    it('checks the radio button', async () => {
      expect(screen.getByRole('radio')).toBeChecked();
    });
  });

  describe('with keyboard', () => {
    let onChange: Mock<[React.ChangeEvent<HTMLInputElement>], void>;
    let user: UserEvent;

    beforeEach(async () => {
      user = userEvent.setup();
      onChange = vi.fn();
      render(<Radio onChange={onChange} />);
    });

    it('changes when the space bar is pressed', async () => {
      const radio = screen.getByRole('radio');
      await user.type(radio, '[space]');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('inside a label', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <label>
          <Radio /> Enable
        </label>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('with an associated label', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <>
          <Radio id="radio" />
          <label htmlFor="radio">Enable</label>
        </>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('with an aria-label attribute', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Radio id="radio" aria-label="Enable" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('with an aria-labelledby attribute', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <>
          <Radio id="radio" aria-labelledby="label" />
          <div id="label">Enable</div>
        </>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
