<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Lightbox from '../components/Lightbox.vue'
import { useScrollProgress } from '@/composables/useScrollProgress'

const router = useRouter()

// 使用 composable 获取滚动进度
const { scrollProgress } = useScrollProgress()

const activeFrame = ref(0)
let timer = null
let phase = 'show'

const startAutoplay = () => {
  stopAutoplay()
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
  timer = setTimeout(tick, 2200)
}
const stopAutoplay = () => {
  if (timer) { clearTimeout(timer); timer = null }
  phase = 'show'
}

onMounted(() => {
  setTimeout(startAutoplay, 1000)
  setTimeout(showLightboxTip, 2500)
})
onBeforeUnmount(() => {
  stopAutoplay()
})

// 目录跳转
const scrollToAnchor = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  // sticky nav 68px 高度 + 8px 缓冲
  const top = el.getBoundingClientRect().top + window.scrollY - 76
  window.scrollTo({ top, behavior: 'smooth' })
}

const onFrameClick = (i) => {
  dismissLightboxTip() // 用户点了帧就 dismiss 提示
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

// 灯箱首次访问提示 (localStorage 记忆)
const lightboxTip = ref(false)
let lightboxTipTimer = null
const showLightboxTip = () => {
  // 已访问过不弹
  if (localStorage.getItem('shiguang.lightboxTip.dismissed') === '1') return
  lightboxTip.value = true
  // 5s 后自动消失
  lightboxTipTimer = setTimeout(() => { lightboxTip.value = false }, 5000)
}
const dismissLightboxTip = () => {
  lightboxTip.value = false
  localStorage.setItem('shiguang.lightboxTip.dismissed', '1')
  if (lightboxTipTimer) { clearTimeout(lightboxTipTimer); lightboxTipTimer = null }
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
  { num: 'F·11', title: '只用手冲', body: '不卖意式机出品的「美式」「拿铁」——只用手冲与冷萃，每杯都由咖啡师手工萃取。', img: '/coffee-shop/principle-11.jpg' },
  { num: 'F·12', title: '只用当季', body: '生豆按季节轮换，不使用库存超过 6 个月的豆子。每批豆子都会标注入店日期。', img: '/coffee-shop/principle-12.jpg' },
  { num: 'F·13', title: '只用心', body: '不为了效率引入任何「一键式」冲煮设备。手冲的变量是「人」，不是「机器」。', img: '/coffee-shop/principle-13.jpg' }
]

const stats = [
  { num: '07', label: '年时光', sub: 'years', note: 'since 2018', frame: 'F·16' },
  { num: '02', label: '家门店', sub: 'locations', note: '三里屯 · 安福路', frame: 'F·17' },
  { num: '12', label: '款当季豆', sub: 'origins', note: 'updated quarterly', frame: 'F·18' },
  { num: '240K+', label: '杯手冲', sub: 'brews', note: 'from 2018 to 2026', frame: 'F·19' }
]
const ctaImg = '/coffee-shop/product-1.jpg'
const quoteImg = '/coffee-shop/quote-bg.jpg'

// 目录速览 (hero 下方)
const toc = [
  { num: '01', label: '七帧碎片', sub: 'timeline', frame: 'F·09–15' },
  { num: '02', label: '三个坚持', sub: 'principles', frame: 'F·11–13' },
  { num: '03', label: '4 个数字', sub: 'stats', frame: 'F·16–19' },
  { num: '04', label: '九十秒的慢', sub: 'quote', frame: 'F·20A' },
  { num: '05', label: '坐下来喝一杯', sub: 'cta', frame: 'F·21–25' }
]
</script>

<template>
  <div class="story-page">
    <!-- 滚动进度条 (固定顶部 2px 暖色) -->
    <div
      class="scroll-progress"
      :style="{ width: scrollProgress + '%' }"
      aria-hidden="true"
    />

    <!-- HERO (胶片号 + 印章) -->
    <section class="story-hero">
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
              @click.prevent="scrollToAnchor(t.sub)"
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

    <!-- ============ 装饰条 1: 胶片孔 (hero→timeline) ============ -->
    <div
      class="divider divider--filmholes"
      aria-hidden="true"
    >
      <span class="divider__label">ROLL · 06 / FRAME 09–15</span>
    </div>

    <!-- 时序轴 (胶卷一行 + 中央大图 + 两侧缩略) -->
    <section
      id="timeline"
      class="timeline"
    >
      <header class="timeline__head">
        <span class="eyebrow eyebrow--accent">A TIMELINE · 时光轴</span>
        <h2>七帧碎片</h2>
      </header>

      <!-- 中央大字 + 描述 (随 active 切换) -->
      <div class="timeline__spotlight">
        <Transition
          name="reveal"
          mode="out-in"
        >
          <div
            :key="activeFrame"
            class="timeline__spotlight-inner"
          >
            <figure class="timeline__spotlight-photo">
              <div class="duotone">
                <img
                  :src="milestones[activeFrame].img"
                  :alt="milestones[activeFrame].year + ' · 拾光咖啡'"
                >
              </div>
              <figcaption class="typewriter">
                {{ milestones[activeFrame].year }} · 时光切片
              </figcaption>
            </figure>
            <div class="timeline__spotlight-text">
              <span class="timeline__spotlight-year">{{ milestones[activeFrame].year }}</span>
              <h3 class="timeline__spotlight-title">
                {{ milestones[activeFrame].frame }} · {{ milestones[activeFrame].text.slice(0, 14) }}...
              </h3>
              <p class="timeline__spotlight-body">
                {{ milestones[activeFrame].text }}
              </p>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 7 帧胶片一行 (中央大图 + 两侧缩略) -->
      <div class="filmstrip">
        <ol class="filmstrip__list">
          <li
            v-for="(m, i) in milestones"
            :key="m.year"
            class="filmstrip__frame"
            :class="{ 'is-active': activeFrame === i, 'is-side': i !== activeFrame }"
            :data-idx="i"
            role="button"
            tabindex="0"
            @click="onFrameClick(i)"
            @mouseenter="onFrameHover"
            @mouseleave="onFrameLeave"
            @keydown.enter="onFrameClick(i)"
          >
            <div class="filmstrip__plate">
              <span
                class="filmstrip__sprocket filmstrip__sprocket--top"
                aria-hidden="true"
              />
              <span
                class="filmstrip__sprocket filmstrip__sprocket--bottom"
                aria-hidden="true"
              />
              <div class="filmstrip__plate-photo">
                <img
                  :src="m.img"
                  :alt="m.year"
                >
              </div>
              <span class="filmstrip__frame-no">{{ m.frame }}</span>
              <span class="filmstrip__year">{{ m.year }}</span>
            </div>
          </li>
        </ol>

        <!-- 7 颗胶片孔 (进度) -->
        <div class="filmstrip__sprockets">
          <span
            v-for="(_, i) in milestones"
            :key="i"
            class="filmstrip__sprocket-bar"
            :class="{ 'is-active': activeFrame === i }"
          />
        </div>

        <!-- 灯箱首次访问提示 (右下角气泡) -->
        <Transition name="tip-fade">
          <div
            v-if="lightboxTip"
            class="lightbox-tip"
            role="status"
            aria-live="polite"
          >
            <span class="lightbox-tip__icon">💡</span>
            <span class="lightbox-tip__text">点击任一帧，查看大图</span>
            <button
              class="lightbox-tip__close"
              aria-label="知道了"
              @click="dismissLightboxTip"
            >
              ×
            </button>
          </div>
        </Transition>
      </div>
    </section>

    <!-- ============ 装饰条 2: 印章 + dashed (timeline→principles) ============ -->
    <div
      class="divider divider--stamp"
      aria-hidden="true"
    >
      <span class="divider__line" />
      <span class="divider__icon">F · 16</span>
      <span class="divider__line" />
    </div>

    <!-- 原则三章 (拍立得卡) -->
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

    <!-- ============ 装饰条 3: 手绘虚线 (principles→stats) ============ -->
    <div
      class="divider divider--handdrawn"
      aria-hidden="true"
    />

    <!-- 数字 -->
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

    <!-- ============ 装饰条 4: ⌖ 定位标 (stats→quote) ============ -->
    <div
      class="divider divider--crosshair"
      aria-hidden="true"
    >
      <span class="cross">⌖</span>
      <span class="divider__label typewriter">FRAME 20A · 90 SECONDS</span>
      <span class="cross">⌖</span>
    </div>

    <!-- 大幅引语 (拍立得卡) -->
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

    <!-- 行动召唤 -->
    <section
      id="cta"
      class="story-cta"
    >
      <div class="story-cta__inner">
        <figure class="story-cta__photo">
          <div class="duotone">
            <img
              :src="ctaImg"
              alt="拾光咖啡 · 吧台一隅"
            >
          </div>
          <figcaption class="story-cta__caption typewriter">
            F·21 · 吧台一隅
          </figcaption>
        </figure>
        <div class="story-cta__text">
          <span class="datestamp">F·21 · VISIT</span>
          <h2>准备好<br>坐下来喝一杯了吗？</h2>
          <p class="story-cta__lead">
            三里屯旧巷的一台手冲壶，七年来只做一件事：把当季最好的豆子，呈现给你。
          </p>
          <div class="story-cta__buttons">
            <button
              class="btn-primary btn-primary--inverted"
              @click="router.push({ name: 'home', hash: '#menu' })"
            >
              浏览菜单
            </button>
            <button
              class="btn-ghost btn-ghost--light"
              @click="router.push({ name: 'home', hash: '#contact' })"
            >
              联系方式
            </button>
          </div>
        </div>
      </div>
    </section>

    <Lightbox
      :open="lightboxOpen"
      :frame="lightboxFrame"
      @close="closeLightbox"
    />
  </div>
</template>

<style scoped>
.story-page {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
  padding-bottom: 2rem;
}

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

/* ============ TIMELINE (七帧碎片 · 胶卷一行 · 牛皮纸底) ============ */
.timeline {
  padding: 3rem 3rem 4rem;
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
  margin: 0.5rem 0 2rem;
  min-height: 130px;
  position: relative;
}
.timeline__spotlight-inner {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2rem;
  align-items: center;
  max-width: 720px;
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
  gap: 12px;
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
  width: 180px;
  height: 220px;
  border-color: var(--warm);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
  background: var(--paper);
}
/* 两侧缩略 */
.filmstrip__frame.is-side .filmstrip__plate {
  width: 80px;
  height: 100px;
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

/* 灯箱首次访问提示 (右下角气泡) */
.lightbox-tip {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--paper);
  border: 1px solid var(--warm);
  border-left-width: 4px;
  padding: 0.7rem 0.9rem 0.7rem 1rem;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  color: var(--ink);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  max-width: 280px;
  /* 指向七帧胶片的小尾巴 */
}
.lightbox-tip::before {
  content: '';
  position: absolute;
  left: -10px;
  bottom: 18px;
  width: 0; height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 10px solid var(--warm);
}
.lightbox-tip__icon {
  font-size: 1.1rem;
  line-height: 1;
}
.lightbox-tip__text {
  flex: 1;
  line-height: 1.4;
}
.lightbox-tip__close {
  background: transparent;
  border: none;
  color: var(--ink-soft);
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.2rem;
  font-family: inherit;
  transition: color 0.2s;
}
.lightbox-tip__close:hover {
  color: var(--warm);
}
/* 进出动画 */
.tip-fade-enter-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.tip-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.tip-fade-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}
.tip-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
@media (max-width: 600px) {
  .lightbox-tip {
    right: 0.8rem;
    bottom: 0.8rem;
    left: 0.8rem;
    max-width: none;
  }
  .lightbox-tip::before { display: none; }
  .lightbox-tip__text { font-size: 0.82rem; }
}


