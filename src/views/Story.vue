<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Lightbox from '../components/Lightbox.vue'
const router = useRouter()

const activeFrame = ref(0) // 从 0 开始 (第一帧就显示)
let timer = null
let phase = 'show' // 'show' = 显示当前帧, 'fade' = 切换中

const startAutoplay = () => {
  stopAutoplay()
  // 三段式循环: show (停留 2.2s) → fade (0.6s 切下一帧)
  const tick = () => {
    if (phase === 'show') {
      phase = 'fade'
      timer = setTimeout(() => {
        activeFrame.value = (activeFrame.value + 1) % milestones.length
        phase = 'show'
        timer = setTimeout(tick, 2200)
      }, 600)
    }
  }
  timer = setTimeout(tick, 2200) // 启动后 2.2s 进入 fade
}
const stopAutoplay = () => {
  if (timer) { clearTimeout(timer); timer = null }
  phase = 'show'
}

onMounted(() => {
  // 延迟 1s 启动，给页面渲染时间
  setTimeout(startAutoplay, 1000)
})
onBeforeUnmount(stopAutoplay)

const onFrameClick = (i) => {
  stopAutoplay()
  lightboxFrame.value = { ...milestones[i] }
  lightboxOpen.value = true
}
const onFrameHover = () => stopAutoplay()
const onFrameLeave = () => {
  // 鼠标移开 3s 后恢复轮播
  setTimeout(() => {
    if (!lightboxOpen.value) startAutoplay()
  }, 3000)
}

// Lightbox
const lightboxOpen = ref(false)
const lightboxFrame = ref(null)
const closeLightbox = () => {
  lightboxOpen.value = false
  setTimeout(startAutoplay, 500) // 关灯箱后 0.5s 恢复轮播
}

const milestones = [
  { year: '2010', frame: '00A', text: '主理人苏先生在云南普洱产区开始学习咖啡种植与杯测。', img: '/coffee-shop/milestone-2010.jpg' },
  { year: '2014', frame: '01A', text: '云南小粒种在国际杯测中首次突破 85 分，进入精品区间。', img: '/coffee-shop/milestone-2014.jpg' },
  { year: '2018', frame: '02A', text: '拾光咖啡在三里屯旧巷开张，只有一台手冲壶与一款危地马拉豆。', img: '/coffee-shop/milestone-2018.jpg' },
  { year: '2020', frame: '03A', text: '第二家店于上海安福路开张，引入甜点主厨王沐。', img: '/coffee-shop/milestone-2020.jpg' },
  { year: '2022', frame: '04A', text: '调饮师陈芷加入，开启「节气咖啡」系列。', img: '/coffee-shop/milestone-2022.jpg' },
  { year: '2024', frame: '05A', text: '拾光学院成立，开设手冲萃取与杯测课程。', img: '/coffee-shop/milestone-2024.jpg' },
  { year: '2026', frame: '06A', text: '累计供应超过 24 万杯手冲咖啡。', img: '/coffee-shop/milestone-2026.jpg' }
]

const principles = [
  { num: 'F·11', title: '只用手冲', body: '不卖意式机出品的「美式」「拿铁」——只用手冲与冷萃，每杯都由咖啡师手工萃取。' },
  { num: 'F·12', title: '只用当季', body: '生豆按季节轮换，不使用库存超过 6 个月的豆子。每批豆子都会标注入店日期。' },
  { num: 'F·13', title: '只用心', body: '不为了效率引入任何「一键式」冲煮设备。手冲的变量是「人」，不是「机器」。' }
]

const stats = [
  { num: '07', label: '年时光', sub: 'years' },
  { num: '02', label: '家门店', sub: 'locations' },
  { num: '12', label: '款当季豆', sub: 'origins' },
  { num: '240K+', label: '杯手冲', sub: 'brews' }
]
const ctaImg = '/coffee-shop/product-1.jpg'
</script>

