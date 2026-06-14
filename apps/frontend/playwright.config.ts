import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  use: {
    baseURL: process.env['APP_PUBLIC_URL'] ?? 'http://127.0.0.1:4200',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start:e2e',
    url: 'http://127.0.0.1:4200',
    reuseExistingServer: !process.env['CI'],
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
