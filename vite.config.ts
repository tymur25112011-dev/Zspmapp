import { cpSync, copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function copyLegacyStaticFiles() {
  return {
    name: 'copy-legacy-static-files',
    apply: 'build' as const,
    closeBundle() {
      const root = process.cwd()
      const outDir = resolve(root, 'dist')
      mkdirSync(outDir, { recursive: true })

      // Preserve the existing multi-page app and its relative asset paths.
      for (const file of [
        'download.html',
        'nota-prawna.html',
        'polityka-prywatnosci.html',
        'polityka-bezpieczenstwa.html',
        'manifest.webmanifest',
        'service-worker.js',
      ]) {
        const source = resolve(root, file)
        if (existsSync(source)) {
          copyFileSync(source, resolve(outDir, file))
        }
      }

      // Vite flattens public/ into dist/. The current app also requests
      // assets through /public/..., so preserve that URL structure too.
      for (const directory of ['public', 'photos', 'install']) {
        const source = resolve(root, directory)
        if (existsSync(source)) {
          cpSync(source, resolve(outDir, directory), {
            recursive: true,
            force: true,
          })
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), copyLegacyStaticFiles()],
})
