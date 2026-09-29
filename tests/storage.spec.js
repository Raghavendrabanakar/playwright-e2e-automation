import { test, expect } from '@playwright/test';

test.describe('Browser Storage Tests', { tag: '@regression' }, () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await page
      .locator('#username')
      .fill(process.env.TEST_USERNAME);

    await page
      .locator('[type="password"]')
      .fill(process.env.TEST_PASSWORD);

    await page
      .locator('#login-button')
      .click();

    await expect(
      page.locator('text=You\'re in.')
    ).toBeVisible();
  });


  test('authenticated user should be stored in localStorage', async ({ page }) => {

    const storedUser = await page.evaluate(() => {
      return localStorage.getItem('loopline_user');
    });

    expect(storedUser).toBe('raghu');
  });


  test('new project should be persisted in localStorage', async ({ page }) => {

    const projectName = `Storage Test ${Date.now()}`;

    // Go to Projects
    await page
      .locator('[data-testid="nav-projects"]')
      .click();

    // Open New Project
    await page
      .locator('[data-testid="new-project-button"]')
      .click();

    // Fill project name
    const visibleInputs = page.locator('input:visible');

    await visibleInputs.nth(0).fill(projectName);

    // Fill owner
    await visibleInputs.nth(1).fill('Raghavendra');

    // Select status
    await page
      .locator('select:visible')
      .selectOption('active');

    // Save
    await page
      .locator('button:visible')
      .filter({ hasText: /^Save$/ })
      .click();

    // Verify project appears in UI
    const projectRow = page
      .locator('tr')
      .filter({ hasText: projectName });

    await expect(projectRow).toBeVisible();

    // Read localStorage after creation
    const projects = await page.evaluate(() => {
      return JSON.parse(
        localStorage.getItem('loopline_projects') || '[]'
      );
    });

    // Verify localStorage contains the created project
    const createdProject = projects.find(
      project => project.name === projectName
    );

    expect(createdProject).toBeDefined();
    expect(createdProject.name).toBe(projectName);
    expect(createdProject.owner).toBe('Raghavendra');
    expect(createdProject.status).toBe('active');
  });

});