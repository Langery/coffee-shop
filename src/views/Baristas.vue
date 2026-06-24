<script setup>
import { ref } from 'vue'
import { baristas } from '../data/index.js'
import { useRouter } from 'vue-router'
const router = useRouter()

// 苏先生 (founder) 单独展示,其余 3 位进 2x2 卡片
const founder = baristas.find(b => b.id === 'su')
const others = baristas.filter(b => b.id !== 'su')

// 闪光状态：点击头像触发 0.4s 白光
const flashBarista = ref(null)
const triggerFlash = (id) => {
  flashBarista.value = id
  setTimeout(() => {
    if (flashBarista.value === id) flashBarista.value = null
  }, 400)
}

// 时间线节点
const timeline = [
  { year: '2010', person: '苏', label: '云南产区学徒', color: 'var(--ink)' },
  { year: '2013', person: '苏', label: '杯测师认证', color: 'var(--ink)' },
  { year: '2015', person: '青', label: '台北精品咖啡馆', color: 'var(--warm)' },
  { year: '2017', person: '沐', label: '里昂博古斯学院', color: 'var(--warm)' },
  { year: '2018', person: '苏', label: '拾光咖啡开业', color: 'var(--ink)' },
  { year: '2020', person: '芷', label: '调饮师大赛', color: 'var(--warm)' },
  { year: '2022', person: '青', label: 'SCA 高级认证', color: 'var(--ink)' },
  { year: '2024', person: '沐', label: '季节限定甜点', color: 'var(--warm)' },
  { year: '2026', person: '全员', label: '四双手·拾光', color: 'var(--ink)' }
]
</script>

