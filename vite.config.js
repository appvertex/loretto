import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // The custom domain serves the app from the site root. Absolute asset URLs
  // keep JavaScript and CSS loading after refreshing nested React routes.
  base: '/',
  plugins: [react()],
})
