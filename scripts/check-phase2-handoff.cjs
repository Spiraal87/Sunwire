const {chromium}=require('playwright');const fs=require('fs');const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 await context.route('**/*',r=>r.request().method()==='GET'&&new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
 const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:3100/review',{waitUntil:'networkidle'});assert(await p.getByRole('heading',{name:'One site. One visual language.'}).isVisible());
 await p.screenshot({path:'review/phase2-after/gallery.png'});
 const sources=await p.locator('img').evaluateAll(images=>images.map(i=>i.getAttribute('src')));
 for(const src of sources)assert.equal((await p.request.get('http://127.0.0.1:3100'+src)).status(),200,src);
 for(const route of ['receptionist','website','hvac']) {
  await p.goto('http://127.0.0.1:3100/'+route,{waitUntil:'networkidle'});
  const section=p.locator('#services + section');await section.scrollIntoViewIfNeeded();await p.waitForTimeout(900);
  await section.screenshot({path:`review/phase2-after/${route}-details.png`,style:'.sf-navigation{visibility:hidden!important}'});
  await p.setViewportSize({width:390,height:844});
  const showcase=p.locator('#service-preview');await showcase.scrollIntoViewIfNeeded();await p.waitForTimeout(500);
  await showcase.screenshot({path:`review/phase2-after/${route}-service-mobile.png`,style:'.sf-navigation{visibility:hidden!important}'});
  await p.setViewportSize({width:1440,height:1000});
 }
 await p.goto('http://127.0.0.1:3100/receptionist',{waitUntil:'networkidle'});
 await p.evaluate(()=>{Object.defineProperty(document,'hidden',{get:()=>true,configurable:true});document.dispatchEvent(new Event('visibilitychange'));});await p.waitForTimeout(300);assert(await p.locator('.sf-video-hero video').evaluate(v=>v.paused));
 await p.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await p.waitForTimeout(300);assert.equal(await p.locator('.sf-video-hero video').evaluate(v=>v.paused),false);
 await p.emulateMedia({reducedMotion:'reduce'});await p.reload({waitUntil:'networkidle'});assert.equal(await p.locator('.sf-video-hero video').count(),0);
 await p.screenshot({path:'review/phase2-after/receptionist-reduced-motion.png'});
 const touch=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
 await touch.route('**/*',r=>r.request().method()==='GET'&&new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
 const mobile=await touch.newPage();mobile.on('pageerror',e=>errors.push(e.message));await mobile.goto('http://127.0.0.1:3100/website',{waitUntil:'networkidle'});
 await mobile.getByRole('button',{name:'Open navigation menu'}).tap();assert(await mobile.locator('#site-navigation-menu').isVisible());await mobile.getByRole('button',{name:'Close navigation menu'}).tap();
 await mobile.getByRole('button',{name:'Pause video',exact:true}).tap();assert(await mobile.locator('.sf-video-hero video').evaluate(v=>v.paused));
 const save=await browser.newContext();await save.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true},configurable:true}));const saver=await save.newPage();await saver.goto('http://127.0.0.1:3100/website',{waitUntil:'networkidle'});assert.equal(await saver.locator('.sf-video-hero video').count(),0);
 assert.equal(errors.length,0);fs.writeFileSync('review/phase2-after/handoff-results.json',JSON.stringify({errors,passed:['Gallery assets','Supporting service sections','Mobile showcases','Video hidden-tab pause/resume','Reduced-motion hydration','Touch navigation and video pause','Data saver']},null,2));
 console.log('PASS: production gallery, page sections, video lifecycle, touch controls, data saver; no page errors.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
