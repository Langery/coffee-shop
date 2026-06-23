<script setup>
import { useBackToTop } from '@/composables/useBackToTop'

const { visible, scrollToTop } = useBackToTop()
</script>

<template>
  <button
    class="back-to-top"
    :class="{ visible }"
    aria-label="回到顶部"
    @click="scrollToTop"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
    <span class="typewriter">TOP</span>
  </button>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1.5px solid var(--ink);
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.18em;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px) scale(0.85);
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 12px rgba(31, 26, 21, 0.12);
}
.back-to-top svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
}
.back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}
.back-to-top:hover {
  background: var(--warm);
  color: var(--paper);
  border-color: var(--warm);
  box-shadow: 0 6px 20px rgba(200, 85, 61, 0.35);
  transform: translateY(-3px) scale(1.05);
}
.back-to-top:focus-visible {
  outline: 2px solid var(--warm);
  outline-offset: 3px;
}
</style>