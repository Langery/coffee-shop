<script setup>
import { useIntersectionAnimation } from '@/composables/useIntersectionAnimation'

defineProps({
  stats: { type: Array, required: true }
})

const { el: statsRef, isVisible: statsVisible } = useIntersectionAnimation({ threshold: 0.3 })
</script>

<template>
  <section ref="statsRef" class="stats">
    <div class="stats__grid">
      <div
        v-for="(s, i) in stats"
        :key="i"
        class="stat"
        :class="{ visible: statsVisible }"
      >
        <span class="stat__no">F·{{ String(i + 4).padStart(2, '0') }}</span>
        <div class="stat__num">
          {{ s.num }}
        </div>
        <div class="stat__label">
          {{ s.label }}
        </div>
        <div class="stat__sub typewriter">
          {{ s.sub }}
        </div>
      </div>
    </div>
    <p class="stats__cap">
      A BAROMETER OF SLOW TIME · 时间刻度
    </p>
  </section>
</template>

<style scoped>
.stats {
  padding: 5rem 3rem;
  background: var(--paper-deep);
  text-align: center;
  border-bottom: 1px solid var(--rule);
  position: relative;
}
.stats::before {
  content: '';
  position: absolute;
  top: 14px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--ink);
  opacity: 0.3;
}
.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  max-width: 1200px;
  margin: 0 auto 2rem;
}
.stat {
  padding: 2rem 1rem;
  border-right: 1px solid var(--rule);
  position: relative;
}
.stat:last-child { border-right: none; }
.stat__no {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--warm);
  letter-spacing: 0.15em;
  font-weight: 600;
}
.stat__num {
  font-family: var(--font-serif);
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 700;
  color: var(--ink);
  line-height: 1;
  margin-bottom: 0.5rem;
  font-style: italic;
}
.stat__label {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  color: var(--ink);
  margin-bottom: 0.3rem;
  font-weight: 600;
}
.stat__sub {
  font-family: var(--font-type);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--warm);
  text-transform: uppercase;
}
.stat__num, .stat__label, .stat__sub {
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.5s, transform 0.5s;
}
.stat.visible .stat__num,
.stat.visible .stat__label,
.stat.visible .stat__sub {
  opacity: 1;
  transform: translateY(0);
}
.stats__cap {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--ink-soft);
}

@media (max-width: 1024px) {
  .stats { padding: 3rem 1rem; }
  .stats__grid { grid-template-columns: 1fr 1fr; }
  .stat { border-right: none; border-bottom: 1px solid var(--rule); }
}

@media (max-width: 640px) {
  .stats { padding: 2rem 1rem; }
  .stats__grid { grid-template-columns: 1fr; }
  .stat { border-bottom: none; border-right: none; }
  .stat:last-child { border-bottom: none; }
}
</style>