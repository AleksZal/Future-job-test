import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: ['frontend-production-5cfa.up.railway.app']
  },
  preview: {
    allowedHosts: ['frontend-production-5cfa.up.railway.app']
  }
})
