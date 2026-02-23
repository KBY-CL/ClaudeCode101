#!/bin/bash
# Claude Code 101 — GitHub Pages 배포 스크립트
# 사용법: ./deploy.sh YOUR_GITHUB_USERNAME

set -e

USERNAME=${1:-"YOUR_USERNAME"}
REPO="claude-code-101"

echo "🚀 Claude Code 101 배포 시작"
echo "   GitHub: ${USERNAME}/${REPO}"
echo ""

# sitemap.xml 업데이트
sed -i "s/YOUR_USERNAME/${USERNAME}/g" sitemap.xml 2>/dev/null || true

# Git 초기화
if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

# 커밋
git add .
git commit -m "🚀 Claude Code 101 학습 사이트 배포" --allow-empty

# 리모트 설정
if ! git remote | grep -q origin; then
  git remote add origin "https://github.com/${USERNAME}/${REPO}.git"
fi

# 푸시
git push -u origin main

echo ""
echo "✅ 푸시 완료!"
echo ""
echo "📌 다음 단계:"
echo "   1. https://github.com/${USERNAME}/${REPO}/settings/pages 접속"
echo "   2. Source: Deploy from a branch"
echo "   3. Branch: main / Folder: / (root)"
echo "   4. Save 클릭"
echo ""
echo "   또는 GitHub Actions가 자동으로 배포합니다."
echo "   배포 확인: https://${USERNAME}.github.io/${REPO}/"
