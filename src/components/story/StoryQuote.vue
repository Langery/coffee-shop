<script setup>
defineProps({
  quoteImg: { type: String, required: true }
})
</script>

<template>
  <section
    id="quote"
    class="story-quote"
  >
    <div class="story-quote__polaroid tilt-c">
      <figure class="story-quote__photo">
        <img
          :src="quoteImg"
          alt="拾光咖啡馆店内"
          loading="lazy"
        >
      </figure>
      <blockquote>
        <span class="quote-mark">"</span>
        我们不卖咖啡，<br>
        我们卖的是<span class="quote-em">「慢下来的九十秒」</span>。
        <span class="quote-mark">"</span>
      </blockquote>
      <cite>
        <span class="typewriter">— 苏先生 · 拾光主理人</span>
        <span class="story-quote__date typewriter">2026 · ROLL 06 · FRAME 20A</span>
      </cite>
    </div>
  </section>
</template>

<style scoped>
.story-quote {
  padding: 5rem 3rem;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.story-quote__polaroid {
  position: relative;
  background: var(--paper);
  border: 1px solid var(--rule);
  padding: 1.4rem 2.5rem 2rem;
  text-align: center;
  max-width: 640px;
  width: 100%;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.story-quote__photo {
  margin: -0.4rem 0 1.6rem;
  width: calc(100% + 5rem);
  margin-left: -2.5rem;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
}
.story-quote__photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(245, 241, 232, 0.6) 100%);
  pointer-events: none;
}
.story-quote__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.25) contrast(1.08) saturate(0.85) brightness(0.95);
}
.story-quote__polaroid blockquote {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  line-height: 1.6;
  color: var(--ink);
  margin: 0 0 1.5rem;
  letter-spacing: 0.02em;
}
.quote-mark {
  font-family: var(--font-serif);
  font-size: 2.4rem;
  color: var(--warm);
  font-weight: 600;
  line-height: 0;
  margin: 0 0.1em;
  vertical-align: -0.3em;
}
.quote-em {
  color: var(--warm);
  font-weight: 500;
}
.story-quote__polaroid cite {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-style: normal;
  font-size: 0.85rem;
  color: var(--ink-soft);
}
.story-quote__date {
  color: var(--warm);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
}
@media (max-width: 900px) {
  .story-quote__polaroid { padding: 1rem 1.2rem 1.2rem; }
  .story-quote__polaroid blockquote { font-size: 1.05rem; line-height: 1.5; }
}
</style>
