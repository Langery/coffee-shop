<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section class="b-cta">
    <span class="datestamp">F·26 · COME SAY HI</span>
    <h2>来拾光<br>认识他们</h2>
    <p>咖啡师每天 8 点到店, 开始当日的手冲备豆。如果你也想了解一杯咖啡背后的故事, 欢迎来店里坐一坐。</p>
    <div class="b-cta__buttons">
      <button
        class="btn-primary"
        @click="router.push({ name: 'home', hash: '#menu' })"
      >
        浏览菜单
      </button>
      <button
        class="btn-ghost"
        @click="router.push({ name: 'home', hash: '#contact' })"
      >
        联络
      </button>
    </div>
  </section>
</template>

<style scoped>
.b-cta {
  padding: 4rem 3rem 3rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
.b-cta h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 700;
  margin: 1.5rem 0 1.5rem;
  line-height: 1.1;
  letter-spacing: 0.02em;
}
.b-cta p {
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--ink-soft);
  margin-bottom: 2.5rem;
}
.b-cta__buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>