<template>
  <div class="baristas-page">
    <!-- HERO -->
    <section class="b-hero">
      <div class="b-hero__head">
        <span class="datestamp">FRAME 22–25</span>
        <span class="b-hero__roll">CRAFTSPEOPLE · 4 EXP.</span>
      </div>
      <h1 class="b-hero__title">
        四双手<br>
        的<span class="b-hero__title-warm">专注</span>
      </h1>
      <p class="b-hero__lead">
        从产地到杯中, 每一支豆子都经咖啡总监手工挑选;<br>
        每一杯手冲, 都由四双手之一精心萃取。
      </p>
    </section>

    <!-- 大卡: 苏先生 (Founder) -->
    <section
      class="b-founder"
      :class="{ 'is-flash': flashBarista === founder.id }"
    >
      <div class="b-founder__grid">
        <div
          class="b-founder__avatar"
          role="button"
          tabindex="0"
          aria-label="点击拍摄"
          @click="triggerFlash(founder.id)"
          @keydown.enter="triggerFlash(founder.id)"
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

    <!-- 4 个咖啡师 (拍立得卡 2x2) -->
    <section class="b-grid">
      <header class="b-grid__head">
        <span class="eyebrow eyebrow--accent">F·23–25 · CRAFTSPEOPLE</span>
        <h2>另外三双手</h2>
      </header>
      <div class="b-grid__cards">
        <article
          v-for="(m, i) in others"
          :key="m.id"
          class="bcard tilt-c"
          :class="{ 'is-flash': flashBarista === m.id }"
          :style="{ '--i': i }"
          role="button"
          tabindex="0"
          aria-label="点击拍摄"
          @click="triggerFlash(m.id)"
          @keydown.enter="triggerFlash(m.id)"
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

    <!-- 时间线 — 四双手的咖啡生涯节点 -->
    <section class="b-timeline">
      <header class="b-timeline__head">
        <span class="eyebrow eyebrow--accent">F·26 · 16 YEARS · 4 LIVES</span>
        <h2>十六年<br>四双手的轨迹</h2>
        <p class="b-timeline__lead">
          从云南到台北，从里昂到上海，四个时间线在 2018 年的拾光咖啡交汇。
        </p>
      </header>
      <div class="b-timeline__line">
        <div class="b-timeline__track" />
        <div
          v-for="(t, i) in timeline"
          :key="i"
          class="b-timeline__node"
          :style="{ left: (i / (timeline.length - 1) * 100) + '%', '--node-color': t.color }"
        >
          <span class="b-timeline__dot" />
          <div class="b-timeline__card">
            <span class="b-timeline__year typewriter">{{ t.year }}</span>
            <span class="b-timeline__person">{{ t.person }}</span>
            <span class="b-timeline__label">{{ t.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="b-cta">
      <span class="datestamp">F·26 · COME SAY HI</span>
      <h2>来拾光<br>认识他们</h2>
      <p>咖啡师每天 8 点到店, 开始当日的手冲备豆。如果你也想了解一杯咖啡背后的故事, 欢迎来店里坐一坐。</p>
      <div class="b-cta__buttons">
        <button
          class="btn-primary"
          @click="router.push({ name: 'home', hash: '#menu' })"
        >
          浏览菜单
        </button>
        <button
          class="btn-ghost"
          @click="router.push({ name: 'home', hash: '#contact' })"
        >
          联络
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.baristas-page {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
  padding-bottom: 2rem;
}

/* ============ HERO ============ */
.b-hero {
  padding: 4rem 3rem 3rem;
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
  font-size: clamp(3rem, 7vw, 6rem);
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

/* ============ FOUNDER ============ */
.b-founder {
  padding: 3rem 3rem 4rem;
  max-width: 1300px;
  margin: 0 auto;
  border-bottom: 1px solid var(--rule);
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

/* ============ GRID 3 CARDS ============ */
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

/* ============ CTA ============ */
/* 闪光效果：拍立得拍照瞬间 */
.bcard__flash,
.b-founder__flash {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0);
  pointer-events: none;
  border-radius: 50%;
  z-index: 5;
  transition: background 0.05s ease;
}
.bcard.is-flash .bcard__flash,
.b-founder.is-flash .b-founder__flash {
  animation: polaroidFlash 0.4s ease-out;
}
@keyframes polaroidFlash {
  0% { background: rgba(255, 255, 255, 0); }
  10% { background: rgba(255, 255, 255, 0.95); }
  100% { background: rgba(255, 255, 255, 0); }
}

/* founder 大卡拍立得化 — 胶带 */
.b-founder {
  position: relative;
  transform: rotate(-1.5deg);
  transition: transform 0.4s ease;
}
.b-founder:hover {
  transform: rotate(-0.5deg) translateY(-4px);
}
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
.b-founder__avatar {
  position: relative;
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

/* 时间线 */
.b-timeline {
  margin: 80px 0 60px;
  padding: 0 24px;
}
.b-timeline__head {
  text-align: center;
  margin-bottom: 60px;
}
.b-timeline__head h2 {
  font-size: 2.2rem;
  font-weight: 300;
  margin: 12px 0 8px;
  color: var(--ink);
  line-height: 1.2;
}
.b-timeline__lead {
  max-width: 540px;
  margin: 0 auto;
  color: var(--ink);
  opacity: 0.7;
  font-size: 0.95rem;
  line-height: 1.6;
}
.b-timeline__line {
  position: relative;
  height: 180px;
  max-width: 1100px;
  margin: 0 auto;
}
.b-timeline__track {
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--ink);
  opacity: 0.3;
}
.b-timeline__node {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
}
.b-timeline__dot {
  position: absolute;
  left: 50%;
  top: 4px;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--node-color, var(--ink));
  border: 2px solid var(--paper);
  box-shadow: 0 0 0 1px var(--node-color, var(--ink));
  z-index: 2;
}
.b-timeline__card {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 130px;
  text-align: center;
  padding: 6px 4px;
}
.b-timeline__year {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 2px;
}
.b-timeline__person {
  display: inline-block;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  background: var(--node-color, var(--ink));
  color: var(--paper);
  padding: 1px 6px;
  margin-bottom: 4px;
  font-family: var(--font-cjk);
}
.b-timeline__label {
  display: block;
  font-size: 0.7rem;
  color: var(--ink);
  opacity: 0.75;
  line-height: 1.3;
}
@media (max-width: 900px) {
  .b-timeline__line { height: auto; }
  .b-timeline__track { display: none; }
  .b-timeline__node {
    position: relative;
    left: auto !important;
    transform: none;
    display: flex;
    gap: 14px;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--rule);
  }
  .b-timeline__dot { position: relative; top: 0; left: 0; transform: none; flex-shrink: 0; }
  .b-timeline__card { position: relative; top: 0; left: 0; transform: none; width: auto; text-align: left; flex: 1; }
  .b-timeline__label { opacity: 0.7; }
}

.b-cta {
  padding: 4rem 3rem 3rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
.b-cta h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 700;
  margin: 1.5rem 0 1.5rem;
  line-height: 1.1;
  letter-spacing: 0.02em;
}
.b-cta p {
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--ink-soft);
  margin-bottom: 2.5rem;
}
.b-cta__buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ============ RESPONSIVE ============ */
@media (max-width: 900px) {
  .b-founder__grid { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
  .b-founder__avatar { width: 220px; height: 220px; }
  .b-founder__initials { font-size: 5rem; }
  .b-grid__cards { grid-template-columns: 1fr; }
}
</style>
