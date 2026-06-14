import { test, expect } from '@playwright/test';

test('public home page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Resurgence' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Store', exact: true })).toBeVisible();
});

test('protected dashboard redirects to login', async ({ page }) => {
  await page.goto('/account');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test('storefront route is reachable', async ({ page }) => {
  await page.goto('/store');
  await expect(page.getByRole('heading', { name: 'Store' })).toBeVisible();
});
