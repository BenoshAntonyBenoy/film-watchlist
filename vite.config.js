import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works under a GitHub Pages project URL
// (https://user.github.io/repo/) without hardcoding the repo name.
export default defineConfig({
  plugins: [react()],
  base: './',
})
