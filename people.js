const examplesByCountry = {KR: peopleKR, JP: peopleJP, US: peopleUS};
const countryForLanguage = {ko: 'KR', ja: 'JP', en: 'US'};
const nameForLanguage = {ko: 0, ja: 1, en: 2};
const countryPicker = document.getElementById('people-country');
let preferredCountry = '';
try {
  const saved = localStorage.getItem('mbti-test:people-country');
  if (Object.hasOwn(examplesByCountry, saved)) preferredCountry = saved;
} catch {}

function renderPeople(type) {
  const language = document.documentElement.lang;
  const country = preferredCountry || countryForLanguage[language];
  countryPicker.value = country;
  document.getElementById('people-title').textContent = t('{type}로 소개된 유명인', {type});
  const entries = examplesByCountry[country][type].map((entry, index) => {
    const item = document.createElement('li');
    const label = document.createElement('small');
    label.textContent = t(index === 0 ? '남성' : '여성');
    const name = document.createElement('strong');
    name.textContent = entry[nameForLanguage[language]];
    const source = document.createElement('a');
    source.href = entry[3];
    source.textContent = t(entry[4] === 'reported' ? '본인 공개 · 출처' : '외부 추정 · 출처');
    source.setAttribute('aria-label', name.textContent + ' · ' + source.textContent);
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    item.append(label, name, source);
    return item;
  });
  document.getElementById('people-list').replaceChildren(...entries);
}

countryPicker.addEventListener('change', () => {
  preferredCountry = countryPicker.value;
  try { localStorage.setItem('mbti-test:people-country', preferredCountry); } catch {}
  renderPeople(document.getElementById('type').textContent);
});
