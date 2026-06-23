import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Back-to-top visibility composable.
 * @param {Object} options
 * @param {number} options.threshold - scrollY in px to show button (default 600)
 */
export function useBackToTop({ threshold = 600 } = {}) {
  const visible = ref(false)
  const handleScroll = () => {
    visible.value = window.scrollY > threshold
  }

  onMounted(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return { visible, scrollToTop }
}