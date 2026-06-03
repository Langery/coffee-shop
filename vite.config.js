import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/coffee-shop/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
