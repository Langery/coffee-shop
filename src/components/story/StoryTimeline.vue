<script setup>
import { ref, onMounted } from 'vue'
import Lightbox from '../Lightbox.vue'
import { useAutoplay } from '@/composables/useAutoplay'

const props = defineProps({
  milestones: { type: Array, required: true }
})

// 时序轴自动轮播 — 接管原 50 行手写 timer/phase
const { activeIndex: activeFrame, start: startAutoplay, stop: stopAutoplay } = useAutoplay({
  get totalFrames() { return props.milestones.length },
  showDuration: 2200,
  fadeDuration: 600,
  autoStart: false
})

// Lightbox
const lightboxOpen = ref(false)
const lightboxFrame = ref(null)
const closeLightbox = () => {
  lightboxOpen.value = false
  startAutoplay(500) // 关灯箱后 0.5s 恢复轮播
}

const onFrameClick = (i) => {
  dismissLightboxTip() // 用户点了帧就 dismiss 提示
  stopAutoplay()
  lightboxFrame.value = { ...props.milestones[i] }
  lightboxOpen.value = true
}
const onFrameHover = () => stopAutoplay()
const onFrameLeave = () => {
  // 鼠标移开 3s 后恢复轮播
  setTimeout(() => {
    if (!lightboxOpen.value) startAutoplay(0)
  }, 3000)
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

onMounted(() => {
  startAutoplay(1000)
  setTimeout(showLightboxTip, 2500)
})
</script>

<template>
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

    <Lightbox
      :open="lightboxOpen"
      :frame="lightboxFrame"
      @close="closeLightbox"
    />
  </section>
</template>

<style scoped>
.timeline {
  padding: 5rem 3rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  background: var(--paper-deep);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
/* 牛皮纸纹理 (SVG noise) */
.timeline::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2' /><feColorMatrix values='0 0 0 0 0.7  0 0 0 0 0.65  0 0 0 0 0.55  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  pointer-events: none;
  opacity: 0.6;
  z-index: 0;
}
/* 边角的胶片孔 (4 角) */
.timeline::after {
  content: '';
  position: absolute;
  inset: 12px;
  background-image:
    radial-gradient(circle at 0 0, var(--ink) 6px, transparent 7px),
    radial-gradient(circle at 100% 0, var(--ink) 6px, transparent 7px),
    radial-gradient(circle at 0 100%, var(--ink) 6px, transparent 7px),
    radial-gradient(circle at 100% 100%, var(--ink) 6px, transparent 7px);
  pointer-events: none;
  z-index: 0;
}
.timeline > * { position: relative; z-index: 1; }

.timeline__head { margin-bottom: 2.5rem; }

.timeline__spotlight {
  max-width: 900px;
  margin: 0 auto 3rem;
  min-height: 360px;
}
.timeline__spotlight-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}
.timeline__spotlight-photo { margin: 0; }
.timeline__spotlight-photo .duotone {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--ink);
  border: 1px solid var(--rule);
}
.timeline__spotlight-photo .duotone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.2) contrast(1.05);
}
.timeline__spotlight-photo figcaption {
  margin-top: 0.6rem;
  font-size: 0.7rem;
  color: var(--warm);
  letter-spacing: 0.2em;
}
.timeline__spotlight-year {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  color: var(--warm);
  display: block;
  margin-bottom: 0.6rem;
}
.timeline__spotlight-title {
  font-family: var(--font-cjk);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--ink);
  margin: 0 0 1rem;
  line-height: 1.4;
}
.timeline__spotlight-body {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--ink-soft);
  margin: 0;
}

/* Transition reveal (切换 active frame 时的淡入淡出) */
.reveal-enter-active, .reveal-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-enter-from { opacity: 0; transform: translateY(12px); }
.reveal-leave-to { opacity: 0; transform: translateY(-8px); }

/* ============ 7 帧胶片一行 ============ */
.filmstrip {
  position: relative;
  padding: 1.2rem 0 0.6rem;
  border-top: 1px dashed var(--rule);
}
.filmstrip__list {
  list-style: none;
  margin: 0;
  padding: 0 0.4rem 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
}
.filmstrip__frame {
  cursor: pointer;
  position: relative;
  flex: 0 0 auto;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.filmstrip__frame.is-active { transform: scale(1.15); z-index: 2; }
.filmstrip__frame.is-side { opacity: 0.7; }
.filmstrip__frame.is-side:hover { opacity: 1; }
.filmstrip__plate {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 8px;
  background: var(--paper);
  border: 1px solid var(--ink);
  width: 110px;
  height: 130px;
  overflow: hidden;
}
/* 胶片上下打孔 (像 35mm 底片的齿孔) */
.filmstrip__sprocket {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 8px;
  background-image: radial-gradient(circle at 8px 4px, var(--ink) 2.5px, transparent 3px);
  background-size: 16px 8px;
  background-repeat: repeat-x;
  background-position: 0 center;
}
.filmstrip__sprocket--top { top: 0; }
.filmstrip__sprocket--bottom { bottom: 0; }
.filmstrip__plate-photo {
  flex: 1;
  width: 100%;
  background: var(--ink);
  margin: 4px 0;
  overflow: hidden;
}
.filmstrip__plate-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.3) contrast(1.1);
}
.filmstrip__frame.is-active .filmstrip__plate-photo img {
  filter: sepia(0) contrast(1.05);
}
.filmstrip__frame-no {
  position: absolute;
  top: 16px;
  right: 4px;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  color: var(--warm);
  letter-spacing: 0.1em;
}
.filmstrip__year {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--paper);
  background: var(--ink);
  padding: 1px 6px;
  letter-spacing: 0.1em;
}
/* 7 颗胶片孔 (进度指示) */
.filmstrip__sprockets {
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  margin-top: 4px;
}
.filmstrip__sprocket-bar {
  flex: 1;
  height: 2px;
  background: var(--rule);
  margin: 0 2px;
  transition: background 0.3s;
}
.filmstrip__sprocket-bar.is-active { background: var(--warm); }

/* ============ 灯箱首次访问提示 (右下角气泡) ============ */
.lightbox-tip {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
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
.lightbox-tip__icon { font-size: 1.1rem; line-height: 1; }
.lightbox-tip__text { flex: 1; line-height: 1.4; }
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
.lightbox-tip__close:hover { color: var(--warm); }

/* tip 进出动画 */
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

@media (max-width: 900px) {
  .timeline__spotlight-inner { grid-template-columns: 1fr; gap: 1.5rem; }
  .timeline__spotlight-text { text-align: center; }
  .timeline__spotlight-photo { max-width: 280px; margin: 0 auto; }
  .filmstrip__list { flex-wrap: wrap; gap: 10px; }
  .filmstrip__frame { padding-left: 0; padding-right: 0; }
  .filmstrip__plate { max-width: 100%; }
  .filmstrip__frame:not(.is-active) .filmstrip__plate { width: 70px; height: 90px; }
  .lightbox-tip {
    right: 0.8rem;
    bottom: 0.8rem;
    left: 0.8rem;
    max-width: none;
  }
  .lightbox-tip::before { display: none; }
  .lightbox-tip__text { font-size: 0.82rem; }
}
</style>
