import { ref, onBeforeUnmount } from 'vue'

/**
 * Flash state composable: trigger(id) sets value to id for `duration` ms, then clears.
 * Multiple triggers in quick succession restart the timer.
 * Used by HeroSection (polaroid flash) and Baristas (avatar flash).
 * @param {number} duration - ms the flash stays visible
 * @returns {{ value: Ref<string|number|null>, trigger: (id: string|number) => void }}
 */
export function useFlash(duration = 400) {
  const value = ref(null)
  let timer = null

  const trigger = (id) => {
    if (timer) clearTimeout(timer)
    value.value = id
    timer = setTimeout(() => {
      if (value.value === id) value.value = null
      timer = null
    }, duration)
  }

  onBeforeUnmount(() => {
    if (timer) clearTimeout(timer)
  })

  return { value, trigger }
}