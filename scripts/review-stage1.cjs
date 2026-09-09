const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

(async () => {
  const out = path.join(__dirname, '../review'); fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--enable-webgl', '--ignore-gpu-blocklist'] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, recordVideo: { dir: out, size: { width: 1440, height: 1000 } } });
  // No outbound calls, analytics, or lead submissions during visual review.
  await context.route('**/*', route => { const req = route.request(); const url = new URL(req.url()); if (req.method() !== 'GET' || !['127.0.0.1', 'localhost'].includes(url.hostname)) return route.abort(); return route.continue(); });
  const page = await context.newPage();
  const errors = []; page.on('pageerror', e => errors.push({ url: page.url(), message: e.message }));
  page.on('console', m => { if (m.type() === 'error') console.log('BROWSER', page.url(), m.text().slice(0, 1600)); });
  await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  console.log('Core:', await page.locator('.sf-core-wrap').getAttribute('data-render-mode'));
  await page.screenshot({ path: path.join(out, 'desktop-prototype.png') });
  await page.mouse.move(1050, 330); await page.waitForTimeout(1000); await page.mouse.move(1300, 600); await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Pause motion', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Resume motion' }).getAttribute('aria-pressed'), 'true');
  await page.getByRole('button', { name: 'Resume motion' }).click();
  await page.locator('#front-desk').scrollIntoViewIfNeeded(); await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(out, 'desktop-service.png') });
  await page.getByRole('button', { name: 'View call summary' }).click();
  assert(await page.locator('#sf-summary-detail').isVisible());
  await page.screenshot({ path: path.join(out, 'desktop-summary.png') });
  await page.getByRole('button', { name: 'Close call summary' }).click();
  await page.goto('http://127.0.0.1:3100/review/original', { waitUntil: 'networkidle' }); await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(out, 'desktop-original.png') });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(out, 'mobile-original.png') });
  await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle' }); await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(out, 'mobile-prototype.png') });
  await page.locator('.sf-hero').screenshot({ path: path.join(out, 'mobile-hero-full.png') });
  await page.locator('#front-desk').scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
  await page.locator('#front-desk').screenshot({ path: path.join(out, 'mobile-service.png'), style: 'header, .sf-review-bar { visibility: hidden !important; }' });
  await page.getByRole('button', { name: 'View call summary' }).click();
  await page.locator('#front-desk').screenshot({ path: path.join(out, 'mobile-summary.png'), style: 'header, .sf-review-bar { visibility: hidden !important; }' });
  await page.getByRole('button', { name: 'Close call summary' }).click();
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    assert(!overflow, `Overflow at ${width}`);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.sf-core-wrap').getAttribute('data-render-mode'), 'poster');
  assert.equal(await page.locator('.sf-core-canvas canvas').count(), 0);
  await page.screenshot({ path: path.join(out, 'desktop-reduced-motion.png') });
  await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(1000);
  await page.evaluate(() => { const canvas = document.querySelector('.sf-core-canvas canvas'); const gl = canvas?.getContext('webgl2'); gl?.getExtension('WEBGL_lose_context')?.loseContext(); });
  await page.waitForTimeout(1000);
  assert.equal(await page.locator('.sf-core-wrap').getAttribute('data-render-mode'), 'video');
  await page.screenshot({ path: path.join(out, 'desktop-video-fallback.png') });
  fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ errors, checkedWidths: [320,375,390,768,1024,1440], passed: ['pause/resume','summary toggle','reduced motion poster','context-loss video fallback','no horizontal overflow'] }, null, 2));
  console.log(JSON.stringify({ errors }));
  await context.close(); await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
