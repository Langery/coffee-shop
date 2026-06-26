<script setup>
import { recommendedMenuIds } from '../../../data/index.js'
import { categoryLabel, isLimited } from '@/utils/menuHelpers'

const props = defineProps({
  items: { type: Array, required: true }
})

const emit = defineEmits(['goToMenuItem'])

const isRecommended = (id) => recommendedMenuIds.includes(id)

function open (id) { emit('goToMenuItem', id) }
</script>

<template>
  <div
    :key="items.length + '-' + items[0]?.id"
    class="menu__grid"
  >
    <article
      v-for="(item, i) in items"
      :key="item.id"
      class="menu-card"
      :class="{ 'menu-card--recommended': isRecommended(item.id), 'menu-card--limited': isLimited(item) }"
      :style="{ animationDelay: (i * 0.04) + 's' }"
      @click="open(item.id)"
    >
      <div class="menu-card__img">
        <div class="duotone">
          <img
            :src="item.image"
            :alt="item.name"
            loading="lazy"
          >
        </div>
        <span
          v-if="isLimited(item)"
          class="menu-card__ribbon menu-card__ribbon--limited"
        >季节限定</span>
        <span
          v-else-if="isRecommended(item.id)"
          class="menu-card__ribbon menu-card__ribbon--rec"
        >招牌</span>
      </div>
      <div class="menu-card__body">
        <div class="menu-card__cat">
          {{ categoryLabel(item.category) }}
        </div>
        <h4>{{ item.name }}</h4>
        <p class="menu-card__desc">
          {{ item.shortDesc }}
        </p>
        <div class="menu-card__footer">
          <span class="menu-card__price">{{ item.price }}</span>
          <span class="menu-card__unit">{{ item.unit }}</span>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.menu__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
@keyframes cardFade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.menu-card {
  background: var(--paper-light);
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
  border: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  position: relative;
  animation: cardFade 0.4s ease-out;
  animation-fill-mode: backwards;
  box-shadow: 0 1px 3px rgba(31, 26, 21, 0.05);
}
.menu-card:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(31, 26, 21, 0.08); }
.menu-card:hover .menu-card__img img { transform: scale(1.06); }
.menu-card__img img { transition: transform 0.5s ease; }
.menu-card__ribbon {
  position: absolute;
  top: 10px;
  left: -2px;
  padding: 0.25rem 0.7rem;
  font-family: var(--font-cjk);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--paper);
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}
.menu-card__ribbon::after {
  content: '';
  position: absolute;
  right: -8px;
  top: 0;
  border-top: 13px solid transparent;
  border-bottom: 13px solid transparent;
  border-left: 8px solid currentColor;
}
.menu-card__ribbon--limited {
  background: var(--warm);
  color: var(--paper);
}
.menu-card__ribbon--rec {
  background: var(--ink);
  color: var(--paper);
}
.menu-card__ribbon--rec::after { border-left-color: var(--ink); }
.menu-card__img {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: var(--paper-deep);
}
.menu-card__body {
  padding: 1.1rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.menu-card__cat {
  font-family: var(--font-cjk);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
  margin-bottom: 0.35rem;
  font-weight: 400;
  border-bottom: 1px solid var(--rule);
  padding-bottom: 0.4rem;
  display: inline-block;
  align-self: flex-start;
  padding-right: 1.5rem;
}
.menu-card h4 {
  font-family: var(--font-cjk);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
}
.menu-card__desc {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.menu-card__footer {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  padding-top: 0.8rem;
  border-top: 1px dashed var(--rule);
}
.menu-card__price {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--ink);
  font-style: italic;
}
.menu-card__unit { font-size: 0.8rem; color: var(--ink-soft); }

@media (max-width: 1024px) {
  .menu__grid { padding: 0 1rem; }
}
</style>