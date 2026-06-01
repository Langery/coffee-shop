import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ghPages from 'gh-pages'

export default defineConfig({
  plugins: [vue()],
  base: '/coffee-shop/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

const deploy = async () => {
  await ghPages.publish('dist', {
    branch: 'gh-pages',
    repo: 'https://github.com/Langery/coffee-shop.git'
  })
  console.log('Deployed to GitHub Pages!')
}

export { deploy }