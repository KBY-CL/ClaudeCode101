/* Claude Code 101 — 챕터 공통 다크모드 토글
 * 메인 페이지(cc101-theme)와 별도 키 사용: cc101-chapter-theme
 * 기본값: light (HTML data-theme="light" 그대로)
 * head 인라인 스크립트에서 초기 테마 적용 → FOUC 없음
 */
(function () {
  const KEY = 'cc101-chapter-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // 버튼 클릭 핸들러 (전역)
  window.toggleThemeBtn = function () {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  };

  // 버튼 아이콘 초기화 (DOM 로드 후)
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('themeBtn');
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    if (btn) btn.textContent = current === 'dark' ? '☀️' : '🌙';
  });
})();