/* ============ RESPONSIVE ============ */
@media (max-width: 900px) {
  /* hero 标题缩 */
  .story-hero__title { font-size: 2.2rem; }
  .story-hero__lead { font-size: 1rem; }
  /* TOC 5 行紧 */
  .story-toc { padding: 1.2rem 1rem; }
  .story-toc__label { font-size: 0.95rem; }
  .story-toc__sep { font-size: 0.6rem; }
  .story-toc__frame { font-size: 0.65rem; }
  /* 七帧胶片 wrap */
  .filmstrip__list { flex-wrap: wrap; gap: 10px; }
  .filmstrip__frame { padding-left: 0; padding-right: 0; }
  .filmstrip__plate { max-width: 100%; }
  .timeline__spotlight-inner { grid-template-columns: 1fr; gap: 1.5rem; }
  .timeline__spotlight-text { text-align: center; }
  .timeline__spotlight-photo { max-width: 280px; margin: 0 auto; }
  /* principles 3 列 → 1 列 */
  .principles { padding: 3rem 1.5rem 2.5rem; }
  .principles__grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .principle__photo { aspect-ratio: 16 / 9; }
  /* stats 4 列 → 2x2 */
  .story-stats {
    grid-template-columns: repeat(2, 1fr);
    padding: 2.5rem 1.5rem;
    gap: 1.5rem 0;
  }
  .story-stat { padding: 0 1.2rem; border-right: none !important; }
  .story-stat:nth-child(odd) { border-right: 1px dashed var(--rule); }
  .story-stat__num { font-size: 2.2rem; }
  .story-stat__label { font-size: 0.9rem; }
  /* quote 拍立得窄 */
  .story-quote__polaroid { padding: 1.2rem 1.5rem 1.5rem; }
  .story-quote__polaroid blockquote { font-size: 1.2rem; }
  /* CTA 1 列 */
  .story-cta__inner { grid-template-columns: 1fr; gap: 2rem; }
  .story-cta__photo { max-width: 280px; margin: 0 auto; }
  .story-cta__text { text-align: center; }
  .story-cta__lead { margin-left: auto; margin-right: auto; }
  .story-cta__buttons { justify-content: center; }
  /* 装饰条 */
  .divider--stamp { padding: 0 1rem; gap: 0.5rem; }
  .divider--stamp .divider__line { display: none; }
  .divider--crosshair { gap: 0.5rem; padding: 0 1rem; }
  .divider--crosshair .divider__label { font-size: 0.6rem; letter-spacing: 0.15em; }
}

