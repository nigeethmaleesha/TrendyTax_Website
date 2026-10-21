/* Interactive About Us photo slideshow; no dependencies or effects on other pages. */
(() => {
  'use strict';
  const gallery = document.querySelector('[data-about-gallery]');
  if (!gallery) return;

  const slides = [...gallery.querySelectorAll('.about-gallery-slide')];
  const thumbnails = [...gallery.querySelectorAll('[data-gallery-to]')];
  const counter = gallery.querySelector('[data-gallery-counter]');
  const label = gallery.querySelector('[data-gallery-label]');
  const prev = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  const toggle = gallery.querySelector('[data-gallery-toggle]');
  if (!slides.length || !prev || !next) return;

  let current = 0;
  let timer = null;
  let onscreen = !('IntersectionObserver' in window);
  let hovering = false;
  let focused = false;
  let userPaused = false;
  let touchX = null;
  let touchY = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(index, userInitiated = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const selected = i === current;
      slide.classList.toggle('is-active', selected);
      slide.setAttribute('aria-hidden', String(!selected));
    });
    thumbnails.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    label.textContent = slides[current].dataset.galleryTitle || '';
    counter.parentElement.setAttribute('aria-live', userInitiated ? 'polite' : 'off');
  }

  function stop() {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  }
  function play() {
    stop();
    if (reducedMotion || userPaused || hovering || focused || !onscreen || document.hidden || slides.length < 2) return;
    timer = window.setInterval(() => show(current + 1), 6000);
  }
  function navigate(index) {
    show(index, true);
    play();
  }

  toggle?.addEventListener('click', () => {
    userPaused = !userPaused;
    toggle.dataset.paused = String(userPaused);
    toggle.setAttribute('aria-label', userPaused ? 'Resume automatic slideshow' : 'Pause automatic slideshow');
    play();
  });
  prev.addEventListener('click', () => navigate(current - 1));
  next.addEventListener('click', () => navigate(current + 1));
  thumbnails.forEach((button, i) => button.addEventListener('click', () => navigate(i)));
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  gallery.addEventListener('mouseenter', () => { hovering = true; stop(); });
  gallery.addEventListener('mouseleave', () => { hovering = false; play(); });
  gallery.addEventListener('focusin', () => { focused = true; stop(); });
  gallery.addEventListener('focusout', event => {
    if (!gallery.contains(event.relatedTarget)) { focused = false; play(); }
  });
  gallery.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) return;
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
  }, { passive: true });
  gallery.addEventListener('touchend', event => {
    if (touchX === null || !event.changedTouches.length) return;
    const deltaX = event.changedTouches[0].clientX - touchX;
    const deltaY = event.changedTouches[0].clientY - touchY;
    touchX = null;
    touchY = null;
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      navigate(current + (deltaX < 0 ? 1 : -1));
    }
  }, { passive: true });
  document.addEventListener('visibilitychange', play);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      onscreen = entries[0].isIntersecting;
      play();
    }, { threshold: 0.2 });
    observer.observe(gallery);
  } else play();
  show(0);
})();
