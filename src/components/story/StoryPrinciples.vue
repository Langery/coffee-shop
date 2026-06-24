<script setup>
defineProps({
  principles: { type: Array, required: true }
})
</script>

<template>
  <section
    id="principles"
    class="principles"
  >
    <div class="principles__inner">
      <header class="section-head--inline">
        <span class="stamp">PRINCIPLES · F·11–13</span>
        <h2>三个坚持</h2>
      </header>
      <div class="principles__grid">
        <article
          v-for="p in principles"
          :key="p.num"
          class="principle"
        >
          <figure class="principle__photo">
            <img
              :src="p.img"
              :alt="p.title"
              loading="lazy"
            >
          </figure>
          <div class="principle__body">
            <span class="principle__frame">{{ p.num }}</span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.body }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.principles {
  padding: 5rem 3rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid var(--rule);
}
.principles__inner { max-width: 100%; }
.principles__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2.5rem;
}
.principle {
  position: relative;
  background: var(--paper);
  border: 1px solid var(--rule);
  padding: 0 0 1.8rem;
  font-family: var(--font-sans);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  overflow: hidden;
}
.principle__photo {
  margin: 0 0 1.4rem;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--paper-deep);
  position: relative;
}
.principle__photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(31, 26, 21, 0.18));
  pointer-events: none;
}
.principle__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.2) contrast(1.05) saturate(0.88);
  transition: transform 0.6s ease, filter 0.4s ease;
}
.principle:hover .principle__photo img {
  transform: scale(1.04);
  filter: sepia(0.15) contrast(1.08) saturate(0.95);
}
.principle__body {
  padding: 0 1.6rem;
}
.principle:hover {
  transform: translateY(-4px) rotate(-0.4deg);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
}
.principle__frame {
  position: absolute;
  top: -10px;
  left: 14px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  background: var(--paper);
  padding: 0 6px;
  color: var(--warm);
  border: 1px solid var(--warm);
}
.principle h3 {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0.6rem 0 0.8rem;
  color: var(--ink);
  letter-spacing: 0.04em;
}
.principle p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 0;
}
@media (max-width: 900px) {
  .principles { padding: 3rem 1.5rem 2.5rem; }
  .principles__grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .principle__photo { aspect-ratio: 16 / 9; }
}
</style>
