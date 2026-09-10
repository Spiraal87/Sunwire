const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
    args: ['--enable-webgl', '--ignore-gpu-blocklist'],
  });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.FORGE_URL || 'http://127.0.0.1:3100/');
    await page.waitForSelector('[data-render-mode="webgl"] canvas');
    const host = page.locator('.sf-core-canvas');
    await host.scrollIntoViewIfNeeded();
    const size = await host.locator('canvas').evaluate(canvas => ({ pixels: canvas.width, css: canvas.getBoundingClientRect().width }));
    assert(Math.abs(size.pixels / size.css - 2) < .01, 'Mobile renders at 2x');
    if (process.env.FORGE_SCREENSHOT) await host.screenshot({ path: process.env.FORGE_SCREENSHOT });
    const box = await host.boundingBox();
    const x = box.x + box.width / 2, y = box.y + box.height / 2;
    const cdp = await context.newCDPSession(page);
    const touch = (type, px, py) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x: px, y: py }] });
    await touch('touchStart', x, y);
    for (let i = 1; i <= 6; i++) { await touch('touchMove', x + i * 15, y); await page.waitForTimeout(35); }
    await touch('touchEnd');
    await page.waitForTimeout(250);
    assert.equal(await host.evaluate(el => el.matches(':active')), false, 'Drag releases');
    await page.touchscreen.tap(x, y);
    await page.getByRole('button', { name: 'Ignite core', exact: true }).click();
    await page.getByRole('button', { name: 'Pause motion', exact: true }).click();
    assert(await page.getByRole('button', { name: 'Ignite core', exact: true }).isDisabled());
    await page.waitForTimeout(150);
    const a = await host.screenshot();
    await page.waitForTimeout(250);
    assert(a.equals(await host.screenshot()), 'Paused frame remains still');
    await page.getByRole('button', { name: 'Resume motion', exact: true }).click();
    const scroll = await page.evaluate(() => scrollY);
    await touch('touchStart', x, y);
    for (let i = 1; i <= 5; i++) { await touch('touchMove', x, y - i * 20); await page.waitForTimeout(30); }
    await touch('touchEnd');
    await page.waitForTimeout(300);
    assert(await page.evaluate(() => scrollY) > scroll, 'Vertical touch scroll remains available');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForSelector('[data-render-mode="poster"]');
    assert.equal(await host.locator('canvas').count(), 0, 'Reduced motion releases canvas');
    assert.deepEqual(errors, []);
    console.log('PASS: Retina resolution, touch drag/release, tap, ignite, pause, vertical scrolling, reduced motion; no page errors.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
