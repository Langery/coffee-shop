<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  aboutText: { type: Array, required: true }
})

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
  <section id="about" ref="sectionRef" class="editorial" :class="{ visible: isVisible }">
    <div class="editorial__head">
      <span class="stamp">EDITOR'S NOTE</span>
      <h2 class="editorial__title">
        让一杯咖啡<br>成为一段<br>可读的时光
      </h2>
      <p class="editorial__caption">
        — 主理人手记 · 06
      </p>
    </div>
    <div class="editorial__body">
      <p class="editorial__lead">
        <span class="dropcap">{{ aboutText[0][0] }}</span>
        <span>{{ aboutText[0].slice(1) }}</span>
      </p>
      <div class="editorial__cols">
        <p v-for="(t, i) in aboutText.slice(1)" :key="i">
          {{ t }}
        </p>
      </div>
      <p class="editorial__sig">
        <span class="typewriter">— 主编 · 苏先生</span>
        <span class="editorial__sig-date">2026 · SUMMER ISSUE</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.editorial {
  padding: 7rem 3rem;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
}
.editorial__head {
  position: sticky;
  top: 8rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.editorial__body {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
}
.editorial.visible .editorial__head,
.editorial.visible .editorial__body {
  opacity: 1;
  transform: translateX(0);
}
.editorial__title {
  font-family: var(--font-cjk);
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--ink);
  margin: 1.5rem 0 1rem;
  letter-spacing: 0.02em;
}
.editorial__caption {
  font-family: var(--font-type);
  font-size: 0.85rem;
  color: var(--warm);
  letter-spacing: 0.1em;
}
.editorial__lead {
  font-family: var(--font-cjk);
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--ink);
  margin-bottom: 2rem;
}
.dropcap {
  font-family: var(--font-serif);
  font-size: 4.5rem;
  font-weight: 800;
  float: left;
  line-height: 0.85;
  margin: 0.3rem 0.5rem 0 0;
  color: var(--warm);
  font-style: italic;
}
.editorial__cols {
  columns: 2;
  column-gap: 3rem;
  font-size: 1rem;
  line-height: 1.9;
  color: var(--ink-soft);
  margin-bottom: 2.5rem;
}
.editorial__cols p { margin-bottom: 1rem; break-inside: avoid; }
.editorial__sig {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-family: var(--font-cjk);
  font-style: italic;
  color: var(--ink-soft);
  padding-top: 1.5rem;
  border-top: 1px dashed var(--rule);
}
.editorial__sig-date {
  font-family: var(--font-type);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  font-style: normal;
  color: var(--warm);
}

@media (max-width: 1024px) {
  .editorial { grid-template-columns: 1fr; gap: 2rem; padding: 4rem 2rem; }
  .editorial__head { position: static; }
}

@media (max-width: 640px) {
  .editorial { padding: 2rem 1rem; }
  .editorial__cols { columns: 1; }
  .editorial__lead { font-size: 1.2rem; }
}
</style>