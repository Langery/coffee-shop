<script setup>
import { useIntersectionAnimation } from '@/composables/useIntersectionAnimation'

defineProps({
  baristas: { type: Array, required: true }
})

const emit = defineEmits(['goToBaristas'])
const { el: sectionRef, isVisible } = useIntersectionAnimation({ threshold: 0.2 })
</script>

<template>
  <section ref="sectionRef" class="baristas-row" :class="{ visible: isVisible }">
    <header class="section-head">
      <div>
        <span class="eyebrow eyebrow--accent">CRAFTSPEOPLE · F·22–25</span>
        <h2>四双手<br>的专注</h2>
      </div>
      <p class="section-head__caption">
        每位咖啡师都来自产区深耕 · 见面认识一下 →
      </p>
    </header>
    <div class="baristas-row__grid">
      <article
        v-for="(b, i) in baristas"
        :key="b.id"
        class="bcard tilt-c"
        @click="emit('goToBaristas', 'baristas')"
      >
        <div class="bcard__avatar">
          <div class="bcard__initials">
            {{ b.initials }}
          </div>
          <span class="bcard__no">F·{{ String(22 + i).padStart(2, '0') }}</span>
        </div>
        <h4>{{ b.name }}</h4>
        <p class="bcard__role">
          {{ b.role }}
        </p>
        <p class="bcard__quote">
          "{{ b.quote }}"
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.baristas-row {
  padding: 6rem 3rem;
  max-width: 1300px;
  margin: 0 auto;
}
.baristas-row__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.bcard {
  padding: 1.8rem 1.2rem;
  text-align: center;
  cursor: pointer;
  border: 1px solid var(--rule);
  background: var(--paper-light);
  box-shadow: 0 3px 8px rgba(31, 26, 21, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.25s, box-shadow 0.25s;
}
.baristas-row.visible .bcard {
  opacity: 1;
  transform: translateY(0);
}
.baristas-row.visible .bcard:nth-child(1) { transition-delay: 0.1s; }
.baristas-row.visible .bcard:nth-child(2) { transition-delay: 0.2s; }
.baristas-row.visible .bcard:nth-child(3) { transition-delay: 0.3s; }
.baristas-row.visible .bcard:nth-child(4) { transition-delay: 0.4s; }
.bcard:hover {
  border-color: var(--ink);
  transform: translateY(-4px) rotate(-1deg);
  box-shadow: 0 8px 16px rgba(31, 26, 21, 0.2);
}
.bcard__avatar {
  position: relative;
  width: 84px;
  height: 84px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--warm);
}
.bcard__initials {
  font-family: var(--font-cjk);
  font-size: 2rem;
  color: var(--paper);
  font-weight: 700;
}
.bcard__no {
  position: absolute;
  bottom: -3px;
  right: -3px;
  background: var(--warm);
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  padding: 0.15rem 0.4rem;
  font-weight: 600;
}
.bcard h4 {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  letter-spacing: 0.05em;
}
.bcard__role {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: var(--warm);
  text-transform: uppercase;
  margin-bottom: 0.8rem;
  font-weight: 600;
}
.bcard__quote {
  font-family: var(--font-cjk);
  font-style: italic;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--ink-soft);
}

@media (max-width: 1024px) {
  .baristas-row__grid { grid-template-columns: 1fr 1fr; }
  .section-head, .baristas-row { padding-left: 1rem; padding-right: 1rem; }
}
@media (max-width: 640px) {
  .baristas-row__grid { grid-template-columns: 1fr; }
}
</style>