<script setup>
</script>

<template>
  <section class="b-hero">
    <div class="b-hero__head">
      <span class="datestamp">FRAME 22–25</span>
      <span class="b-hero__roll">CRAFTSPEOPLE · 4 EXP.</span>
    </div>
    <h1 class="b-hero__title">
      四双手<br>
      的<span class="b-hero__title-warm">专注</span>
    </h1>
    <p class="b-hero__lead">
      从产地到杯中, 每一支豆子都经咖啡总监手工挑选;<br>
      每一杯手冲, 都由四双手之一精心萃取。
    </p>
  </section>
</template>

<style scoped>
.b-hero {
  padding: 4rem 3rem 3rem;
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
  font-size: clamp(3rem, 7vw, 6rem);
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