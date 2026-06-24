<script setup>
import { useRouter } from 'vue-router'

defineProps({
  ctaImg: { type: String, required: true }
})

const router = useRouter()
</script>

<template>
  <section
    id="cta"
    class="story-cta"
  >
    <div class="story-cta__inner">
      <figure class="story-cta__photo">
        <div class="duotone">
          <img
            :src="ctaImg"
            alt="拾光咖啡 · 吧台一隅"
          >
        </div>
        <figcaption class="story-cta__caption typewriter">
          F·21 · 吧台一隅
        </figcaption>
      </figure>
      <div class="story-cta__text">
        <span class="datestamp">F·21 · VISIT</span>
        <h2>准备好<br>坐下来喝一杯了吗？</h2>
        <p class="story-cta__lead">
          三里屯旧巷的一台手冲壶，七年来只做一件事：把当季最好的豆子，呈现给你。
        </p>
        <div class="story-cta__buttons">
          <button
            class="btn-primary btn-primary--inverted"
            @click="router.push({ name: 'home', hash: '#menu' })"
          >
            浏览菜单
          </button>
          <button
            class="btn-ghost btn-ghost--light"
            @click="router.push({ name: 'home', hash: '#contact' })"
          >
            联系方式
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story-cta {
  padding: 5rem 3rem 6rem;
  max-width: 1100px;
  margin: 0 auto;
  border-top: 1px solid var(--rule);
}
.story-cta__inner {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3.5rem;
  align-items: center;
}
.story-cta__photo {
  margin: 0;
  position: relative;
}
.story-cta__photo .duotone {
  width: 100%;
  aspect-ratio: 3 / 4;
  background: var(--ink);
  overflow: hidden;
  border: 1px solid var(--rule);
  transform: rotate(-1.2deg);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}
.story-cta__photo .duotone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.story-cta__caption {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%) rotate(-1.2deg);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: var(--warm);
  white-space: nowrap;
}
.story-cta__text { text-align: left; }
.story-cta__text h2 {
  font-family: var(--font-serif);
  font-size: 2.4rem;
  font-weight: 300;
  color: var(--ink);
  margin: 0.8rem 0 1rem;
  letter-spacing: 0.04em;
  line-height: 1.3;
}
.story-cta__lead {
  font-size: 0.95rem;
  color: var(--ink-soft);
  line-height: 1.7;
  margin: 0 0 1.8rem;
  max-width: 480px;
}
.story-cta__buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
@media (max-width: 900px) {
  .story-cta { padding: 3rem 1.5rem 4rem; }
  .story-cta__inner { grid-template-columns: 1fr; gap: 2rem; }
  .story-cta__photo { max-width: 240px; margin: 0 auto; }
}
</style>