<template>
  <div class="story-page">
    <!-- HERO (胶片号 + 印章) -->
    <section class="story-hero">
      <div class="story-hero__head">
        <span class="datestamp">FRAME 09–15</span>
        <span class="story-hero__roll">EXPOSED 2026.06</span>
      </div>
      <h1 class="story-hero__title">
        从一台手冲壶<br />
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
    </section>

    <!-- 时序轴 (胶卷一行 + 中央大图 + 两侧缩略) -->
    <section class="timeline">
      <header class="timeline__head">
        <span class="eyebrow eyebrow--accent">A TIMELINE · 时光轴</span>
        <h2>七帧碎片</h2>
      </header>

      <!-- 中央大字 + 描述 (随 active 切换) -->
      <div class="timeline__spotlight">
        <Transition name="reveal" mode="out-in">
          <div :key="activeFrame" class="timeline__spotlight-inner">
            <figure class="timeline__spotlight-photo">
              <div class="duotone"><img :src="milestones[activeFrame].img" :alt="milestones[activeFrame].year + ' · 拾光咖啡'" /></div>
              <figcaption class="typewriter">{{ milestones[activeFrame].year }} · 时光切片</figcaption>
            </figure>
            <div class="timeline__spotlight-text">
              <span class="timeline__spotlight-year">{{ milestones[activeFrame].year }}</span>
              <h3 class="timeline__spotlight-title">{{ milestones[activeFrame].frame }} · {{ milestones[activeFrame].text.slice(0, 14) }}...</h3>
              <p class="timeline__spotlight-body">{{ milestones[activeFrame].text }}</p>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 7 帧胶片一行 (中央大图 + 两侧缩略) -->
      <div class="filmstrip">
        <ol class="filmstrip__list">
          <li v-for="(m, i) in milestones" :key="m.year" class="filmstrip__frame" :class="{ 'is-active': activeFrame === i, 'is-side': i !== activeFrame }" :data-idx="i" @click="onFrameClick(i)" @mouseenter="onFrameHover" @mouseleave="onFrameLeave" role="button" tabindex="0" @keydown.enter="onFrameClick(i)">
            <div class="filmstrip__plate">
              <span class="filmstrip__sprocket filmstrip__sprocket--top" aria-hidden="true"></span>
              <span class="filmstrip__sprocket filmstrip__sprocket--bottom" aria-hidden="true"></span>
              <div class="filmstrip__plate-photo"><img :src="m.img" :alt="m.year" /></div>
              <span class="filmstrip__frame-no">{{ m.frame }}</span>
              <span class="filmstrip__year">{{ m.year }}</span>
            </div>
          </li>
        </ol>

        <!-- 7 颗胶片孔 (进度) -->
        <div class="filmstrip__sprockets">
          <span v-for="(_, i) in milestones" :key="i" class="filmstrip__sprocket-bar" :class="{ 'is-active': activeFrame === i }"></span>
        </div>
      </div>
    </section>

    <!-- 原则三章 (拍立得卡) -->
    <section class="principles">
      <div class="principles__inner">
        <header class="section-head--inline">
          <span class="stamp">PRINCIPLES · F·11–13</span>
          <h2>三个坚持</h2>
        </header>
        <div class="principles__grid">
          <article v-for="p in principles" :key="p.num" class="principle">
            <span class="principle__frame">{{ p.num }}</span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- 数字 -->
    <section class="story-stats">
      <div v-for="(s, i) in stats" :key="i" class="story-stat">
        <span class="story-stat__frame">F·{{ String(16 + i).padStart(2, '0') }}</span>
        <span class="story-stat__num">{{ s.num }}</span>
        <span class="story-stat__label">{{ s.label }}</span>
        <span class="story-stat__sub typewriter">{{ s.sub }}</span>
      </div>
    </section>

    <!-- 大幅引语 (拍立得卡) -->
    <section class="story-quote">
      <div class="story-quote__polaroid tilt-c">
        <blockquote>
          <span class="quote-mark">"</span>
          我们不卖咖啡，<br />
          我们卖的是<span class="quote-em">「慢下来的九十秒」</span>。
          <span class="quote-mark">"</span>
        </blockquote>
        <cite>
          <span class="typewriter">— 苏先生 · 拾光主理人</span>
          <span class="story-quote__date typewriter">2026 · ROLL 06 · FRAME 20A</span>
        </cite>
      </div>
    </section>

    <!-- 行动召唤 -->
    <section class="story-cta">
      <div class="story-cta__inner">
        <figure class="story-cta__photo">
          <div class="duotone"><img :src="ctaImg" alt="拾光咖啡 · 吧台一隅" /></div>
          <figcaption class="story-cta__caption typewriter">F·21 · 吧台一隅</figcaption>
        </figure>
        <div class="story-cta__text">
          <span class="datestamp">F·21 · VISIT</span>
          <h2>准备好<br />坐下来喝一杯了吗？</h2>
          <p class="story-cta__lead">三里屯旧巷的一台手冲壶，七年来只做一件事：把当季最好的豆子，呈现给你。</p>
          <div class="story-cta__buttons">
            <button class="btn-primary" @click="router.push({ name: 'home', hash: '#menu' })">浏览菜单</button>
            <button class="btn-ghost" @click="router.push({ name: 'home', hash: '#contact' })">联系方式</button>
          </div>
        </div>
      </div>
    </section>

    <Lightbox :open="lightboxOpen" :frame="lightboxFrame" @close="closeLightbox" />
  </div>
