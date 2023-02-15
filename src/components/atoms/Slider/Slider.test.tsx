import React, { useCallback, useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { describe, expect, it, Mock, vi } from 'vitest';

import { RangeSliderProps, RangeValue, SingleSliderProps, SingleValue } from './Slider.types';
import Slider from '.';

import '../../../index.css';

const drag = async (draggable: HTMLElement, track: HTMLElement, stops: number[]) =>
  act(() => {
    const [initial, ...rest] = stops;
    draggable.dispatchEvent(new MouseEvent('pointerdown', { clientX: initial }));
    rest.forEach((clientX) => {
      track.dispatchEvent(new MouseEvent('pointermove', { clientX }));
    });
    track.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }));
  });

const SingleSliderTest: React.FC<SingleSliderProps> = ({
  value: initialValue,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const changed = useCallback(
    (v: number) => {
      setValue(v);
      onChange(v);
    },
    [onChange]
  );

  return <Slider value={value} onChange={changed} {...props} />;
};

const RangeSliderTest: React.FC<RangeSliderProps> = ({
  value: initialValue,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState<RangeValue>(initialValue);
  const changed = useCallback(
    (v: RangeValue) => {
      setValue(v);
      onChange(v);
    },
    [onChange]
  );

  return <Slider value={value} onChange={changed} {...props} />;
};

describe('Slider', () => {
  describe('Single', () => {
    let onChange: Mock<[SingleValue], void>;
    let user: UserEvent;
    let thumb: HTMLElement;
    let track: HTMLElement;

    beforeEach(() => {
      user = userEvent.setup();
      onChange = vi.fn();
      render(<SingleSliderTest value={50} min={0} max={100} onChange={onChange} />);
    });

    it('renders a slider', () => {
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('adds ARIA attributes', () => {
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50');
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemin', '0');
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemax', '100');
    });

    describe('dragging', () => {
      beforeEach(() => {
        thumb = screen.getByRole('slider');
        Object.defineProperty(thumb, 'offsetWidth', { configurable: true, value: 20 });
        track = thumb.parentElement!;
        Object.defineProperty(track, 'offsetWidth', { configurable: true, value: 500 });
      });

      it('can be dragged', async () => {
        await drag(thumb, track, [12, 136]);
        expect(onChange).toHaveBeenCalledWith(25);
      });
    });

    describe('keyboard', () => {
      beforeEach(() => {
        thumb = screen.getByRole('slider');
      });

      it('decrements when left arrow is pressed', async () => {
        await user.type(thumb, '{ArrowLeft}');
        expect(onChange).toHaveBeenCalledWith(49);
      });

      it('increments when right arrow is pressed', async () => {
        await user.type(thumb, '{ArrowRight}');
        expect(onChange).toHaveBeenCalledWith(51);
      });

      it('decrements when down arrow is pressed', async () => {
        await user.type(thumb, '{ArrowDown}');
        expect(onChange).toHaveBeenCalledWith(49);
      });

      it('increments when up arrow is pressed', async () => {
        await user.type(thumb, '{ArrowUp}');
        expect(onChange).toHaveBeenCalledWith(51);
      });

      it('jumps downwards when pagedown is pressed', async () => {
        await user.type(thumb, '{PageDown}');
        expect(onChange).toHaveBeenCalledWith(40);
      });

      it('jumps upwards when page up is pressed', async () => {
        await user.type(thumb, '{PageUp}');
        expect(onChange).toHaveBeenCalledWith(60);
      });

      it('jumps to the minimum when home is pressed', async () => {
        await user.type(thumb, '{Home}');
        expect(onChange).toHaveBeenCalledWith(0);
      });

      it('jumps to the maximum when end is pressed', async () => {
        await user.type(thumb, '{End}');
        expect(onChange).toHaveBeenCalledWith(100);
      });
    });
  });

  describe('Range', () => {
    let onChange: Mock<[RangeValue], void>;
    let thumb: HTMLElement;
    let track: HTMLElement;
    let bar: HTMLElement;

    beforeEach(() => {
      onChange = vi.fn();
      render(<RangeSliderTest value={[25, 75]} min={0} max={100} onChange={onChange} />);
    });

    it('renders two sliders', () => {
      expect(screen.getAllByRole('slider')).toHaveLength(2);
    });

    it('adds ARIA attributes', () => {
      const [first, second] = screen.getAllByRole('slider');
      expect(first).toHaveAttribute('aria-valuenow', '25');
      expect(first).toHaveAttribute('aria-valuemin', '0');
      expect(first).toHaveAttribute('aria-valuemax', '100');
      expect(second).toHaveAttribute('aria-valuenow', '75');
      expect(second).toHaveAttribute('aria-valuemin', '0');
      expect(second).toHaveAttribute('aria-valuemax', '100');
    });

    describe('dragging the first thumb', () => {
      beforeEach(() => {
        thumb = screen.getAllByRole('slider')[0];
        Object.defineProperty(thumb, 'offsetWidth', { configurable: true, value: 20 });
        track = thumb.parentElement!;
        Object.defineProperty(track, 'offsetWidth', { configurable: true, value: 500 });
      });

      it('drags a little way', async () => {
        await drag(thumb, track, [12, 262, 263, 262]);
        expect(onChange).toHaveBeenCalledWith([50, 75]);
      });

      it('drags a long way', async () => {
        await drag(thumb, track, [12, 600]);
        expect(onChange).toHaveBeenCalledWith([75, 100]);
      });
    });

    describe('dragging the second thumb', () => {
      beforeEach(() => {
        thumb = screen.getAllByRole('slider')[1];
        Object.defineProperty(thumb, 'offsetWidth', { configurable: true, value: 20 });
        track = thumb.parentElement!;
        Object.defineProperty(track, 'offsetWidth', { configurable: true, value: 500 });
      });

      it('drags a little way', async () => {
        await drag(thumb, track, [12, 262]);
        expect(onChange).toHaveBeenCalledWith([25, 50]);
      });

      it('drags a long way', async () => {
        await drag(thumb, track, [12, 0]);
        expect(onChange).toHaveBeenCalledWith([0, 25]);
      });
    });

    describe('dragging the range bar', () => {
      beforeEach(() => {
        bar = screen.getAllByRole('slider')[0].previousElementSibling as HTMLElement;
        Object.defineProperty(bar, 'offsetWidth', { configurable: true, value: 238 });
        track = bar.parentElement!;
        Object.defineProperty(track, 'offsetWidth', { configurable: true, value: 500 });
      });

      it('drags a long way', async () => {
        await drag(bar, track, [20, 1000, 1001, 1000]);
        expect(onChange).toHaveBeenCalledWith([50, 100]);
      });
    });
  });

  describe('RTL', () => {
    let onChange: Mock<[SingleValue], void>;
    let user: UserEvent;
    let thumb: HTMLElement;
    let track: HTMLElement;

    beforeEach(() => {
      user = userEvent.setup();
      onChange = vi.fn();
      render(<SingleSliderTest dir="rtl" value={50} min={0} max={100} onChange={onChange} />);
    });

    it('renders a slider', () => {
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('adds ARIA attributes', () => {
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50');
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemin', '0');
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemax', '100');
    });

    describe('dragging', () => {
      beforeEach(() => {
        thumb = screen.getByRole('slider');
        Object.defineProperty(thumb, 'offsetWidth', { configurable: true, value: 20 });
        track = thumb.parentElement!;
        Object.defineProperty(track, 'offsetWidth', { configurable: true, value: 500 });
      });

      it('can be dragged', async () => {
        await drag(thumb, track, [12, 368]);
        expect(onChange).toHaveBeenCalledWith(25);
      });
    });

    describe('keyboard', () => {
      beforeEach(() => {
        thumb = screen.getByRole('slider');
      });

      it('decrements when right arrow is pressed', async () => {
        await user.type(thumb, '{ArrowRight}');
        expect(onChange).toHaveBeenCalledWith(49);
      });

      it('increments when left arrow is pressed', async () => {
        await user.type(thumb, '{ArrowLeft}');
        expect(onChange).toHaveBeenCalledWith(51);
      });

      it('decrements when down arrow is pressed', async () => {
        await user.type(thumb, '{ArrowDown}');
        expect(onChange).toHaveBeenCalledWith(49);
      });

      it('increments when up arrow is pressed', async () => {
        await user.type(thumb, '{ArrowUp}');
        expect(onChange).toHaveBeenCalledWith(51);
      });

      it('jumps downwards when pagedown is pressed', async () => {
        await user.type(thumb, '{PageDown}');
        expect(onChange).toHaveBeenCalledWith(40);
      });

      it('jumps upwards when left arrow is pressed', async () => {
        await user.type(thumb, '{PageUp}');
        expect(onChange).toHaveBeenCalledWith(60);
      });

      it('jumps to the minimum when home is pressed', async () => {
        await user.type(thumb, '{Home}');
        expect(onChange).toHaveBeenCalledWith(0);
      });

      it('jumps to the maximum when end is pressed', async () => {
        await user.type(thumb, '{End}');
        expect(onChange).toHaveBeenCalledWith(100);
      });
    });
  });
});
