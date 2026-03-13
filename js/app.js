/**
 * Claude Code 101 — App Logic
 * Handles: sidebar, module rendering, completion tracking, theme, scroll, giscus
 */

const SVG_CHECK = '<svg width="12" height="12" fill="none" stroke="white" stroke-width="3" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg>';
const SVG_CHEVRON = '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6,9 12,15 18,9"/></svg>';

function getLang() { return localStorage.getItem('cc101-lang') || 'ko'; }

// ===== SIDEBAR =====
const sidebar = document.getElementById('sidebar');
sidebar.innerHTML = '<a href="#overview"><span class="pip"></span><span class="label">Overview</span></a>' +
  modules.map(m=>`<a href="#${m.id}"><span class="pip"></span><span class="label">M${m.num}</span></a>`).join('');

// ===== RENDER OVERVIEW =====
const overviewGrid = document.getElementById('overviewGrid');
modules.forEach(m=>{
  const c = document.createElement('a');
  c.href = m.chapterUrl ? m.chapterUrl : `#${m.id}`;
  c.className = 'overview-card';
  const chapterBadge = m.chapterUrl ? '<div class="oc-chapter-badge">📖 <span class="lang-ko">챕터 보기</span><span class="lang-en">View Chapter</span></div>' : '';
  c.innerHTML = `<div class="oc-num">${m.num}</div><div class="oc-title"><span class="lang-ko">${m.title}</span><span class="lang-en">${m.title_en||m.title}</span></div><div class="oc-desc"><span class="lang-ko">${m.desc}</span><span class="lang-en">${m.desc_en||m.desc}</span></div><div class="oc-time"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>${m.time}</div>${chapterBadge}<div class="oc-progress"><div class="oc-progress-fill" data-module="${m.id}" style="width:0%"></div></div>`;
  overviewGrid.appendChild(c);
});

// ===== RENDER MODULES =====
const modulesContainer = document.getElementById('modulesContainer');
const completed = JSON.parse(localStorage.getItem('cc101_v2')||'{}');
const checklistState = JSON.parse(localStorage.getItem('cc101_cl')||'{}');

modules.forEach(m=>{
  const sec = document.createElement('section');
  sec.className = 'module-section'; sec.id = m.id;

  const goalsKo = m.goals.map((g,i)=>`<span class="goal-tag lang-ko"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg>${g}</span>`).join('');
  const goalsEn = (m.goals_en||m.goals).map((g,i)=>`<span class="goal-tag lang-en"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg>${g}</span>`).join('');
  const goalsH = goalsKo + goalsEn;

  const secH = m.sections.map(s=>`
    <div class="content-card" data-card>
      <div class="card-header" onclick="toggleCard(this)">
        <div class="card-icon ${s.iconClass}">${s.icon}</div>
        <div class="card-title-area"><div class="card-title"><span class="lang-ko">${s.title}</span><span class="lang-en">${s.title_en||s.title}</span></div><div class="card-subtitle"><span class="lang-ko">${s.subtitle}</span><span class="lang-en">${s.subtitle_en||s.subtitle}</span></div></div>
        <div class="card-toggle">${SVG_CHEVRON}</div>
      </div>
      <div class="card-body"><div class="card-content">${s.content}</div></div>
    </div>`).join('');

  let practiceH = '';
  if(m.practice){
    const p = m.practice;
    const stepsH = p.steps.map((s,i)=>`
      <div class="step">
        <div class="step-num">${i+1}</div>
        <div class="step-content">
          <h5>${s.title}</h5>
          <p>${s.desc}</p>
          ${s.expected?`<div class="expected"><div class="expected-label">✓ 예상 결과</div>${s.expected}</div>`:''}
        </div>
      </div>`).join('');

    const clH = p.checklist?`<div class="checklist">${p.checklist.map((c,i)=>{
      const k=`${m.id}_cl_${i}`;
      const chk = checklistState[k]?'checked':'';
      return `<label class="checklist-item"><input type="checkbox" ${chk} onchange="toggleCL('${k}',this)"><span class="check-box"><svg width="12" height="12" fill="none" stroke="white" stroke-width="3" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg></span><span class="cl-text">${c}</span></label>`;
    }).join('')}</div>`:'';

    practiceH = `
      <div class="practice-box" data-practice>
        <div class="practice-header" onclick="togglePractice(this)">
          <div class="practice-badge">🎯 <span class="lang-ko">실습 과제</span><span class="lang-en">Practice</span></div>
          <div class="practice-title"><span class="lang-ko">${p.summary}</span><span class="lang-en">${p.summary_en||p.summary}</span></div>
          <div class="card-toggle">${SVG_CHEVRON}</div>
        </div>
        <div class="practice-body">
          <div class="practice-content">
            <h4><span class="lang-ko">Step-by-Step 가이드</span><span class="lang-en">Step-by-Step Guide</span></h4>
            ${stepsH}
            ${p.checklist?`<h4><span class="lang-ko">완료 체크리스트</span><span class="lang-en">Completion Checklist</span></h4>${clH}`:''}
          </div>
        </div>
      </div>`;
  }

  const chapterLink = m.chapterUrl ? `<a href="${m.chapterUrl}" class="chapter-link"><span class="lang-ko">상세 챕터 →</span><span class="lang-en">Full Chapter →</span></a>` : '';
  sec.innerHTML = `<div class="container">
    <div style="margin-bottom:2rem">
      <div class="module-number">Module ${m.num}</div>
      <h2 class="module-title"><span class="lang-ko">${m.title}</span><span class="lang-en">${m.title_en||m.title}</span>${chapterLink}</h2>
      <p class="module-desc"><span class="lang-ko">${m.desc}</span><span class="lang-en">${m.desc_en||m.desc}</span></p>
    </div>
    <div class="goals">${goalsH}</div>
    ${secH}
    ${practiceH}
    <div class="completion-row">
      <button class="check-btn" onclick="toggleComplete('${m.id}',this)">
        <span class="ci">${SVG_CHECK}</span><span class="lang-ko">이 모듈 학습 완료</span><span class="lang-en">Mark as Complete</span>
      </button>
      <span class="progress-text">${m.time}</span>
    </div>
  </div>`;
  modulesContainer.appendChild(sec);
});

