# Claude Code 101 — 완전 입문 가이드 2026

> **터미널을 처음 여는 비개발자부터 실전 프로젝트까지,**
> **AI 에이전틱 코딩의 모든 것을 한국어로 마스터하세요.**

원본 프로젝트: [m1zz/ClaudeCode101](https://github.com/m1zz/ClaudeCode101)

## 누구를 위한 가이드인가요?

- 바이브 코딩이 뭔지 궁금한 비개발자 (기획자, 디자이너, 창업자)
- Claude Code를 시작하고 싶은 개발자
- 영어 문서가 부담스러운 한국어 사용자

## 커리큘럼 (13개 모듈)

| 모듈 | 주제 | 시간 |
|------|------|------|
| Pre | 터미널이 처음이라면 (비개발자용) | 1시간 |
| 00 | Claude Code가 뭔가요? | 30분 |
| 01 | 설치 & 첫 실행 + IDE 연동 | 1시간 |
| 02 | 기본 사용법, 비용/모델 관리 | 2시간 |
| 03 | CLAUDE.md — 프로젝트 메모리 | 1.5시간 |
| 04 | 효과적인 프롬프팅 + 컨텍스트 윈도우 | 2시간 |
| 05 | MCP 서버 연결 | 2시간 |
| 06 | 서브에이전트 & 커스텀 에이전트 | 2시간 |
| 07 | Skills & Hooks | 2시간 |
| 08 | 실전 워크플로우 (Git, PR, 디버깅) | 2시간 |
| 09 | 고급 기능 (Worktree, Teleport) | 2시간 |
| 10 | 실전 프로젝트 — DailyMemo 앱 완성 | 3시간 |
| 11 | 핵심 개념 시각화 — Agent · Skills · MCP | 30분 |

## 특징

- 한국어로 된 체계적인 Claude Code 학습 자료
- 비개발자도 터미널 기초부터 시작 가능
- 모듈마다 Step-by-Step 실습 + 체크리스트
- 진행률 자동 저장 (브라우저 localStorage)
- 한국어/영어 이중 언어 지원

## 프로젝트 구조

```
├── index.html              # 메인 페이지 (HTML 구조)
├── css/
│   └── main.css            # 전체 스타일시트
├── js/
│   ├── modules-data.js     # 12개 모듈 데이터 정의
│   └── app.js              # 앱 로직 (렌더링, 테마, 스크롤, 진행률)
├── lang.js                 # 언어 전환 (SSOT — 루트 + 챕터 공유)
├── chapters/               # 상세 챕터 페이지 (14개)
│   ├── community.js        # 커뮤니티 위젯 (카카오톡 + Giscus)
│   ├── theme.js            # 챕터 테마 토글
│   └── theme.css           # 챕터 테마 변수
├── 404.html                # 커스텀 404
├── robots.txt              # SEO
├── sitemap.xml             # SEO
└── .github/workflows/
    └── deploy.yml          # GitHub Actions 자동 배포
```

## 로컬 실행

```bash
# 별도 빌드 필요 없음 — 브라우저에서 바로 열기
open index.html
```

## 배포

GitHub Pages로 자동 배포됩니다. `main` 브랜치에 push하면 GitHub Actions가 자동으로 배포합니다.

