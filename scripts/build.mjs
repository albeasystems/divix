// Static prerender: vite client build + vite SSR build, then one HTML file per route.
import { build } from 'vite'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, 'dist')
const ssrOut = join(root, 'dist-ssr')

await rm(dist, { recursive: true, force: true })
await build({ root, logLevel: 'warn' })
await build({ root, logLevel: 'warn', build: { ssr: 'src/entry-server.jsx', outDir: ssrOut, emptyOutDir: true } })

const ssr = await import(pathToFileURL(join(ssrOut, 'entry-server.js')).href)
const { render, artifacts, routes, boards } = ssr
const template = await readFile(join(dist, 'index.html'), 'utf8')

// Preload the two latin font files that paint the first screen.
const assets = await readdir(join(dist, 'assets'))
const base = process.env.SITE_BASE || '/divix/'
const preload = ['doto-latin-full-normal', 'hanken-grotesk-latin-wght-normal']
  .map((n) => assets.find((a) => a.startsWith(n) && a.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" as="font" type="font/woff2" href="${base}assets/${f}" crossorigin />`)
  .join('\n    ')

const boardData = { en: await boards.en(), es: await boards.es() }

async function write(rel, body) {
  const file = join(dist, rel)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, body)
}

function page({ routeId, lang, withBoard, extraHead = '' }) {
  const { html, head } = render({ routeId, lang, board: boardData[lang] })
  const mdLink = routeId !== 'root' && artifacts.hasMarkdown(routeId) ? `<link rel="alternate" type="text/markdown" href="${routes.urlFor(routeId, lang)}index.md" />` : ''
  const hero = routeId === 'home' ? `<link rel="preload" as="image" href="${base}divix-happy-journey.webp" type="image/webp" fetchpriority="high" />` : ''
  const data = withBoard ? `<script id="board-data" type="application/json">${JSON.stringify(boardData[lang]).replace(/</g, '\\u003c')}</script>` : ''
  return template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace('<!--ssr-head-->', `${head}\n    ${mdLink}\n    ${preload}\n    ${hero}\n    ${extraHead}`)
    .replace('<div id="root"><!--ssr-body--></div>', `<div id="root" data-route="${routeId}" data-lang="${lang}">${html}</div>`)
    .replace('<!--ssr-data-->', data)
}

let count = 0
// Language-aware root: static language chooser plus a one-line redirect by browser language.
const rootRedirect = `<script>(function(){try{var l=(navigator.language||'en').slice(0,2)==='es'?'es':'en';if(!location.hash&&!/[?&]stay/.test(location.search))location.replace('${base}'+l+'/')}catch(e){}})()</script>`
await write('index.html', page({ routeId: 'root', lang: 'en', extraHead: rootRedirect })); count++

for (const r of routes.list) {
  for (const lang of routes.langs) {
    await write(r.path[lang] + 'index.html', page({ routeId: r.id, lang, withBoard: r.id === 'home' })); count++
    if (artifacts.hasMarkdown(r.id)) await write(r.path[lang] + 'index.md', artifacts.markdownFor(r.id, lang))
  }
}

// Old flat URLs that the shipped iOS app links to must keep working.
for (const [file, id] of [['privacy.html', 'privacy'], ['terms.html', 'terms'], ['support.html', 'support']]) {
  await write(file, artifacts.redirectHtml(routes.urlFor(id, 'en'), id))
}

// 404 for GitHub Pages: the chooser page, not indexable.
await write('404.html', page({ routeId: 'root', lang: 'en', extraHead: '<meta name="robots" content="noindex" />' }).replace(/<meta name="robots" content="index[^>]*>/, ''))

await write('sitemap.xml', artifacts.sitemapXml())
await write('robots.txt', artifacts.robotsTxt())
await write('llms.txt', artifacts.llmsTxt())
await write('llms-full.txt', artifacts.llmsFull())
await write('site.webmanifest', artifacts.manifestJson())
await write('.nojekyll', '')

await rm(ssrOut, { recursive: true, force: true })
console.log(`prerendered ${count} pages, live rates: en=${boardData.en.live} es=${boardData.es.live}`)
