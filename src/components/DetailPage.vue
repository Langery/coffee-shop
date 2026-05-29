<script setup>
import { DescType } from '../data/index.js'

defineProps({
  id: String,
  name: String,
  shortDesc: String,
  image: String,
  tag: String,
  price: String,
  unit: String,
  description: Array,
  priceLabel: {
    type: String,
    default: '售价'
  }
})

defineEmits(['back'])

const getDescClass = (item) => {
  const classes = []
  if (item.type === DescType.INTRO) classes.push('intro')
  if (item.bold) classes.push('bold')
  return classes.join(' ')
}
</script>

<template>
  <div class="detail-page">
    <div class="detail-header">
      <button class="back-btn" @click="$emit('back')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        返回
      </button>
    </div>

    <div class="detail-content">
      <img :src="image" :alt="name" class="detail-hero" />

      <div class="detail-info">
        <h1>{{ name }}</h1>
        <span class="detail-tag">{{ tag }}</span>

        <div class="detail-desc">
          <template v-for="(item, index) in description" :key="index">
            <p v-if="item.type === DescType.INTRO" :class="getDescClass(item)">
              {{ item.text }}
            </p>
            <h3 v-else-if="item.type === DescType.SUBTITLE">
              {{ item.text }}
            </h3>
            <p v-else-if="item.type === DescType.TEXT" :class="getDescClass(item)">
              {{ item.text }}
            </p>
          </template>
        </div>

        <div class="detail-price">
          <span class="label">{{ priceLabel }}</span>
          <span class="price">{{ price }}</span>
          <span class="unit">{{ unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #faf8f5;
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

.detail-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

.detail-hero {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 40px;
}

.detail-info {
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.detail-info h1 {
  font-size: 2.5rem;
  font-weight: 300;
  color: #3d2b1f;
  margin-bottom: 12px;
}

.detail-tag {
  display: inline-block;
  background: linear-gradient(135deg, #8b7355, #5c4033);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-bottom: 32px;
}

.detail-desc {
  margin-bottom: 40px;
}

.detail-desc .intro {
  color: #4a3f35;
  line-height: 1.9;
  margin-bottom: 20px;
  font-size: 1.05rem;
}

.detail-desc p {
  color: #4a3f35;
  line-height: 1.9;
  margin-bottom: 20px;
  font-size: 1.05rem;
}

.detail-desc p.bold {
  font-weight: 500;
}

.detail-desc h3 {
  color: #3d2b1f;
  font-size: 1.3rem;
  margin: 32px 0 16px;
}

.detail-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding-top: 32px;
  border-top: 1px solid #e0d6cc;
}

.detail-price .label {
  color: #8b7355;
  font-size: 1rem;
}

.detail-price .price {
  font-size: 2.5rem;
  font-weight: 600;
  color: #3d2b1f;
}

.detail-price .unit {
  color: #8b7355;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .detail-hero {
    height: 250px;
  }

  .detail-info {
    padding: 32px 24px;
  }

  .detail-info h1 {
    font-size: 2rem;
  }
}
</style>