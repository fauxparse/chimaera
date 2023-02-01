import { TinyColor } from '@ctrl/tinycolor';
import { uniq } from 'lodash-es';

import COLORS from './colors.json';

export type Hue =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';
type ShadeNumber = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ShadeString = `${ShadeNumber}`;
export type Shade = ShadeNumber | ShadeString;

export const HUES = uniq(Object.keys(COLORS).map((key) => key.split('-')[0])) as Hue[];
export const SHADES = uniq(Object.keys(COLORS).map((key) => key.split('-')[1])) as Shade[];

const isHue = (hue: string): hue is Hue => HUES.includes(hue as Hue);
const isShade = (shade: string | number): shade is Shade =>
  SHADES.includes(String(shade) as ShadeString);

export function color(hue: Hue, shade: Shade = 500): TinyColor {
  if (!isHue(hue)) throw new Error(`Invalid hue: ${hue}`);
  if (!isShade(shade)) throw new Error(`Invalid shade: ${shade}`);

  const key = [hue, shade, 'hsl'].join('-');

  return new TinyColor(`hsl(${COLORS[key as keyof typeof COLORS]})`);
}
