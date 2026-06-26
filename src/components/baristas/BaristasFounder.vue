<script setup>
defineProps({
  founder: { type: Object, required: true },
  flashId: { type: [String, Number, null], default: null }
})

const emit = defineEmits(['flash'])

function trigger () {
  emit('flash')
}
</script>

<template>
  <section
    class="b-founder"
    :class="{ 'is-flash': flashId === founder.id }"
  >
    <div class="b-founder__grid">
      <div
        class="b-founder__avatar"
        role="button"
        tabindex="0"
        aria-label="点击拍摄"
        @click="trigger"
        @keydown.enter="trigger"
      >
        <div class="b-founder__initials">
          {{ founder.initials }}
        </div>
        <span class="b-founder__no">F·22</span>
        <span class="b-founder__role">FOUNDER</span>
        <span
          class="b-founder__flash"
          aria-hidden="true"
        />
      </div>
      <div class="b-founder__info">
        <span class="eyebrow eyebrow--accent">F·22 · {{ founder.role.split(' / ')[0] }}</span>
        <h2>{{ founder.name }}<br>从云南产区走到三里屯</h2>
        <p>2010 年起在云南普洱产区开始学习咖啡种植与杯测, 2018 年在北京三里屯开出第一家拾光。「我想做一家自己想去的咖啡馆」—— 这是开店时他写在自己笔记本上的一句话。</p>
        <p>主理人负责每季度的生豆挑选与烘焙曲线调整, 亲自把控每一支豆子的风味走向。</p>
        <div class="b-founder__sig">
          <span class="typewriter">— {{ founder.name }} · {{ founder.role.split(' / ')[0] }}</span>
          <span class="b-founder__years">{{ founder.years }} · {{ founder.role.split(' / ')[1] }}</span>
        </div>
      </div>
    </div>
    <span class="b-founder__tape b-founder__tape--l" />
    <span class="b-founder__tape b-founder__tape--r" />
  </section>
</template>

<style scoped>
.b-founder {
  padding: 3rem 3rem 4rem;
  max-width: 1300px;
  margin: 0 auto;
  border-bottom: 1px solid var(--rule);
  position: relative;
  transform: rotate(-1.5deg);
  transition: transform 0.4s ease;
}
.b-founder:hover {
  transform: rotate(-0.5deg) translateY(-4px);
}
.b-founder__grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 5rem;
  align-items: center;
}
.b-founder__avatar {
  position: relative;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: 6px solid var(--warm);
  box-shadow: 0 8px 24px rgba(31, 26, 21, 0.25);
  cursor: pointer;
  transition: transform 0.3s ease;
}
.b-founder__avatar:hover {
  transform: scale(1.04);
}
.b-founder__avatar:focus {
  outline: none;
  transform: scale(1.04);
}
.b-founder__initials {
  font-family: var(--font-cjk);
  font-size: 7rem;
  color: var(--paper);
  font-weight: 800;
  line-height: 1;
}
.b-founder__no {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--warm);
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  padding: 0.3rem 0.7rem;
  font-weight: 600;
}
.b-founder__role {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--ink);
  font-weight: 600;
}
.b-founder__info h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 1.5rem 0 2rem;
  letter-spacing: 0.02em;
}
.b-founder__info p {
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--ink-soft);
  margin-bottom: 1.2rem;
}
.b-founder__sig {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--rule);
  font-family: var(--font-cjk);
  font-style: italic;
  color: var(--ink-soft);
}
.b-founder__years {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--warm);
  font-style: normal;
  font-weight: 600;
}

/* 拍立得胶带 */
.b-founder__tape {
  position: absolute;
  top: -12px;
  width: 90px;
  height: 24px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(216, 210, 196, 0.6);
  box-shadow: 0 1px 3px rgba(31, 26, 21, 0.06);
  z-index: 3;
}
.b-founder__tape--l {
  left: 18%;
  transform: rotate(-4deg);
}
.b-founder__tape--r {
  right: 18%;
  transform: rotate(5deg);
}

/* 闪光覆盖层 (动画 keyframe 在父级 Baristas.vue 全局声明) */
.b-founder__flash {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0);
  pointer-events: none;
  border-radius: 50%;
  z-index: 5;
  transition: background 0.05s ease;
}
.b-founder.is-flash .b-founder__flash {
  animation: polaroidFlash 0.4s ease-out;
}

@media (max-width: 900px) {
  .b-founder__grid { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
  .b-founder__avatar { width: 220px; height: 220px; }
  .b-founder__initials { font-size: 5rem; }
}
</style>