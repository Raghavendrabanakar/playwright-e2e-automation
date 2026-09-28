import { test, expect } from '@playwright/test';

test('user should access authenticated dashboard', async ({ page }) => {

  await page.goto('/');

  // Login
  await page.locator('#username').fill('raghu');

  await page
    .locator('[type="password"]')
    .fill('Test@123');

  await page.locator('#login-button').click();

  // Verify successful login
  await expect(
    page.locator('text=You\'re in.')
  ).toBeVisible();

  // Verify dashboard
  const dashboard = page.locator('[data-testid="dashboard"]');

  await expect(dashboard).toBeVisible();

  // Verify dashboard statistics
  await expect(
    dashboard.locator('.label').filter({
      hasText: /^Total projects$/
    })
  ).toBeVisible();

  await expect(
    dashboard.locator('.label').filter({
      hasText: /^Active$/
    })
  ).toBeVisible();

  await expect(
    dashboard.locator('.label').filter({
      hasText: /^Done$/
    })
  ).toBeVisible();

});