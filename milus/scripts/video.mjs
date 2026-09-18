// Re-runnable video pipeline. Re-encodes assets-source/display-case-pan.mp4
// to a small MP4 + WebM (muted, 720p max) plus a poster frame in
// public/video/, and writes src/data/video.generated.json.
//
//   npm run video            (needs ffmpeg on PATH)
import fs from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import sharp from 'sharp'

const SRC = 'assets-source/display-case-pan.mp4'
const OUT = 'public/video'
const MANIFEST = 'src/data/video.generated.json'

const exists = async (p) => !!(await fs.stat(p).catch(() => null))
const run = (args) => spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' })

async function main() {
  const manifest = { available: false, source: SRC }
  if (!(await exists(SRC))) {
    console.log(`– ${SRC} not found. TODO(assets): drop the video in assets-source/ and re-run.`)
    return finish(manifest)
  }
  if (spawnSync('ffmpeg', ['-version']).status !== 0) {
    console.log('– ffmpeg not on PATH; install it and re-run `npm run video`.')
    return finish(manifest)
  }
  await fs.mkdir(OUT, { recursive: true })
  const scale = 'scale=min(1280\\,iw):-2' // never upscale past native
  run(['-i', SRC, '-an', '-vf', scale, '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${OUT}/display-case-pan.mp4`])
  run(['-i', SRC, '-an', '-vf', scale, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1', `${OUT}/display-case-pan.webm`])
  run(['-ss', '1', '-i', SRC, '-frames:v', '1', '-vf', scale, `${OUT}/poster.png`])
  const poster = await sharp(`${OUT}/poster.png`).webp({ quality: 80 }).toFile(`${OUT}/poster.webp`)
  await fs.rm(`${OUT}/poster.png`)
  Object.assign(manifest, {
    available: true,
    mp4: '/video/display-case-pan.mp4',
    webm: '/video/display-case-pan.webm',
    poster: '/video/poster.webp',
    width: poster.width,
    height: poster.height,
  })
  console.log('✓ video encoded')
  return finish(manifest)
}

async function finish(manifest) {
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`→ wrote ${MANIFEST}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
