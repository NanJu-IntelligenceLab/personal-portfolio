import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const entry = 'ai-generated-page.html';

test('root opens Version 1 at the project-site subpath', async ({ page }) => {
  await page.goto('./');
  await expect(page).toHaveURL(/\/personal-portfolio\/ai-generated-page\.html$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Building intelligent applications');
});

for (const width of [320, 768, 1280, 1440]) {
  test(`no horizontal overflow at ${width}px, including expanded projects`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto(entry);
    await page.locator('details').evaluateAll(items => items.forEach(item => { item.open = true; }));
    const overflow = await page.evaluate(() => ({ width: innerWidth, document: document.documentElement.scrollWidth,
      elements: [...document.querySelectorAll('main *')].filter(el => {
        const box = el.getBoundingClientRect();
        return box.width > 0 && (box.right > innerWidth + 1 || box.left < -1);
      }).map(el => `${el.tagName}.${el.className}`)
    }));
    expect(overflow.document, JSON.stringify(overflow)).toBeLessThanOrEqual(width);
    expect(overflow.elements).toEqual([]);
  });
}

test('keyboard skip link and independent native project disclosure work', async ({ page }) => {
  await page.goto(entry);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  const summaries = page.locator('summary');
  await summaries.nth(0).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details').nth(0)).toHaveAttribute('open', '');
  await summaries.nth(1).click();
  await expect(page.locator('details').nth(0)).toHaveAttribute('open', '');
  await expect(page.locator('details').nth(1)).toHaveAttribute('open', '');
  await expect(page.getByText('DATA FLOW / EDGE → BACKEND')).toBeVisible();
});

test('navigation marks the current section without covering its heading', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(entry);
  await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'location');
  const sectionTop = await page.locator('#projects').evaluate(el => el.getBoundingClientRect().top);
  const headerBottom = await page.locator('header').evaluate(el => el.getBoundingClientRect().bottom);
  expect(sectionTop).toBeGreaterThanOrEqual(headerBottom);
  await page.getByRole('navigation').getByRole('link', { name: /Contact/ }).click();
  await expect(page.getByRole('navigation').getByRole('link', { name: /Contact/ })).toHaveAttribute('aria-current', 'location');
});

test('copy email reports success and preserves the contact link', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
    writeText: async text => { window.copiedEmail = text; }
  }}));
  await page.goto(entry);
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.getByRole('status')).toHaveText('Email copied.');
  expect(await page.evaluate(() => window.copiedEmail)).toBe('wunanju965@gmail.com');
  await expect(page.locator('#professional-email')).toHaveAttribute('href', 'mailto:wunanju965@gmail.com');
});

test('denied clipboard access gives a usable fallback', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
    writeText: async () => { throw new Error('Permission denied'); }
  }}));
  await page.goto(entry);
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.getByRole('status')).toContainText('Could not copy. Select the email above');
  await expect(page.getByRole('button', { name: 'Copy email' })).toBeEnabled();
  await expect(page.locator('#professional-email')).toHaveAttribute('href', 'mailto:wunanju965@gmail.com');
});

test('content, disclosures and contact links survive without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const base = test.info().project.use.baseURL;
  await page.goto(new URL(entry, base).href);
  await expect(page.getByRole('heading', { name: 'Tools with a purpose.' })).toBeVisible();
  await page.locator('#project-iot summary').click();
  await expect(page.locator('#project-iot details')).toHaveAttribute('open', '');
  await expect(page.getByText('DATA FLOW / EDGE → BACKEND')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Copy email' })).toBeHidden();
  await expect(page.locator('#professional-email')).toHaveAttribute('href', 'mailto:wunanju965@gmail.com');
  await context.close();
});

test('reduced motion disables smooth scrolling and long transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(entry);
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior)).toBe('auto');
  const duration = await page.locator('.button').first().evaluate(el => getComputedStyle(el).transitionDuration);
  expect(duration.split(',').every(value => parseFloat(value) <= 0.001)).toBeTruthy();
});

test('local links, anchors, IDs and resources are valid with no browser errors', async ({ page, request }) => {
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('console', message => { if (message.type() === 'error') failures.push(message.text()); });
  page.on('requestfailed', req => failures.push(`${req.url()}: ${req.failure()?.errorText}`));
  await page.goto(entry);
  const inspection = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
    return {
      duplicates: ids.filter((id, index) => ids.indexOf(id) !== index),
      brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].map(el => el.getAttribute('href')).filter(href => href === '#' || !document.getElementById(href.slice(1))),
      missingLinks: [...document.querySelectorAll('a')].filter(el => !el.getAttribute('href')).length,
      resources: [...document.querySelectorAll('[src], link[rel="stylesheet"], link[rel="icon"]')].map(el => el.src || el.href)
    };
  });
  expect(inspection.duplicates).toEqual([]);
  expect(inspection.brokenAnchors).toEqual([]);
  expect(inspection.missingLinks).toBe(0);
  for (const url of inspection.resources) expect((await request.get(url)).status()).toBe(200);
  expect(failures).toEqual([]);
});

test('published facts, project status and paper links match the agreed baseline', async ({ page }) => {
  await page.goto(entry);
  await expect(page.locator('#resnet-title')).toHaveText('A Review of Research Progress on ResNet and Its Fusion Applications');
  await expect(page.getByRole('link', { name: 'View on IEEE Xplore' })).toHaveAttribute('href', 'https://ieeexplore.ieee.org/document/11325235');
  await expect(page.locator('.doi-link')).toHaveAttribute('href', 'https://doi.org/10.1109/BDAI66031.2025.11325235');
  await expect(page.locator('.paper-authors')).toHaveText('Nanju Wu, Dechao Sun · First author');
  await expect(page.locator('.iot-metrics dd')).toHaveText(['1,000', '952.4 msg/s', '45 ms', '82 ms', '120 ms']);
  await expect(page.locator('.simulation-metrics dd')).toHaveText(['0.35–0.44 s', '1.19–1.69 s', '<5%']);
  await expect(page.locator('.future-label')).toHaveText('Future directions · not implemented');
  await expect(page.locator('.future-grid article')).toHaveCount(3);
  await expect(page.locator('.experiment-note')).toContainText('AI-generated with Codex.');
  await expect(page.locator('body')).not.toContainText(/proficiency|provisional|expert in|skill level|undergraduate grades|academic rankings/i);
});

for (const width of [390, 1440]) {
  test(`automated accessibility scan, all project details open, at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(entry);
    await page.locator('details').evaluateAll(items => items.forEach(item => { item.open = true; }));
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
  });
}
