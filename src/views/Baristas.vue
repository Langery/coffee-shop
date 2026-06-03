<script setup>
import { baristas } from '../data/index.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const teams = [
  { num: 'F·22', name: '苏先生', role: '主理人 / ROASTMASTER', years: '12年', quote: '一杯好咖啡, 是对时间和豆子的尊重。' },
  { num: 'F·23', name: '李青', role: '咖啡总监 / HEAD BARISTA', years: '08年', quote: '手冲的变量是「人」, 不是机器。' },
  { num: 'F·24', name: '王沐', role: '甜点主厨 / PASTRY CHEF', years: '06年', quote: '咖啡与甜点, 是味道的对话。' },
  { num: 'F·25', name: '陈芷', role: '调饮师 / MIXOLOGIST', years: '05年', quote: '节气入杯, 时令入味。' }
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
        四双手<br />
        的<span class="b-hero__title-warm">专注</span>
      </h1>
      <p class="b-hero__lead">
        从产地到杯中, 每一支豆子都经咖啡总监手工挑选;<br />
        每一杯手冲, 都由四双手之一精心萃取。
      </p>
    </section>

    <!-- 大卡: 苏先生 (Founder) -->
    <section class="b-founder">
      <div class="b-founder__grid">
        <div class="b-founder__avatar">
          <div class="b-founder__initials">苏</div>
          <span class="b-founder__no">F·22</span>
          <span class="b-founder__role">FOUNDER</span>
        </div>
        <div class="b-founder__info">
          <span class="eyebrow eyebrow--accent">F·22 · 主理人</span>
          <h2>苏先生<br />从云南产区走到三里屯</h2>
          <p>2010 年起在云南普洱产区开始学习咖啡种植与杯测, 2018 年在北京三里屯开出第一家拾光。「我想做一家自己想去的咖啡馆」—— 这是开店时他写在自己笔记本上的一句话。</p>
          <p>主理人负责每季度的生豆挑选与烘焙曲线调整, 亲自把控每一支豆子的风味走向。</p>
          <div class="b-founder__sig">
            <span class="typewriter">— 苏先生 · 主理人</span>
            <span class="b-founder__years">12 YEARS · ROASTMASTER</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 个咖啡师 (拍立得卡 2x2) -->
    <section class="b-grid">
      <header class="b-grid__head">
        <span class="eyebrow eyebrow--accent">F·23–25 · CRAFTSPEOPLE</span>
        <h2>另外三双手</h2>
      </header>
      <div class="b-grid__cards">
        <article
          v-for="(m, i) in baristas.filter(b => b.id !== 'su').concat([]).slice(0, 3)"
          :key="m.id"
          class="bcard tilt-c"
          :style="{ '--i': i }"
        >
          <div class="bcard__polaroid">
            <div class="bcard__avatar">
              <div class="bcard__initials">{{ m.initials }}</div>
              <span class="bcard__no">{{ teams[i + 1].num }}</span>
            </div>
            <div class="bcard__meta">
              <span class="bcard__years">{{ m.years }}</span>
              <span class="bcard__role typewriter">{{ teams[i + 1].role }}</span>
            </div>
            <h3>{{ m.name }}</h3>
            <p class="bcard__quote">"{{ m.quote }}"</p>
            <p class="bcard__bio">{{ m.bio }}</p>
            <div class="bcard__tags">
              <span v-for="t in (m.spec || []).slice(0, 3)" :key="t" class="bcard__tag">{{ t }}</span>
            </div>
            <span class="bcard__date">{{ ['06·24·25', '07·08·25', '06·12·25'][i] }}</span>
            <span class="bcard__stamp">{{ ['EXP·23', 'EXP·24', 'EXP·25'][i] }}</span>
          </div>
        </article>
      </div>
      <div class="b-grid__caption">
        <span class="b-grid__caption-line"></span>
        <span class="b-grid__caption-text">— 三双手 · 三个故事 · 三种咖啡哲学 —</span>
        <span class="b-grid__caption-line"></span>
      </div>
    </section>

    <!-- CTA -->
    <section class="b-cta">
      <span class="datestamp">F·26 · COME SAY HI</span>
      <h2>来拾光<br />认识他们</h2>
      <p>咖啡师每天 8 点到店, 开始当日的手冲备豆。如果你也想了解一杯咖啡背后的故事, 欢迎来店里坐一坐。</p>
      <div class="b-cta__buttons">
        <button class="btn-primary" @click="router.push({ name: 'home', hash: '#menu' })">浏览菜单</button>
        <button class="btn-ghost" @click="router.push({ name: 'home', hash: '#contact' })">联络</button>
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
.btn-primary, .btn-ghost {
  font-family: var(--font-sans);
  cursor: pointer;
  border: none;
  padding: 0.9rem 2.2rem;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  border-radius: 0;
  transition: all 0.25s;
  font-weight: 600;
}
.btn-primary { background: var(--ink); color: var(--paper); }
.btn-primary:hover { background: var(--warm); }
.btn-ghost {
  background: transparent;
  color: var(--ink);
  border: 2px solid var(--ink);
}
.btn-ghost:hover { background: var(--ink); color: var(--paper); }

/* ============ RESPONSIVE ============ */
@media (max-width: 900px) {
  .b-founder__grid { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
  .b-founder__avatar { width: 220px; height: 220px; }
  .b-founder__initials { font-size: 5rem; }
  .b-grid__cards { grid-template-columns: 1fr; }
}
</style>
