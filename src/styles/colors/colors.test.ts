import { describe, expect, it } from 'vitest';

import { color, Hue, Shade } from '.';

describe('color', () => {
  it('finds a default color', () => {
    expect(color('red').toHslString()).toEqual('hsl(358, 75%, 59%)');
  });

  it('finds a shade specified as a number', () => {
    expect(color('pink', 6).toHslString()).toEqual('hsl(323, 66%, 87%)');
  });

  it('finds a shade specified as a string', () => {
    expect(color('pink', 'a-6').toHslString()).toEqual('hsla(323, 99%, 40%, 0.22)');
  });

  it('throws an error for an undefined hue', () => {
    expect(() => color('poo-brown' as Hue)).toThrowError();
  });

  it('throws an error for an undefined shade', () => {
    expect(() => color('pink', 0 as Shade)).toThrowError();
  });
});
