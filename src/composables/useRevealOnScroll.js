import { onMounted, onUnmounted } from 'vue'

/**
 * Add a CSS class to elements matching `selector` when they enter the viewport.
 * One-shot per element (unobserve after intersect). Observer auto-disconnects on unmount.
 *
 * Use case: paired with CSS like
 *   .reveal { opacity: 0; transform: translateY(36px); transition: ... }
 *   .reveal.is-visible { opacity: 1; transform: translateY(0); }
 *
 * @param {Object} options
 * @param {string} options.selector - CSS selector for elements to reveal
 * @param {string} [options.className='is-visible'] - class added on intersect
 * @param {number} [options.threshold=0.2] - IntersectionObserver threshold
 * @param {string} [options.rootMargin='0px'] - IntersectionObserver rootMargin
 */
export function useRevealOnScroll({
  selector,
  className = 'is-visible',
  threshold = 0.2,
  rootMargin = '0px'
}) {
  if (typeof window === 'undefined') return

  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(className)
          observer.unobserve(e.target)
        }
      })
    }, { threshold, rootMargin })

    document.querySelectorAll(selector).forEach(el => observer.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}