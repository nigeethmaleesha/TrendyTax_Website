(()=>{'use strict';
const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>Array.from(p.querySelectorAll(s));
const header=$('#site-header'),menu=$('.menu-toggle'),nav=$('#primary-nav');
function closeMenu(){menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open Navigation');nav?.classList.remove('open');document.body.classList.remove('menu-open')}
if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close Navigation':'Open Navigation');nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open)});$$('a',nav).forEach(x=>x.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});window.addEventListener('resize',()=>{if(innerWidth>1110)closeMenu()})}
function scrolled(){header?.classList.toggle('scrolled',window.scrollY>10)}scrolled();window.addEventListener('scroll',scrolled,{passive:true});
$$('[data-year]').forEach(x=>x.textContent=String(new Date().getFullYear()));
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.07,rootMargin:'0px 0px -10px 0px'});$$('.reveal').forEach(x=>io.observe(x))}else $$('.reveal').forEach(x=>x.classList.add('visible'));
// Prefer an owned HTML5 MP4 for native muted autoplay and seamless looping.
// The Google Drive preview has no public video-ended API; its temporary
// 35-second iframe replay is *best effort*, not a frame-accurate loop.
const hobartVideo=$('[data-hobart-video]');
if(hobartVideo){
 const video=$('video',hobartVideo);
 const driveBase=hobartVideo.dataset.fallbackDrive;
 const mobileQuery=window.matchMedia('(max-width: 800px)');
 const driveDurationMs=Number(hobartVideo.dataset.driveDurationMs)||35000;
 let inView=false, fallbackMounted=false, driveObserver=null;
 let driveLoopTimer=0, driveCycle=0, driveFrame=null;
 const clearDriveLoop=()=>{if(driveLoopTimer){clearTimeout(driveLoopTimer);driveLoopTimer=0}};
 const makeDriveUrl=()=>{
  const url=new URL(driveBase,window.location.href);
  url.searchParams.set('autoplay','1');
  url.searchParams.set('mute','1');
  url.searchParams.set('start','1');
  // Force a fresh navigation when a 35-second replay is requested.
  url.searchParams.set('tt_cycle',String(++driveCycle));
  return url.href;
 };
 const scheduleDriveLoop=()=>{
  clearDriveLoop();
  if(!driveFrame||!fallbackMounted||!inView||document.hidden||mobileQuery.matches)return;
  driveLoopTimer=window.setTimeout(()=>{
   if(!driveFrame||!fallbackMounted||!inView||document.hidden)return;
   // Cross-origin iframe: replacing its URL is the only available restart.
   // It may show Google's own controls briefly and timing depends on buffering.
   driveFrame.src=makeDriveUrl();
  },driveDurationMs);
 };
 const unmountDrive=()=>{
  clearDriveLoop();
  hobartVideo.querySelector('.home-video-drive-crop')?.remove();
  driveObserver?.disconnect();driveObserver=null;
  fallbackMounted=false;driveFrame=null;
 };
 const setPoster=()=>{
  unmountDrive();
  video?.pause();
  video?.classList.remove('is-playing');
  hobartVideo.classList.add('home-video-poster-only');
 };
 const mountDriveFallback=()=>{
  if(!driveBase||!inView||fallbackMounted)return;
  // The Drive iframe displays an oversized overlay on phones/tablets;
  // until an MP4 is added, show the clean preview instead of broken chrome.
  if(mobileQuery.matches){setPoster();return}
  hobartVideo.classList.remove('home-video-poster-only');
  fallbackMounted=true;
  video?.pause();video?.classList.remove('is-playing');
  const crop=document.createElement('div');crop.className='home-video-drive-crop';
  crop.setAttribute('aria-hidden','true');
  const frame=document.createElement('iframe');
  frame.title='Hobart waterfront film — Google Drive fallback';
  frame.tabIndex=-1;frame.allow='autoplay; fullscreen';
  frame.loading='eager';frame.referrerPolicy='strict-origin-when-cross-origin';
  driveFrame=frame;
  // A Drive preview load event only means the iframe loaded, NOT that the
  // video started. The replay timer is therefore approximate, not exact.
  frame.addEventListener('load',scheduleDriveLoop);
  frame.src=makeDriveUrl();
  crop.append(frame);hobartVideo.append(crop);
  const refreshCover=()=>{
   const {width,height}=hobartVideo.getBoundingClientRect();
   if(!width||!height)return;
   const ratio=width/height,sourceRatio=16/9;
   crop.style.setProperty('--drive-cover-scale',(Math.max(1,ratio/sourceRatio,sourceRatio/ratio)*1.13).toFixed(3));
  };
  refreshCover();
  if('ResizeObserver' in window){driveObserver=new ResizeObserver(refreshCover);driveObserver.observe(hobartVideo)}
  else window.addEventListener('resize',refreshCover,{passive:true,once:true});
 };
 const startNative=()=>{
  if(!video||!video.isConnected||fallbackMounted||!inView||document.hidden)return;
  if(video.error||video.networkState===HTMLMediaElement.NETWORK_NO_SOURCE){mountDriveFallback();return}
  video.defaultMuted=true;video.muted=true;video.loop=true;
  hobartVideo.classList.remove('home-video-poster-only');
  const attempt=video.play();
  if(attempt?.catch)attempt.catch(()=>{
   if(video.error||video.networkState===HTMLMediaElement.NETWORK_NO_SOURCE){mountDriveFallback()}
  });
 };
 if(video){
  video.addEventListener('playing',()=>{hobartVideo.classList.remove('home-video-poster-only');video.classList.add('is-playing')});
  video.addEventListener('error',mountDriveFallback);
  video.querySelector('source')?.addEventListener('error',mountDriveFallback);
  // Defensive fallback for browsers that occasionally fire ended despite loop.
  video.addEventListener('ended',()=>{
   if(!inView||document.hidden)return;
   video.currentTime=0;
   const replay=video.play();if(replay?.catch)replay.catch(()=>{});
  });
 }
 const resumeDrive=()=>{
  if(!driveFrame||!fallbackMounted||!inView||document.hidden)return;
  clearDriveLoop();
  driveFrame.src=makeDriveUrl();
 };
 const updateView=visible=>{
  if(inView===visible)return;
  inView=visible;
  if(!visible){
   if(video&&!video.paused)video.pause();
   clearDriveLoop();
   return;
  }
  if(fallbackMounted)resumeDrive();
  else startNative();
 };
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>updateView(entries[0].isIntersecting),{rootMargin:'150px 0px',threshold:0});
  observer.observe(hobartVideo);
 }else updateView(true);
 mobileQuery.addEventListener?.('change',()=>{
  if(mobileQuery.matches){if(fallbackMounted)setPoster()}
  else if(inView&&video&&(video.error||video.networkState===HTMLMediaElement.NETWORK_NO_SOURCE))mountDriveFallback();
 });
 document.addEventListener('visibilitychange',()=>{
  if(document.hidden){if(video&&!video.paused)video.pause();clearDriveLoop()}
  else if(inView){if(fallbackMounted)resumeDrive();else startNative()}
 });
 window.addEventListener('pagehide',()=>{clearDriveLoop();driveObserver?.disconnect()},{once:true});
}
// Editorial category filters.
const filters=$$('[data-filter]');if(filters.length){filters.forEach(btn=>btn.addEventListener('click',()=>{const wanted=btn.dataset.filter;filters.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));let visible=0;$$('.insights-grid [data-category]').forEach(card=>{const yes=wanted==='all'||card.dataset.category===wanted;card.hidden=!yes;if(yes)visible++});const empty=$('#insights-empty');if(empty)empty.style.display=visible?'none':'block'}))}
// Accessible FAQs, one open at a time.
$$('.faq-item button').forEach(btn=>btn.addEventListener('click',()=>{const open=btn.getAttribute('aria-expanded')==='true';$$('.faq-item button').forEach(b=>b.setAttribute('aria-expanded','false'));btn.setAttribute('aria-expanded',String(!open))}));
const form=$('#enquiry-form');if(form){let params=new URLSearchParams(location.search),id=params.get('service');if(id!==null&&/^\d+$/.test(id)){let sel=$('#service');if(sel){let opt=sel.options[Number(id)+1];if(opt)sel.value=opt.value}}
function check(field){const valid=field.checkValidity()&&String(field.value).trim()!=='';field.closest('.field')?.classList.toggle('invalid',!valid);return valid}
$$('input,select,textarea',form).forEach(x=>x.addEventListener('input',()=>x.closest('.field')?.classList.remove('invalid')));
form.addEventListener('submit',e=>{e.preventDefault();const needed=$$('[required]',form),valid=needed.every(check);const status=$('#form-status');if(!valid){if(status){status.textContent='Please complete the required fields and consent checkbox.';status.classList.add('error')}needed.find(x=>!x.checkValidity()||!String(x.value).trim())?.focus();return}
const v=new FormData(form),subject='Website Enquiry — '+String(v.get('service')).slice(0,100),body=`Hello Trendy Tax Solutions,\n\nName: ${v.get('name')}\nEmail: ${v.get('email')}\nPhone: ${v.get('phone')||'Not supplied'}\nService: ${v.get('service')}\n\nMessage:\n${v.get('message')}\n\nI consent to my details being used to respond to this enquiry.`;const href='mailto:info@trendytaxsolutions.com.au?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);if(status){status.classList.remove('error');status.textContent='Your email draft is opening. Please press Send in your email application to complete the enquiry.'}location.href=href;})}
const newsletter=$('#newsletter-form');if(newsletter){newsletter.addEventListener('submit',e=>{e.preventDefault();const em=$('#newsletter-email'),feedback=$('#newsletter-feedback');if(!em?.checkValidity()){em?.reportValidity();return}if(feedback)feedback.textContent='Your email draft is opening. Please send it to request a newsletter subscription.';location.href='mailto:info@trendytaxsolutions.com.au?subject='+encodeURIComponent('Newsletter Subscription Request')+'&body='+encodeURIComponent('Hello Trendy Tax Solutions,\n\nPlease add '+em.value.trim()+' to your newsletter list.\n\nThank you.')})}
})();
