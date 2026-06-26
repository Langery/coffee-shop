<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section class="a-cta reveal">
    <div class="a-cta__inner">
      <span class="eyebrow eyebrow--accent">F·17 · END OF ROLL</span>
      <h2>看完十二卷，<br>要不要来拾光坐一会儿？</h2>
      <p class="a-cta__lead">
        店里没有密码本，<br>但有 2,500+ 张杯测表等你翻。
      </p>
      <div class="a-cta__btns">
        <button
          class="a-cta__btn a-cta__btn--primary"
          @click="router.push({ name: 'home', hash: '#contact' })"
        >
          <span>查看地址</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
        <button
          class="a-cta__btn a-cta__btn--ghost"
          @click="router.push({ name: 'story' })"
        >
          <span>回故事页</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.a-cta {
  padding: 6rem 3rem 4rem;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.a-cta__inner {
  background: var(--ink);
  color: var(--paper);
  padding: 4rem 3rem;
  position: relative;
  overflow: hidden;
}
.a-cta__inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--warm), var(--warm-deep) 50%, var(--warm));
}
.a-cta h2 {
  font-family: var(--font-cjk);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.25;
  margin: 0.8rem 0 1.5rem;
}
.a-cta__lead {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  line-height: 1.95;
  color: rgba(255, 251, 240, 0.75);
  margin-bottom: 2.5rem;
}
.a-cta__btns {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.a-cta__btn {
  background: var(--paper);
  color: var(--ink);
  border: none;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  padding: 0.85rem 1.8rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: 999px;
  transition: all 0.3s;
  font-weight: 600;
}
.a-cta__btn--primary { background: var(--warm); color: var(--paper); }
.a-cta__btn--primary:hover {
  background: var(--paper);
  color: var(--warm);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(200, 85, 61, 0.3);
}
.a-cta__btn--ghost {
  background: transparent;
  color: var(--paper);
  border: 1px solid var(--paper);
}
.a-cta__btn--ghost:hover {
  background: var(--paper);
  color: var(--ink);
  transform: translateY(-2px);
}
.a-cta__btn svg { width: 16px; height: 16px; }

@media (max-width: 900px) {
  .a-cta { padding: 3rem 1.5rem 2rem; }
  .a-cta__inner { padding: 2.5rem 1.5rem; }
}
</style>
