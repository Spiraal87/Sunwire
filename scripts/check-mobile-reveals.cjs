const assert = require('node:assert/strict');
const { chromium } = require('playwright');
(async () => {
 const browser = await chromium.launch({ channel: 'chrome', headless: true });
 try {
  for (const reducedMotion of ['reduce', 'no-preference']) {
   const page = await browser.newPage({ viewport: { width: 375, height: 812 }, reducedMotion });
   await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
   const fit = page.locator('#find-your-fit');
   const aligned = async id => {
    await page.waitForFunction(id => {
     const target = document.getElementById(id);
     const nav = document.querySelector('body header.sticky');
     const top = target?.getBoundingClientRect().top;
     return target === document.activeElement && Math.abs(top - (nav.getBoundingClientRect().height + 16)) < 5;
    }, id, { timeout: 15000 });
   };
   assert.equal(await page.locator('#starting-title').count(), 0);
   assert.equal(await page.locator('#website-demo').count(), 0);
   await fit.getByRole('button', { name: 'Calls go unanswered' }).click();
   await aligned('fit-direction');
   await fit.getByRole('button', { name: 'Shape my action plan' }).click();
   await aligned('fit-question');
   await fit.getByRole('button', { name: 'After hours' }).click();
   await aligned('fit-plan');
   await fit.getByRole('checkbox').check();
   await aligned('fit-question');
   await fit.getByRole('button', { name: 'I do not have one' }).click();
   await aligned('fit-plan');
   await fit.getByRole('link', { name: 'Continue', exact: true }).click();
   await aligned('assessment-form');
   const contact = page.locator('#contact');
   assert.equal(await contact.getByLabel('Biggest challenge').inputValue(), 'both');
   assert.equal(await contact.getByLabel('Your website today').inputValue(), 'none');
   await contact.getByRole('combobox', { name: /^Industry/ }).selectOption('salon');
   await contact.getByRole('button', { name: 'Explore my opportunity' }).click();
   await aligned('assessment-form');
   await contact.getByRole('button', { name: 'See my recommendation' }).click();
   await aligned('assessment-form');
   await contact.getByRole('button', { name: 'Back', exact: true }).click();
   await aligned('assessment-form');
   assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
   await page.close();
   console.log('PASS: 375px reveal positions, header clearance, form steps and prefill, motion=' + reducedMotion);
  }
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/website', { waitUntil: 'domcontentloaded' });
  await page.locator('#website-demo').waitFor();
  console.log('PASS: website demo retained on website page; redundant homepage sections removed.');
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
