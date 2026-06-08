<script setup>
import { ref } from 'vue'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  className: { type: String, default: '' }
})

const hasError = ref(false)

const handleError = () => {
  hasError.value = true
}
</script>

<template>
  <img
    v-if="!hasError"
    :src="src"
    :alt="alt"
    :class="className"
    loading="lazy"
    @error="handleError"
  />
  <div v-else :class="['img-error', className]" :alt="alt">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
    <span>图片加载失败</span>
  </div>
</template>

<style scoped>
.img-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--paper-deep);
  color: var(--ink-soft);
  gap: 0.5rem;
  aspect-ratio: 4/3;
}
.img-error svg {
  width: 32px;
  height: 32px;
  opacity: 0.5;
}
.img-error span {
  font-size: 0.75rem;
  font-family: var(--font-mono);
}
</style>