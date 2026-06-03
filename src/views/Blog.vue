<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { blogPosts } from '../data/index.js'

const router = useRouter()
const route = useRoute()

const activeCategory = ref('all')
const categories = computed(() => ['all', ...new Set(blogPosts.map(p => p.category))])
const filteredPosts = computed(() =>
  activeCategory.value === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory.value)
)

const openPost = (id) => router.push(`/blog/${id}`)

const currentPost = computed(() => {
  const id = route.params.id
  return blogPosts.find(p => p.id === id)
})

const imgCover = (post) => post.cover || '/coffee-shop/hero.jpg'
</script>

<template>
  <!-- 列表视图 -->
  <div v-if="!currentPost" class="blog-list">
    <section class="b-hero">
      <div class="b-hero__head">
        <span class="datestamp">FRAME 04 · JOURNAL</span>
        <span class="b-hero__roll">4 ENTRIES · 5 CATEGORIES</span>
      </div>
      <h1 class="b-hero__title">
        咖啡、文字、<br />
        与<span class="b-hero__title-warm">慢时间</span>
      </h1>
      <p class="b-hero__lead">
        关于一杯咖啡背后的所有事——产区故事、调饮实验、空间随笔、节气手记。
      </p>
    </section>

    <section class="b-cats">
      <button
        v-for="(c, i) in categories"
        :key="c"
        :class="['cat', { active: activeCategory === c }]"
        @click="activeCategory = c"
      >
        <span class="cat__num">F·{{ String(4 + i).padStart(2, '0') }}</span>
        <span class="cat__label">{{ c === 'all' ? '全部' : c }}</span>
        <span class="cat__count">({{ c === 'all' ? blogPosts.length : blogPosts.filter(p => p.category === c).length }})</span>
      </button>
    </section>

    <section class="b-entries">
      <article
        v-for="(post, i) in filteredPosts"
        :key="post.id"
        :class="['entry', `entry--${i % 3}`, 'tilt-c']"
        @click="openPost(post.id)"
      >
        <div class="entry__frame">
          <div class="duotone"><img :src="imgCover(post)" :alt="post.title" /></div>
          <span class="entry__num">F·{{ String(4 + i).padStart(2, '0') }}</span>
          <span class="entry__cat">{{ post.category }}</span>
          <span class="entry__tape"></span>
        </div>
        <div class="entry__body">
          <div class="entry__meta">
            <span class="entry__date typewriter">{{ post.date }}</span>
            <span class="entry__author typewriter">{{ post.author }}</span>
            <span class="entry__reading typewriter">{{ post.reading }} MIN READ</span>
          </div>
          <h3>{{ post.title }}</h3>
          <p class="entry__excerpt">{{ post.excerpt }}</p>
          <span class="entry__cta">阅读全文 →</span>
        </div>
      </article>
    </section>
  </div>

  <!-- 单篇阅读视图 -->
  <div v-else class="blog-post">
    <article class="post">
      <header class="post__header">
        <button class="post__back" @click="router.push({ name: 'blog' })">← 回到随笔</button>
        <div class="post__meta-top">
          <span class="post__cat">{{ currentPost.category }}</span>
          <span class="post__date typewriter">{{ currentPost.date }}</span>
        </div>
        <h1 class="post__title">{{ currentPost.title }}</h1>
        <p class="post__excerpt">{{ currentPost.excerpt }}</p>
        <div class="post__byline">
          <span class="typewriter">BY {{ currentPost.author }}</span>
          <span class="meta-sep">·</span>
          <span class="typewriter">{{ currentPost.reading }} MIN READ</span>
        </div>
      </header>
      <figure class="post__cover">
        <div class="duotone"><img :src="imgCover(currentPost)" :alt="currentPost.title" /></div>
        <figcaption class="typewriter">FRAME 0{{ currentPost.id.toUpperCase() }}A · {{ currentPost.date }}</figcaption>
      </figure>
      <div class="post__body">
        <p
          v-for="(p, i) in currentPost.body"
          :key="i"
          :class="{ 'post__lead': i === 0 }"
        >
          <template v-if="i === 0">
            <span class="dropcap">{{ p[0] }}</span>
            <span>{{ p.slice(1) }}</span>
          </template>
          <template v-else>{{ p }}</template>
        </p>
      </div>
      <footer class="post__footer">
        <button class="post__back" @click="router.push({ name: 'blog' })">← 浏览所有随笔</button>
        <span class="post__end typewriter">— END OF ROLL —</span>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.blog-list, .blog-post {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
  padding-bottom: 2rem;
}
.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--ink-soft);
  display: inline-block;
  margin-bottom: 1.2rem;
  font-weight: 600;
}
.eyebrow--accent { color: var(--warm); }
.datestamp { color: var(--warm); border-color: var(--warm); }
.meta-sep { color: var(--rule); margin: 0 0.4rem; }

/* ============ LIST HERO ============ */
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

/* ============ CATEGORIES ============ */
.b-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 2.5rem 3rem;
  max-width: 1300px;
  margin: 0 auto;
  justify-content: center;
}
.cat {
  background: var(--paper-light);
  border: 1px solid var(--rule);
  padding: 0.6rem 1.1rem;
  cursor: pointer;
  font-family: var(--font-sans);
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  color: var(--ink-soft);
  transition: all 0.2s;
}
.cat:hover { border-color: var(--ink); color: var(--ink); }
.cat.active { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.cat__num { font-family: var(--font-mono); font-size: 0.62rem; color: var(--warm); }
.cat.active .cat__num { color: var(--warm); }
.cat__label { font-size: 0.92rem; font-weight: 600; }
.cat__count { font-family: var(--font-mono); font-size: 0.7rem; opacity: 0.7; }

/* ============ ENTRIES ============ */
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

/* ============ POST (单篇) ============ */
.blog-post { padding: 4rem 3rem 6rem; max-width: 900px; margin: 0 auto; }
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

/* ============ RESPONSIVE ============ */
@media (max-width: 900px) {
  .b-entries { grid-template-columns: 1fr; padding: 2rem 1rem 4rem; }
  .entry--0, .entry--1, .entry--2, .entry--3, .entry--4 { grid-column: 1; margin-top: 0; }
  .b-hero, .b-cats, .blog-post { padding-left: 1.5rem; padding-right: 1.5rem; }
  .blog-post { padding-top: 2rem; }
}
</style>
