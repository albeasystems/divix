import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static site for GitHub Pages at /divix/. Pages are prerendered by scripts/build.mjs.
export default defineConfig({
  base: process.env.SITE_BASE || '/divix/',
  plugins: [react(), tailwindcss()],
  build: { assetsInlineLimit: 0 },
})
