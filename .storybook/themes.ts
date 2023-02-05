import { themes } from '@storybook/theming';

import { color } from '../src/styles/colors';
import tokens from '../src/styles/tokens.json';

const fonts = {
  fontBase: tokens.font.stack['sans-serif'],
  fontCode: tokens.font.stack['monospace'],
};

export const light = {
  ...themes.light,
  colorPrimary: color('rose', 500).toHexString(),
  colorSecondary: color('rose', 500).toHexString(),
  appBg: color('slate', 200).toHexString(),
  appContentBg: '#fff',
  appBorderColor: color('slate', 300).toHexString(),
  barBg: color('slate', 100).toHexString(),
  barTextColor: color('slate', 600).toHexString(),
  textColor: color('slate', 800).toHexString(),
  textInverseColor: color('slate', 100).toHexString(),
  ...fonts,
};

export const dark = {
  ...themes.dark,
  colorPrimary: color('rose', 500).toHexString(),
  colorSecondary: color('rose', 500).toHexString(),
  appBg: color('slate', 900).toHexString(),
  appContentBg: color('slate', 800).toHexString(),
  appBorderColor: color('slate', 600).toHexString(),
  barBg: color('slate', 900).toHexString(),
  barTextColor: color('slate', 300).toHexString(),
  textColor: color('slate', 100).toHexString(),
  textInverseColor: color('slate', 900).toHexString(),
  ...fonts,
};
