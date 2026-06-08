<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  recommended: { type: Array, required: true }
})

const emit = defineEmits(['goToMenuItem'])
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
  <section ref="sectionRef" class="recs" :class="{ visible: isVisible }">
    <header class="section-head section-head--center">
      <span class="stamp">EDITOR'S PICKS</span>
      <h2>今夏<br>我们最想推荐</h2>
    </header>
    <div class="recs__grid">
      <article
        v-for="(r, i) in recommended"
        :key="r.id"
        class="rec tilt-c"
        @click="emit('goToMenuItem', r.id)"
      >
        <span class="rec__rank">{{ String(i + 1).padStart(2, '0') }}</span>
        <div class="rec__img">
          <div class="duotone">
            <img :src="r.image" :alt="r.name" />
          </div>
        </div>
        <div class="rec__info">
          <h4>{{ r.name }}</h4>
          <p>{{ r.shortDesc }}</p>
          <div class="rec__price">
            {{ r.price }} <span>{{ r.unit }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.recs {
  padding: 6rem 3rem;
  background: var(--paper-light);
  color: var(--ink);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.recs .stamp { color: var(--warm); border-color: var(--warm); }

.recs__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  max-width: 1300px;
  margin: 0 auto;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.recs.visible .recs__grid {
  opacity: 1;
  transform: translateY(0);
}
.rec {
  padding: 2.5rem 1.5rem;
  cursor: pointer;
  border-right: 1px solid var(--rule);
  transition: background 0.3s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rec:last-child { border-right: none; }
.rec:hover { background: var(--paper-deep); }
.rec__rank {
  font-family: var(--font-serif);
  font-size: 3rem;
  color: var(--warm);
  line-height: 1;
  font-style: italic;
  font-weight: 700;
}
.rec__img {
  aspect-ratio: 1/1;
  overflow: hidden;
  background: var(--paper-deep);
}
.rec__info h4 {
  font-family: var(--font-cjk);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--ink);
}
.rec__info p {
  font-size: 0.85rem;
  color: var(--ink-soft);
  line-height: 1.5;
  margin-bottom: 0.8rem;
}
.rec__price {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--ink);
  font-style: italic;
  font-weight: 700;
}
.rec__price span { font-size: 0.8rem; color: var(--ink-soft); font-style: normal; }

@media (max-width: 1024px) {
  .recs { padding: 3rem 1rem; }
  .recs__grid { grid-template-columns: 1fr 1fr; }
  .rec { border-right: none; border-bottom: 1px solid var(--rule); }
}

@media (max-width: 640px) {
  .recs { padding: 2rem 1rem; }
  .recs__grid { grid-template-columns: 1fr; }
  .rec { border-right: none; border-bottom: 1px solid var(--rule); }
  .rec:last-child { border-bottom: none; }
}
</style>