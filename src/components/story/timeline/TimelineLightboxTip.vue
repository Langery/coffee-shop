<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const STORAGE_KEY = 'shiguang.lightboxTip.dismissed'
const AUTO_HIDE_MS = 5000
const SHOW_DELAY_MS = 2500

const visible = ref(false)
let autoHideTimer = null
let showTimer = null

function dismiss () {
  visible.value = false
  localStorage.setItem(STORAGE_KEY, '1')
  if (autoHideTimer) { clearTimeout(autoHideTimer); autoHideTimer = null }
  if (showTimer) { clearTimeout(showTimer); showTimer = null }
}

onMounted(() => {
  // 已访问过不弹
  if (localStorage.getItem(STORAGE_KEY) === '1') return
  showTimer = setTimeout(() => {
    visible.value = true
    autoHideTimer = setTimeout(() => { visible.value = false }, AUTO_HIDE_MS)
  }, SHOW_DELAY_MS)
})

onUnmounted(() => {
  if (autoHideTimer) clearTimeout(autoHideTimer)
  if (showTimer) clearTimeout(showTimer)
})

defineExpose({ dismiss })
</script>

<template>
  <Transition name="tip-fade">
    <div
      v-if="visible"
      class="lightbox-tip"
      role="status"
      aria-live="polite"
    >
      <span class="lightbox-tip__icon">💡</span>
      <span class="lightbox-tip__text">点击任一帧，查看大图</span>
      <button
        class="lightbox-tip__close"
        aria-label="知道了"
        @click="dismiss"
      >
        ×
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.lightbox-tip {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--paper);
  border: 1px solid var(--warm);
  border-left-width: 4px;
  padding: 0.7rem 0.9rem 0.7rem 1rem;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  color: var(--ink);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  max-width: 280px;
}
.lightbox-tip::before {
  content: '';
  position: absolute;
  left: -10px;
  bottom: 18px;
  width: 0; height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 10px solid var(--warm);
}
.lightbox-tip__icon { font-size: 1.1rem; line-height: 1; }
.lightbox-tip__text { flex: 1; line-height: 1.4; }
.lightbox-tip__close {
  background: transparent;
  border: none;
  color: var(--ink-soft);
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.2rem;
  font-family: inherit;
  transition: color 0.2s;
}
.lightbox-tip__close:hover { color: var(--warm); }

/* tip 进出动画 */
.tip-fade-enter-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.tip-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.tip-fade-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}
.tip-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 900px) {
  .lightbox-tip {
    right: 0.8rem;
    bottom: 0.8rem;
    left: 0.8rem;
    max-width: none;
  }
  .lightbox-tip::before { display: none; }
  .lightbox-tip__text { font-size: 0.82rem; }
}
</style>