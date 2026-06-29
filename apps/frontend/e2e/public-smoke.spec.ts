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

test('expanded companion public routes are reachable', async ({ page }) => {
  await page.goto('/support');
  await expect(page.getByRole('heading', { name: 'Support' })).toBeVisible();

  await page.goto('/docs');
  await expect(page.getByRole('heading', { name: 'Docs' })).toBeVisible();

  await page.goto('/portfolio');
  await expect(page.getByRole('heading', { name: 'Project Portfolio' })).toBeVisible();

  await page.goto('/media');
  await expect(page.getByRole('heading', { name: 'Media Gallery' })).toBeVisible();

  await page.goto('/alpha');
  await expect(page.getByRole('heading', { name: 'Alpha Information' })).toBeVisible();

  await page.goto('/profile/rook');
  await expect(page.getByRole('heading', { name: 'rook' })).toBeVisible();
});

test('protected support workflows redirect to login', async ({ page }) => {
  await page.goto('/support/bug-report');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
