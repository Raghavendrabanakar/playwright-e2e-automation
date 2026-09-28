const projectRow = page.locator('tr').filter({
  hasText: projectName,
});

await expect(projectRow).toBeVisible();

await projectRow
  .locator('button')
  .filter({
    hasText: /^Delete$/,
  })
  .click();

  await expect(
  page.locator('text=Delete this project?')
).toBeVisible();

await page
  .locator('[data-testid="confirm-delete-button"]')
  .click();