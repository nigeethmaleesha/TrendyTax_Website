(()=>{'use strict';
const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>Array.from(p.querySelectorAll(s));
const header=$('#site-header'),menu=$('.menu-toggle'),nav=$('#primary-nav');
function closeMenu(){menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open Navigation');nav?.classList.remove('open');document.body.classList.remove('menu-open')}
if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close Navigation':'Open Navigation');nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open)});$$('a',nav).forEach(x=>x.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});window.addEventListener('resize',()=>{if(innerWidth>1110)closeMenu()})}
function scrolled(){header?.classList.toggle('scrolled',window.scrollY>10)}scrolled();window.addEventListener('scroll',scrolled,{passive:true});
$$('[data-year]').forEach(x=>x.textContent=String(new Date().getFullYear()));
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.07,rootMargin:'0px 0px -10px 0px'});$$('.reveal').forEach(x=>io.observe(x))}else $$('.reveal').forEach(x=>x.classList.add('visible'));
// Prefer the owned MP4: native looping is seamless and has no third-party player UI.
// A Google Drive preview is used only when the MP4 is missing. Drive does not
// expose a reliable playback-ready or ended event to cross-origin pages, so
// its ~35-second restart is best effort and is masked by the Hobart poster.
const hobartVideo=$('[data-hobart-video]');
if(hobartVideo){
 const video=$('video',hobartVideo);
 const driveBase=hobartVideo.dataset.fallbackDrive;
 const mobileQuery=window.matchMedia('(max-width: 800px)');
 const driveDurationMs=Number(hobartVideo.dataset.driveDurationMs)||35000;
 const driveWarmupMs=4200; // Avoid flashing Google's dark loading screen after navigation.
 let inView=false,fallbackMounted=false,driveFrame=null,driveCrop=null,driveCover=null,driveObserver=null;
 let driveLoopTimer=0,driveRevealTimer=0;
 const clearDriveTimers=()=>{
  if(driveLoopTimer){clearTimeout(driveLoopTimer);driveLoopTimer=0}
  if(driveRevealTimer){clearTimeout(driveRevealTimer);driveRevealTimer=0}
 };
 const makeDriveUrl=()=>{
  const url=new URL(driveBase,window.location.href);
  url.searchParams.set('autoplay','1');
  url.searchParams.set('mute','1');
  // Do not add an ever-changing cache-busting parameter: Google Drive may
  // otherwise re-fetch its player shell, increasing startup buffering.
  return url.href;
 };
 const showCover=()=>{driveCover?.classList.remove('is-hidden')};
 const scheduleDriveReplay=()=>{
  if(driveLoopTimer){clearTimeout(driveLoopTimer);driveLoopTimer=0}
  if(!driveFrame||!fallbackMounted||!inView||document.hidden||mobileQuery.matches)return;
  driveLoopTimer=window.setTimeout(()=>{
   if(!driveFrame||!fallbackMounted||!inView||document.hidden)return;
   // Mask the iframe BEFORE changing its URL so the browser paints the poster
   // over Google's black loading frame. Actual replay timing is approximate.
   showCover();
   if(driveRevealTimer){clearTimeout(driveRevealTimer);driveRevealTimer=0}
   requestAnimationFrame(()=>requestAnimationFrame(()=>{
    if(driveFrame&&fallbackMounted&&inView&&!document.hidden)driveFrame.src=makeDriveUrl();
   }));
  },driveDurationMs);
 };
 const onDriveLoaded=()=>{
  // iframe load does NOT mean the video is already playing, hence the delay.
  if(driveRevealTimer){clearTimeout(driveRevealTimer);driveRevealTimer=0}
  if(!fallbackMounted||!inView||document.hidden)return;
  driveRevealTimer=window.setTimeout(()=>{
   driveRevealTimer=0;
   if(!fallbackMounted||!inView||document.hidden)return;
   driveCover?.classList.add('is-hidden');
   scheduleDriveReplay();
  },driveWarmupMs);
 };
 const unmountDrive=()=>{
  clearDriveTimers();
  driveCrop?.remove();driveCover?.remove();
  driveObserver?.disconnect();
  driveCrop=null;driveCover=null;driveObserver=null;driveFrame=null;fallbackMounted=false;
 };
 const setPoster=()=>{
  unmountDrive();
  video?.pause();video?.classList.remove('is-playing');
  hobartVideo.classList.add('home-video-poster-only');
 };
 const mountDriveFallback=()=>{
  if(!driveBase||!inView||fallbackMounted||document.hidden)return;
  // Mobile: never expose Google's giant playback controls. Show the poster
  // until an owned MP4 is supplied; that MP4 will autoplay natively.
  if(mobileQuery.matches){setPoster();return}
  fallbackMounted=true;
  hobartVideo.classList.remove('home-video-poster-only');
  video?.pause();video?.classList.remove('is-playing');
  driveCrop=document.createElement('div');driveCrop.className='home-video-drive-crop';
  driveCrop.setAttribute('aria-hidden','true');
  driveCover=document.createElement('div');driveCover.className='home-video-drive-cover';
  driveCover.setAttribute('aria-hidden','true');
  const frame=document.createElement('iframe');
  frame.title='Hobart waterfront film — Google Drive fallback';
  frame.tabIndex=-1;frame.allow='autoplay; fullscreen';frame.loading='eager';
  frame.referrerPolicy='strict-origin-when-cross-origin';
  frame.addEventListener('load',onDriveLoaded);
  driveFrame=frame;
  frame.src=makeDriveUrl();
  driveCrop.append(frame);
  // Put the poster ON TOP of the player (rather than underneath it) so
  // even a completely black Google Drive loading canvas is not displayed.
  hobartVideo.append(driveCrop,driveCover);
  const refreshCover=()=>{
   if(!driveCrop)return;
   const {width,height}=hobartVideo.getBoundingClientRect();
   if(!width||!height)return;
   // The Drive iframe renders its own controls; they cannot be styled from
   // this page. Overscan the *entire iframe* so its lower controls fall
   // outside the clipped video region on landscape tablets and desktops.
   // This is visual framing only, NOT a guarantee of a controls-free player.
   const sectionRatio=width/height;
   const filmRatio=16/9;
   const fillScale=Math.max(sectionRatio/filmRatio,filmRatio/sectionRatio);
   const isTabletLayout=window.matchMedia('(min-width: 801px) and (max-width: 1366px)').matches;
   const minimumScale=isTabletLayout?1.58:1.48;
   const overscan=Math.max(minimumScale,fillScale*1.16);
   driveCrop.style.setProperty('--drive-cover-scale',overscan.toFixed(3));
  };
  refreshCover();
  if('ResizeObserver' in window){driveObserver=new ResizeObserver(refreshCover);driveObserver.observe(hobartVideo)}
 };
 const startNative=()=>{
  if(!video||!video.isConnected||fallbackMounted||!inView||document.hidden)return;
  if(video.error||video.networkState===HTMLMediaElement.NETWORK_NO_SOURCE){mountDriveFallback();return}
  video.defaultMuted=true;video.muted=true;video.loop=true;
  hobartVideo.classList.remove('home-video-poster-only');
  const attempt=video.play();
  if(attempt?.catch)attempt.catch(()=>{
   if(video.error||video.networkState===HTMLMediaElement.NETWORK_NO_SOURCE)mountDriveFallback();
  });
 };
 if(video){
  video.addEventListener('playing',()=>{
   hobartVideo.classList.remove('home-video-poster-only');
   video.classList.add('is-playing');
  });
  video.addEventListener('error',mountDriveFallback);
  video.querySelector('source')?.addEventListener('error',mountDriveFallback);
  video.addEventListener('ended',()=>{
   if(!inView||document.hidden)return;
   video.currentTime=0;
   const replay=video.play();if(replay?.catch)replay.catch(()=>{});
  });
 }
 const resumeDrive=()=>{
  if(!driveFrame||!fallbackMounted||!inView||document.hidden)return;
  clearDriveTimers();showCover();
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
   if(driveFrame&&fallbackMounted&&inView&&!document.hidden)driveFrame.src=makeDriveUrl();
  }));
 };
 const updateView=visible=>{
  if(inView===visible)return;
  inView=visible;
  if(!visible){
   if(video&&!video.paused)video.pause();
   clearDriveTimers();showCover();return;
  }
  if(fallbackMounted)resumeDrive();else startNative();
 };
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>updateView(entries[0].isIntersecting),{rootMargin:'150px 0px',threshold:0});
  observer.observe(hobartVideo);
 }else updateView(true);
 mobileQuery.addEventListener?.('change',()=>{
  if(mobileQuery.matches&&fallbackMounted)setPoster();
  else if(inView&&video&&(video.error||video.networkState===HTMLMediaElement.NETWORK_NO_SOURCE))mountDriveFallback();
 });
 document.addEventListener('visibilitychange',()=>{
  if(document.hidden){if(video&&!video.paused)video.pause();clearDriveTimers();showCover()}
  else if(inView){if(fallbackMounted)resumeDrive();else startNative()}
 });
 window.addEventListener('pagehide',()=>{clearDriveTimers();driveObserver?.disconnect()},{once:true});
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
