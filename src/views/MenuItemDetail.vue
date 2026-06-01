<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menuItems } from '../data/index.js'

const route = useRoute()
const router = useRouter()

const menuItem = computed(() => {
  return menuItems.find(item => item.id === route.params.id)
})

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="menu-item-page" v-if="menuItem">
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        返回
      </button>
    </div>

    <div class="menu-item-content">
      <div class="menu-item-hero">
        <img :src="menuItem.image" :alt="menuItem.name" class="hero-image" />
      </div>

      <div class="menu-item-card">
        <div class="category-tag">{{ menuItem.category }}</div>
        <h1>{{ menuItem.name }}</h1>
        <p class="short-desc">{{ menuItem.shortDesc }}</p>

        <div class="price-row">
          <span class="price">{{ menuItem.price }}</span>
          <span class="unit">{{ menuItem.unit }}</span>
        </div>

        <div class="divider"></div>

        <div class="description">
          <h3>详情介绍</h3>
          <p>{{ menuItem.description }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <h1>菜单项未找到</h1>
    <button @click="goBack">返回菜单</button>
  </div>
</template>

<style scoped>
.menu-item-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #faf8f5 0%, #f5f0eb 100%);
}

.detail-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  padding: 16px 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #3d2b1f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.3s;
}

.back-btn:hover {
  background: #5c4033;
}

.back-btn svg {
  width: 20px;
  height: 20px;
}

.menu-item-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

.menu-item-hero {
  margin-bottom: 32px;
}

.hero-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.1);
}

.menu-item-card {
  background: white;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
}

.category-tag {
  display: inline-block;
  background: linear-gradient(135deg, #8b7355, #5c4033);
  color: white;
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.menu-item-card h1 {
  font-size: 2.2rem;
  font-weight: 300;
  color: #3d2b1f;
  margin-bottom: 16px;
}

.short-desc {
  font-size: 1.1rem;
  color: #6b5b4f;
  line-height: 1.7;
  margin-bottom: 24px;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 32px;
}

.price {
  font-size: 2.5rem;
  font-weight: 600;
  color: #8b7355;
}

.unit {
  font-size: 1rem;
  color: #8b7355;
}

.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #e0d6cc, transparent);
  margin: 32px 0;
}

.description h3 {
  font-size: 1.3rem;
  color: #3d2b1f;
  margin-bottom: 16px;
}

.description p {
  font-size: 1.05rem;
  color: #4a3f35;
  line-height: 1.9;
}

.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.not-found h1 {
  color: #3d2b1f;
  font-size: 2rem;
}

.not-found button {
  padding: 12px 24px;
  background: #3d2b1f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .menu-item-content {
    padding: 24px 16px 60px;
  }

  .hero-image {
    height: 250px;
    border-radius: 16px;
  }

  .menu-item-card {
    padding: 32px 24px;
  }

  .menu-item-card h1 {
    font-size: 1.8rem;
  }

  .price {
    font-size: 2rem;
  }
}
</style>