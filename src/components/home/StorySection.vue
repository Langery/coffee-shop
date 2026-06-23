<script setup>
import { useIntersectionAnimation } from '@/composables/useIntersectionAnimation'

defineProps({
  imgHero: { type: String, required: true }
})

const emit = defineEmits(['goToStory'])
const { el: sectionRef, isVisible } = useIntersectionAnimation({ threshold: 0.2 })
</script>

<template>
  <section id="story" ref="sectionRef" class="story" :class="{ visible: isVisible }">
    <div class="story__grid">
      <div class="story__imgwrap tilt-l">
        <figure class="polaroid">
          <div class="duotone">
            <img :src="imgHero" alt="拾光咖啡空间" />
          </div>
          <figcaption>三里屯店 · 2018</figcaption>
        </figure>
      </div>
      <div class="story__text">
        <span class="eyebrow eyebrow--accent">OUR STORY · F·15</span>
        <h2>从一杯<br>手冲开始<br>的旅程</h2>
        <p>2018 年春天，主理人苏先生在三里屯一条旧巷子里开了第一间店。从一台手冲壶、一袋危地马拉豆子开始，七年来我们坚持「只用手冲、只用当季、只用心」的原则。</p>
        <p>这里没有连锁咖啡的标准化，只有一杯杯根据豆子特性调整的、温度与时间都精确到秒的手冲咖啡。</p>
        <button class="btn-link" @click="emit('goToStory', 'story')">
          阅读全文 →
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story {
  padding: 7rem 3rem;
  max-width: 1300px;
  margin: 0 auto;
}
.story__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}
.story__imgwrap { position: relative; opacity: 0; transform: translateX(-30px); transition: opacity 0.8s ease, transform 0.8s ease; }
.story.visible .story__imgwrap { opacity: 1; transform: translateX(0); }
.story__imgwrap .polaroid { max-width: 500px; margin: 0 auto; }
.story__text { opacity: 0; transform: translateX(30px); transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s; }
.story.visible .story__text { opacity: 1; transform: translateX(0); }
.story__text h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 1rem 0 2rem;
  letter-spacing: 0.02em;
}
.story__text p {
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--ink-soft);
  margin-bottom: 1.2rem;
}
.btn-link {
  background: none;
  padding: 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: var(--warm);
  border-bottom: 2px solid var(--warm);
  padding-bottom: 2px;
  font-weight: 600;
  cursor: pointer;
}
.btn-link:hover { color: var(--ink); border-bottom-color: var(--ink); }

.polaroid {
  position: relative;
  background: var(--paper-light);
  padding: 14px 14px 60px;
  box-shadow: 0 6px 16px rgba(31, 26, 21, 0.25);
}
.polaroid figcaption {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  text-align: center;
  font-family: var(--font-type);
  font-size: 0.85rem;
  color: var(--ink);
  letter-spacing: 0.05em;
}
.polaroid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4/5;
}

@media (max-width: 1024px) {
  .story { padding: 4rem 1rem; }
  .story__grid { grid-template-columns: 1fr; gap: 3rem; }
}

@media (max-width: 640px) {
  .story { padding: 2rem 1rem; }
  .story__imgwrap .polaroid { max-width: 280px; }
}
</style>