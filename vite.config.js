import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/coffee-shop/',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2020',
    chunkSizeWarningLimit: 500
  },
  server: {
    port: 5173,
    open: false
  }
})