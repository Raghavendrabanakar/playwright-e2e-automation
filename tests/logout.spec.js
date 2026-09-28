import { test, expect } from '@playwright/test';

test('user should logout successfully',{ tag: '@smoke' },
   async ({ page }) => {

  await page.goto('/');

  await page.locator('#username').fill('raghu');

  await page
    .locator('[type="password"]')
    .fill('Test@123');

  await page.locator('#login-button').click();

  await expect(
    page.locator('text=You\'re in.')
  ).toBeVisible();

  await page
    .locator('button')
    .filter({
      hasText: 'Log out',
    })
    .click();

  await expect(
    page.locator('#login-button')
  ).toBeVisible();

  await expect(
    page.locator('#username')
  ).toBeVisible();
});