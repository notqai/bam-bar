import { defineConfig } from 'vite'

// Relative base ('./') keeps asset paths working on GitHub Pages project sites
// (e.g. https://user.github.io/bam-bar/) without hardcoding the repo name.
// If you deploy to a custom domain root, you can change this to '/'.
export default defineConfig({
  base: './',
  server: {
    port: 5173,
    open: true,
  },
})