// ===== FUNCTIONS =====
function toggleCard(h){h.parentElement.classList.toggle('open')}
function togglePractice(h){h.parentElement.classList.toggle('open')}

function copyCode(btn){
  const pre=btn.closest('.code-block').querySelector('pre');
  navigator.clipboard.writeText(pre.textContent).then(()=>{
    btn.textContent='copied!';btn.classList.add('copied');
    setTimeout(()=>{btn.textContent='copy';btn.classList.remove('copied')},2000);
  });
}

function toggleComplete(id,btn){
  completed[id]=!completed[id];
  localStorage.setItem('cc101_v2',JSON.stringify(completed));
  updateUI();
}

function toggleCL(key,input){
  checklistState[key]=input.checked;
  localStorage.setItem('cc101_cl',JSON.stringify(checklistState));
}

function updateUI(){
  document.querySelectorAll('.check-btn').forEach(btn=>{
    const match=btn.getAttribute('onclick').match(/'(\w+)'/);
    if(match && completed[match[1]]) btn.classList.add('checked');
    else btn.classList.remove('checked');
  });
  const count=Object.values(completed).filter(Boolean).length;
  document.getElementById('totalProgress').textContent=getLang()==='ko'?`완료: ${count} / ${modules.length}`:`Completed: ${count} / ${modules.length}`;
  document.querySelectorAll('.oc-progress-fill').forEach(el=>{
    el.style.width=completed[el.dataset.module]?'100%':'0%';
  });
}
updateUI();

// Auto-open first card
document.querySelectorAll('.module-section').forEach(s=>{
  const c=s.querySelector('.content-card');if(c)c.classList.add('open');
});

// ===== THEME TOGGLE =====
(function(){
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('cc101-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  function updateBtn(){
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggle.textContent = dark ? '☀️' : '🌙';
    toggle.title = dark ? (getLang()==='ko' ? '라이트 모드로 전환' : 'Switch to Light Mode') : (getLang()==='ko' ? '다크 모드로 전환' : 'Switch to Dark Mode');
  }
  updateBtn();
  toggle.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cc101-theme', next);
    updateBtn();
  });
})();

// ===== SCROLL =====
window.addEventListener('scroll',()=>{
  const st=window.scrollY;
  const dh=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById('progressBar').style.width=(st/dh)*100+'%';
  let cur='overview';
  document.querySelectorAll('.module-section,.hero').forEach(s=>{if(s.getBoundingClientRect().top<200)cur=s.id});
  document.querySelectorAll('.sidebar a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

// ===== GISCUS =====
(function(){
  function getTheme(){
    return localStorage.getItem('cc101-theme') || document.documentElement.getAttribute('data-theme') || 'light';
  }
  function loadGiscus(){
    const container = document.getElementById('giscus-main');
    if (!container || container.querySelector('script')) return;
    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.setAttribute('data-repo', 'm1zz/ClaudeCode101');
    s.setAttribute('data-repo-id', 'R_kgDORW3WvA');
    s.setAttribute('data-category', 'General');
    s.setAttribute('data-category-id', 'DIC_kwDORW3WvM4C3uH7');
    s.setAttribute('data-mapping', 'specific');
    s.setAttribute('data-term', 'ClaudeCode101-메인');
    s.setAttribute('data-strict', '0');
    s.setAttribute('data-reactions-enabled', '1');
    s.setAttribute('data-emit-metadata', '0');
    s.setAttribute('data-input-position', 'top');
    s.setAttribute('data-theme', getTheme());
    s.setAttribute('data-lang', 'ko');
    s.crossOrigin = 'anonymous';
    s.async = true;
    container.appendChild(s);
  }
  function sendTheme(theme){
    const iframe = document.querySelector('#giscus-main iframe.giscus-frame');
    if (iframe) iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadGiscus);
  else loadGiscus();
  const mo = new MutationObserver(() => sendTheme(getTheme()));
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
