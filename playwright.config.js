// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  fullyParallel: false,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: 'https://playwrightautomationbyraghavendra.netlify.app/',

    browserName: 'chromium',

    // Headed locally, headless in GitHub Actions
    headless: !!process.env.CI,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'on',

    launchOptions: {
      // Slow motion only when running locally
      slowMo: process.env.CI ? 0 : 800,
    },
  },
});