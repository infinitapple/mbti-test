// Keep the quiz state in its original language and translate only at presentation time.
const siteLanguage = (() => {
  const controls = [...document.querySelectorAll('.language-switch button')];
  const supported = controls.map(button => button.dataset.lang);
  const requested = new URLSearchParams(location.search).get('lang');
  let language = 'ko';
  try {
    const saved = localStorage.getItem('quiz-language');
    if (supported.includes(saved)) language = saved;
  } catch {}
  if (supported.includes(requested)) language = requested;

  function translate(source, values = {}) {
    const message = translations[source]?.[language] ?? source;
    return message.replace(/\{(\w+)\}/g, (token, key) => values[key] ?? token);
  }

  // Bind the original static copy once. Dynamic quiz text uses translate() when rendered.
  const bindings = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style')) continue;
    const original = node.data;
    const source = original.trim();
    if (translations[source]) {
      bindings.push(() => { node.data = original.replace(source, () => translate(source)); });
    }
  }
  const originalTitle = document.title;
  for (const attribute of ['content', 'placeholder', 'aria-label']) {
    for (const el of document.querySelectorAll('[' + attribute + ']')) {
      const source = el.getAttribute(attribute);
      if (translations[source]) bindings.push(() => el.setAttribute(attribute, translate(source)));
    }
  }

  function apply() {
    document.documentElement.lang = language;
    document.title = translate(originalTitle);
    for (const render of bindings) render();
    for (const button of controls) {
      button.setAttribute('aria-pressed', String(button.dataset.lang === language));
    }
    for (const link of document.querySelectorAll('a[data-language-link]')) {
      const destination = new URL(link.href);
      destination.searchParams.set('lang', language);
      link.href = destination.href;
    }
  }
  for (const button of controls) {
    button.addEventListener('click', () => {
      language = button.dataset.lang;
      try { localStorage.setItem('quiz-language', language); } catch {}
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(null, '', url);
      apply();
      document.dispatchEvent(new Event('quizlanguagechange'));
    });
  }
  apply();
  return {translate};
})();
const t = siteLanguage.translate;
