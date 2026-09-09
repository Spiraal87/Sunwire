const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const phase = process.argv[2] || 'after';
const base = process.env.REVIEW_URL || 'http://127.0.0.1:3100';
const routes = ['/receptionist','/website','/hvac','/about','/resources','/resources/missed-call-cost','/resources/ai-receptionist-vs-answering-service','/resources/website-seo-geo-conversions'];
(async () => {
 const dir = `review/phase2-${phase}`; fs.mkdirSync(dir,{recursive:true});
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const ctx=await browser.newContext({viewport:{width:1440,height:1000}});
 await ctx.route('**/*',r=>r.request().method()==='GET' && ['127.0.0.1','localhost'].includes(new URL(r.request().url()).hostname)?r.continue():r.abort());
 const page=await ctx.newPage(); const errors=[]; page.on('pageerror',e=>errors.push({url:page.url(),message:e.message})); const results=[];
 for (const route of routes) {
  await page.setViewportSize({width:1440,height:1000});
  const response=await page.goto(base+route,{waitUntil:'networkidle'}); assert.equal(response.status(),200);
  await page.waitForTimeout(700); const name=route.split('/').pop();
  results.push(await page.evaluate(()=>({route:location.pathname,title:document.title,description:document.querySelector('meta[name="description"]')?.content,h1:document.querySelector('h1')?.textContent,videos:[...document.querySelectorAll('video source')].map(e=>e.getAttribute('src'))})));
  await page.screenshot({path:`${dir}/${name}-desktop.png`});
  if(phase==='after' && ['/receptionist','/website','/hvac'].includes(route)) {
   const stage=page.locator('.sf-service, .sf-web-showcase').first(); await stage.scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
   await stage.screenshot({path:`${dir}/${name}-service.png`,style:'.sf-navigation {visibility:hidden!important}'});
   await page.getByRole('button',{name:'Pause video',exact:true}).click(); assert.equal(await page.locator('.sf-video-hero video').evaluate(e=>e.paused),true);
   await page.getByRole('button',{name:'Play video',exact:true}).click();
  }
  await page.setViewportSize({width:390,height:844}); await page.evaluate(()=>scrollTo(0,0)); await page.waitForTimeout(700);
  await page.screenshot({path:`${dir}/${name}-mobile.png`});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route} mobile overflow`);
  if(phase==='after') {
   await page.emulateMedia({reducedMotion:'reduce'}); await page.reload({waitUntil:'networkidle'});
   if(['/receptionist','/website','/hvac'].includes(route)) assert.equal(await page.locator('.sf-video-hero video').count(),0);
   await page.emulateMedia({reducedMotion:'no-preference'});
  }
 }
 fs.writeFileSync(`${dir}/results.json`,JSON.stringify({pages:results,errors},null,2)); console.log(JSON.stringify({pages:results.length,errors})); await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
