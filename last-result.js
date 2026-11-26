const lastHumanResult = (() => {
  const key = 'mbti-test:last-type';
  const badge = document.getElementById('last-result');
  const code = badge.querySelector('strong');
  let type = '';

  function display(value) {
    type = /^[EI][SN][TF][JP]$/.test(value) ? value : '';
    code.textContent = type;
    badge.hidden = !type;
  }
  function restore() {
    try { display(localStorage.getItem(key)); } catch {}
  }
  restore();
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) restore();
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) restore();
  });
  return {
    get type() { return type; },
    save(value) {
      display(value);
      try { localStorage.setItem(key, type); } catch {}
    }
  };
})();
