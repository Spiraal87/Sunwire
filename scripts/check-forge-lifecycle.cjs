const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--enable-webgl', '--ignore-gpu-blocklist'] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.route('**/*', route => route.request().method() === 'GET' && new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  await context.addInitScript(() => {
    window.__draws = 0;
    for (const name of ['drawElements', 'drawArrays', 'drawElementsInstanced', 'drawArraysInstanced']) {
      const original = WebGL2RenderingContext.prototype[name];
      WebGL2RenderingContext.prototype[name] = function(...args) { window.__draws++; return original.apply(this, args); };
    }
  });
  const page = await context.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelector('.sf-core-wrap')?.dataset.renderMode === 'webgl');
  await page.waitForTimeout(600);
  const draws = () => page.evaluate(() => window.__draws);
  let before = await draws(); await page.waitForTimeout(500); assert(await draws() > before, 'Scene animates');
  await page.screenshot({ path: 'review/motion-frame-a.png' });
  await page.mouse.move(1330, 240); await page.waitForTimeout(1500);
  await page.screenshot({ path: 'review/motion-frame-b.png' });
  const pause = page.getByRole('button', { name: 'Pause motion', exact: true });
  await pause.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(200);
  before = await draws(); await page.waitForTimeout(500); assert.equal(await draws(), before, 'Pause stops GPU draws');
  await page.keyboard.press('Enter'); await page.waitForTimeout(250);
  await page.locator('#industries').scrollIntoViewIfNeeded(); await page.waitForTimeout(700);
  before = await draws(); await page.waitForTimeout(500); assert.equal(await draws(), before, 'Offscreen stops GPU draws');
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(1000);
  before = await draws(); await page.waitForTimeout(300); assert(await draws() > before, 'Reentry resumes');
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
  await page.waitForTimeout(200); before = await draws(); await page.waitForTimeout(500); assert.equal(await draws(), before, 'Visibility handler stops GPU draws');
  await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
  await page.getByRole('button', { name: 'View call summary' }).focus(); await page.keyboard.press('Enter'); assert(await page.locator('#sf-summary-detail').isVisible());
  await page.keyboard.press('Enter');
  await page.setViewportSize({ width: 390, height: 844 }); await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(800);
  await page.getByRole('button', { name: 'Open navigation menu' }).click(); assert.equal(await page.getByRole('button', { name: 'Close navigation menu' }).getAttribute('aria-expanded'), 'true');
  await page.getByRole('button', { name: 'Close navigation menu' }).click();
  await page.screenshot({ path: 'review/mobile-final-check.png' });
  const saveData = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await saveData.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true }, configurable: true }));
  const constrained = await saveData.newPage(); await constrained.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle' });
  assert.equal(await constrained.locator('.sf-core-wrap').getAttribute('data-render-mode'), 'poster');
  assert.equal(await constrained.locator('.sf-core-canvas canvas').count(), 0);
  await constrained.screenshot({ path: 'review/mobile-data-saver.png' });
  const unsupported = await browser.newContext();
  await unsupported.addInitScript(() => { const original = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(kind, ...args) { return kind === 'webgl2' || kind === 'webgl' ? null : original.call(this, kind, ...args); }; });
  const noGL = await unsupported.newPage(); await noGL.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle' });
  assert.equal(await noGL.locator('.sf-core-wrap').getAttribute('data-render-mode'), 'video');
  fs.writeFileSync('review/lifecycle-results.json', JSON.stringify({ errors, passed: ['GPU draws while visible','Keyboard pause stops GPU draws','Offscreen stops GPU draws','Reentry resumes','Hidden-tab event stops GPU draws','Keyboard summary','Mobile menu','Data-saver skips WebGL','Unsupported WebGL video fallback'] }, null, 2));
  console.log('PASS: lifecycle, keyboard, mobile menu, data saver, unsupported WebGL.', errors);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
