<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  frame: { type: Object, default: null }
  // 期望 shape: { src/title/year/desc/n }
})
const emit = defineEmits(['close'])

const onKey = (e) => {
  if (e.key === 'Escape' && props.open) emit('close')
}

watch(() => props.open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

onMounted(() => { window.addEventListener('keydown', onKey) })
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

const onBackdrop = (e) => {
  if (e.target.classList.contains('lightbox')) emit('close')
}
</script>

<template>
  <Transition name="lightbox">
    <div
      v-if="open && frame"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      @click="onBackdrop"
    >
      <button
        class="lightbox__close"
        aria-label="关闭"
        @click="emit('close')"
      >
        ×
      </button>

      <figure class="lightbox__figure">
        <div class="lightbox__img-wrap">
          <div class="duotone lightbox__duotone">
            <img
              :src="frame.src || frame.image || frame.img"
              :alt="frame.title || frame.t"
            >
          </div>
        </div>

        <figcaption class="lightbox__cap">
          <span class="lightbox__frame-no">FRAME · {{ frame.n || frame.frame }}</span>
          <h3 class="lightbox__title">
            {{ frame.title || frame.t }}
          </h3>
          <span
            v-if="frame.year"
            class="lightbox__year"
          >{{ frame.year }}</span>
          <p
            v-if="frame.desc || frame.text"
            class="lightbox__desc"
          >
            {{ frame.desc || frame.text }}
          </p>
        </figcaption>
      </figure>
    </div>
  </Transition>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(31, 26, 21, 0.92);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;
}
.lightbox__close {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 2px solid var(--paper);
  color: var(--paper);
  font-size: 1.5rem;
  line-height: 1;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all 0.2s;
  z-index: 2;
}
.lightbox__close:hover {
  background: var(--paper);
  color: var(--ink);
}

.lightbox__figure {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 2.5rem;
  max-width: 1100px;
  width: 100%;
  max-height: 90vh;
  background: var(--paper);
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  cursor: default;
  position: relative;
}
.lightbox__figure::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--warm);
}
.lightbox__img-wrap {
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 400px;
}
.lightbox__duotone {
  width: 100%;
  height: 100%;
}
.lightbox__duotone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.95) brightness(1.02);
}

.lightbox__cap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 1.5rem;
  color: var(--ink);
}
.lightbox__frame-no {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: var(--warm);
  margin-bottom: 0.8rem;
}
.lightbox__title {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 0.6rem;
  color: var(--ink);
}
.lightbox__year {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  color: var(--ink-soft);
  margin-bottom: 1.5rem;
  display: block;
}
.lightbox__desc {
  font-family: var(--font-cjk);
  font-size: 1rem;
  line-height: 1.8;
  color: var(--ink);
  margin: 0;
}

/* 过渡 */
.lightbox-enter-active, .lightbox-leave-active {
  transition: opacity 0.3s;
}
.lightbox-enter-from, .lightbox-leave-to {
  opacity: 0;
}

/* 移动端 */
@media (max-width: 768px) {
  .lightbox { padding: 0.5rem; }
  .lightbox__figure {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    max-height: 95vh;
    overflow-y: auto;
  }
  .lightbox__img-wrap { min-height: 240px; }
  .lightbox__title { font-size: 1.6rem; }
  .lightbox__cap { padding: 1.2rem 1rem; }
}
</style>
