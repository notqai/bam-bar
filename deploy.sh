#!/usr/bin/env bash
# Redeploy the BÀM draft to GitHub Pages (https://notqai.github.io/bam-bar/).
# Usage:  ./deploy.sh
set -euo pipefail
cd "$(dirname "$0")"

echo "→ Building…"
npm run build

echo "→ Publishing dist/ to gh-pages…"
touch dist/.nojekyll
cd dist
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.name="notqai" -c user.email="qaisersiew123@gmail.com" commit -qm "Deploy $(date '+%Y-%m-%d %H:%M')"
git push -f "https://github.com/notqai/bam-bar.git" gh-pages
cd ..
rm -rf dist/.git

echo "✓ Deployed. Live in ~1 min at https://notqai.github.io/bam-bar/"
