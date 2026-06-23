import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Reveal-on-scroll composable for a single target element.
 *
 * Usage:
 *   const { el, isVisible } = useIntersectionAnimation({ threshold: 0.2 })
 *   <section ref="el" :class="{ visible: isVisible }">...</section>
 *
 * Respects prefers-reduced-motion (skips observation, shows immediately).
 * Auto-disconnects after first intersection to keep work off the main thread.
 */
export function useIntersectionAnimation(options = {}) {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    once = true,
  } = options

  const el = ref(null)
  const isVisible = ref(false)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let observer = null

  onMounted(() => {
    if (prefersReducedMotion || !el.value) {
      isVisible.value = true
      return
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (once) observer?.disconnect()
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { el, isVisible }
}