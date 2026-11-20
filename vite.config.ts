import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { referencePlugin } from './scripts/reference-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), referencePlugin()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
