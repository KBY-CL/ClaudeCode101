# Claude Code 101 — 완전 입문 가이드 2026

AI 에이전틱 코딩 도구 Claude Code를 설치부터 실전 프로젝트까지 마스터하는 학습 사이트입니다.

## 🚀 GitHub Pages 배포 (3단계)

```bash
# 1. 레포 생성 & 푸시
git init
git add .
git commit -m "🚀 Claude Code 101 배포"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/claude-code-101.git
git push -u origin main

# 2. GitHub 레포 → Settings → Pages
#    Source: Deploy from a branch
#    Branch: main / Folder: / (root)
#    Save 클릭

# 3. 1~2분 후 확인
# https://YOUR_USERNAME.github.io/claude-code-101/
```

또는 GitHub Actions가 `.github/workflows/deploy.yml`에 이미 설정되어 있어서 푸시만 하면 자동 배포됩니다.

## 📁 구조

```
├── index.html              # 학습 페이지 (단일 파일, 외부 의존성 없음)
├── 404.html                # 커스텀 404
├── .nojekyll               # Jekyll 비활성화
├── robots.txt              # SEO
├── sitemap.xml             # SEO
├── CNAME                   # 커스텀 도메인 (선택)
└── .github/workflows/
    └── deploy.yml          # 자동 배포
```
