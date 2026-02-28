import { defineConfig, devices } from '@playwright/experimental-ct-react';
import react from '@vitejs/plugin-react';

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.ct.spec.tsx',
  use: {
    ctPort: 3100,
    ctViteConfig: {
      plugins: [react()]
    },
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