</template>

<style scoped>
.story-page {
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

/* ============ HERO ============ */
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

/* ============ TIMELINE (七帧碎片 · 胶卷一行 · 牛皮纸底) ============ */
.timeline {
  padding: 5rem 3rem 6rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  background: var(--paper);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  overflow: hidden;
  isolation: isolate;
}
/* 极细纤维纹理 (SVG feTurbulence 噪点) */
.timeline::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.10 0 0 0 0 0.08 0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  background-size: 240px 240px;
  opacity: 0.55;
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: multiply;
}
/* 斜条纹底纹 (库布里克感) + 顶/底 sepia 暖色淡影 */
.timeline::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(217, 122, 60, 0.10), transparent 18%),
    linear-gradient(to top, rgba(217, 122, 60, 0.10), transparent 18%),
    repeating-linear-gradient(
      30deg,
      transparent 0,
      transparent 18px,
      rgba(60, 40, 20, 0.06) 18px,
      rgba(60, 40, 20, 0.06) 19px
    );
  pointer-events: none;
  z-index: 0;
}
.timeline > * { position: relative; z-index: 1; }
.timeline__spotlight {
  text-align: center;
  margin: 1.5rem 0 4rem;
  min-height: 180px;
  position: relative;
}
.timeline__spotlight-inner {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  align-items: center;
  max-width: 820px;
  margin: 0 auto;
}
.timeline__spotlight-photo {
  margin: 0;
  position: relative;
}
.timeline__spotlight-photo .duotone {
  width: 100%;
  aspect-ratio: 4 / 3;
  background: var(--ink);
  overflow: hidden;
  border: 1px solid var(--rule);
  transform: rotate(-0.8deg);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
}
.timeline__spotlight-photo .duotone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: sepia(0.18) contrast(1.05) saturate(0.9);
}
.timeline__spotlight-photo figcaption {
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%) rotate(-0.8deg);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  color: var(--warm);
  white-space: nowrap;
}
.timeline__spotlight-text {
  text-align: left;
}
.timeline__spotlight-year {
  display: block;
  font-family: var(--font-serif);
  font-size: 3.6rem;
  font-weight: 300;
  color: var(--warm);
  letter-spacing: 0.06em;
  line-height: 1;
}
.timeline__spotlight-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 400;
  color: var(--ink-soft);
  margin: 0.2rem 0 0;
  letter-spacing: 0.05em;
}
.timeline__spotlight-body {
  font-size: 0.95rem;
  color: var(--ink-soft);
  max-width: 360px;
  margin: 0.4rem auto 0;
  line-height: 1.6;
}
/* reveal 切换动画 */
.reveal-enter-active, .reveal-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.reveal-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* 7 帧胶片一行 (中央大图 + 两侧缩略) */
.filmstrip {
  position: relative;
  padding: 0 1rem;
}
.filmstrip__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
}
.filmstrip__frame {
  cursor: pointer;
  flex: 0 0 auto;
  transition: transform 0.6s ease, opacity 0.5s ease;
}
.filmstrip__plate {
  position: relative;
  background: var(--paper);
  border: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 0.5rem 0.6rem;
  transition: all 0.6s ease;
  overflow: hidden;
}
.filmstrip__plate-photo {
  position: absolute;
  inset: 6px 6px 28px 6px;
  overflow: hidden;
  background: var(--ink);
}
.filmstrip__plate-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: sepia(0.22) contrast(1.05) saturate(0.85);
}
/* 中央大图 (active) */
.filmstrip__frame.is-active .filmstrip__plate {
  width: 220px;
  height: 260px;
  border-color: var(--warm);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
  background: var(--paper);
}
/* 两侧缩略 */
.filmstrip__frame.is-side .filmstrip__plate {
  width: 96px;
  height: 120px;
  opacity: 0.5;
}
.filmstrip__frame.is-side:hover .filmstrip__plate {
  opacity: 0.85;
}
/* 胶片孔 (板内顶部底部) */
.filmstrip__sprocket {
  position: absolute;
  left: 12px;
  right: 12px;
  height: 6px;
  background: radial-gradient(circle, var(--paper-deep) 1.5px, transparent 1.5px) repeat-x;
  background-size: 8px 6px;
}
.filmstrip__sprocket--top { top: 8px; }
.filmstrip__sprocket--bottom { bottom: 8px; }
.filmstrip__frame-no {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  color: var(--ink-soft);
  margin-top: 1.2rem;
}
.filmstrip__frame.is-active .filmstrip__frame-no {
  color: var(--warm);
  letter-spacing: 0.22em;
}
.filmstrip__year {
  font-family: var(--font-serif);
  font-weight: 300;
  margin-top: 0.2rem;
}
.filmstrip__frame.is-active .filmstrip__year {
  font-size: 1.8rem;
  color: var(--ink);
}
.filmstrip__frame.is-side .filmstrip__year {
  font-size: 0.85rem;
  color: var(--ink-soft);
}

