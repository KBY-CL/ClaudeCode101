/**
 * Claude Code 101 — Language Toggle (ko / en)
 *
 * Usage:
 *   1. Add in <head>:
 *        <script>(function(){var l=localStorage.getItem('cc101-lang')||'ko';document.documentElement.setAttribute('lang',l)})();</script>
 *   2. Add before </body>:
 *        <script src="lang.js"></script>
 *   3. Wrap Korean content:  <div class="lang-ko">...</div>
 *      Add English content:  <div class="lang-en">...</div>
 */

(function () {
  const KEY = 'cc101-lang';

  function getLang() {
    return localStorage.getItem(KEY) || 'ko';
  }

  function setLang(lang) {
    localStorage.setItem(KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    const btn = document.getElementById('langToggle');
    if (btn) updateBtnText(btn, lang);
    updatePageTitle(lang);
    updateTitleAttrs(lang);
  }

  function updatePageTitle(lang) {
    const html = document.documentElement;
    const titleKo = html.getAttribute('data-title-ko');
    const titleEn = html.getAttribute('data-title-en');
    if (lang === 'en' && titleEn) document.title = titleEn;
    else if (lang === 'ko' && titleKo) document.title = titleKo;
  }

  function updateTitleAttrs(lang) {
    document.querySelectorAll('[data-title-ko],[data-title-en]').forEach(function(el) {
      if (el === document.documentElement) return;
      var t = lang === 'en' ? el.getAttribute('data-title-en') : el.getAttribute('data-title-ko');
      if (t) el.setAttribute('title', t);
    });
    document.querySelectorAll('[data-aria-ko],[data-aria-en]').forEach(function(el) {
      var a = lang === 'en' ? el.getAttribute('data-aria-en') : el.getAttribute('data-aria-ko');
      if (a) el.setAttribute('aria-label', a);
    });
  }

  function updateBtnText(btn, lang) {
    btn.textContent = lang === 'ko' ? 'EN' : '한';
    btn.title = lang === 'ko' ? 'Switch to English' : '한국어로 변경';
  }

  function injectStyles() {
    if (document.getElementById('lang-styles')) return;
    const s = document.createElement('style');
    s.id = 'lang-styles';
    s.textContent = `
html[lang="ko"] .lang-en { display: none !important; }
html[lang="en"] .lang-ko { display: none !important; }

.lang-toggle {
  position: fixed;
  bottom: 9.5rem;
  right: 1.8rem;
  z-index: 1000;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--surface, #f1f5f9);
  border: 1.5px solid var(--border, #e2e8f0);
  cursor: pointer;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  color: var(--text, #0f172a);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
  line-height: 1;
  padding: 0;
}
.lang-toggle:hover {
  border-color: var(--accent, #ea6c0a);
  transform: scale(1.1);
  box-shadow: 0 4px 14px rgba(0,0,0,.15);
}
[data-theme="dark"] .lang-toggle {
  background: var(--surface, #1e293b);
  border-color: var(--border, #334155);
  color: var(--text, #e2e8f0);
  box-shadow: 0 2px 8px rgba(0,0,0,.3);
}
`;
    document.head.appendChild(s);
  }

  function injectButton() {
    if (document.getElementById('langToggle')) return;
    const btn = document.createElement('button');
    btn.id = 'langToggle';
    btn.className = 'lang-toggle';
    btn.setAttribute('aria-label', 'Toggle language / 언어 전환');
    updateBtnText(btn, getLang());
    btn.onclick = function () {
      setLang(getLang() === 'ko' ? 'en' : 'ko');
    };
    document.body.appendChild(btn);
  }

  // Apply language immediately for FOUC prevention
  document.documentElement.setAttribute('lang', getLang());
  injectStyles();

  function onReady() {
    injectButton();
    const lang = getLang();
    updatePageTitle(lang);
    updateTitleAttrs(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
