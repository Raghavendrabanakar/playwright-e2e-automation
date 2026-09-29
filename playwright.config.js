// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const baseURL =
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
  'https://playwrightautomationbyraghavendra.netlify.app/';

export default defineConfig({
  testDir: './tests',

  timeout: 60 * 1000,

  expect: {
    timeout: 5000,
  },

  fullyParallel: false,

  workers: 1,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL,

    // Headed locally, headless in GitHub Actions
    headless: !!process.env.CI,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on',

    launchOptions: {
      slowMo: process.env.CI ? 0 : 300,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});