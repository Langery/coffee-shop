<script setup>
defineProps({
  stats: { type: Array, required: true }
})
</script>

<template>
  <section
    id="stats"
    class="story-stats"
  >
    <div
      v-for="(s, i) in stats"
      :key="i"
      class="story-stat"
    >
      <span class="story-stat__frame">{{ s.frame }}</span>
      <span class="story-stat__num">{{ s.num }}</span>
      <span class="story-stat__label">{{ s.label }}</span>
      <span class="story-stat__sub typewriter">{{ s.sub }}</span>
      <span class="story-stat__note">{{ s.note }}</span>
      <span class="story-stat__deco" />
    </div>
  </section>
</template>

<style scoped>
.story-stats {
  padding: 3.5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px dashed var(--rule);
  border-bottom: 1px dashed var(--rule);
  position: relative;
}
.story-stats::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: var(--warm);
}
.story-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.2rem 1.4rem 1.4rem;
  position: relative;
  border-right: 1px dashed var(--rule);
  transition: transform 0.4s ease;
}
.story-stat:last-child { border-right: none; }
.story-stat:hover { transform: translateY(-3px); }
.story-stat__deco {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: var(--warm);
  opacity: 0.5;
  transition: width 0.4s ease, opacity 0.4s ease;
}
.story-stat:hover .story-stat__deco { width: 48px; opacity: 1; }
.story-stat__frame {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: var(--warm);
  margin-bottom: 0.5rem;
  display: block;
}
.story-stat__num {
  font-family: var(--font-serif);
  font-size: 2.6rem;
  font-weight: 300;
  color: var(--ink);
  line-height: 1;
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}
.story-stat__label {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--ink);
  margin-bottom: 0.3rem;
  letter-spacing: 0.05em;
}
.story-stat__sub {
  font-size: 0.7rem;
  color: var(--ink-soft);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  display: block;
}
.story-stat__note {
  font-family: var(--font-type);
  font-size: 0.7rem;
  color: var(--warm-deep);
  letter-spacing: 0.05em;
  margin-top: 0.3rem;
  padding-top: 0.4rem;
  border-top: 1px dotted var(--rule);
  display: block;
  width: 80%;
}
@media (max-width: 900px) {
  .story-stats {
    grid-template-columns: repeat(2, 1fr);
    padding: 2.5rem 1.5rem;
    gap: 1.5rem 0;
  }
  .story-stat:nth-child(2) { border-right: none; }
  .story-stat:nth-child(1), .story-stat:nth-child(2) { border-bottom: 1px dashed var(--rule); padding-bottom: 2rem; }
}
</style>
