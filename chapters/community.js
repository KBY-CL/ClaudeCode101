/**
 * Claude Code 101 — Chapter Community Widget
 *
 * Includes: KakaoTalk Open Chat Banner (with QR) + Giscus Comments
 *
 * ── Giscus Setup ───────────────────────────────────────
 * 1. https://github.com/m1zz/ClaudeCode101 → Settings → Features → Discussions
 * 2. https://github.com/apps/giscus → install app (select m1zz/ClaudeCode101)
 * 3. https://giscus.app → enter m1zz/ClaudeCode101 → copy category-id
 * 4. Replace GISCUS_CATEGORY_ID below
 * ──────────────────────────────────────────────────────────
 */

(function () {
  const KAKAO_URL = 'https://open.kakao.com/o/pWK34Oji';
  const KAKAO_QR  = '../kakao-openchat-qr.jpg';
  const GISCUS_REPO = 'm1zz/ClaudeCode101';
  const GISCUS_REPO_ID = 'R_kgDORW3WvA';
  const GISCUS_CATEGORY = 'General';
  const GISCUS_CATEGORY_ID = 'DIC_kwDORW3WvM4C3uH7';

  const KEY = 'cc101-chapter-theme';

  function getTheme() {
    return (localStorage.getItem(KEY) || document.documentElement.getAttribute('data-theme') || 'light');
  }

  function sendGiscusTheme(theme) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme } } },
        'https://giscus.app'
      );
    }
  }

  function injectCSS() {
    if (document.getElementById('community-css')) return;
    const s = document.createElement('style');
    s.id = 'community-css';
    s.textContent = `
.community-section {
  margin: 3rem auto 0;
  max-width: 860px;
  padding: 0 1.5rem 3rem;
}

/* ── Kakao Card ── */
.kakao-card {
  display: flex;
  gap: 1.4rem;
  align-items: center;
  background: #FEE500;
  border-radius: 18px;
  padding: 1.2rem 1.6rem;
  margin-bottom: 2rem;
  text-decoration: none;
  color: #3C1E1E;
  transition: transform .2s, box-shadow .2s;
}
.kakao-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(254,229,0,.5);
  color: #3C1E1E;
}
[data-theme="dark"] .kakao-card { background: #F9E000; color: #2a1400; }

.kakao-card-body { flex: 1; }
.kakao-card-body strong {
  display: block; font-size: 1rem; font-weight: 800; margin-bottom: 4px;
}
.kakao-card-body p { font-size: .84rem; opacity: .72; margin: 0; line-height: 1.5; }
.kakao-card-body .kakao-tag {
  display: inline-block; margin-top: .6rem;
  background: rgba(0,0,0,.1); border-radius: 100px;
  padding: 3px 10px; font-size: .75rem; font-weight: 600;
}

.kakao-qr-wrap {
  flex-shrink: 0;
  background: #fff;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,.12);
}
.kakao-qr-wrap img {
  width: 90px; height: 90px;
  display: block; border-radius: 6px;
}
.kakao-qr-label {
  text-align: center; font-size: .65rem; color: #888;
  margin-top: 4px; font-weight: 500;
}

@media (max-width: 480px) {
  .kakao-qr-wrap { display: none; }
}

/* ── Giscus Wrapper ── */
.giscus-title {
  font-size: 1.05rem; font-weight: 700;
  color: var(--text, #0f172a);
  margin-bottom: .4rem;
}
.giscus-desc {
  font-size: .83rem;
  color: var(--text-muted, #94a3b8);
  margin-bottom: 1rem;
}
    `;
    document.head.appendChild(s);
  }

  function render() {
    const container = document.getElementById('community-widget');
    if (!container) return;

    injectCSS();
    const theme = getTheme();

    container.innerHTML = `
      <div class="community-section">

        <a class="kakao-card" href="${KAKAO_URL}" target="_blank" rel="noopener noreferrer">
          <div class="kakao-card-body">
            <strong>💬 Claude Code 101 오픈 카톡방</strong>
            <p>막히는 부분 질문 · 학습 인증 · 정보 공유<br>같이 공부하는 사람들이 모여 있어요</p>
            <span class="kakao-tag">참여하기 →</span>
          </div>
          <div class="kakao-qr-wrap">
            <img src="${KAKAO_QR}" alt="오픈채팅 QR"/>
            <div class="kakao-qr-label">카메라로 스캔</div>
          </div>
        </a>

        <p class="giscus-title">📣 피드백 &amp; 댓글</p>
        <p class="giscus-desc">이 챕터가 도움이 됐나요? GitHub 계정으로 댓글이나 반응을 남겨주세요.</p>

      </div>
    `;

    // Giscus script
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS_REPO);
    script.setAttribute('data-repo-id', GISCUS_REPO_ID);
    script.setAttribute('data-category', GISCUS_CATEGORY);
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', 'ko');
    script.crossOrigin = 'anonymous';
    script.async = true;
    container.querySelector('.community-section').appendChild(script);

    // Theme sync
    const mo = new MutationObserver(() => sendGiscusTheme(getTheme()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
