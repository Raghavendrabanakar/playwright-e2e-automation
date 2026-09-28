import { test, expect } from '@playwright/test';

test.describe('Team E2E Tests', () => {

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
      .locator('[data-testid="nav-team"]')
      .click();
  });


  test('search team member', async ({ page }) => {

    const searchBox = page.locator(
      'input[placeholder="Search by name…"]'
    );

    await searchBox.fill('Priya');

    await expect(
      page.locator('tr').filter({
        hasText: /Priya Nair/
      })
    ).toBeVisible();
  });


  test('filter team by role', async ({ page }) => {

    const roleDropdown = page.locator('select').first();

    await roleDropdown.selectOption({
      label: 'QA'
    });

    await expect(
      page.locator('tr').filter({
        hasText: /Raghu Iyer/
      })
    ).toBeVisible();
  });

});