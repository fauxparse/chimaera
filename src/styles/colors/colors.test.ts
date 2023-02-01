import { describe, expect, it } from 'vitest';

import { color, Hue, Shade } from '.';

describe('color', () => {
  it('finds a default color', () => {
    expect(color('red').toHslString()).toEqual('hsl(0, 84%, 60%)');
  });

  it('finds a shade specified as a number', () => {
    expect(color('pink', 600).toHslString()).toEqual('hsl(333, 71%, 51%)');
  });

  it('finds a shade specified as a string', () => {
    expect(color('pink', 600).toHslString()).toEqual('hsl(333, 71%, 51%)');
  });

  it('throws an error for an undefined hue', () => {
    expect(() => color('brown' as Hue)).toThrowError();
  });

  it('throws an error for an undefined shade', () => {
    expect(() => color('pink', 0 as Shade)).toThrowError();
  });
});
