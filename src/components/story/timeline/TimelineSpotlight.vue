<script setup>
defineProps({
  activeFrame: { type: Number, required: true },
  milestones: { type: Array, required: true }
})
</script>

<template>
  <div class="timeline__spotlight">
    <Transition
      name="reveal"
      mode="out-in"
    >
      <div
        :key="activeFrame"
        class="timeline__spotlight-inner"
      >
        <figure class="timeline__spotlight-photo">
          <div class="duotone">
            <img
              :src="milestones[activeFrame].img"
              :alt="milestones[activeFrame].year + ' · 拾光咖啡'"
            >
          </div>
          <figcaption class="typewriter">
            {{ milestones[activeFrame].year }} · 时光切片
          </figcaption>
        </figure>
        <div class="timeline__spotlight-text">
          <span class="timeline__spotlight-year">{{ milestones[activeFrame].year }}</span>
          <h3 class="timeline__spotlight-title">
            {{ milestones[activeFrame].frame }} · {{ milestones[activeFrame].text.slice(0, 14) }}...
          </h3>
          <p class="timeline__spotlight-body">
            {{ milestones[activeFrame].text }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.timeline__spotlight {
  max-width: 900px;
  margin: 0 auto 3rem;
  min-height: 360px;
}
.timeline__spotlight-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}
.timeline__spotlight-photo { margin: 0; }
.timeline__spotlight-photo .duotone {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--ink);
  border: 1px solid var(--rule);
}
.timeline__spotlight-photo .duotone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.2) contrast(1.05);
}
.timeline__spotlight-photo figcaption {
  margin-top: 0.6rem;
  font-size: 0.7rem;
  color: var(--warm);
  letter-spacing: 0.2em;
}
.timeline__spotlight-year {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  color: var(--warm);
  display: block;
  margin-bottom: 0.6rem;
}
.timeline__spotlight-title {
  font-family: var(--font-cjk);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--ink);
  margin: 0 0 1rem;
  line-height: 1.4;
}
.timeline__spotlight-body {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--ink-soft);
  margin: 0;
}

/* Transition reveal (切换 active frame 时的淡入淡出) */
.reveal-enter-active, .reveal-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-enter-from { opacity: 0; transform: translateY(12px); }
.reveal-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 900px) {
  .timeline__spotlight-inner { grid-template-columns: 1fr; gap: 1.5rem; }
  .timeline__spotlight-text { text-align: center; }
  .timeline__spotlight-photo { max-width: 280px; margin: 0 auto; }
}
</style>