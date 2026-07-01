<script setup>
defineProps({
  visible: { type: Boolean, required: true }
})
</script>

<template>
  <div :class="['scroll-cue', visible ? 'show' : 'gone']">
    <span class="typewriter">SCROLL ↓</span>
  </div>
</template>

<style scoped>
.scroll-cue {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.5s;
  font-family: var(--font-type);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--ink-soft);
  animation: pulse 2s ease-in-out infinite;
}
.scroll-cue.gone { opacity: 0; pointer-events: none; }
@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
</style>