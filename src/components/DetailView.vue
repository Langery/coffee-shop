<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, menuItems } from '@/data/index.js'

const props = defineProps({
  type: { type: String, required: true } // 'product' | 'menu-item'
})

const emit = defineEmits(['goToProduct', 'goToMenuItem'])

const route = useRoute()
const router = useRouter()

const imageError = ref(false)

// 获取当前项
const currentItem = computed(() => {
  if (props.type === 'product') {
    return products.find(p => p.id === route.params.id)
  }
  return menuItems.find(m => m.id === route.params.id)
})

const handleImageError = () => { imageError.value = true }

// 获取相关推荐
const relatedItems = computed(() => {
  if (!currentItem.value) return []
  const sameCat = (props.type === 'product' ? products : menuItems)
    .filter(item => item.category === currentItem.value.category && item.id !== currentItem.value.id)
  const others = (props.type === 'product' ? products : menuItems)
    .filter(item => item.id !== currentItem.value.id && item.category !== currentItem.value.category)
  return [...sameCat.slice(0, 2), ...others.slice(0, 1)].slice(0, 3)
})

const goBack = () => router.push('/')

const goToDetail = (id) => {
  if (props.type === 'product') {
    router.push(`/product/${id}`)
  } else {
    router.push(`/menu/${id}`)
  }
}
</script>

<template>
  <div
    v-if="currentItem"
    :class="type === 'product' ? 'detail-page' : 'menu-item-page'"
  >
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        返回
      </button>
    </div>

    <div :class="type === 'product' ? 'detail-content' : 'menu-item-content'">
      <div :class="type === 'product' ? 'detail-hero-wrap' : 'menu-item-hero'">
        <div :class="type === 'product' ? 'duotone detail-hero__duotone' : 'duotone menu-item-hero__duotone'">
          <img
            v-if="!imageError"
            :src="currentItem.image"
            :alt="currentItem.name"
            :class="type === 'product' ? 'detail-hero' : 'hero-image'"
            @error="handleImageError"
          />
          <div v-else class="image-error-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span>图片加载失败</span>
          </div>
        </div>
        <span class="typewriter" :class="type === 'product' ? 'detail-hero__film-num' : 'menu-item-hero__film-num'">FRAME · 24A</span>
        <span :class="type === 'product' ? 'detail-hero__stamp' : 'menu-item-hero__stamp'">FEATURED</span>
      </div>

      <div :class="type === 'product' ? 'detail-info' : 'menu-item-card'">
        <div v-if="type === 'product'" class="detail-tag">
          {{ currentItem.tag }}
        </div>
        <div v-else class="category-tag">
          {{ currentItem.category }}
        </div>

        <h1>{{ currentItem.name }}</h1>
        <p class="short-desc">
          {{ currentItem.shortDesc }}
        </p>

        <div class="price-row">
          <span class="price">{{ currentItem.price }}</span>
          <span class="unit">{{ currentItem.unit }}</span>
        </div>

        <div class="divider" />

        <div class="description">
          <h3>详情介绍</h3>
          <p>{{ currentItem.description }}</p>
        </div>

        <!-- 菜单品鉴信息 -->
        <div v-if="type === 'menu-item' && (currentItem.tasting || currentItem.origin || currentItem.brew || currentItem.pairing)" class="tasting-info">
          <h3>品鉴信息</h3>
          <div class="tasting-grid">
            <div v-if="currentItem.tasting" class="tasting-cell">
              <span class="tasting-cell__label">风味层次</span>
              <div class="tasting-cell__tags">
                <span v-for="t in currentItem.tasting" :key="t" class="tasting-tag">{{ t }}</span>
              </div>
            </div>
            <div v-if="currentItem.origin" class="tasting-cell">
              <span class="tasting-cell__label">产地 / 拼配</span>
              <span class="tasting-cell__value">{{ currentItem.origin }}</span>
            </div>
            <div v-if="currentItem.brew" class="tasting-cell">
              <span class="tasting-cell__label">冲泡参数</span>
              <span class="tasting-cell__value">{{ currentItem.brew }}</span>
            </div>
            <div v-if="currentItem.pairing" class="tasting-cell">
              <span class="tasting-cell__label">推荐搭配</span>
              <span class="tasting-cell__value">{{ currentItem.pairing }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 相关推荐 -->
      <div v-if="relatedItems.length" class="related">
        <div class="related__head">
          <span class="eyebrow eyebrow--accent">RELATED · F·25–27</span>
          <h3 class="related__title">
            相关推荐
          </h3>
        </div>
        <div class="related__grid">
          <article v-for="rm in relatedItems" :key="rm.id" class="related-card" @click="goToDetail(rm.id)">
            <div class="duotone related-card__img">
              <img :src="rm.image" :alt="rm.name" @error="$event.target.style.display='none'" />
            </div>
            <h4>{{ rm.name }}</h4>
            <p class="related-card__desc">
              {{ rm.shortDesc }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="detail-empty">
    <div class="detail-empty__inner">
      <span class="datestamp">FRAME · ??</span>
      <h2>未找到相关内容</h2>
      <p>抱歉，您访问的内容可能已被移除或不存在。</p>
      <button class="btn-primary" @click="goBack">
        返回首页
      </button>
    </div>
  </div>
</template>

<style scoped>
.detail-header {
  padding: 1.5rem 3rem;
  border-bottom: 1px solid var(--rule);
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid var(--rule);
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: var(--font-cjk);
  font-size: 0.9rem;
  transition: all 0.2s;
}
.back-btn:hover { background: var(--paper-deep); }
.back-btn svg { width: 18px; height: 18px; }

.detail-page, .menu-item-page { background: var(--paper); }
.detail-empty {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--paper);
}
.detail-empty__inner {
  text-align: center;
  padding: 3rem;
}
.detail-empty__inner .datestamp { color: var(--warm); border-color: var(--warm); margin-bottom: 1.5rem; }
.detail-empty__inner h2 {
  font-family: var(--font-cjk);
  font-size: 2rem;
  color: var(--ink);
  margin-bottom: 1rem;
}
.detail-empty__inner p {
  color: var(--ink-soft);
  margin-bottom: 2rem;
}
.detail-content, .menu-item-content { max-width: 1200px; margin: 0 auto; padding: 3rem; }

.detail-hero-wrap, .menu-item-hero {
  position: relative;
  max-width: 700px;
  margin: 0 auto 3rem;
}
.detail-hero, .hero-image {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
}
.detail-hero__duotone, .menu-item-hero__duotone { overflow: hidden; background: var(--ink); }
.image-error-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 16/10;
  background: var(--paper-deep);
  color: var(--ink-soft);
  gap: 1rem;
}
.image-error-placeholder svg {
  width: 48px;
  height: 48px;
  opacity: 0.4;
}
.image-error-placeholder span {
  font-family: var(--font-mono);
  font-size: 0.8rem;
}
.detail-hero__film-num, .menu-item-hero__film-num {
  position: absolute;
  bottom: 0.8rem;
  left: 0.8rem;
  background: var(--warm);
  color: var(--paper);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  padding: 0.2rem 0.5rem;
}
.detail-hero__stamp, .menu-item-hero__stamp {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--ink);
}

