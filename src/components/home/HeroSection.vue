<script setup>
import { useScrollPast } from '@/composables/useScrollPast'
import { useFlash } from '@/composables/useFlash'
import HeroText from './hero/HeroText.vue'
import HeroCollage from './hero/HeroCollage.vue'
import HeroScrollCue from './hero/HeroScrollCue.vue'

const props = defineProps({
  imgOsmanthus: { type: String, required: true },
  imgCappuccino: { type: String, required: true },
  imgScone: { type: String, required: true }
})

defineEmits(['scrollToMenu', 'goToStory'])

// scroll-cue: 滚过 80px 后隐藏
const { past: scrollPast } = useScrollPast(80)

// 3 个 polaroid 共用的 flash 状态
const { value: flashHero, trigger: triggerHeroFlash } = useFlash()

// 3 帧 polaroid 配置 (数组驱动 v-for)
const polaroids = [
  { image: props.imgOsmanthus, caption: '桂花拿铁 · autumn limited', num: 'F · 01', tilt: 'l', size: 'big', index: 0 },
  { image: props.imgCappuccino, caption: '卡布奇诺 · classic',        num: 'F · 02', tilt: 'r', size: 'small', index: 1 },
  { image: props.imgScone,      caption: '司康 · tea time',           num: 'F · 03', tilt: 'c', size: 'small', rightAlign: true, index: 2 }
]
</script>

<template>
  <section class="hero">
    <div class="hero__grid">
      <HeroText
        @scroll-to-menu="$emit('scrollToMenu')"
        @go-to-story="$emit('goToStory')"
      />
      <HeroCollage
        :polaroids="polaroids"
        :flash-id="flashHero"
        @flash="triggerHeroFlash"
      />
    </div>
    <HeroScrollCue :visible="!scrollPast" />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 4rem 3rem 5rem;
  min-height: 92vh;
  display: flex;
  align-items: center;
  background: var(--paper);
  border-bottom: 3px double var(--ink);
}
.hero__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .hero { padding: 3rem 2rem; min-height: auto; }
  .hero__grid { grid-template-columns: 1fr; gap: 3rem; }
}
@media (max-width: 640px) {
  .hero { padding: 2rem 1rem; }
}
</style>