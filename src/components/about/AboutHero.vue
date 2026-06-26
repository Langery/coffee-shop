<template>
  <section class="a-hero">
    <div class="a-hero__head">
      <span class="datestamp typewriter">FRAME 05 · ABOUT SHIGUANG</span>
      <span class="a-hero__roll typewriter">SINCE 2014 · 12 ROLLS · 1 SHOP</span>
    </div>
    <h1 class="a-hero__title">
      一间店，<br>
      拍了<span class="a-hero__title-warm">十二卷</span>。
    </h1>
    <p class="a-hero__lead">
      拾光不是最大的店，也不是最贵的店。<br>
      我们只是在三里屯的街角，慢慢地拍了十二年的咖啡卷。
    </p>
    <div class="a-hero__meta">
      <div class="a-hero__meta-item">
        <span class="a-hero__meta-num typewriter">2014</span>
        <span class="a-hero__meta-label">始于</span>
      </div>
      <div class="a-hero__meta-item">
        <span class="a-hero__meta-num typewriter">12</span>
        <span class="a-hero__meta-label">卷胶片</span>
      </div>
      <div class="a-hero__meta-item">
        <span class="a-hero__meta-num typewriter">42</span>
        <span class="a-hero__meta-label">位咖啡师</span>
      </div>
      <div class="a-hero__meta-item">
        <span class="a-hero__meta-num typewriter">1</span>
        <span class="a-hero__meta-label">间店</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.a-hero {
  padding: 7rem 3rem 5rem;
  max-width: 1100px;
  margin: 0 auto;
  border-bottom: 1px solid var(--rule);
}
.a-hero__head {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}
.a-hero__roll {
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  color: var(--ink-soft);
  font-weight: 600;
}
.a-hero__title {
  font-family: var(--font-cjk);
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 800;
  line-height: 1.05;
  margin: 1rem 0 2rem;
  letter-spacing: 0.02em;
}
.a-hero__title-warm { color: var(--warm); font-style: italic; }
.a-hero__lead {
  font-family: var(--font-cjk);
  font-size: 1.25rem;
  line-height: 1.95;
  color: var(--ink-soft);
  max-width: 720px;
  margin-bottom: 3rem;
}
.a-hero__meta {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  border-top: 1px dashed var(--rule);
  padding-top: 2rem;
}
.a-hero__meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.a-hero__meta-num {
  font-size: 2rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.a-hero__meta-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .a-hero { padding: 5rem 1.5rem 3rem; }
  .a-hero__meta { grid-template-columns: repeat(2, 1fr); gap: 1.2rem; }
}
</style>
