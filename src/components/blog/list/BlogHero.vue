<script setup>
</script>

<template>
  <section class="b-hero">
    <div class="b-hero__head">
      <span class="datestamp">FRAME 04 · JOURNAL</span>
      <span class="b-hero__roll">4 ENTRIES · 5 CATEGORIES</span>
    </div>
    <h1 class="b-hero__title">
      咖啡、文字、<br>
      与<span class="b-hero__title-warm">慢时间</span>
    </h1>
    <p class="b-hero__lead">
      关于一杯咖啡背后的所有事——产区故事、调饮实验、空间随笔、节气手记。
    </p>
  </section>
</template>

<style scoped>
.b-hero {
  padding: 7rem 3rem 5rem;
  max-width: 1100px;
  margin: 0 auto;
  border-bottom: 1px solid var(--rule);
}
.b-hero__head {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.b-hero__roll {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: var(--ink-soft);
  font-weight: 600;
}
.b-hero__title {
  font-family: var(--font-cjk);
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 800;
  line-height: 1.05;
  margin: 1rem 0 2rem;
  letter-spacing: 0.02em;
}
.b-hero__title-warm {
  color: var(--warm);
  font-style: italic;
}
.b-hero__lead {
  font-family: var(--font-cjk);
  font-size: 1.2rem;
  line-height: 1.9;
  color: var(--ink-soft);
  max-width: 720px;
}
</style>