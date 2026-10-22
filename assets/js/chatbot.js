/**
 * Trendy Tax Solutions — front-end-only chat guide.
 * No API calls, message submission, persistence, tracking or personal data collection.
 * All responses are curated demonstration copy; replace this module when a live service is approved.
 */
(() => {
  'use strict';

  const script = document.currentScript;
  if (!script || document.getElementById('tt-chatbot')) return;

  // Resolve links from this asset (rather than the current document), so the widget
  // works on root pages, nested Insights pages and deployments under a subdirectory.
  const siteRoot = new URL('../../', script.src);
  const page = (path) => new URL(path, siteRoot).href;
  const theme = script.dataset.chatTheme === 'classic' ? 'classic' : 'fresh';

  const icons = {
    chat: '<path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.8-3.5A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8.5 11.5h7"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    reset: '<path d="M3 12a9 9 0 1 0 2.6-6.4L3 8m0-5v5h5"/>',
    shield: '<path d="m12 22 7-4V7l-7-4-7 4v11l7 4Z"/><path d="m9.2 12 2 2 3.8-4"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
    receipt: '<path d="M5 3h14v18l-3.5-2-3.5 2-3.5-2L5 21V3Z"/><path d="M9 8h6M9 12h6"/>',
    book: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 3v18M11 9h5m-5 4h5"/>',
    message: '<path d="M4 5h16v12H8l-4 4V5Z"/><path d="M8 10h8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>'
  };
  const svg = (key, size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[key]}</svg>`;
  const topics = [
    {
      id: 'tax', title: 'Tax & compliance', icon: 'receipt', subtitle: 'Tax returns, BAS and obligations',
      answer: 'We offer support with individual tax returns and business tax and compliance requirements. Our team can help you understand which service fits your situation.',
      label: 'Explore tax services', href: page('services.html')
    },
    {
      id: 'books', title: 'Bookkeeping & payroll', icon: 'book', subtitle: 'Keep your day-to-day on track',
      answer: 'Looking for help with bookkeeping, payroll or superannuation? These are among the services our Hobart team can discuss with you.',
      label: 'View our services', href: page('services.html')
    },
    {
      id: 'advice', title: 'Business advisory', icon: 'briefcase', subtitle: 'Planning, cash flow and more',
      answer: 'We can discuss business advisory, budgeting, cash-flow planning and Virtual CFO support, depending on what your business needs.',
      label: 'Discover business support', href: page('services.html')
    },
    {
      id: 'team', title: 'Talk to our team', icon: 'message', subtitle: 'Ask a question or book a time',
      answer: 'We’d be glad to hear from you. You can send an enquiry through our contact page or arrange a consultation with the team.',
      label: 'Contact Trendy Tax', href: page('contact.html'),
      alternate: { label: 'Book a consultation', href: 'https://www.trendytaxsolutions.com.au/book-online' }
    }
  ];

  const root = document.createElement('aside');
  root.id = 'tt-chatbot';
  root.className = 'tt-chatbot';
  root.dataset.theme = theme;
  root.setAttribute('aria-label', 'Trendy Tax Solutions help guide');
  root.innerHTML = `
    <section class="tt-chatbot__panel" id="tt-chatbot-panel" role="dialog" aria-modal="false" aria-labelledby="tt-chatbot-title" aria-describedby="tt-chatbot-description" hidden>
      <div class="tt-chatbot__header">
        <div class="tt-chatbot__identity">
          <div class="tt-chatbot__brand" aria-hidden="true"><img src="${page('assets/img/brand-mark.png')}" alt=""></div>
          <div class="tt-chatbot__identity-copy">
            <strong id="tt-chatbot-title">Trendy Tax Assistant</strong>
            <span id="tt-chatbot-description"><i aria-hidden="true"></i> Guided website preview</span>
          </div>
        </div>
        <div class="tt-chatbot__header-actions">
          <button type="button" class="tt-chatbot__icon-btn" data-chat-reset aria-label="Start conversation again" title="Start again">${svg('reset', 17)}</button>
          <button type="button" class="tt-chatbot__icon-btn" data-chat-close aria-label="Close help guide" title="Close">${svg('close', 19)}</button>
        </div>
      </div>
      <div class="tt-chatbot__conversation" data-chat-conversation role="log" aria-live="polite" aria-relevant="additions text">
        <div class="tt-chatbot__timeline"><span>Welcome</span></div>
        <div class="tt-chatbot__bot-line"><span class="tt-chatbot__bot-avatar" aria-hidden="true">T</span><div class="tt-chatbot__bubble tt-chatbot__bubble--bot">Hello! 👋 Welcome to Trendy Tax Solutions.</div></div>
        <div class="tt-chatbot__bot-line tt-chatbot__bot-line--continued"><span class="tt-chatbot__bot-avatar tt-chatbot__bot-avatar--empty"></span><div class="tt-chatbot__bubble tt-chatbot__bubble--bot">Need a hand finding the right accounting or tax service? I can point you in the right direction.</div></div>
        <div class="tt-chatbot__topic-area" data-chat-topics>
          <p class="tt-chatbot__topic-heading">What can we help you with?</p>
          <div class="tt-chatbot__topics">
            ${topics.map(t => `<button type="button" class="tt-chatbot__topic" data-chat-topic="${t.id}">
              <span class="tt-chatbot__topic-icon">${svg(t.icon, 19)}</span>
              <span class="tt-chatbot__topic-label"><strong>${t.title}</strong><small>${t.subtitle}</small></span>
              <span class="tt-chatbot__topic-arrow">${svg('chevron', 16)}</span>
            </button>`).join('')}
          </div>
        </div>
        <div data-chat-replies></div>
      </div>
      <div class="tt-chatbot__footer">
        <div class="tt-chatbot__input" aria-label="Live messaging is not enabled in this demo">
          <span>Messaging available soon</span><button type="button" disabled aria-label="Send unavailable in preview">${svg('arrow', 17)}</button>
        </div>
        <p class="tt-chatbot__privacy">${svg('shield', 13)} Preview only · Messaging isn’t enabled. Please don’t share personal or financial details.</p>
      </div>
    </section>
    <button class="tt-chatbot__launcher" type="button" data-chat-launcher aria-label="Open Trendy Tax help guide" aria-controls="tt-chatbot-panel" aria-expanded="false">
      <span class="tt-chatbot__launcher-icon">${svg('chat', 22)}</span>
      <span class="tt-chatbot__launcher-copy"><strong>How can we help?</strong><small>Chat with our guide</small></span>
      <span class="tt-chatbot__launcher-end">${svg('arrow', 17)}</span>
    </button>`;
  document.body.appendChild(root);

  const launcher = root.querySelector('[data-chat-launcher]');
  const panel = root.querySelector('#tt-chatbot-panel');
  const closeButton = root.querySelector('[data-chat-close]');
  const resetButton = root.querySelector('[data-chat-reset]');
  const topicArea = root.querySelector('[data-chat-topics]');
  const replyArea = root.querySelector('[data-chat-replies]');
  const conversation = root.querySelector('[data-chat-conversation]');

  function show(open) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? 'Close Trendy Tax help guide' : 'Open Trendy Tax help guide');
    root.classList.toggle('tt-chatbot--open', open);
    launcher.querySelector('.tt-chatbot__launcher-icon').innerHTML = open ? svg('close', 20) : svg('chat', 22);
    if (open) {
      closeButton.focus({ preventScroll: true });
    } else if (panel.contains(document.activeElement)) {
      launcher.focus({ preventScroll: true });
    }
  }

  function scrollToLatest() {
    conversation.scrollTop = conversation.scrollHeight;
  }

  function choose(id) {
    const topic = topics.find(item => item.id === id);
    if (!topic) return;
    topicArea.hidden = true;
    const alternative = topic.alternate ? `<a href="${topic.alternate.href}" target="_blank" rel="noopener noreferrer" class="tt-chatbot__secondary-link">${topic.alternate.label} ${svg('arrow', 14)}</a>` : '';
    replyArea.innerHTML = `
      <div class="tt-chatbot__user-line"><div class="tt-chatbot__bubble tt-chatbot__bubble--user">${topic.title}</div></div>
      <div class="tt-chatbot__bot-line tt-chatbot__bot-line--answer"><span class="tt-chatbot__bot-avatar" aria-hidden="true">T</span><div class="tt-chatbot__bubble tt-chatbot__bubble--bot">${topic.answer}
        <a class="tt-chatbot__answer-link" href="${topic.href}">${topic.label} ${svg('arrow', 16)}</a>
        ${alternative}
      </div></div>
      <button type="button" class="tt-chatbot__another" data-chat-another>← Explore another topic</button>`;
    replyArea.querySelector('[data-chat-another]').addEventListener('click', () => {
      replyArea.replaceChildren();
      topicArea.hidden = false;
      conversation.scrollTop = 0;
      topicArea.querySelector('button').focus({ preventScroll: true });
    });
    scrollToLatest();
  }

  launcher.addEventListener('click', () => show(panel.hidden));
  closeButton.addEventListener('click', () => show(false));
  resetButton.addEventListener('click', () => {
    replyArea.replaceChildren();
    topicArea.hidden = false;
    conversation.scrollTop = 0;
    topicArea.querySelector('button').focus({ preventScroll: true });
  });
  root.querySelectorAll('[data-chat-topic]').forEach(button => button.addEventListener('click', () => choose(button.dataset.chatTopic)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) show(false);
  });
})();
