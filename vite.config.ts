import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true
  }
});
