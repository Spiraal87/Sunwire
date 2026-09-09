const {chromium}=require('playwright');const fs=require('fs');const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const ctx=await browser.newContext({viewport:{width:1440,height:1000}});const p=await ctx.newPage();
 await ctx.route('**/*',r=>r.request().method()==='GET'&&new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const [video,poster] of [['receptionist_video.mp4','receptionist-poster.jpg'],['website-hero.mp4','website-poster.jpg']]) {
  await p.goto('http://127.0.0.1:3100');
  await p.setContent(`<body style="margin:0"><video style="width:1280px;height:720px;object-fit:contain" muted src="http://127.0.0.1:3100/images/${video}"></video></body>`);
  await p.locator('video').evaluate(v=>new Promise(resolve=>{v.addEventListener('seeked',resolve,{once:true});v.currentTime=2;}));
  await p.locator('video').screenshot({path:`public/images/${poster}`,type:'jpeg',quality:85});
 }
 for(const route of ['/','/receptionist','/website','/hvac','/about','/resources','/resources/missed-call-cost']) {
  await p.goto('http://127.0.0.1:3100'+route,{waitUntil:'networkidle'});
  for(const width of [320,768,1024,2541]) {
   await p.setViewportSize({width,height:1100});await p.waitForTimeout(150);
   const boxes=await p.locator('h1,.sf-navigation nav > a img').evaluateAll(els=>els.map(e=>({tag:e.tagName,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,width:e.getBoundingClientRect().width})));
   for(const b of boxes){assert(b.left>=-1&&b.right<=width+1,`${route} ${width}: ${JSON.stringify(b)}`);if(b.tag==='IMG')assert(b.width>80,`Logo at ${width}`);}
   if(route==='/'&&width===2541) {await p.waitForTimeout(800);await p.screenshot({path:'review/phase2-after/homepage-wide.png'});}
  }
 }
 await p.setViewportSize({width:1440,height:1000});await p.goto('http://127.0.0.1:3100/receptionist',{waitUntil:'networkidle'});
 await p.waitForTimeout(500);let before=await p.locator('.sf-video-hero video').evaluate(v=>v.currentTime);await p.waitForTimeout(500);assert(await p.locator('.sf-video-hero video').evaluate(v=>v.currentTime)>before);
 await p.locator('#services').scrollIntoViewIfNeeded();await p.waitForTimeout(600);assert(await p.locator('.sf-video-hero video').evaluate(v=>v.paused));
 await p.emulateMedia({reducedMotion:'reduce'});await p.reload({waitUntil:'networkidle'});assert.equal(await p.locator('.sf-video-hero video').count(),0);
 await p.emulateMedia({reducedMotion:'no-preference'});
 await p.goto('http://127.0.0.1:3100/resources/missed-call-cost',{waitUntil:'networkidle'});await p.setViewportSize({width:390,height:844});await p.locator('.sf-mobile-toc summary').click();
 const link=p.locator('.sf-mobile-toc a').first();const href=await link.getAttribute('href');await link.click();await p.waitForTimeout(600);assert.equal(await p.evaluate(()=>location.hash),href);
 await p.locator('.sf-reading-grid').screenshot({path:'review/phase2-after/article-reading-mobile.png',style:'.sf-navigation{visibility:hidden!important}'});
 fs.writeFileSync('review/phase2-after/detail-results.json',JSON.stringify({errors,checks:['320/768/1024/2541 heading and logo bounds','Video playback and offscreen pause','Reduced-motion hydration','Mobile article navigation','Video-derived posters']},null,2));
 console.log(JSON.stringify({errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
