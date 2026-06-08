import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Autoplay composable for timed state transitions
 * @param {Object} options
 * @param {Function} options.onTick - callback when phase changes to 'show'
 * @param {Function} options.onFade - callback when phase changes to 'fade'
 * @param {number} options.showDuration - ms to stay in 'show' phase (default 2200)
 * @param {number} options.fadeDuration - ms for 'fade' transition (default 600)
 */
export function useAutoplay(options = {}) {
  const { onTick, onFade, showDuration = 2200, fadeDuration = 600 } = options

  const activeIndex = ref(0)
  const phase = ref('show') // 'show' | 'fade'
  let timer = null

  const tick = () => {
    if (phase.value === 'show') {
      phase.value = 'fade'
      if (onFade) onFade()
      timer = setTimeout(() => {
        activeIndex.value = (activeIndex.value + 1) % (options.totalFrames || 10)
        phase.value = 'show'
        if (onTick) onTick()
        timer = setTimeout(tick, showDuration)
      }, fadeDuration)
    }
  }

  const start = (delay = 1000) => {
    stop()
    timer = setTimeout(tick, delay)
  }

  const stop = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    phase.value = 'show'
  }

  onMounted(() => {
    if (options.autoStart !== false) {
      start()
    }
  })

  onBeforeUnmount(() => {
    stop()
  })

  return { activeIndex, phase, start, stop }
}