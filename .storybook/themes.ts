import { themes } from '@storybook/theming';

import { color } from '../src/styles/colors';
import tokens from '../src/styles/tokens.json';

const fonts = {
  fontBase: tokens.font.stack['sans-serif'],
  fontCode: tokens.font.stack['monospace'],
};

export const light = {
  ...themes.light,
  colorPrimary: color('crimson', 9, 'light').toHexString(),
  colorSecondary: color('crimson', 9, 'light').toHexString(),
  appBg: color('slate', 1, 'light').toHexString(),
  appContentBg: color('slate', 1, 'light').toHexString(),
  appBorderColor: color('slate', 6, 'light').toHexString(),
  barBg: color('slate', 2, 'light').toHexString(),
  barTextColor: color('slate', 12, 'light').toHexString(),
  textColor: color('slate', 12, 'light').toHexString(),
  textInverseColor: color('slate', 1, 'light').toHexString(),
  ...fonts,
};

export const dark = {
  ...themes.dark,
  colorPrimary: color('crimson', 9, 'dark').toHexString(),
  colorSecondary: color('crimson', 9, 'dark').toHexString(),
  appBg: color('slate', 1, 'dark').toHexString(),
  appContentBg: color('slate', 1, 'dark').toHexString(),
  appBorderColor: color('slate', 6, 'dark').toHexString(),
  barBg: color('slate', 2, 'dark').toHexString(),
  barTextColor: color('slate', 12, 'dark').toHexString(),
  textColor: color('slate', 12, 'dark').toHexString(),
  textInverseColor: color('slate', 1, 'dark').toHexString(),
  ...fonts,
};
