import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';
import { render, screen } from '@testing-library/react';
import { Polymorphic, PolymorphicRef } from 'types/polymorphic.types';
import { describe, expect, it } from 'vitest';

import Proton, { ProtonProps } from './Proton';

describe('Proton', () => {
  it('renders a div by default', () => {
    render(<Proton>proton</Proton>);
    expect(screen.getByText('proton').tagName).toBe('DIV');
  });

  it('can render a button', () => {
    render(
      <Proton as="button" type="submit">
        proton
      </Proton>
    );
    const button = screen.getByText('proton');
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('can render a custom component', () => {
    const CustomComponent = (props: ComponentPropsWithoutRef<'div'>) => (
      <div data-custom="proton" {...props} />
    );
    render(<Proton as={CustomComponent}>proton</Proton>);
    expect(screen.getByText('proton')).toHaveAttribute('data-custom', 'proton');
  });

  it('handles refs', () => {
    render(<Proton ref={(el) => el?.setAttribute('data-cool', 'beans')}>proton</Proton>);
    expect(screen.getByText('proton')).toHaveAttribute('data-cool', 'beans');
  });

  describe('as a base for other components', () => {
    const BaseTest = forwardRef(
      <C extends ElementType = 'button'>(
        { as, name, children, ...props }: Polymorphic<C, { name: string }>,
        ref?: PolymorphicRef<C>
      ) => {
        const Component = (as ?? 'button') as C;

        return (
          <Proton ref={ref} as={Component} {...(props as ProtonProps<C>)}>
            {name}
          </Proton>
        );
      }
    );

    it('has a default tag', () => {
      render(<BaseTest name="proton" />);
      expect(screen.getByText('proton').tagName).toBe('BUTTON');
    });

    it('can have a custom tag', () => {
      render(<BaseTest as="span" name="proton" />);
      expect(screen.getByText('proton').tagName).toBe('SPAN');
    });
  });
});
