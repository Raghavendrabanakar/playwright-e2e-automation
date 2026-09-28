test('create project with Done status', async ({ page }) => {

  const projectName = 'Completed Automation Project';

  await page
    .locator('[data-testid="new-project-button"]')
    .click();

  await page
    .locator('[data-testid="new-project-input"]')
    .fill(projectName);

  await page
    .locator('[data-testid="project-owner-input"]')
    .fill('Raghavendra');

  await page
    .locator('[data-testid="project-status-select"]')
    .selectOption({
      label: 'Done',
    });

  const saveButton = page.locator(
    '[data-testid="new-project-submit"]'
  );

  await expect(saveButton).toBeEnabled();

  await saveButton.click();

  await expect(
    page.locator('#project-modal-title')
  ).toBeHidden();

  const projectRow = page.locator('tr').filter({
    hasText: projectName,
  });

  await expect(projectRow).toBeVisible();

  await expect(
    projectRow.locator('td').filter({
      hasText: /^done$/i,
    })
  ).toBeVisible();
});