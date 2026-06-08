<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  products: { type: Array, required: true }
})

const emit = defineEmits(['goToProduct'])
const sectionRef = ref(null)
const isVisible = ref(false)
let observer = null
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (prefersReducedMotion) {
    isVisible.value = true
    return
  }
  observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) isVisible.value = true })
  }, { threshold: 0.2 })
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <section id="products" ref="sectionRef" class="products" :class="{ visible: isVisible }">
    <header class="section-head">
      <div>
        <span class="eyebrow eyebrow--accent">SHOWCASE · F·09–11</span>
        <h2>三款招牌<br>不容错过</h2>
      </div>
      <p class="section-head__caption">
        从产地到杯中，每一支都经咖啡总监手工挑选
      </p>
    </header>
    <div class="products__grid">
      <article
        v-for="(p, i) in products"
        :key="p.id"
        :class="['product', `product--${i}`, 'tilt-c']"
        @click="emit('goToProduct', p.id)"
      >
        <div class="product__frame">
          <div class="duotone">
            <img :src="p.image" :alt="p.name" />
          </div>
          <span class="product__no">F·{{ String(9 + i).padStart(2, '0') }}</span>
          <span class="product__tag">{{ p.tag }}</span>
        </div>
        <div class="product__info">
          <h3>{{ p.name }}</h3>
          <p class="product__desc">
            {{ p.shortDesc }}
          </p>
          <div class="product__footer">
            <span class="product__price">{{ p.price }}<span class="unit">{{ p.unit }}</span></span>
            <span class="product__more typewriter">READ →</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.products {
  padding: 6rem 3rem;
  background: var(--paper-light);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.products__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1080px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.products.visible .products__grid {
  opacity: 1;
  transform: translateY(0);
}
.product {
  background: var(--paper-light);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--rule);
  box-shadow: var(--shadow-sm);
}
.product:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.product__frame {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--ink);
}
.product__no {
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  background: var(--warm);
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  padding: 0.3rem 0.6rem;
  z-index: 2;
  font-weight: 600;
}
.product__tag {
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-type);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--ink);
}
.product__info {
  padding: 1.5rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.product__info h3 {
  font-family: var(--font-cjk);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  letter-spacing: 0.02em;
  line-height: 1.3;
}
.product__desc {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--ink-soft);
  margin-bottom: 1.5rem;
  flex: 1;
}
.product__footer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 1.2rem;
  border-top: 1px dashed var(--rule);
  margin-top: auto;
}
.product__price {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--ink);
  font-style: italic;
}
.product__price .unit { font-size: 0.85rem; color: var(--ink-soft); font-style: normal; }
.product__more {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--warm);
  font-weight: 600;
}

@media (max-width: 1024px) {
  .products { padding: 3rem 1.5rem; }
  .products__grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .product__info { padding: 1.2rem 1.5rem 1.5rem; }
}

@media (max-width: 768px) {
  .products__grid { grid-template-columns: 1fr 1fr; gap: 1rem; }
  .product__info h3 { font-size: 1.3rem; }
}

@media (max-width: 640px) {
  .products { padding: 2rem 1rem; }
  .products__grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .section-head { padding: 0; flex-direction: column; align-items: flex-start; }
}
</style>