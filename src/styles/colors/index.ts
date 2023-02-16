import { TinyColor } from '@ctrl/tinycolor';
import { groupBy, mapValues, uniq } from 'lodash-es';

import DARK from './dark.json';
import LIGHT from './light.json';

export type Hue =
  | 'tomato'
  | 'red'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'grass'
  | 'orange'
  | 'brown'
  | 'sky'
  | 'mint'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'gray'
  | 'mauve'
  | 'slate'
  | 'sage'
  | 'olive'
  | 'sand'
  | 'gold'
  | 'bronze';

export type Scheme = 'light' | 'dark';
type ShadeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ShadeString = `${ShadeNumber}` | `a-${ShadeNumber}`;
export type Shade = ShadeNumber | ShadeString;

const PALETTES = mapValues({ light: LIGHT, dark: DARK }, (palette) =>
  mapValues(
    groupBy(Object.entries(palette), ([key]) => key.split('-')[0]),
    (scale) =>
      Object.fromEntries(
        scale.map(([key, value]) => [
          key.split('-').slice(1).join('-') as ShadeString,
          new TinyColor(value),
        ])
      )
  )
) as Record<Scheme, Record<Hue, Record<Shade, TinyColor>>>;

export const HUES = Object.keys(PALETTES.light) as Hue[];
export const SHADES = uniq(
  Object.values(PALETTES.light).flatMap((scale) => Object.keys(scale))
) as Shade[];

const isHue = (hue: string): hue is Hue => HUES.includes(hue as Hue);
const isShade = (shade: string | number): shade is Shade =>
  SHADES.includes(String(shade) as ShadeString);

export function color(hue: Hue, shade: Shade = 9, scheme: Scheme = 'light'): TinyColor {
  if (!isHue(hue)) throw new Error(`Invalid hue: ${hue}`);
  if (!isShade(shade)) throw new Error(`Invalid shade: ${shade}`);
  return PALETTES[scheme][hue][shade];
}
