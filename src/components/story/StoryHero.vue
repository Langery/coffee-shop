<script setup>
import { useScrollProgress } from '@/composables/useScrollProgress'

defineProps({
  toc: { type: Array, required: true }
})

const emit = defineEmits(['navigate'])

// 顶部滚动进度条 — 下沉到 hero 是因为它视觉上是 hero 的"取景框"
const { scrollProgress } = useScrollProgress()

const onTocClick = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  // sticky nav 68px 高度 + 8px 缓冲
  const top = el.getBoundingClientRect().top + window.scrollY - 76
  window.scrollTo({ top, behavior: 'smooth' })
  emit('navigate', id)
}
</script>

<template>
  <section class="story-hero">
    <!-- 滚动进度条 (固定顶部 2px 暖色) -->
    <div
      class="scroll-progress"
      :style="{ width: scrollProgress + '%' }"
      aria-hidden="true"
    />

    <div class="story-hero__head">
      <span class="datestamp">FRAME 09–15</span>
      <span class="story-hero__roll">EXPOSED 2026.06</span>
    </div>
    <h1 class="story-hero__title">
      从一台手冲壶<br>
      开始的<span class="story-hero__title-warm">七年</span>
    </h1>
    <p class="story-hero__lead">
      <span class="dropcap">2</span>
      <span>018 年春天的一个下午，主理人苏先生在三里屯一条旧巷子里找到了现在的店面。他当时想的是：开一家自己想去的咖啡馆。</span>
    </p>
    <div class="story-hero__meta">
      <span>DIRECTED · 苏先生</span>
      <span class="meta-sep">·</span>
      <span>SHOT ON · TRI-X 400</span>
      <span class="meta-sep">·</span>
      <span>ROLL · 06</span>
    </div>

    <!-- 目录速览 (5 章导航) -->
    <nav
      class="story-toc"
      aria-label="本卷目录"
    >
      <span class="story-toc__eyebrow typewriter">— TABLE OF CONTENTS —</span>
      <ol class="story-toc__list">
        <li
          v-for="t in toc"
          :key="t.num"
        >
          <a
            :href="`#${t.sub}`"
            class="story-toc__item"
            @click.prevent="onTocClick(t.sub)"
          >
            <span class="story-toc__num">{{ t.num }}</span>
            <span class="story-toc__label">{{ t.label }}</span>
            <span class="story-toc__sep">·····</span>
            <span class="story-toc__frame typewriter">{{ t.frame }}</span>
          </a>
        </li>
      </ol>
    </nav>
  </section>
</template>

<style scoped>
.story-hero {
  padding: 7rem 3rem 6rem;
  max-width: 1100px;
  margin: 0 auto;
  border-bottom: 1px solid var(--rule);
}
.story-hero__head {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.story-hero__roll {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: var(--ink-soft);
  font-weight: 600;
}
.story-hero__title {
  font-family: var(--font-cjk);
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 800;
  line-height: 1.05;
  margin: 1rem 0 2.5rem;
  letter-spacing: 0.02em;
}
.story-hero__title-warm {
  color: var(--warm);
  font-style: italic;
  position: relative;
}
.story-hero__lead {
  font-family: var(--font-cjk);
  font-size: 1.3rem;
  line-height: 1.9;
  color: var(--ink-soft);
  max-width: 720px;
  margin-bottom: 2.5rem;
}
.dropcap {
  font-family: var(--font-serif);
  font-size: 4rem;
  font-weight: 800;
  float: left;
  line-height: 0.85;
  margin: 0.3rem 0.5rem 0 0;
  color: var(--warm);
  font-style: italic;
}
.story-hero__meta {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  text-transform: uppercase;
  padding-top: 2rem;
  border-top: 1px dashed var(--rule);
}
.meta-sep { color: var(--rule); }

/* 目录速览 (TOC) */
.story-toc {
  margin: 2.5rem auto 0;
  max-width: 720px;
  padding: 1.6rem 1.4rem 1.4rem;
  border: 1px solid var(--rule);
  background: var(--paper-deep);
  position: relative;
}
.story-toc::before {
  content: '';
  position: absolute;
  top: -1px; left: -1px; right: -1px; bottom: -1px;
  border: 1px dashed var(--warm);
  pointer-events: none;
  margin: 4px;
}
.story-toc__eyebrow {
  display: block;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--warm);
  margin-bottom: 1rem;
}
.story-toc__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.story-toc__item {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--ink);
  padding: 0.5rem 0.4rem;
  border-bottom: 1px dotted var(--rule);
  font-family: var(--font-sans);
  font-size: 0.92rem;
  transition: background 0.2s, color 0.2s, padding 0.2s;
  cursor: pointer;
}
.story-toc__item:hover {
  background: var(--paper);
  color: var(--warm);
  padding-left: 0.8rem;
}
.story-toc__item:last-child { border-bottom: none; }
.story-toc__num {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--warm);
  font-weight: 700;
  flex: 0 0 28px;
  letter-spacing: 0.1em;
}
.story-toc__label {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  flex: 0 0 auto;
}
.story-toc__sep {
  flex: 1;
  color: var(--rule);
  overflow: hidden;
  letter-spacing: 0;
  font-size: 0.7rem;
  align-self: center;
}
.story-toc__frame {
  font-size: 0.7rem;
  color: var(--ink-soft);
  letter-spacing: 0.1em;
}

/* 滚动进度条 (放在 hero 视觉范围内) */
.scroll-progress {
  position: fixed;
  top: 68px;
  left: 0;
  height: 2px;
  background: var(--warm);
  z-index: 99; /* < mainnav z=100，让 mainnav 永远在最上 */
  transition: width 0.1s linear;
  pointer-events: none;
  box-shadow: 0 0 6px rgba(184, 84, 58, 0.4);
}

@media (max-width: 900px) {
  .story-hero__title { font-size: 2.2rem; }
  .story-hero__lead { font-size: 1rem; }
  .story-toc { padding: 1.2rem 1rem; }
  .story-toc__label { font-size: 0.95rem; }
  .story-toc__sep { font-size: 0.6rem; }
  .story-toc__frame { font-size: 0.65rem; }
}
</style>
