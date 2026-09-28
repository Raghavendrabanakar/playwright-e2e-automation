import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {

  test('valid user should login successfully', async ({ page }) => {

    await page.goto('/');

    await page.locator('#username').fill('raghu');

    await page
      .locator('[type="password"]')
      .fill('Test@123');

    await page.locator('#login-button').click();

    await expect(
      page.locator('text=You\'re in.')
    ).toBeVisible();

    await expect(
      page.locator('text=Signed in as')
    ).toBeVisible();
  });


  test('invalid user should display login error', async ({ page }) => {

    await page.goto('/');

    await page.locator('#username').fill('wronguser');

    await page
      .locator('[type="password"]')
      .fill('WrongPassword');

    await page.locator('#login-button').click();

    const errorMessage = page.locator(
      '[data-testid="error-message"]'
    );

    await expect(errorMessage).toBeVisible();

    await expect(errorMessage).toHaveText(
      "That username or password isn't right. Try again."
    );
  });


  test('empty username should not login', async ({ page }) => {

    await page.goto('/');

    await page
      .locator('[type="password"]')
      .fill('Test@123');

    await page.locator('#login-button').click();

    await expect(
      page.locator('#username')
    ).toBeVisible();
  });

});