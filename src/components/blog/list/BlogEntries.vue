<script setup>
defineProps({
  posts: { type: Array, required: true }
})

const emit = defineEmits(['open'])

function imgCover (post) {
  return post.cover || '/coffee-shop/milestone-2018.jpg'
}
function open (id) { emit('open', id) }
</script>

<template>
  <section class="b-entries">
    <article
      v-for="(post, i) in posts"
      :key="post.id"
      :class="['entry', `entry--${i % 3}`, 'tilt-c']"
      :style="{ '--i': i }"
      @click="open(post.id)"
    >
      <div class="entry__frame">
        <div class="duotone">
          <img
            :src="imgCover(post)"
            :alt="post.title"
          >
        </div>
        <span class="entry__num">F·{{ String(4 + i).padStart(2, '0') }}</span>
        <span class="entry__cat">{{ post.category }}</span>
        <span class="entry__tape" />
      </div>
      <div class="entry__body">
        <div class="entry__meta">
          <span class="entry__date typewriter">{{ post.date }}</span>
          <span class="entry__author typewriter">{{ post.author }}</span>
          <span class="entry__reading typewriter">{{ post.reading }} MIN READ</span>
        </div>
        <h3>{{ post.title }}</h3>
        <p class="entry__excerpt">
          {{ post.excerpt }}
        </p>
        <span class="entry__cta">阅读全文 →</span>
      </div>
    </article>
  </section>
</template>

<style scoped>
.b-entries {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  padding: 2rem 3rem 6rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: start;
}
.entry {
  background: var(--paper-light);
  cursor: pointer;
  transition: transform 0.4s, box-shadow 0.4s;
  border: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 8px rgba(31, 26, 21, 0.1);
  opacity: 0;
  animation: entryEnter 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: calc(0.1s + var(--i, 0) * 0.12s);
}
@keyframes entryEnter {
  0% { opacity: 0; transform: translateY(24px) rotate(0deg); }
  100% { opacity: 1; }
}
.entry:hover { transform: translateY(-6px) rotate(-0.5deg); box-shadow: 0 10px 20px rgba(31, 26, 21, 0.18); }
.entry--0 { grid-column: 1 / span 7; }
.entry--1 { grid-column: 8 / span 5; margin-top: 4rem; }
.entry--2 { grid-column: 2 / span 6; margin-top: 1rem; }
.entry--3 { grid-column: 8 / span 5; margin-top: 2rem; }
.entry--4 { grid-column: 1 / span 6; margin-top: 1rem; }

.entry__frame {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--ink);
}
.entry__num {
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  background: var(--warm);
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  padding: 0.3rem 0.6rem;
  z-index: 2;
  font-weight: 600;
}
.entry__cat {
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-type);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--ink);
  font-weight: 600;
}
.entry__tape {
  position: absolute;
  top: -8px;
  left: 30%;
  width: 50px;
  height: 18px;
  background: rgba(255, 255, 255, 0.85);
  transform: rotate(-3deg);
  z-index: 2;
  box-shadow: 0 1px 2px rgba(31, 26, 21, 0.08);
}
.entry__body { padding: 1.8rem; }
.entry__meta {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 0.8rem;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--warm);
  font-weight: 600;
}
.entry__date, .entry__author, .entry__reading { color: var(--ink-soft); }
.entry h3 {
  font-family: var(--font-cjk);
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  line-height: 1.3;
  letter-spacing: 0.02em;
}
.entry__excerpt {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--ink-soft);
  margin-bottom: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.entry__cta {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--warm);
  font-weight: 600;
}

@media (max-width: 900px) {
  .b-entries { grid-template-columns: 1fr; padding: 2rem 1rem 4rem; }
  .entry--0, .entry--1, .entry--2, .entry--3, .entry--4 { grid-column: 1; margin-top: 0; }
}
</style>