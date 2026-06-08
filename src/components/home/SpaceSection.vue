<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  spaceImages: { type: Array, required: true }
})

const emit = defineEmits(['openLightbox'])

const filmstripRef = ref(null)
const activeStrip = ref(0)
const stripProgress = ref(0)
const isPaused = ref(false)
const isDwelling = ref(false)
const isLooping = ref(false)
const prefersReducedMotion = ref(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

const FRAME_WIDTH = 280 + 18 // frame width + gap
const AUTOPLAY_SPEED = 90 // pixels per second
const DWELL_TIME = 1200 // ms to pause at each frame
const LOOP_FADE_TIME = 200 // ms opacity fade during loopback

let rafId = null
let lastTime = 0
let dwellTimer = 0
let loopTimer = 0
let isInternalUpdate = false // flag to prevent feedback loop from onStripScroll

// 复制第一张图片追加到末尾，实现无缝循环
const loopImages = computed(() => {
  if (props.spaceImages.length === 0) return []
  const first = props.spaceImages[0]
  return [...props.spaceImages, { ...first, _isLoop: true }]
})

const tick = (now) => {
  rafId = requestAnimationFrame(tick)
  if (isPaused.value || isDwelling.value || isLooping.value || !filmstripRef.value) {
    lastTime = now
    return
  }

  const delta = (now - lastTime) / 1000
  lastTime = now
  isInternalUpdate = true
  filmstripRef.value.scrollLeft += AUTOPLAY_SPEED * delta
  isInternalUpdate = false

  const maxScroll = filmstripRef.value.scrollWidth - filmstripRef.value.clientWidth
  const idx = Math.round(filmstripRef.value.scrollLeft / FRAME_WIDTH)
  const nextFrameStart = (idx + 1) * FRAME_WIDTH

  // 到达末尾：开始循环
  if (filmstripRef.value.scrollLeft >= maxScroll - 1) {
    isLooping.value = true
    loopTimer = setTimeout(() => {
      isInternalUpdate = true
      filmstripRef.value.scrollLeft = 0
      activeStrip.value = 0
      isInternalUpdate = false
      isLooping.value = false
      lastTime = performance.now()
    }, LOOP_FADE_TIME)
    return
  }

  // 到达帧边界：进入停留状态
  if (idx > 0 && idx < props.spaceImages.length && filmstripRef.value.scrollLeft >= nextFrameStart - 4) {
    isInternalUpdate = true
    filmstripRef.value.scrollLeft = nextFrameStart
    isInternalUpdate = false
    activeStrip.value = idx
    stripProgress.value = maxScroll > 0 ? (nextFrameStart / maxScroll) * 100 : 0
    isDwelling.value = true
    dwellTimer = setTimeout(() => {
      isDwelling.value = false
      lastTime = performance.now()
    }, DWELL_TIME)
    return
  }

  activeStrip.value = Math.max(0, Math.min(idx, props.spaceImages.length - 1))
  stripProgress.value = maxScroll > 0 ? (filmstripRef.value.scrollLeft / maxScroll) * 100 : 0
}

const stopAutoplay = () => {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  if (dwellTimer) {
    clearTimeout(dwellTimer)
    dwellTimer = 0
  }
  if (loopTimer) {
    clearTimeout(loopTimer)
    loopTimer = 0
  }
}

const startAutoplay = () => {
  if (prefersReducedMotion.value) return
  lastTime = performance.now()
  rafId = requestAnimationFrame(tick)
}

const onStripScroll = () => {
  if (isInternalUpdate || isLooping.value || !filmstripRef.value) return
  const idx = Math.round(filmstripRef.value.scrollLeft / FRAME_WIDTH)
  activeStrip.value = Math.max(0, Math.min(idx, props.spaceImages.length - 1))
  const max = filmstripRef.value.scrollWidth - filmstripRef.value.clientWidth
  stripProgress.value = max > 0 ? (filmstripRef.value.scrollLeft / max) * 100 : 0
}

const onPointerEnter = () => {
  isPaused.value = true
  if (dwellTimer) {
    clearTimeout(dwellTimer)
    dwellTimer = 0
    isDwelling.value = false
  }
}

const onPointerLeave = () => {
  isPaused.value = false
  lastTime = performance.now()
}

const onStripKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    activeStrip.value = Math.max(0, activeStrip.value - 1)
    filmstripRef.value?.scrollTo({ left: activeStrip.value * FRAME_WIDTH, behavior: 'smooth' })
    e.preventDefault()
  } else if (e.key === 'ArrowRight') {
    activeStrip.value = Math.min(props.spaceImages.length - 1, activeStrip.value + 1)
    filmstripRef.value?.scrollTo({ left: activeStrip.value * FRAME_WIDTH, behavior: 'smooth' })
    e.preventDefault()
  }
}

const scrollToFrame = (i) => {
  activeStrip.value = i
  filmstripRef.value?.scrollTo({ left: i * FRAME_WIDTH, behavior: 'smooth' })
}

