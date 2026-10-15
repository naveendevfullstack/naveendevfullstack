// Copies index.html to 404.html so deep links (e.g. /projects/eatcircle)
// work on GitHub Pages, which has no SPA rewrite support.
import { copyFileSync, existsSync } from 'node:fs'

if (existsSync('dist/index.html')) {
  copyFileSync('dist/index.html', 'dist/404.html')
}