@media (max-width: 600px) {
  .story-hero { padding: 2rem 1rem 2.5rem; }
  .story-hero__title { font-size: 1.8rem; }
  .story-hero__lead { font-size: 0.92rem; }
  .story-hero__meta { flex-direction: column; gap: 0.4rem; }
  .story-hero__meta .meta-sep { display: none; }
  /* TOC 极致压缩 */
  .story-toc { padding: 1rem 0.8rem; }
  .story-toc__eyebrow { font-size: 0.6rem; }
  .story-toc__item { font-size: 0.85rem; padding: 0.4rem 0.2rem; gap: 0.3rem; }
  .story-toc__label { font-size: 0.85rem; }
  .story-toc__sep { display: none; }
  .story-toc__frame { font-size: 0.6rem; }
  /* stats 4 列 → 1 列 */
  .story-stats { grid-template-columns: 1fr; }
  .story-stat { padding: 0 0 1.2rem; border-right: none !important; border-bottom: 1px dashed var(--rule); }
  .story-stat:last-child { border-bottom: none; }
  .story-stat:nth-child(odd) { border-right: none; }
  .story-stat__num { font-size: 2rem; }
  /* 七帧横向滚动 */
  .filmstrip__list {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 0 0 1rem;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }
  .filmstrip__frame { flex: 0 0 auto; }
  .filmstrip__frame.is-active .filmstrip__plate { width: 160px; height: 200px; }
  .filmstrip__frame:not(.is-active) .filmstrip__plate { width: 70px; height: 90px; }
  /* quote */
  .story-quote__polaroid { padding: 1rem 1.2rem 1.2rem; }
  .story-quote__polaroid blockquote { font-size: 1.05rem; line-height: 1.5; }
  /* 装饰条 */
  .divider--filmholes .divider__label { font-size: 0.5rem; letter-spacing: 0.15em; }
  .divider--stamp .divider__icon { font-size: 0.6rem; padding: 3px 7px; }
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

/* ============ 装饰条 (section divider) ============ */
.scroll-progress {
  position: fixed;
  top: 68px; /* 紧贴 mainnav 下面，不盖导航文字 */
  left: 0;
  height: 2px;
  background: var(--warm);
  z-index: 99; /* < mainnav z=100，让 mainnav 永远在最上 */
  transition: width 0.1s linear;
  pointer-events: none;
  box-shadow: 0 0 6px rgba(184, 84, 58, 0.4);
}
.divider {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--paper);
}
.divider__label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--warm);
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--paper);
  padding: 0 14px;
}
/* 1. 胶片孔条 (hero→timeline) */
.divider--filmholes {
  height: 14px;
  background: var(--ink);
  background-image: radial-gradient(circle at 14px 7px, var(--paper) 3px, transparent 3.5px);
  background-size: 28px 14px;
  background-repeat: repeat-x;
  background-position: 0 center;
  padding: 0 60px;
}
.divider--filmholes .divider__label {
  background: var(--ink);
  color: var(--paper);
  font-size: 0.6rem;
  letter-spacing: 0.25em;
}
/* 2. 印章 + 双 dashed (timeline→principles) */
.divider--stamp {
  height: 36px;
  gap: 1rem;
  padding: 0 3rem;
}
.divider--stamp .divider__line {
  flex: 1;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    var(--warm) 0 4px,
    transparent 4px 8px
  );
}
.divider--stamp .divider__icon {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--warm);
  letter-spacing: 0.3em;
  border: 1.5px solid var(--warm);
  padding: 4px 10px;
  transform: rotate(-2deg);
  background: var(--paper);
  font-weight: 700;
}
/* 3. 手绘虚线 (principles→stats) */
.divider--handdrawn {
  height: 18px;
  background: var(--paper);
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='18' viewBox='0 0 100 18'><path d='M2 9 Q 12 5, 22 9 T 42 9 T 62 9 T 82 9 T 98 9' stroke='%23b8543a' stroke-width='1.2' fill='none' stroke-linecap='round'/></svg>");
  background-repeat: repeat-x;
  background-position: center;
  background-size: 100px 18px;
}
/* 4. ⌖ 定位标 (stats→quote) */
.divider--crosshair {
  height: 36px;
  gap: 1.2rem;
  font-family: var(--font-mono);
  background: var(--paper);
}
.divider--crosshair .cross {
  color: var(--warm);
  font-size: 1rem;
  line-height: 1;
}
.divider--crosshair .divider__label {
  position: static;
  transform: none;
  background: transparent;
  padding: 0;
  color: var(--ink-soft);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
}

/* ============ 数字 (stat cards) ============ */
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
/* 顶部 8px 暖色短装饰线 (像胶片档案夹的标签) */
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
/* 顶部短装饰条 (warm) */
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
</style>
