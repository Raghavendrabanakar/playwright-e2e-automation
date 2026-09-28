import {
  test as base,
  expect,
} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProjectsPage } from '../pages/ProjectsPage.js';
import { TasksPage } from '../pages/TasksPage.js';
import { TeamPage } from '../pages/TeamPage.js';
import { SettingsPage } from '../pages/SettingsPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);

    await use(dashboardPage);
  },

  projectsPage: async ({ page }, use) => {
    const projectsPage = new ProjectsPage(page);

    await use(projectsPage);
  },

  tasksPage: async ({ page }, use) => {
    const tasksPage = new TasksPage(page);

    await use(tasksPage);
  },

  teamPage: async ({ page }, use) => {
    const teamPage = new TeamPage(page);

    await use(teamPage);
  },

  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);

    await use(settingsPage);
  },
});

export { expect };