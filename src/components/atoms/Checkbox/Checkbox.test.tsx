import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { describe, expect, it, Mock, vi } from 'vitest';
import { axe } from 'vitest-axe';

import Checkbox from '.';

describe('Checkbox', () => {
  it('renders a checkbox by default', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox').tagName).toBe('INPUT');
  });

  it('requires a label', async () => {
    const { container } = render(<Checkbox />);
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
      render(<Checkbox onChange={onChange} />);

      await user.click(screen.getByRole('checkbox'));
    });

    it('calls the onChange handler', async () => {
      expect(onChange).toHaveBeenCalled();
    });

    it('checks the checkbox', async () => {
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  describe('with keyboard', () => {
    let onChange: Mock<[React.ChangeEvent<HTMLInputElement>], void>;
    let user: UserEvent;

    beforeEach(async () => {
      user = userEvent.setup();
      onChange = vi.fn();
      render(<Checkbox onChange={onChange} />);
    });

    it('changes when the space bar is pressed', async () => {
      const checkbox = screen.getByRole('checkbox');
      await user.type(checkbox, '[space]');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('indeterminate', () => {
    it('is partially checked', () => {
      render(<Checkbox indeterminate />);
      expect(screen.getByRole('checkbox')).toBePartiallyChecked();
    });
  });

  describe('with an aria-labelledby attribute', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <>
          <Checkbox id="checkbox" aria-labelledby="label" />
          <div id="label">Enable</div>
        </>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
