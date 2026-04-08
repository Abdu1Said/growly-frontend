// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Railway passes the port as PORT
const port = Number(process.env.PORT) || 5173

export default defineConfig({
  plugins: [react()],

  // Local dev (doesn't affect deploy)
  server: {
    host: true,
    port: 5173,
  },

  // Production (vite preview) used by Railway
  preview: {
    host: true,
    port,              // use Railway's PORT
    strictPort: true,  // fail if the port is taken
    allowedHosts: [
      'growly-frontend-production.up.railway.app', // your exact host
      /\.up\.railway\.app$/,                        // (optional) any Railway subdomain
    ],
    headers: {
      'Cache-Control': 'no-store',
    },
  },
})
