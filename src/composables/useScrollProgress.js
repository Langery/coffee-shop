import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Scroll progress composable
 * Tracks scroll position and calculates progress percentage
 */
export function useScrollProgress() {
  const scrollY = ref(0)
  const scrollMax = ref(1)

  const scrollProgress = ref(0)

  const handleScroll = () => {
    scrollY.value = window.scrollY
    scrollMax.value = document.documentElement.scrollHeight - window.innerHeight

    if (scrollMax.value <= 0) {
      scrollProgress.value = 0
    } else {
      scrollProgress.value = Math.min(100, (scrollY.value / scrollMax.value) * 100)
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { scrollY, scrollMax, scrollProgress }
}