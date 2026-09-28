// @ts-check
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const baseURL =
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
  'https://playwrightautomationbyraghavendra.netlify.app/';

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
    baseURL,
    browserName: 'chromium',

    headless: !!process.env.CI,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on',

    launchOptions: {
      slowMo: process.env.CI ? 0 : 800,
    },
  },
});