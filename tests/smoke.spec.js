import { test, expect } from '@playwright/test';

test('renders a page in Chromium', async ({ page }) => {
  await page.setContent(
    '<title>Playwright ready</title><h1>It works</h1>'
  );

  await expect(page.locator('h1')).toHaveText('It works');
});