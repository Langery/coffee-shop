<script setup>
import { ref, computed } from 'vue'
import { products, menuItems, aboutText, contactInfo, socialLinks, socialIcons, getProductById, hasProductId } from './data/index.js'
import ProductCard from './components/ProductCard.vue'
import DetailPage from './components/DetailPage.vue'
import SocialIcons from './components/SocialIcons.vue'

// State using ref
const currentPage = ref('home')

// Computed property using arrow function
const selectedProduct = computed(() => getProductById(currentPage.value))

// O(1) lookup using Map.has() instead of array.some()
const isDetailPage = computed(() => hasProductId(currentPage.value))

// Arrow functions for event handlers
const goToDetail = (id) => {
  currentPage.value = id
  window.scrollTo(0, 0)
}

const goHome = () => {
  currentPage.value = 'home'
  window.scrollTo(0, 0)
}

// Use destructuring and arrow function
const scrollTo = (id) => {
  const element = document.getElementById(id)
  element?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <!-- 详情页 -->
      <DetailPage
        v-if="isDetailPage && selectedProduct"
        v-bind="selectedProduct"
        price-label="售价"
        @back="goHome"
      />

      <!-- 首页 -->
      <div v-else key="home" class="page-home">
        <!-- Hero -->
        <header class="hero">
          <div class="hero-overlay" />
          <img src="./assets/hero.jpg" alt="拾光咖啡" class="hero-bg" />
          <div class="hero-content">
            <h1>拾光咖啡</h1>
            <p class="slogan">在一杯咖啡里，拾起慢下来的时光</p>
            <div class="hero-btns">
              <button class="hero-btn" @click="scrollTo('about')">关于我们</button>
              <button class="hero-btn hero-btn-outline" @click="scrollTo('menu')">精选菜单</button>
            </div>
          </div>
        </header>

        <!-- 导航 -->
        <nav class="nav">
          <a @click="scrollTo('about')">关于我们</a>
          <a @click="scrollTo('products')">主打产品</a>
          <a @click="scrollTo('menu')">菜单精选</a>
          <a @click="scrollTo('contact')">联系方式</a>
        </nav>

        <!-- 主内容 -->
        <main class="main">
          <!-- 关于我们 -->
          <section id="about" class="section">
            <h2 class="section-title">关于我们</h2>
            <div class="about-content">
              <p v-for="(text, index) in aboutText" :key="index">{{ text }}</p>
            </div>
          </section>

          <!-- 产品展示 -->
          <section id="products" class="section">
            <h2 class="section-title">主打产品 / 服务</h2>
            <div class="products">
              <ProductCard
                v-for="{ id, ...props } in products"
                :key="id"
                v-bind="props"
                @click="goToDetail(id)"
              />
            </div>
          </section>

          <!-- 菜单 -->
          <section id="menu" class="section">
            <h2 class="section-title">菜单精选</h2>
            <div class="menu">
              <div
                v-for="{ name, price } in menuItems"
                :key="name"
                class="menu-item"
              >
                <span class="name">{{ name }}</span>
                <span class="price">{{ price }}</span>
              </div>
            </div>
          </section>
        </main>

        <!-- 底部 -->
        <footer id="contact">
          <h2>联系方式</h2>
          <div class="contact-info">
            <p><strong>地址：</strong>{{ contactInfo.address }}</p>
            <p><strong>电话：</strong>{{ contactInfo.phone }}</p>
            <p><strong>微信：</strong>{{ contactInfo.wechat }}</p>
          </div>

          <div class="social">
            <SocialIcons
              v-for="{ name, icon } in socialLinks"
              :key="name"
              :name="name"
              :icon="socialIcons[icon]"
            />
          </div>

          <div class="hours">
            <p><strong>营业时间：</strong>{{ contactInfo.hours }}</p>
          </div>
        </footer>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hero {
  position: relative;
  height: 70vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 4rem;
  font-weight: 300;
  letter-spacing: 12px;
  margin-bottom: 16px;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
}

.slogan {
  font-size: 1.4rem;
  font-style: italic;
  opacity: 0.95;
  margin-bottom: 32px;
}

.hero-btns {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.hero-btn {
  padding: 14px 32px;
  background: rgba(255,255,255,0.15);
  border: 2px solid white;
  color: white;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(4px);
}

.hero-btn:hover {
  background: white;
  color: #3d2b1f;
}

.hero-btn-outline {
  background: transparent;
}

.nav {
  background: #3d2b1f;
  padding: 16px;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav a {
  color: white;
  text-decoration: none;
  margin: 0 20px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.3s;
}

.nav a:hover {
  opacity: 0.7;
}

.main {
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
  width: 100%;
}

.section {
  margin-bottom: 80px;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 40px;
  color: #5c4033;
}

.about-content {
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.about-content p {
  color: #4a3f35;
  line-height: 2;
  margin-bottom: 24px;
  font-size: 1.05rem;
}

.about-content p:last-child {
  margin-bottom: 0;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.menu {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px dashed #e0d6cc;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item .name {
  font-size: 1.15rem;
  color: #3d2b1f;
}

.menu-item .price {
  font-size: 1.15rem;
  color: #8b7355;
  font-weight: 600;
}

footer {
  background: linear-gradient(135deg, #3d2b1f 0%, #2a1f16 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
}

footer h2 {
  color: white;
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 30px;
}

.contact-info {
  font-size: 1.1rem;
  line-height: 2;
  margin-bottom: 30px;
}

.contact-info strong {
  font-weight: 500;
  color: #d4c4b0;
}

.social {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 30px;
}

.hours {
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.15);
  font-size: 0.95rem;
  color: rgba(255,255,255,0.8);
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
    letter-spacing: 6px;
  }

  .hero-content .slogan {
    font-size: 1.1rem;
  }

  .hero-btns {
    flex-direction: column;
    gap: 12px;
  }

  .about-content {
    padding: 32px 24px;
  }

  .products {
    grid-template-columns: 1fr;
  }

  .menu {
    padding: 24px;
  }
}
</style>