import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Detect whether user has scrolled past a threshold.
 * Stays true once crossed (one-shot, never resets).
 * @param {number} threshold - px from top to consider "past"
 * @returns {{ past: Ref<boolean> }}
 */
export function useScrollPast(threshold = 100) {
  const past = ref(false)
  const handler = () => {
    if (!past.value && window.scrollY > threshold) {
      past.value = true
    }
  }

  onMounted(() => {
    handler() // 初始位置判定 (e.g. refresh 时已滚过 threshold)
    window.addEventListener('scroll', handler, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handler)
  })

  return { past }
}