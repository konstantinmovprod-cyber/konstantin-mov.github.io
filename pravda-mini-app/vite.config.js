import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built app works whether it is served from a domain
// root or from a sub-path (e.g. GitHub Pages /pravda-mini-app/).
export default defineConfig({
  plugins: [react()],
  base: './',
})
