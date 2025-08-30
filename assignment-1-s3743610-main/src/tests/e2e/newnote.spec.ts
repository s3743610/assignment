import { test, expect, Page } from '@playwright/test';

const BASE = process.env.BASE_URL || 'http://localhost:3000';

function titleLocator(page: Page) {
  return page.locator(
    [
      'input[name="title"]',
      '#title',
      'input[placeholder*="Title" i]',
      'input[aria-label*="Title" i]',
    ].join(', ')
  );
}

function descLocator(page: Page) {
  return page.locator(
    [
      'textarea[name="description"]',
      '#description',
      'textarea[placeholder*="Description" i]',
      'textarea[aria-label*="Description" i]',
    ].join(', ')
  );
}

test('create then redirect to login (backend-verified)', async ({ page }) => {
  // Load the new-note form to prove the UI renders
  await page.goto(`${BASE}/notes/new`);
  await expect(page).toHaveURL(/\/notes\/new$/);

  // Fill fields using flexible selectors
  const title = `E2E ${Date.now()}`;
  await expect(titleLocator(page)).toBeVisible({ timeout: 5000 });
  await titleLocator(page).fill(title);

  await expect(descLocator(page)).toBeVisible({ timeout: 5000 });
  await descLocator(page).fill('E2E Description');

  // Submit via backend but DO NOT follow redirects
  const res = await page.request.fetch(`${BASE}/notes`, {
    method: 'POST',
    form: { title, description: 'E2E Description' },
    maxRedirects: 0,
  });

  // Assert the redirect
  expect(res.status()).toBe(302);
  const loc = res.headers()['location'] || res.headers()['Location'];
  expect(loc).toBe('/login');

  // Follow the redirect in the browser and assert final page
  await page.goto(`${BASE}${loc}`);
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.locator('h1')).toHaveText(/login/i);
});


