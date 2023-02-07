import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      types: path.resolve(__dirname, './src/types'),
    },
  },
  test: {
    globals: true,
    css: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      exclude: [...configDefaults.coverage.exclude, '**/tests/setup.ts'],
    },
    threads: false,
  },
  build: {
    minify: false,
    target: 'ESNext',
    rollupOptions: {
      output: {
        preserveModules: true,
      },
    },
  },
});