/* 底部 7 颗胶片孔进度 */
.filmstrip__sprockets {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 2rem;
}
.filmstrip__sprocket-bar {
  width: 32px;
  height: 6px;
  background: var(--rule);
  transition: background 0.4s ease, width 0.4s ease;
}
.filmstrip__sprocket-bar.is-active {
  background: var(--warm);
  width: 48px;
}


/* ============ RESPONSIVE ============ */
@media (max-width: 900px) {
  .filmstrip__list { flex-wrap: wrap; gap: 10px; }
  .filmstrip__frame { padding-left: 0; padding-right: 0; }
  .filmstrip__plate { max-width: 100%; }
  .timeline__spotlight-inner { grid-template-columns: 1fr; gap: 1.5rem; }
  .timeline__spotlight-text { text-align: center; }
  .timeline__spotlight-photo { max-width: 280px; margin: 0 auto; }
  .story-cta__inner { grid-template-columns: 1fr; gap: 2rem; }
  .story-cta__photo { max-width: 280px; margin: 0 auto; }
  .story-cta__text { text-align: center; }
  .story-cta__lead { margin-left: auto; margin-right: auto; }
  .story-cta__buttons { justify-content: center; }
}

/* ============ 原则三章 (拍立得卡) ============ */
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
  padding: 2rem 1.6rem 1.8rem;
  font-family: var(--font-sans);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
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

/* ============ 数字 (stat cards) ============ */
.story-stats {
  padding: 4rem 3rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  border-top: 1px dashed var(--rule);
  border-bottom: 1px dashed var(--rule);
}
.story-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1rem;
  position: relative;
}
.story-stat__frame {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: var(--warm);
  margin-bottom: 0.6rem;
}
.story-stat__num {
  font-family: var(--font-serif);
  font-size: 3rem;
  font-weight: 300;
  color: var(--ink);
  line-height: 1;
  margin-bottom: 0.5rem;
}
.story-stat__label {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--ink);
  margin-bottom: 0.4rem;
  letter-spacing: 0.05em;
}
.story-stat__sub {
  font-size: 0.78rem;
  color: var(--ink-soft);
  letter-spacing: 0.08em;
}

/* ============ 大幅引语 (拍立得卡) ============ */
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
  padding: 3rem 2.5rem 2rem;
  text-align: center;
  max-width: 640px;
  width: 100%;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
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

/* ============ CTA (左侧 duotone 配图 + 右侧文) ============ */
.story-cta {
  padding: 5rem 3rem 6rem;
  max-width: 1100px;
  margin: 0 auto;
  border-top: 1px solid var(--rule);
}
.story-cta__inner {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3.5rem;
  align-items: center;
}
.story-cta__photo {
  margin: 0;
  position: relative;
}
.story-cta__photo .duotone {
  width: 100%;
  aspect-ratio: 3 / 4;
  background: var(--ink);
  overflow: hidden;
  border: 1px solid var(--rule);
  transform: rotate(-1.2deg);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}
.story-cta__photo .duotone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.story-cta__caption {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%) rotate(-1.2deg);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: var(--warm);
  white-space: nowrap;
}
.story-cta__text { text-align: left; }
.story-cta__text h2 {
  font-family: var(--font-serif);
  font-size: 2.4rem;
  font-weight: 300;
  color: var(--ink);
  margin: 0.8rem 0 1rem;
  letter-spacing: 0.04em;
  line-height: 1.3;
}
.story-cta__lead {
  font-size: 0.95rem;
  color: var(--ink-soft);
  line-height: 1.7;
  margin: 0 0 1.8rem;
  max-width: 480px;
}
.story-cta__buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.story-cta .btn-primary {
  background: var(--ink);
  color: var(--warm);
  border: 1px solid var(--ink);
  padding: 0.85rem 1.8rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
}
.story-cta .btn-primary:hover {
  background: var(--warm);
  color: var(--paper);
  border-color: var(--warm);
}
.story-cta .btn-ghost {
  background: var(--paper);
  color: var(--ink);
  border: 1px solid var(--ink);
  padding: 0.85rem 1.8rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
}
.story-cta .btn-ghost:hover {
  background: var(--ink);
  color: var(--paper);
}
</style>
