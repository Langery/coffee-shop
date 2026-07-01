<script setup>
import HeroPolaroid from './HeroPolaroid.vue'

defineProps({
  polaroids: { type: Array, required: true },
  flashId: { type: [Number, String, null], default: null }
})

const emit = defineEmits(['flash'])

function trigger (i) { emit('flash', i) }
</script>

<template>
  <div class="hero__collage">
    <HeroPolaroid
      v-for="p in polaroids"
      :key="p.index"
      v-bind="p"
      :flashing="flashId === p.index"
      @flash="trigger"
    />
    <div class="hero__rollcap">
      <span class="typewriter">F · 01 — 03</span>
      <span class="hero__rollcap-sub">本期封面 · 三帧</span>
    </div>
  </div>
</template>

<style scoped>
.hero__collage {
  position: relative;
  height: 620px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
  padding: 1rem;
}
.hero__rollcap {
  position: absolute;
  top: -0.5rem;
  right: 0;
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.hero__rollcap span:first-child {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  color: var(--warm);
  font-weight: 600;
}
.hero__rollcap-sub {
  font-family: var(--font-cjk);
  font-size: 0.8rem;
  color: var(--ink-soft);
  font-style: italic;
}

@media (max-width: 1024px) {
  .hero__collage { height: 500px; }
}
@media (max-width: 640px) {
  .hero__collage {
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0.5rem;
  }
  .hero__rollcap { display: none; }
}
</style>