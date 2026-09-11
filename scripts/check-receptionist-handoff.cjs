const assert = require('node:assert/strict');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    const fit = page.locator('#find-your-fit');
    const contact = page.locator('#contact');
    await fit.getByRole('button', { name: 'Calls go unanswered' }).click();
    await fit.getByRole('button', { name: 'Shape my action plan' }).click();
    assert.equal(await fit.getByRole('button', { name: 'I do not have one' }).count(), 0);
    for (const [choice, title] of [
      ['During business hours', 'Cover calls while your team is busy.'],
      ['Both', 'Cover missed calls throughout the day and night.'],
      ['After hours', 'Give after-hours callers a clear next step.'],
    ]) {
      await fit.getByRole('button', { name: choice === 'Both' ? /^Both/ : choice }).click();
      await fit.getByRole('heading', { name: title, exact: true }).waitFor();
      assert.match(await fit.innerText(), /Suggested service: AI Receptionist/);
    }
    await fit.getByRole('link', { name: 'Continue', exact: true }).click();
    assert.equal(await contact.getByLabel('Biggest challenge').inputValue(), 'calls');
    assert.equal(await contact.getByRole('combobox', { name: /^Call coverage/ }).inputValue(), 'after-hours');
    assert.equal(await contact.getByLabel('Your website today').count(), 0);
    await contact.getByRole('combobox', { name: /^Industry/ }).selectOption('salon');
    await contact.getByRole('button', { name: 'Explore my opportunity' }).click();
    await contact.getByRole('button', { name: 'See my recommendation' }).click();
    assert.equal(await page.locator('#lead-business-type').inputValue(), 'Salon / Spa');
    assert.match(await page.locator('#lead-call-type').inputValue(), /AI Receptionist[\s\S]*After hours/);
    assert.doesNotMatch(await page.locator('#lead-call-type').inputValue(), /Website/);
    await page.locator('#lead-call-type').fill('Keep my custom details.');
    await fit.getByRole('button', { name: 'During business hours' }).click();
    assert.equal(await page.locator('#lead-call-type').inputValue(), 'Keep my custom details.');
    await fit.getByRole('checkbox', { name: 'Include website help (optional)' }).check();
    await fit.getByRole('button', { name: 'I do not have one' }).click();
    assert.match(await fit.innerText(), /Suggested service: Website \+ AI System/);
    await fit.getByRole('link', { name: 'Continue', exact: true }).click();
    assert.equal(await contact.getByLabel('Biggest challenge').inputValue(), 'both');
    assert.equal(await contact.getByLabel('Your website today').inputValue(), 'none');
    await fit.getByRole('button', { name: 'Back', exact: true }).click();
    await fit.getByRole('button', { name: 'Calls go unanswered' }).click();
    await fit.getByRole('button', { name: 'Shape my action plan' }).click();
    assert.match(await fit.innerText(), /Suggested service: AI Receptionist/);
    await page.reload();
    await fit.getByRole('button', { name: 'Shape my action plan' }).click();
    await fit.getByRole('heading', { name: 'Cover calls while your team is busy.' }).waitFor();
    await page.setViewportSize({ width: 375, height: 812 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    console.log('PASS: receptionist coverage paths, explicit website opt-in, prefilled assessment and lead fields, preserved edits, stale website isolation, persistence, mobile overflow. No form submitted.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });

