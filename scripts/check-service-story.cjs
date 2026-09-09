const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 await context.route('**/*',r=>r.request().method()==='GET'&&new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 fs.mkdirSync('review/service-story',{recursive:true});
 for(const route of ['','receptionist','website']){
  await page.goto('http://127.0.0.1:3100/'+route,{waitUntil:'networkidle'});
  const story=page.locator('.sf-story');await story.scrollIntoViewIfNeeded();
  await story.getByRole('button',{name:'Pause service animation'}).click();
  await story.locator('.sf-story-steps button').nth(3).click();assert.equal(await story.getAttribute('data-step'),'3');
  assert(await story.getByText('Appointment requested',{exact:true}).isVisible());
  await page.waitForTimeout(4200);assert.equal(await story.getAttribute('data-step'),'3');
  await story.getByRole('button',{name:'Play service animation'}).click();await page.waitForTimeout(4000);assert.equal(await story.getAttribute('data-step'),'0');
  await story.getByRole('button',{name:'Pause service animation'}).click();
  if(!route){await story.getByRole('button',{name:'Losing website inquiries',exact:true}).click();assert.equal(await story.getAttribute('data-kind'),'website');}
  await story.locator('.sf-story-steps button').nth(2).click();await page.waitForTimeout(650);
  await story.screenshot({path:`review/service-story/${route||'home'}-desktop.png`});
  for(const width of [390,320]){
   await page.setViewportSize({width,height:844});await story.scrollIntoViewIfNeeded();
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route} overflow at ${width}`);
   if(width===390) await story.screenshot({path:`review/service-story/${route||'home'}-mobile.png`});
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'networkidle'});await story.scrollIntoViewIfNeeded();
  const initial=await story.getAttribute('data-step');await page.waitForTimeout(4100);assert.equal(await story.getAttribute('data-step'),initial);
  assert.equal(await story.getByRole('button',{name:'Pause service animation'}).count(),0);
  await story.locator('.sf-story-steps button').nth(3).click();assert.equal(await story.getAttribute('data-step'),'3');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1440,height:1000});
 }
 assert.deepEqual(errors,[]);fs.writeFileSync('review/service-story/results.json',JSON.stringify({passed:true,routes:['/','/receptionist','/website'],widths:[1440,390,320],errors},null,2));
 await browser.close();console.log('PASS: service selection, timed progression, pause, manual steps, reduced motion, and responsive bounds.');
})().catch(e=>{console.error(e);process.exit(1)});
