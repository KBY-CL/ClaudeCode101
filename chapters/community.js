/**
 * Claude Code 101 — 챕터 커뮤니티 위젯
 *
 * 포함: KakaoTalk 오픈채팅 배너 (QR 포함) + Giscus 댓글 + 후원 FAB
 *
 * ── Giscus 설정 방법 ───────────────────────────────────────
 * 1. https://github.com/m1zz/ClaudeCode101 → Settings → Features → Discussions 활성화
 * 2. https://github.com/apps/giscus 에서 앱 설치 (m1zz/ClaudeCode101 선택)
 * 3. https://giscus.app 에서 m1zz/ClaudeCode101 입력 → category-id 복사
 * 4. 아래 GISCUS_CATEGORY_ID 값을 교체
 * ──────────────────────────────────────────────────────────
 */

(function () {
  const KAKAO_URL = 'https://open.kakao.com/o/pWK34Oji';
  const KAKAO_QR  = '../kakao-openchat-qr.jpg';
  const KAKAOPAY_QR = '../kakaopay-qr.jpg';
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

/* ── 카카오 카드 ── */
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

/* ── Giscus 래퍼 ── */
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

/* ── 후원 FAB ── */
.ch-support-fab {
  position: fixed; bottom: 5.5rem; right: 1.6rem; z-index: 900;
  display: flex; align-items: center; gap: 6px;
  padding: 10px 18px;
  background: #FEE500;
  border: none; border-radius: 100px;
  cursor: pointer;
  font-size: .85rem; font-weight: 700;
  color: #3C1E1E;
  box-shadow: 0 4px 20px rgba(254,229,0,.5);
  transition: all .25s;
  line-height: 1;
}
.ch-support-fab:hover {
  background: #F9D800;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(254,229,0,.6);
}
.ch-support-fab .fab-icon { font-size: 1rem; line-height: 1; }

/* ── 후원 오버레이 ── */
.ch-support-overlay {
  display: none; position: fixed; inset: 0; z-index: 910;
  background: rgba(0,0,0,.55); backdrop-filter: blur(4px);
}
.ch-support-overlay.open { display: block; animation: ch-fade-in .2s ease; }
@keyframes ch-fade-in { from{opacity:0} to{opacity:1} }

/* ── 후원 모달 ── */
.ch-support-modal {
  display: none; position: fixed; z-index: 920;
  bottom: 9rem; right: 1.6rem;
  width: 300px;
  background: var(--surface, #fff);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 20px;
  padding: 1.6rem 1.4rem 1.3rem;
  box-shadow: 0 20px 60px rgba(0,0,0,.3);
  text-align: center;
}
.ch-support-modal.open {
  display: block;
  animation: ch-modal-in .3s cubic-bezier(.34,1.56,.64,1) both;
}
@keyframes ch-modal-in {
  from{opacity:0;transform:translateY(12px) scale(.95)}
  to{opacity:1;transform:none}
}
.ch-support-close {
  position: absolute; top: .9rem; right: 1rem;
  background: none; border: none; cursor: pointer;
  color: var(--text-muted, #94a3b8); font-size: 1rem; line-height: 1;
  transition: color .2s;
}
.ch-support-close:hover { color: var(--text, #0f172a); }

.ch-support-pulse {
  font-size: 2.2rem; margin-bottom: .6rem; line-height: 1;
  display: inline-block;
  animation: ch-coffee-bounce 2s ease-in-out infinite;
}
@keyframes ch-coffee-bounce {
  0%,100%{transform:translateY(0) rotate(-5deg)}
  50%{transform:translateY(-5px) rotate(5deg)}
}
.ch-support-title {
  font-size: 1.05rem; font-weight: 700;
  margin-bottom: .5rem; color: var(--text, #0f172a);
}
.ch-support-sub {
  font-size: .84rem; color: var(--text-dim, #475569); line-height: 1.65;
}
.ch-support-sub strong { color: var(--accent, #7c3aed); }
.ch-support-sub-small {
  font-size: .75rem; color: var(--text-muted, #94a3b8);
  display: block; margin-top: .3rem;
}

.ch-support-qr-wrap {
  background: var(--surface-raised, #f1f5f9);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 14px;
  padding: 1rem;
  margin: .8rem 0;
}
.ch-support-qr {
  width: 160px; height: 160px;
  border-radius: 10px;
  display: block; margin: 0 auto .7rem;
  object-fit: contain;
}
.ch-support-qr-label {
  display: flex; align-items: center; justify-content: center; gap: .4rem;
  font-size: .78rem; color: var(--text-muted, #94a3b8); font-weight: 500;
}
.ch-support-thanks {
  font-size: .75rem; color: var(--text-muted, #94a3b8); margin-top: .6rem;
}

@media (max-width: 480px) {
  .ch-support-modal { right: 1rem; left: 1rem; width: auto; bottom: 7rem; }
}
    `;
    document.head.appendChild(s);
  }

  function injectSupportFAB() {
    if (document.getElementById('chSupportFab')) return;

    const fab = document.createElement('button');
    fab.className = 'ch-support-fab';
    fab.id = 'chSupportFab';
    fab.setAttribute('aria-label', '후원하기');
    fab.innerHTML = '<span class="fab-icon">☕</span><span>후원</span>';
    fab.onclick = openSupport;

    const overlay = document.createElement('div');
    overlay.className = 'ch-support-overlay';
    overlay.id = 'chSupportOverlay';
    overlay.onclick = closeSupport;

    const modal = document.createElement('div');
    modal.className = 'ch-support-modal';
    modal.id = 'chSupportModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <button class="ch-support-close" aria-label="닫기">✕</button>
      <div class="ch-support-pulse">☕</div>
      <h3 class="ch-support-title">학습이 즐거우셨나요?</h3>
      <p class="ch-support-sub">
        여러분의 후원 한 잔이<br>
        <strong>다음 챕터를 더 빠르게</strong> 만듭니다.<br>
        <span class="ch-support-sub-small">커피 한 잔 값이 콘텐츠 1시간을 앞당깁니다 ☕→📖</span>
      </p>
      <div class="ch-support-qr-wrap">
        <img src="${KAKAOPAY_QR}" alt="카카오페이 후원 QR" class="ch-support-qr"/>
        <div class="ch-support-qr-label">
          <svg width="52" height="20" viewBox="0 0 52 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#FEE500"/>
            <path d="M10 4.5C6.96 4.5 4.5 6.46 4.5 8.88c0 1.54.97 2.9 2.44 3.73l-.62 2.3a.19.19 0 0 0 .28.21l2.68-1.78c.23.03.47.04.72.04 3.04 0 5.5-1.96 5.5-4.38S13.04 4.5 10 4.5z" fill="#3C1E1E"/>
            <text x="24" y="14" font-family="Arial" font-weight="700" font-size="11" fill="#3C1E1E">pay</text>
          </svg>
          <span>카카오페이로 스캔</span>
        </div>
      </div>
      <p class="ch-support-thanks">후원해 주신 분들 덕분에 계속 쓸 수 있어요 🙏</p>
    `;
    modal.querySelector('.ch-support-close').onclick = closeSupport;

    document.body.appendChild(fab);
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeSupport();
    });
  }

  function openSupport() {
    document.getElementById('chSupportModal').classList.add('open');
    document.getElementById('chSupportOverlay').classList.add('open');
  }

  function closeSupport() {
    document.getElementById('chSupportModal').classList.remove('open');
    document.getElementById('chSupportOverlay').classList.remove('open');
  }

  function render() {
    const container = document.getElementById('community-widget');
    if (!container) return;

    injectCSS();
    injectSupportFAB();
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
