<script setup>
import { ref, onMounted } from 'vue'
import { useRevealOnScroll } from '@/composables/useRevealOnScroll'
import AboutHero from '@/components/about/AboutHero.vue'
import AboutFounder from '@/components/about/AboutFounder.vue'
import AboutThings from '@/components/about/AboutThings.vue'
import AboutSpace from '@/components/about/AboutSpace.vue'
import AboutValues from '@/components/about/AboutValues.vue'
import AboutCTA from '@/components/about/AboutCTA.vue'

const visible = ref(false)

onMounted(() => {
  setTimeout(() => { visible.value = true }, 100)
})

// 滚动入场动画: 子组件根元素加 .reveal 类, 视口进入时 .is-visible
useRevealOnScroll({
  selector: '.reveal',
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
})
</script>

<template>
  <div class="about" :class="{ 'is-loaded': visible }">
    <AboutHero />
    <AboutFounder />
    <AboutThings />
    <AboutSpace />
    <AboutValues />
    <AboutCTA />
  </div>
</template>

<style scoped>
.about {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
  padding-bottom: 4rem;
  min-height: 100vh;
}
.about.is-loaded { animation: aboutFade 0.8s ease-out; }
@keyframes aboutFade { 0% { opacity: 0; } 100% { opacity: 1; } }

/* :deep(.reveal) 跨子组件边界: 子组件根元素 .reveal 类
   视口进入时由 useRevealOnScroll 加 .is-visible, 触发 fade-up */
.about :deep(.reveal) {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.about :deep(.reveal.is-visible) {
  opacity: 1;
  transform: translateY(0);
}
</style>
