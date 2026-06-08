import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Unified intersection animation composable
 * Supports prefers-reduced-motion and returns refs for direct usage
 */
export function useIntersectionAnimation(options = {}) {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    once = true,
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } = options

  const isVisible = ref(false)
  const el = ref(null)
  let observer = null

  onMounted(() => {
    if (prefersReducedMotion) {
      isVisible.value = true
      return
    }
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (once) observer.disconnect()
      }
    }, { threshold, rootMargin })
    if (el.value) observer.observe(el.value)
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return { el, isVisible }
}