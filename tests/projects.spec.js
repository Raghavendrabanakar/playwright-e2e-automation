import { test, expect } from '@playwright/test';

test.describe('Projects E2E Tests', {tag: '@regression'}, () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('/');

    await page.locator('#username').fill('raghu');

    await page.locator('[type="password"]').fill('Test@123');

    await page.locator('#login-button').click();

    await expect(
      page.locator('text=You\'re in.')
    ).toBeVisible();

    await page.locator('[data-testid="nav-projects"]').click();

    await expect(
      page.getByRole('heading', { name: 'Projects' })
    ).toBeVisible();
  });


  test('create new project', async ({ page }) => {

    const projectName = 'Playwright E2E Project';

    await page
      .locator('[data-testid="new-project-button"]')
      .click();

    const modal = page.locator('#project-modal-title');

    await expect(modal).toBeVisible();

    // Actual fields shown by the application
    await page
      .getByRole('textbox', { name: 'Name' })
      .fill(projectName);

    await page
      .getByRole('textbox', { name: 'Owner' })
      .fill('Raghavendra');

    await page
      .getByRole('combobox', { name: 'Status' })
      .selectOption({ label: 'Active' });

    const saveButton = page.getByRole('button', {
      name: 'Save',
      exact: true
    });

    await expect(saveButton).toBeEnabled();

    await saveButton.click();

    // Verify project was created
    await expect(
      page.locator('tr').filter({
        hasText: projectName
      })
    ).toBeVisible();
  });


  test('create project with Done status', async ({ page }) => {

    const projectName = 'Completed Automation Project';

    await page
      .locator('[data-testid="new-project-button"]')
      .click();

    const modal = page.locator('#project-modal-title');

    await expect(modal).toBeVisible();

    // Name
    await page
      .getByRole('textbox', { name: 'Name' })
      .fill(projectName);

    // Owner
    await page
      .getByRole('textbox', { name: 'Owner' })
      .fill('Raghavendra');

    // Status
    const status = page.getByRole('combobox', {
      name: 'Status'
    });

    await status.selectOption({
      label: 'Done'
    });

    // Verify Done was selected
    await expect(status).toHaveValue('done');

    // Save
    const saveButton = page.getByRole('button', {
      name: 'Save',
      exact: true
    });

    await expect(saveButton).toBeEnabled();

    await saveButton.click();

    // Verify project
    const projectRow = page
      .locator('tr')
      .filter({
        hasText: projectName
      });

    await expect(projectRow).toBeVisible();

    await expect(projectRow).toContainText('done');
  });


  test('cancel new project creation', async ({ page }) => {

    await page
      .locator('[data-testid="new-project-button"]')
      .click();

    const modal = page.locator('#project-modal-title');

    await expect(modal).toBeVisible();

    await page
      .getByRole('button', {
        name: 'Cancel',
        exact: true
      })
      .click();

    await expect(modal).toBeHidden();
  });


  test('delete project', async ({ page }) => {

    const projectName = 'Project to delete';

    // Open modal
    await page
      .locator('[data-testid="new-project-button"]')
      .click();

    const modal = page.locator('#project-modal-title');

    await expect(modal).toBeVisible();

    // Create project
    await page
      .getByRole('textbox', { name: 'Name' })
      .fill(projectName);

    await page
      .getByRole('textbox', { name: 'Owner' })
      .fill('Raghavendra');

    await page
      .getByRole('combobox', { name: 'Status' })
      .selectOption({ label: 'Active' });

    await page
      .getByRole('button', {
        name: 'Save',
        exact: true
      })
      .click();

    // Verify project was created
    const projectRow = page
      .locator('tr')
      .filter({
        hasText: projectName
      });

    await expect(projectRow).toBeVisible();

    // Delete project
    await projectRow
      .getByRole('button', {
        name: 'Delete',
        exact: true
      })
      .click();

    // Delete confirmation
    await expect(
      page.getByText('Delete this project?', {
        exact: true
      })
    ).toBeVisible();

    // Confirm delete
    await page
      .getByRole('button', {
        name: 'Delete',
        exact: true
      })
      .last()
      .click();

    // Verify deleted
    await expect(projectRow).toBeHidden();
  });

});