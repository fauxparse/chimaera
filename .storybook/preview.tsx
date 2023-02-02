import React, { PropsWithChildren, useEffect } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { DocsContainer as BaseDocsContainer } from '@storybook/blocks';

import { light, dark } from './themes';

import { themes } from '@storybook/theming';

import '../src/index.css';
import { addons } from '@storybook/manager-api';

themes.light = light;
themes.dark = dark;

const useRootTheme = () => {
  const darkMode = useDarkMode();

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');

    // TODO: https://github.com/hipstersmoothie/storybook-dark-mode/issues/216
    const stored = localStorage.getItem('sb-addon-themes-3');
    if (stored) {
      localStorage.setItem(
        'sb-addon-themes-3',
        JSON.stringify({ ...JSON.parse(stored), light, dark })
      );
    }
  }, [darkMode]);
};

const DocsContainer = ({ children, context }) => {
  const theme = useDarkMode() ? dark : light;

  useRootTheme();

  return (
    <BaseDocsContainer context={context} theme={theme}>
      {children}
    </BaseDocsContainer>
  );
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    container: DocsContainer,
  },
  darkMode: {
    dark,
    light,
  },
};

export const decorators = [
  (Story) => {
    useRootTheme();

    return <Story />;
  },
];
