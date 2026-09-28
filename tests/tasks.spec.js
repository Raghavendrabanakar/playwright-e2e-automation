import { test, expect } from '@playwright/test';

test.describe('Tasks E2E Tests',{ tag: '@regression' },
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
      .locator('[data-testid="nav-tasks"]')
      .click();
  });


  test('add new task', async ({ page }) => {

    const taskName = 'Automate regression testing';

    await page
      .locator('input[placeholder="Add a task…"]')
      .fill(taskName);

    await page
      .locator('button')
      .filter({
        hasText: 'Add task',
      })
      .click();

    await expect(
      page.getByText(taskName, {
        exact: true,
      })
    ).toBeVisible();
  });


  test('search task', async ({ page }) => {

    const taskName = 'Automate regression testing';

    await page
      .locator('input[placeholder="Add a task…"]')
      .fill(taskName);

    await page
      .locator('button')
      .filter({
        hasText: 'Add task',
      })
      .click();

    await page
      .locator('input[placeholder="Search tasks…"]')
      .fill(taskName);

    await expect(
      page.getByText(taskName, {
        exact: true,
      })
    ).toBeVisible();
  });


  test('filter active tasks', async ({ page }) => {

    const activeFilter = page.locator(
      '[data-testid="task-filter-active"]'
    );

    await activeFilter.click();

    await expect(activeFilter).toHaveClass(/active/);
  });


  test('filter completed tasks', async ({ page }) => {

    const completedFilter = page.locator(
      '[data-testid="task-filter-completed"]'
    );

    await completedFilter.click();

    await expect(completedFilter).toHaveClass(/active/);
  });


  test('show all tasks', async ({ page }) => {

    const allFilter = page.locator(
      '[data-testid="task-filter-all"]'
    );

    await allFilter.click();

    await expect(allFilter).toHaveClass(/active/);
  });

});