const openLightbox = (it) => emit('openLightbox', it)

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section class="space">
    <header class="section-head">
      <div>
        <span class="eyebrow eyebrow--accent">SPACE · F·17–21</span>
        <h2>在拾光<br>慢慢地坐一会儿</h2>
      </div>
      <p class="section-head__caption">
        ← 横向滚动浏览 · {{ spaceImages.length }} 帧空间 →
      </p>
    </header>
    <div
      ref="filmstripRef"
      class="filmstrip-horizontal"
      :class="{ 'is-looping': isLooping }"
      tabindex="0"
      @scroll="onStripScroll"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
      @keydown="onStripKeydown"
    >
      <figure
        v-for="(it, i) in loopImages"
        :key="it.n + '-' + i"
        class="filmstrip-horizontal__frame"
        :class="{ 'is-active': activeStrip === i }"
        role="button"
        tabindex="0"
        @click="openLightbox(it)"
        @keydown.enter="openLightbox(it)"
      >
        <div class="duotone">
          <img :src="it.src" :alt="it.n" loading="lazy" />
        </div>
        <span class="filmstrip-horizontal__num">FRAME · {{ it.n }}</span>
        <transition name="badge">
          <div v-if="activeStrip === i" class="filmstrip-horizontal__badge">
            <span class="typewriter">F · {{ it.n }} · {{ it.t }}</span>
          </div>
        </transition>
      </figure>
    </div>
    <div class="filmstrip-horizontal__progress">
      <button
        v-for="(it, i) in spaceImages"
        :key="i"
        class="filmstrip-horizontal__dot-btn"
        :class="{ 'is-active': activeStrip === i }"
        :aria-label="`第 ${i + 1} 帧: ${it.t}`"
        @click="scrollToFrame(i)"
      />
    </div>
    <div class="filmstrip-horizontal__scrollbar">
      <div class="filmstrip-horizontal__scrollbar-fill" :style="{ width: stripProgress + '%' }" />
    </div>
    <div class="filmstrip-horizontal__cap">
      <span class="typewriter">← DRAG / SCROLL →</span>
      <span class="typewriter">FRAME 24A — 28A · 5 EXP.</span>
    </div>
  </section>
</template>

<style scoped>
.space {
  padding: 6rem 3rem;
  background: var(--paper-deep);
  overflow: hidden;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.space .section-head { padding: 0 3rem 3rem; margin-bottom: 0; }
.space .section-head h2 { color: var(--ink); }
.space .section-head__caption { color: var(--ink-soft); }
.space .eyebrow { color: var(--warm); }

.filmstrip-horizontal {
  background: var(--ink);
  padding: 24px 0 32px;
  display: flex;
  gap: 18px;
  overflow-x: auto;
  position: relative;
  scrollbar-width: none;
  transition: opacity 200ms ease-in;
}
.filmstrip-horizontal::-webkit-scrollbar { display: none; }
.filmstrip-horizontal::before, .filmstrip-horizontal::after {
  content: '';
  position: sticky;
  top: 0;
  width: 16px;
  background: var(--ink);
  background-image: radial-gradient(circle at 8px center, var(--paper) 4px, transparent 4.5px);
  background-size: 16px 24px;
  background-repeat: repeat-y;
  z-index: 3;
  flex-shrink: 0;
  align-self: stretch;
}
.filmstrip-horizontal::before { left: 0; }
.filmstrip-horizontal::after { right: 0; }
.filmstrip-horizontal.is-looping {
  opacity: 0.6;
  transition: opacity 180ms ease-out;
}
.filmstrip-horizontal__frame {
  flex: 0 0 280px;
  height: 320px;
  position: relative;
  cursor: pointer;
  background: var(--ink);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.6s ease, box-shadow 0.6s ease, opacity 0.6s ease;
  flex-shrink: 0;
  opacity: 0.6;
}
.filmstrip-horizontal__frame .duotone { width: 100%; height: 100%; }
.filmstrip-horizontal__frame:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}
.filmstrip-horizontal__frame.is-active {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
  opacity: 1;
}
.filmstrip-horizontal__frame.is-active .filmstrip-horizontal__num {
  color: var(--warm);
}
.filmstrip-horizontal__num {
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  text-align: center;
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
  transition: color 0.3s ease;
}
.filmstrip-horizontal__progress {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.8rem 0 0;
}
.filmstrip-horizontal__dot-btn {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--rule);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}
.filmstrip-horizontal__dot-btn.is-active {
  width: 28px;
  border-radius: 4px;
  background: var(--warm);
}

.filmstrip-horizontal__badge {
  position: absolute;
  bottom: -38px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--paper);
  color: var(--ink);
  padding: 6px 14px;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  white-space: nowrap;
  border: 1px solid var(--ink);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 5;
}
.filmstrip-horizontal__badge::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background: var(--paper);
  border-top: 1px solid var(--ink);
  border-left: 1px solid var(--ink);
}
.badge-enter-active, .badge-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.badge-enter-from, .badge-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}
.badge-enter-to, .badge-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.filmstrip-horizontal__scrollbar {
  max-width: 600px;
  margin: 0.5rem auto 0;
  height: 2px;
  background: rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}
.filmstrip-horizontal__scrollbar-fill {
  height: 100%;
  background: var(--warm);
  transition: width 0.3s ease;
}
.filmstrip-horizontal__cap {
  display: flex;
  justify-content: space-between;
  padding: 1rem 3rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  color: var(--warm);
}

@media (max-width: 1024px) {
  .space { padding: 3rem 0; }
  .space .section-head { padding: 0 1rem 2rem; }
  .filmstrip-horizontal__cap { padding: 1rem 1rem; }
}
</style>