.detail-info, .menu-item-card { max-width: 700px; margin: 0 auto; }
.detail-info h1, .menu-item-card h1 {
  font-family: var(--font-cjk);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.detail-tag, .category-tag {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--warm);
  border: 1px solid var(--warm);
  padding: 0.2rem 0.6rem;
  margin-bottom: 1rem;
}
.short-desc {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  color: var(--ink-soft);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}
.price-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.price {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--ink);
  font-style: italic;
}
.unit { font-size: 0.9rem; color: var(--ink-soft); }
.divider {
  height: 1px;
  background: var(--rule);
  margin: 2rem 0;
}
.description h3 {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.description p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--ink-soft);
}

.tasting-info {
  margin-top: 2.5rem;
  padding: 1.8rem;
  background: var(--paper-deep);
  border: 1px solid var(--rule);
  border-left: 3px solid var(--warm);
}
.tasting-info h3 {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: var(--ink);
}
.tasting-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem 1.5rem;
}
.tasting-cell {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.tasting-cell__label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--warm);
  text-transform: uppercase;
  font-weight: 600;
}
.tasting-cell__value {
  font-family: var(--font-cjk);
  font-size: 0.95rem;
  color: var(--ink);
  line-height: 1.5;
}
.tasting-cell__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.tasting-tag {
  display: inline-block;
  padding: 0.25rem 0.7rem;
  font-family: var(--font-cjk);
  font-size: 0.78rem;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 999px;
}

.related { margin-top: 4rem; padding-top: 3rem; border-top: 1px solid var(--rule); }
.related__head { margin-bottom: 2rem; }
.related__title {
  font-family: var(--font-cjk);
  font-size: 1.8rem;
  font-weight: 700;
}
.related__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.related-card {
  cursor: pointer;
  border: 1px solid var(--rule);
  transition: all 0.3s;
}
.related-card:hover { transform: translateY(-4px); box-shadow: 0 8px 16px rgba(31, 26, 21, 0.1); }
.related-card__img { aspect-ratio: 4/3; overflow: hidden; background: var(--ink); }
.related-card__img img { width: 100%; height: 100%; object-fit: cover; }
.related-card h4 {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 1rem 0.5rem;
}
.related-card__desc {
  font-size: 0.85rem;
  color: var(--ink-soft);
  padding: 0 1rem 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .detail-content, .menu-item-content { padding: 2rem 1rem; }
  .related__grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .tasting-grid { grid-template-columns: 1fr; }
}
</style>