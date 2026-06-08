<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  imgOsmanthus: { type: String, required: true },
  imgCappuccino: { type: String, required: true },
  imgScone: { type: String, required: true },
})

const emit = defineEmits(['scrollToMenu', 'goToStory'])

const scrollCue = ref('show')
let scrollHandler = null

const flashHero = ref(null)
const triggerHeroFlash = (id) => {
  flashHero.value = id
  setTimeout(() => {
    if (flashHero.value === id) flashHero.value = null
  }, 400)
}

const scrollToSection = (id) => emit('scrollToMenu', id)
const goToPage = (name) => emit('goToStory', name)

onMounted(() => {
  scrollHandler = () => {
    if (window.scrollY > 80 && scrollCue.value === 'show') {
      scrollCue.value = 'gone'
    }
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
  <section class="hero">
    <div class="hero__grid">
      <div class="hero__text">
        <div class="hero__eyebrow">
          <span class="datestamp">ROLL · 06</span>
          <span class="hero__roll">TRI-X 400 · 24 EXP.</span>
        </div>
        <h1 class="hero__title">
          <span class="hero__line-1">拾</span>
          <span class="hero__line-2">光</span>
          <span class="hero__sub typewriter">SHÍGUĀNG COFFEE<br>— SINCE 2018 —</span>
        </h1>
        <p class="hero__slogan">
          在一杯咖啡里，<br>拾起慢下来的时光。
        </p>
        <div class="hero__cta">
          <button class="btn-primary" @click="scrollToSection('menu')">
            浏览本卷菜单
          </button>
          <button class="btn-ghost" @click="goToPage('story')">
            阅读品牌故事 →
          </button>
        </div>
        <div class="hero__meta">
          <span><b>VOL.</b> III</span>
          <span class="meta-sep">·</span>
          <span>ISSUE 06</span>
          <span class="meta-sep">·</span>
          <span>SUMMER '26</span>
        </div>
      </div>
      <div class="hero__collage">
        <figure
          class="polaroid tilt-l polaroid--big"
          :class="{ 'is-flash': flashHero === 0 }"
          :style="{ '--i': 0 }"
          tabindex="0"
          aria-label="拍一张 F·01"
          @click="triggerHeroFlash(0)"
          @keydown.enter="triggerHeroFlash(0)"
        >
          <span class="polaroid__tape" aria-hidden="true" />
          <div class="polaroid__num typewriter">
            F · 01
          </div>
          <div class="duotone polaroid__duotone">
            <img :src="imgOsmanthus" alt="桂花拿铁" />
          </div>
          <figcaption>桂花拿铁 · autumn limited</figcaption>
          <span class="polaroid__flash" aria-hidden="true" />
        </figure>
        <figure
          class="polaroid tilt-r polaroid--small"
          :class="{ 'is-flash': flashHero === 1 }"
          :style="{ '--i': 1 }"
          tabindex="0"
          aria-label="拍一张 F·02"
          @click="triggerHeroFlash(1)"
          @keydown.enter="triggerHeroFlash(1)"
        >
          <span class="polaroid__tape" aria-hidden="true" />
          <div class="polaroid__num typewriter">
            F · 02
          </div>
          <div class="duotone polaroid__duotone">
            <img :src="imgCappuccino" alt="卡布奇诺" />
          </div>
          <figcaption>卡布奇诺 · classic</figcaption>
          <span class="polaroid__flash" aria-hidden="true" />
        </figure>
        <figure
          class="polaroid tilt-c polaroid--small polaroid--right"
          :class="{ 'is-flash': flashHero === 2 }"
          :style="{ '--i': 2 }"
          tabindex="0"
          aria-label="拍一张 F·03"
          @click="triggerHeroFlash(2)"
          @keydown.enter="triggerHeroFlash(2)"
        >
          <span class="polaroid__tape" aria-hidden="true" />
          <div class="polaroid__num typewriter">
            F · 03
          </div>
          <div class="duotone polaroid__duotone">
            <img :src="imgScone" alt="司康" />
          </div>
          <figcaption>司康 · tea time</figcaption>
          <span class="polaroid__flash" aria-hidden="true" />
        </figure>
        <div class="hero__rollcap">
          <span class="typewriter">F · 01 — 03</span>
          <span class="hero__rollcap-sub">本期封面 · 三帧</span>
        </div>
      </div>
    </div>
    <div :class="['scroll-cue', scrollCue]">
      <span class="typewriter">SCROLL ↓</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 4rem 3rem 5rem;
  min-height: 92vh;
  display: flex;
  align-items: center;
  background: var(--paper);
  border-bottom: 3px double var(--ink);
}
.hero__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
.hero__text { position: relative; }
.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.hero__roll {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: var(--ink);
  font-weight: 600;
}
.hero__title {
  font-family: var(--font-cjk);
  font-size: clamp(5rem, 11vw, 9.5rem);
  font-weight: 900;
  line-height: 0.85;
  margin-bottom: 1.5rem;
  position: relative;
}
.hero__line-1 {
  display: inline-block;
  color: var(--ink);
  transform: translateX(0);
}
.hero__line-2 {
  display: inline-block;
  color: var(--warm);
  margin-left: 0.4rem;
  transform: translateY(-0.05em) rotate(-3deg);
}
.hero__sub {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--ink-soft);
  margin-top: 1rem;
}
.hero__slogan {
  font-family: var(--font-cjk);
  font-size: clamp(1.2rem, 1.8vw, 1.6rem);
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 2rem 0 2.5rem;
  font-style: italic;
  font-weight: 400;
  border-left: 3px solid var(--warm);
  padding-left: 1.2rem;
}
.hero__cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}
.btn-primary, .btn-ghost, .btn-link {
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all 0.25s;
  border: none;
}
.btn-primary {
  padding: 0.9rem 2.2rem;
  background: var(--ink);
  color: var(--paper);
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  border-radius: 0;
  font-weight: 600;
}
.btn-primary:hover { background: var(--warm); }
.btn-primary:active { transform: scale(0.97); }
.btn-ghost {
  padding: 0.9rem 2.2rem;
  background: transparent;
  color: var(--ink);
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  border: 2px solid var(--ink);
  border-radius: 0;
  font-weight: 600;
}
.btn-ghost:hover { background: var(--ink); color: var(--paper); }
.btn-ghost:active { transform: scale(0.97); }
.hero__meta {
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
.hero__meta b { color: var(--warm); }
.meta-sep { color: var(--rule); }

/* 拍立得拼图 */
.hero__collage {
  position: relative;
  height: 620px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
  padding: 1rem;
}
.polaroid {
  position: relative;
  cursor: pointer;
  background: var(--paper-light);
  padding: 12px 12px 50px;
  box-shadow: 0 6px 16px rgba(31, 26, 21, 0.25);
  opacity: 0;
  transform-origin: center top;
  animation: polaroidEnter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: calc(0.15s + var(--i, 0) * 0.12s);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
@keyframes polaroidEnter {
  0% { opacity: 0; transform: translateY(30px) rotate(0deg) scale(0.92); }
  100% { opacity: 1; }
}
.polaroid__tape {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-2deg);
  width: 80px;
  height: 22px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(216, 210, 196, 0.6);
  box-shadow: 0 1px 3px rgba(31, 26, 21, 0.06);
  z-index: 3;
  pointer-events: none;
}
.polaroid__num {
  position: absolute;
  top: -2px;
  right: -2px;
  z-index: 4;
  background: var(--warm);
  color: var(--paper);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  padding: 3px 8px;
  font-weight: 600;
  border: 1px solid var(--ink);
}
.polaroid__duotone { overflow: hidden; position: relative; }
.polaroid__duotone img {
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.polaroid:hover .polaroid__duotone img { transform: scale(1.05); }
.polaroid__flash {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0);
  pointer-events: none;
  z-index: 5;
  transition: background 0.05s ease;
}
.polaroid.is-flash .polaroid__flash { animation: polaroidHeroFlash 0.4s ease-out; }
@keyframes polaroidHeroFlash {
  0% { background: rgba(255, 255, 255, 0); }
  10% { background: rgba(255, 255, 255, 0.9); }
  100% { background: rgba(255, 255, 255, 0); }
}
.polaroid--big {
  grid-row: span 2;
  transform: rotate(-2.5deg);
}
.polaroid--big:hover {
  transform: rotate(-1deg) translateY(-6px) scale(1.02);
  box-shadow: 0 14px 32px rgba(31, 26, 21, 0.32);
  z-index: 5;
}
.polaroid--small { font-size: 0.78rem; }
.polaroid--small:nth-of-type(2) { transform: rotate(1.5deg); }
.polaroid--small:nth-of-type(2):hover {
  transform: rotate(0deg) translateY(-6px) scale(1.04);
  box-shadow: 0 12px 24px rgba(31, 26, 21, 0.28);
  z-index: 5;
}
.polaroid--right { transform: rotate(2deg); }
.polaroid--right:hover {
  transform: rotate(0.5deg) translateY(-6px) scale(1.04);
  box-shadow: 0 12px 24px rgba(31, 26, 21, 0.28);
  z-index: 5;
}
.polaroid figcaption {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  text-align: center;
  font-family: var(--font-type);
  font-size: 0.85rem;
  color: var(--ink);
  letter-spacing: 0.05em;
}
.polaroid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4/5;
}
.hero__rollcap {
  position: absolute;
  top: -0.5rem;
  right: 0;
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.hero__rollcap span:first-child {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  color: var(--warm);
  font-weight: 600;
}
.hero__rollcap-sub {
  font-family: var(--font-cjk);
  font-size: 0.8rem;
  color: var(--ink-soft);
  font-style: italic;
}
.scroll-cue {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.5s;
  font-family: var(--font-type);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--ink-soft);
  animation: pulse 2s ease-in-out infinite;
}
.scroll-cue.gone { opacity: 0; pointer-events: none; }
@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@media (max-width: 1024px) {
  .hero { padding: 3rem 2rem; min-height: auto; }
  .hero__grid { grid-template-columns: 1fr; gap: 3rem; }
  .hero__collage { height: 500px; }
}
@media (max-width: 640px) {
  .hero { padding: 2rem 1rem; }
  .hero__collage {
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0.5rem;
  }
  .polaroid { transform: none !important; animation: none; opacity: 1; }
  .polaroid--big, .polaroid--small { width: 100%; max-width: 320px; margin: 0 auto; }
  .hero__rollcap { display: none; }
}
</style>