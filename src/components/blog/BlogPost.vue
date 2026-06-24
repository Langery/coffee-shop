<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  post: { type: Object, required: true }
})

const router = useRouter()
const imgCover = (post) => post.cover || '/coffee-shop/milestone-2018.jpg'

// 阅读进度 (单篇) — element-level 进度,跟 useScrollProgress (page-level) 不同
const readProgress = ref(0)
const onScroll = () => {
  const el = document.querySelector('.blog-post')
  if (!el) return
  const rect = el.getBoundingClientRect()
  const total = rect.height - window.innerHeight
  const scrolled = -rect.top
  readProgress.value = Math.max(0, Math.min(100, (scrolled / total) * 100))
}
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => { window.removeEventListener('scroll', onScroll) })
</script>

<template>
  <div class="blog-post">
    <!-- 阅读进度条 -->
    <div
      class="read-progress"
      :style="{ '--p': readProgress + '%' }"
      aria-hidden="true"
    >
      <div class="read-progress__bar" />
      <span class="read-progress__label typewriter">{{ Math.round(readProgress) }}% READ</span>
    </div>
    <article class="post">
      <header class="post__header">
        <button
          class="post__back"
          @click="router.push({ name: 'blog' })"
        >
          ← 回到随笔
        </button>
        <div class="post__meta-top">
          <span class="post__cat">{{ post.category }}</span>
          <span class="post__date typewriter">{{ post.date }}</span>
        </div>
        <h1 class="post__title">
          {{ post.title }}
        </h1>
        <p class="post__excerpt">
          {{ post.excerpt }}
        </p>
        <div class="post__byline">
          <span class="typewriter">BY {{ post.author }}</span>
          <span class="meta-sep">·</span>
          <span class="typewriter">{{ post.reading }} MIN READ</span>
        </div>
      </header>
      <figure class="post__cover">
        <div class="duotone">
          <img
            :src="imgCover(post)"
            :alt="post.title"
          >
        </div>
        <figcaption class="typewriter">
          FRAME 0{{ post.id.toUpperCase() }}A · {{ post.date }}
        </figcaption>
      </figure>
      <div class="post__body">
        <p
          v-for="(p, i) in post.body"
          :key="i"
          :class="{ 'post__lead': i === 0 }"
        >
          <template v-if="i === 0">
            <span class="dropcap">{{ p[0] }}</span>
            <span>{{ p.slice(1) }}</span>
          </template>
          <template v-else>
            {{ p }}
          </template>
        </p>
      </div>
      <footer class="post__footer">
        <button
          class="post__back"
          @click="router.push({ name: 'blog' })"
        >
          ← 浏览所有随笔
        </button>
        <span class="post__end typewriter">— END OF ROLL —</span>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.blog-post {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
  padding: 4rem 3rem 6rem;
  max-width: 900px;
  margin: 0 auto;
}
.meta-sep { color: var(--rule); margin: 0 0.4rem; }

.post__header { margin-bottom: 3rem; }
.post__back {
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--warm);
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--warm);
  margin-bottom: 2rem;
  font-weight: 600;
}
.post__back:hover { color: var(--ink); border-color: var(--ink); }
.post__meta-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.post__cat {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--paper);
  background: var(--warm);
  padding: 0.3rem 0.7rem;
  font-weight: 600;
}
.post__date { font-size: 0.75rem; color: var(--ink-soft); }
.post__title {
  font-family: var(--font-cjk);
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
}
.post__excerpt {
  font-family: var(--font-cjk);
  font-style: italic;
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--ink-soft);
  margin-bottom: 1.5rem;
}
.post__byline {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  text-transform: uppercase;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--rule);
}

.post__cover {
  margin: 3rem 0;
  position: relative;
}
.post__cover .duotone { background: var(--paper-deep); }
.post__cover img { width: 100%; height: auto; aspect-ratio: 16/9; object-fit: cover; }
.post__cover figcaption {
  text-align: center;
  padding: 0.8rem;
  font-size: 0.7rem;
  color: var(--ink-soft);
  letter-spacing: 0.2em;
}

.post__body {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  line-height: 2;
  color: var(--ink);
}
.post__body p { margin-bottom: 1.5rem; }
.post__lead { font-size: 1.2rem; line-height: 1.9; }
.dropcap {
  font-family: var(--font-serif);
  font-size: 4.5rem;
  font-weight: 800;
  float: left;
  line-height: 0.85;
  margin: 0.3rem 0.5rem 0 0;
  color: var(--warm);
  font-style: italic;
}

/* ============ READ PROGRESS (单篇阅读) ============ */
.read-progress {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 32px;
  background: var(--paper-light);
  border-bottom: 1px solid var(--rule);
  display: flex;
  align-items: center;
  padding: 0 3rem;
  gap: 1rem;
  margin-bottom: 2rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  text-transform: uppercase;
}
.read-progress__bar {
  flex: 1;
  height: 3px;
  background: var(--rule);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}
.read-progress__bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: var(--p, 0%);
  height: 100%;
  background: linear-gradient(90deg, var(--warm), var(--warm-deep));
  transition: width 0.1s linear;
}
.read-progress__label {
  flex-shrink: 0;
  min-width: 80px;
  text-align: right;
  color: var(--warm);
  font-weight: 600;
}

.post__footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--rule);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.post__end { font-size: 0.7rem; letter-spacing: 0.25em; color: var(--warm); }

@media (max-width: 900px) {
  .blog-post { padding: 2rem 1.5rem; }
  .read-progress { padding: 0 1.5rem; height: 28px; font-size: 0.6rem; }
  .read-progress__label { min-width: 60px; }
}
</style>