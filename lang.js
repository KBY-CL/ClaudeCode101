/**
 * Claude Code 101 — Language Toggle (ko / en)  [Root version for index.html]
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

#langToggle {
  position: fixed;
  bottom: 9.5rem;
  right: 1.8rem;
  z-index: 1000;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg-card, #ffffff);
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
  box-shadow: var(--shadow-card, 0 2px 8px rgba(0,0,0,.1));
  line-height: 1;
  padding: 0;
}
#langToggle:hover {
  border-color: var(--accent, #ea6c0a);
  transform: scale(1.1);
}
`;
    document.head.appendChild(s);
  }

  function injectButton() {
    if (document.getElementById('langToggle')) return;
    const btn = document.createElement('button');
    btn.id = 'langToggle';
    btn.setAttribute('aria-label', 'Toggle language / 언어 전환');
    updateBtnText(btn, getLang());
    btn.onclick = function () {
      setLang(getLang() === 'ko' ? 'en' : 'ko');
    };
    document.body.appendChild(btn);
  }

  // Apply immediately
  document.documentElement.setAttribute('lang', getLang());
  injectStyles();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }
})();
