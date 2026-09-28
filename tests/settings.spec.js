import { test, expect } from '@playwright/test';

test.describe('Settings E2E Tests', { tag: '@regression' },
   () => {

  test.beforeEach(async ({ page }) => {

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
      .locator('[data-testid="nav-settings"]')
      .click();
  });


  test('update profile settings', async ({ page }) => {

    const visibleInputs = page.locator(
      'input:visible'
    );

    const count = await visibleInputs.count();

    /*
     * Login inputs are no longer visible.
     * Settings contains the profile inputs.
     */

    const displayName = visibleInputs.nth(0);
    const email = visibleInputs.nth(1);

    await displayName.fill(
      'Raghavendra QA Engineer'
    );

    await email.fill(
      'raghavendra@example.com'
    );

   await page
  .locator('button')
  .filter({
    hasText: 'Save changes',
  })
  .click();

await expect(
  page.locator('[data-testid="settings-success"]')
).toBeVisible();
  });

});