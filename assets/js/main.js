(()=>{'use strict';
const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>Array.from(p.querySelectorAll(s));
const header=$('#site-header'),menu=$('.menu-toggle'),nav=$('#primary-nav');
function closeMenu(){menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open Navigation');nav?.classList.remove('open');document.body.classList.remove('menu-open')}
if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close Navigation':'Open Navigation');nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open)});$$('a',nav).forEach(x=>x.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});window.addEventListener('resize',()=>{if(innerWidth>1110)closeMenu()})}
function scrolled(){header?.classList.toggle('scrolled',window.scrollY>10)}scrolled();window.addEventListener('scroll',scrolled,{passive:true});
$$('[data-year]').forEach(x=>x.textContent=String(new Date().getFullYear()));
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.07,rootMargin:'0px 0px -10px 0px'});$$('.reveal').forEach(x=>io.observe(x))}else $$('.reveal').forEach(x=>x.classList.add('visible'));
// Home page autoplay: prefer an optimised, first-party MP4 for a seamless native loop.
// If the MP4 is not present, attempt the public Google Drive embed as a temporary fallback.
// Drive's player cannot guarantee autoplay, clean controls, or seamless looping.
const hobartVideo=$('[data-hobart-video]');
if(hobartVideo){
 const video=$('video',hobartVideo);
 let fallbackMounted=false;
 let driveReplay=null;
 const driveBase=hobartVideo.dataset.fallbackDrive;
 const mountDriveFallback=()=>{
  if(fallbackMounted||!driveBase||!video)return;
  fallbackMounted=true;
  video.remove();
  const crop=document.createElement('div');
  crop.className='home-video-drive-crop';
  crop.setAttribute('aria-hidden','true');
  const frame=document.createElement('iframe');
  frame.title='Hobart video (Google Drive fallback)';
  frame.tabIndex=-1;
  frame.allow='autoplay; fullscreen';
  frame.referrerPolicy='strict-origin-when-cross-origin';
  // Drive-specific flags are best effort. Google does not provide a supported seamless-loop API.
  const embedUrl=driveBase+'?autoplay=1&start=1&mute=1&loop=1';
  frame.src=embedUrl;
  crop.appendChild(frame);
  hobartVideo.appendChild(crop);
  // Google Drive letterboxes its 16:9 clip inside the iframe. Calculate a
  // responsive "cover" zoom and overscan so neither the black side bars nor
  // the bottom progress strip are visible inside our video section.
  // iframe contents are cross-origin: this does NOT remove Google's controls.
  const refreshDriveCover=()=>{
   const rect=hobartVideo.getBoundingClientRect();
   if(!rect.width||!rect.height)return;
   const displayRatio=rect.width/rect.height;
   const videoRatio=16/9;
   const cover=Math.max(1,displayRatio/videoRatio,videoRatio/displayRatio);
   crop.style.setProperty('--drive-cover-scale',(cover*1.13).toFixed(3));
  };
  refreshDriveCover();
  if('ResizeObserver' in window){
   const observer=new ResizeObserver(refreshDriveCover);
   observer.observe(hobartVideo);
   window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
  }else{
   window.addEventListener('resize',refreshDriveCover,{passive:true});
  }
  // Best-effort replay for the 35-second Drive clip. Actual playback may vary due
  // to Drive loading and browser policies; native MP4 loop above is the robust path.
  const replay=()=>{
   if(document.visibilityState!=='visible')return;
   frame.src=embedUrl;
  };
  driveReplay=window.setInterval(replay,38000);
 };
 if(video){
  video.defaultMuted=true;
  video.muted=true;
  video.addEventListener('playing',()=>video.classList.add('is-playing'));
  video.addEventListener('error',mountDriveFallback,{once:true});
  const src=video.querySelector('source');
  if(src)src.addEventListener('error',mountDriveFallback,{once:true});
  // Some browsers do not emit <video> error for a missing child <source>.
  const attempt=video.play();
  if(attempt&&typeof attempt.catch==='function')attempt.catch(()=>{
   // Browser settings may block autoplay. Do not switch away from a healthy video.
  });
 }
 window.addEventListener('pagehide',()=>{if(driveReplay)clearInterval(driveReplay)},{once:true});
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
