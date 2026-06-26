<script setup>
defineProps({
  baristas: { type: Array, required: true },
  flashId: { type: [String, Number, null], default: null }
})

const emit = defineEmits(['flash'])

function trigger (id) {
  emit('flash', id)
}
</script>

<template>
  <section class="b-grid">
    <header class="b-grid__head">
      <span class="eyebrow eyebrow--accent">F·23–25 · CRAFTSPEOPLE</span>
      <h2>另外三双手</h2>
    </header>
    <div class="b-grid__cards">
      <article
        v-for="(m, i) in baristas"
        :key="m.id"
        class="bcard tilt-c"
        :class="{ 'is-flash': flashId === m.id }"
        :style="{ '--i': i }"
        role="button"
        tabindex="0"
        aria-label="点击拍摄"
        @click="trigger(m.id)"
        @keydown.enter="trigger(m.id)"
      >
        <div class="bcard__polaroid">
          <div class="bcard__avatar">
            <div class="bcard__initials">
              {{ m.initials }}
            </div>
            <span class="bcard__no">F·{{ 23 + i }}</span>
            <span
              class="bcard__flash"
              aria-hidden="true"
            />
          </div>
          <div class="bcard__meta">
            <span class="bcard__years">{{ m.years }}</span>
            <span class="bcard__role typewriter">{{ m.role }}</span>
          </div>
          <h3>{{ m.name }}</h3>
          <p class="bcard__quote">
            "{{ m.quote }}"
          </p>
          <p class="bcard__bio">
            {{ m.bio }}
          </p>
          <div class="bcard__tags">
            <span
              v-for="t in (m.spec || []).slice(0, 3)"
              :key="t"
              class="bcard__tag"
            >{{ t }}</span>
          </div>
          <span class="bcard__date">{{ ['06·24·25', '07·08·25', '06·12·25'][i] }}</span>
          <span class="bcard__stamp">{{ ['EXP·23', 'EXP·24', 'EXP·25'][i] }}</span>
        </div>
      </article>
    </div>
    <div class="b-grid__caption">
      <span class="b-grid__caption-line" />
      <span class="b-grid__caption-text">— 三双手 · 三个故事 · 三种咖啡哲学 —</span>
      <span class="b-grid__caption-line" />
    </div>
  </section>
</template>

<style scoped>
.b-grid {
  padding: 3rem 3rem 4rem;
  max-width: 1300px;
  margin: 0 auto;
  background: var(--paper-light);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.b-grid__head {
  text-align: center;
  margin-bottom: 2.5rem;
}
.b-grid__head h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-top: 0.5rem;
  letter-spacing: 0.02em;
}
.b-grid__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.b-grid__caption {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin: 2rem auto 0;
  max-width: 600px;
  padding: 0 1rem;
}
.b-grid__caption-line {
  flex: 1;
  height: 1px;
  background: var(--rule);
}
.b-grid__caption-text {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  font-style: italic;
  color: var(--ink-soft);
  letter-spacing: 0.05em;
  white-space: nowrap;
}

/* 拍立得卡片 */
.bcard {
  cursor: pointer;
  transition: all 0.4s;
  position: relative;
}
/* 3 张拍立得明显错位倾斜 */
.bcard:nth-child(1) { transform: rotate(-4deg); }
.bcard:nth-child(2) { transform: rotate(0deg); margin-top: 2rem; }
.bcard:nth-child(3) { transform: rotate(4deg); }
.bcard:nth-child(1):hover { transform: rotate(-5deg) translateY(-8px); }
.bcard:nth-child(2):hover { transform: rotate(0deg) translateY(-8px); }
.bcard:nth-child(3):hover { transform: rotate(5deg) translateY(-8px); }

/* 拍立得胶带 (顶部) */
.bcard::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-2deg);
  width: 100px;
  height: 24px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(216, 210, 196, 0.6);
  box-shadow: 0 1px 3px rgba(31, 26, 21, 0.06);
  z-index: 3;
}
/* 拍立得卡片拍立得框架 */
.bcard__polaroid {
  background: var(--paper);
  padding: 1.5rem 1.5rem 1.2rem;
  box-shadow: 0 6px 20px rgba(31, 26, 21, 0.18);
  border: 1px solid var(--rule);
  position: relative;
  min-height: 480px;
  display: flex;
  flex-direction: column;
}
/* 拍立得底部白边加宽 (胶片底) */
.bcard__polaroid::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: var(--paper);
  border-top: 1px dashed var(--rule);
  z-index: 0;
}
.bcard__avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 1.5rem;
  border: 4px solid var(--warm);
}
.bcard__initials {
  font-family: var(--font-cjk);
  font-size: 3rem;
  color: var(--paper);
  font-weight: 800;
  line-height: 1;
}
.bcard__no {
  position: absolute;
  bottom: -3px;
  right: -3px;
  background: var(--warm);
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  padding: 0.2rem 0.5rem;
  font-weight: 600;
}
.bcard__meta {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed var(--rule);
}
.bcard__years {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--warm);
  font-style: italic;
}
.bcard__role {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  text-transform: uppercase;
  font-weight: 600;
}
.bcard h3 {
  font-family: var(--font-cjk);
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}
.bcard__quote {
  font-family: var(--font-cjk);
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--ink);
  text-align: center;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}
.bcard__bio {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--ink-soft);
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--rule);
  margin-bottom: auto;
}
.bcard__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
  margin-top: 0.8rem;
  margin-bottom: 0.6rem;
  position: relative;
  z-index: 1;
}
.bcard__tag {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--ink);
  background: var(--paper-deep);
  border: 1px solid var(--rule);
  padding: 0.25rem 0.6rem;
  font-weight: 500;
}
.bcard__date {
  position: absolute;
  bottom: 28px;
  left: 1.2rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--ink-soft);
  letter-spacing: 0.15em;
  font-weight: 600;
  z-index: 2;
}
.bcard__stamp {
  position: absolute;
  bottom: 18px;
  right: 1.2rem;
  width: 48px;
  height: 48px;
  border: 1.5px solid var(--warm);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  color: var(--warm);
  font-weight: 700;
  transform: rotate(-12deg);
  opacity: 0.7;
  z-index: 2;
}

/* 闪光覆盖层 (动画 keyframe 在父级 Baristas.vue 全局声明) */
.bcard__flash {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0);
  pointer-events: none;
  border-radius: 50%;
  z-index: 5;
  transition: background 0.05s ease;
}
.bcard.is-flash .bcard__flash {
  animation: polaroidFlash 0.4s ease-out;
}

@media (max-width: 900px) {
  .b-grid { padding: 3rem 1.5rem 4rem; }
  .b-grid__cards { grid-template-columns: 1fr; }
}
</style>