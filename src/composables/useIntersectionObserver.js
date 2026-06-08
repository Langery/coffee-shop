import { onMounted, onUnmounted } from 'vue'

/**
 * Intersection Observer composable for reveal animations
 * Adds 'is-visible' class to elements when they enter viewport
 */
export function useIntersectionObserver(options = {}) {
  const config = {
    threshold: options.threshold || 0.15,
    rootMargin: options.rootMargin || '0px 0px -80px 0px',
    selector: options.selector || '.reveal',
  }

  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: config.threshold, rootMargin: config.rootMargin })

    document.querySelectorAll(config.selector).forEach(el => observer.observe(el))
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return { observer }
}