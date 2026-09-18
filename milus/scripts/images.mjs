// Re-runnable image pipeline. Reads ./assets-source, writes ./public/images
// and ./src/data/images.generated.json. Never upscales past native resolution.
//
//   npm run images
//
// Add a new photo: drop it in assets-source/ and re-run. Add a crop: extend
// the CROPS list below (regions are in source pixels).
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'assets-source'
const OUT = 'public/images'
const MANIFEST = 'src/data/images.generated.json'
const WIDTHS = [480, 800, 1200, 1600]
const QUALITY = 78

// Derived crops. `from` is a file in assets-source, region in source pixels.
// These exist so the same photo can serve several roles without resizing the
// original by hand. Tune here, re-run, refresh.
const CROPS = [
  // S'mores card, cut from the middle basket of the display case.
  { name: 'smores-card', from: 'display-case.jpg', left: 300, top: 400, width: 1120, height: 700 },
  // TODO(assets): brownbutter-flatlay.jpg not received. Temporary fallback:
  // the top-left basket of the display case.
  { name: 'brownbutter-fallback', from: 'display-case.jpg', left: 0, top: 270, width: 640, height: 430 },
  // TODO(assets): basket-hazelnut-blackout.jpg not received. Temporary
  // fallback: the hazelnut cookie top-right of the (low-res) four-flavours rack.
  { name: 'hazelnut-fallback', from: 'four-flavours-rack.jpg', left: 360, top: 70, width: 360, height: 310 },
  // TODO(assets): blackout-rack.jpg not received. Temporary fallback: the
  // Blackout cookie bottom-right of the (low-res) four-flavours rack photo.
  { name: 'blackout-fallback', from: 'four-flavours-rack.jpg', left: 330, top: 380, width: 390, height: 336 },
  // Four-flavours rack with the stray white line on the left trimmed off.
  { name: 'four-flavours-clean', from: 'four-flavours-rack.jpg', left: 70, top: 0, width: 650, height: 716 },
  // Favicon crop: the "Mi" with the yellow dot.
  { name: 'logo-mi', from: 'logo.jpg', left: 5, top: 250, width: 290, height: 290 },
]

const exists = async (p) => !!(await fs.stat(p).catch(() => null))

async function emit(name, pipelineFactory, nativeW, nativeH, extra = {}) {
  const widths = WIDTHS.filter((w) => w <= nativeW)
  if (widths.length === 0 || widths[widths.length - 1] < nativeW) widths.push(nativeW) // always ship native size
  const files = []
  for (const w of widths) {
    const file = `${name}-${w}.webp`
    const target = path.join(OUT, file)
    if (!(await exists(target))) {
      await pipelineFactory().resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(target)
    }
    files.push({ w, file })
  }
  const h = (w) => Math.round((nativeH * w) / nativeW)
  return {
    width: nativeW,
    height: nativeH,
    src: `/images/${files[files.length - 1].file}`,
    srcset: files.map((f) => `/images/${f.file} ${f.w}w`).join(', '),
    widths: files.map((f) => f.w),
    ...extra,
  }
}

async function main() {
  await fs.mkdir(OUT, { recursive: true })
  const manifest = {}
  const entries = (await fs.readdir(SRC, { withFileTypes: true }))
    .filter((e) => e.isFile() && /\.(jpe?g|png)$/i.test(e.name))
    .map((e) => e.name)
    .sort()

  for (const file of entries) {
    const name = file.replace(/\.[^.]+$/, '')
    const srcPath = path.join(SRC, file)
    const meta = await sharp(srcPath).metadata()
    manifest[name] = await emit(name, () => sharp(srcPath).rotate(), meta.width, meta.height, { source: file })
    console.log(`✓ ${file} (${meta.width}×${meta.height}) → ${manifest[name].widths.join('/')}w`)
  }

  for (const c of CROPS) {
    const srcPath = path.join(SRC, c.from)
    if (!(await exists(srcPath))) {
      console.log(`– skip crop ${c.name}: ${c.from} not in ${SRC}/`)
      continue
    }
    const region = { left: c.left, top: c.top, width: c.width, height: c.height }
    manifest[c.name] = await emit(c.name, () => sharp(srcPath).rotate().extract(region), c.width, c.height, {
      source: c.from,
      crop: region,
    })
    console.log(`✓ crop ${c.name} from ${c.from} (${c.width}×${c.height})`)
  }

  // Favicon, apple-touch-icon and OG image, all derived from logo.jpg.
  const logo = path.join(SRC, 'logo.jpg')
  if (await exists(logo)) {
    const mi = sharp(logo).extract({ left: 5, top: 250, width: 290, height: 290 })
    await mi.clone().resize(32, 32).png().toFile('public/favicon-32.png')
    await mi.clone().resize(180, 180).png().toFile('public/apple-touch-icon.png')
    await mi.clone().resize(512, 512).png().toFile('public/favicon-512.png')
    // Sample the orange from the logo background so the OG canvas matches.
    const data = await sharp(logo).extract({ left: 100, top: 100, width: 4, height: 4 }).raw().toBuffer()
    const bg = { r: data[0], g: data[1], b: data[2] }
    // Trim the darker border strip baked into the JPG before compositing.
    const inner = await sharp(logo).extract({ left: 30, top: 40, width: 730, height: 710 }).resize({ height: 540 }).toBuffer()
    await sharp({ create: { width: 1200, height: 630, channels: 3, background: bg } })
      .composite([{ input: inner, gravity: 'centre' }])
      .jpeg({ quality: 85 })
      .toFile('public/og-image.jpg')
    console.log(`✓ favicon / apple-touch-icon / og-image from logo.jpg (bg rgb ${bg.r},${bg.g},${bg.b})`)
  } else {
    console.log('– skip favicon/og: logo.jpg not found')
  }

  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`→ wrote ${MANIFEST} (${Object.keys(manifest).length} entries)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
