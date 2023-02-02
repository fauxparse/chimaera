import TOKENS from '../tokens.json';

export enum FontSize {
  TINY = 'tiny',
  SMALL = 'small',
  MEDIUM = 'medium',
}

const BASE = parseInt(TOKENS.size.base, 10);

export const fontSize = (size: FontSize): number => parseFloat(TOKENS.font.size[size]) * BASE;

export const lineHeight = (size: FontSize): number =>
  parseFloat(TOKENS.font.lineHeight[size]) * BASE;
