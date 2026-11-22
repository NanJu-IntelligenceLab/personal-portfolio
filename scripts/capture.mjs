import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('docs/evidence', { recursive: true });
await mkdir('.artifacts/screenshots', { recursive: true });
const base = process.env.SITE_URL || 'http://127.0.0.1:4173/personal-portfolio/';
const browser = await chromium.launch();
try {
  for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(new URL('ai-generated-page.html', base).href);
    await page.screenshot({ path: `docs/evidence/${name}.png` });
    await page.screenshot({ path: `.artifacts/screenshots/${name}-full.png`, fullPage: true });
    await page.locator('details').evaluateAll(items => items.forEach(item => { item.open = true; }));
    await page.locator('#project-iot').screenshot({ path: `.artifacts/screenshots/${name}-iot-expanded.png`, style: '.site-header, .skip-link { visibility: hidden !important; }' });
    await page.close();
  }
  process.stdout.write(`Captured desktop and mobile evidence from ${base}\n`);
} finally {
  await browser.close();
}
