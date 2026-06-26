<script setup>
import { ref, onMounted } from 'vue'
import Lightbox from '../Lightbox.vue'
import { useAutoplay } from '@/composables/useAutoplay'
import TimelineHead from './timeline/TimelineHead.vue'
import TimelineSpotlight from './timeline/TimelineSpotlight.vue'
import TimelineFilmstrip from './timeline/TimelineFilmstrip.vue'
import TimelineLightboxTip from './timeline/TimelineLightboxTip.vue'

const props = defineProps({
  milestones: { type: Array, required: true }
})

// 时序轴自动轮播
const { activeIndex: activeFrame, start: startAutoplay, stop: stopAutoplay } = useAutoplay({
  get totalFrames() { return props.milestones.length },
  showDuration: 2200,
  fadeDuration: 600,
  autoStart: false
})

// Lightbox
const lightboxOpen = ref(false)
const lightboxFrame = ref(null)
const closeLightbox = () => {
  lightboxOpen.value = false
  startAutoplay(500)
}

const onFrameClick = (i) => {
  tipRef.value?.dismiss() // 用户点了帧就 dismiss 提示
  stopAutoplay()
  lightboxFrame.value = { ...props.milestones[i] }
  lightboxOpen.value = true
}
const onFrameHover = () => stopAutoplay()
const onFrameLeave = () => {
  setTimeout(() => {
    if (!lightboxOpen.value) startAutoplay(0)
  }, 3000)
}

const tipRef = ref(null)

onMounted(() => {
  startAutoplay(1000)
})
</script>

<template>
  <section
    id="timeline"
    class="timeline"
  >
    <TimelineHead />

    <TimelineSpotlight
      :active-frame="activeFrame"
      :milestones="milestones"
    />

    <TimelineFilmstrip
      :milestones="milestones"
      :active-frame="activeFrame"
      @frame-click="onFrameClick"
      @frame-hover="onFrameHover"
      @frame-leave="onFrameLeave"
    />

    <TimelineLightboxTip ref="tipRef" />

    <Lightbox
      :open="lightboxOpen"
      :frame="lightboxFrame"
      @close="closeLightbox"
    />
  </section>
</template>

<style scoped>
.timeline {
  padding: 5rem 3rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  background: var(--paper-deep);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
/* 牛皮纸纹理 (SVG noise) */
.timeline::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2' /><feColorMatrix values='0 0 0 0 0.7  0 0 0 0 0.65  0 0 0 0 0.55  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  pointer-events: none;
  opacity: 0.6;
  z-index: 0;
}
/* 边角的胶片孔 (4 角) */
.timeline::after {
  content: '';
  position: absolute;
  inset: 12px;
  background-image:
    radial-gradient(circle at 0 0, var(--ink) 6px, transparent 7px),
    radial-gradient(circle at 100% 0, var(--ink) 6px, transparent 7px),
    radial-gradient(circle at 0 100%, var(--ink) 6px, transparent 7px),
    radial-gradient(circle at 100% 100%, var(--ink) 6px, transparent 7px);
  pointer-events: none;
  z-index: 0;
}
.timeline > * { position: relative; z-index: 1; }
</style>