<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRevealOnScroll } from '@/composables/useRevealOnScroll'

const router = useRouter()
const visible = ref(false)

onMounted(() => {
  setTimeout(() => { visible.value = true }, 100)
})

// 滚动入场动画：5 个 .reveal 段进入视口时加 .is-visible(CSS 完成 fade-up)
useRevealOnScroll({
  selector: '.reveal',
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
})

// 三件小事
const smallThings = [
  {
    num: 'F·01',
    title: '没有 Wi-Fi 密码的纸卡',
    body: '每一张桌牌都印有手写风的 Wi-Fi 密码——但不是重点。重点是背面：「若你愿意放下手机，把时间留给身边的人或自己——这杯咖啡我们请。」每月约有 70 张被顾客带回家。',
    icon: 'M4 4h16v12H5.17L4 17.17V4zm0-2C2.9 2 2 2.9 2 4v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4z'
  },
  {
    num: 'F·02',
    title: '每天清晨 6:30 的杯测',
    body: '我们每天 6:30 开店前都会做一次杯测——所有当日豆子，每杯 30ml，逐个打分。打了 7 年的杯测表已攒下 2,500+ 张，塞在三里屯店二楼的红木柜里。',
    icon: 'M2 21h18v-2H2v2zM20 8h-2V5h-2v3H8V5H6v3H4v2h2v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8h2zM14 14H6V8h8v6z'
  },
  {
    num: 'F·03',
    title: '豆袋上的手写编号',
    body: '每一袋咖啡豆上都有一串手写编号：产地 / 处理法 / 烘焙日 / 杯测分。顾客买走时我们会在背面再加一行：当时谁烘的、当时店里播的什么歌。',
    icon: 'M19 3H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  }
]

// 空间哲学
const spaces = [
  { num: '01', label: '窗边的桌子', body: '三里屯店有 3 张窗边单人位——只放一杯咖啡 + 一本书。下午 4 点到 6 点是它们的"黄金时间"，不接受预订，先到先坐。' },
  { num: '02', label: '没有背景音乐', body: '我们店里没有音箱。背景音是咖啡机的蒸汽、牛奶的起泡、邻座的低语、偶尔的风铃——这些，比任何 playlist 都诚实。' },
  { num: '03', label: '暖光时间', body: '下午 5 点开始，所有顶灯降到 30% 亮度，只留每张桌上的台灯。这是"暖光时间"——回家吃饭之前，给自己 30 分钟不被打扰。' }
]

// 价值观
const values = [
  { word: '慢', en: 'SLOW', body: '我们拒绝 90 秒出杯。手冲 3 分钟，意式 25 秒萃取 + 30 秒打奶——慢，是为了让你有时间想一些事情。' },
  { word: '料', en: 'PURE', body: '糖用云南手工红糖，奶用每日鲜送的本地有机奶，巧克力用 70% 以上可可含量的法芙娜。配料表是看得懂的。' },
  { word: '诚', en: 'TRUE', body: '豆子来自哪、谁烘的、什么时候烘的、保质期多久——全部写在豆袋上。我们不说"阿拉比卡"，我们说"云南保山·水洗"。' },
  { word: '伴', en: 'COMPANION', body: '我们不卖"第 N 杯"。我们希望你来了，就坐一会儿；走了，下次还想来。这是 12 年里我们交到的最贵的朋友。' }
]
</script>

<template>
  <div
    class="about"
    :class="{ 'is-loaded': visible }"
  >
    <!-- ============ HERO ============ -->
    <section class="a-hero">
      <div class="a-hero__head">
        <span class="datestamp typewriter">FRAME 05 · ABOUT SHIGUANG</span>
        <span class="a-hero__roll typewriter">SINCE 2014 · 12 ROLLS · 1 SHOP</span>
      </div>
      <h1 class="a-hero__title">
        一间店，<br>
        拍了<span class="a-hero__title-warm">十二卷</span>。
      </h1>
      <p class="a-hero__lead">
        拾光不是最大的店，也不是最贵的店。<br>
        我们只是在三里屯的街角，慢慢地拍了十二年的咖啡卷。
      </p>
      <div class="a-hero__meta">
        <div class="a-hero__meta-item">
          <span class="a-hero__meta-num typewriter">2014</span>
          <span class="a-hero__meta-label">始于</span>
        </div>
        <div class="a-hero__meta-item">
          <span class="a-hero__meta-num typewriter">12</span>
          <span class="a-hero__meta-label">卷胶片</span>
        </div>
        <div class="a-hero__meta-item">
          <span class="a-hero__meta-num typewriter">42</span>
          <span class="a-hero__meta-label">位咖啡师</span>
        </div>
        <div class="a-hero__meta-item">
          <span class="a-hero__meta-num typewriter">1</span>
          <span class="a-hero__meta-label">间店</span>
        </div>
      </div>
    </section>

    <!-- ============ 主理人手记 ============ -->
    <section class="a-founder reveal">
      <div class="a-founder__grid">
        <div class="a-founder__portrait">
          <div class="a-founder__frame">
            <div class="a-founder__initials">
              苏
            </div>
            <span class="a-founder__portrait-num typewriter">F·22A</span>
            <span
              class="a-founder__tape"
              aria-hidden="true"
            />
            <span
              class="a-founder__tape a-founder__tape--2"
              aria-hidden="true"
            />
          </div>
          <p class="a-founder__caption typewriter">
            苏先生 · 2014 于三里屯
          </p>
        </div>
        <div class="a-founder__text">
          <span class="a-founder__label eyebrow">F·06 · 主理人手记</span>
          <h2 class="a-founder__title">
            为什么叫<span class="warm">「拾光」</span>？
          </h2>
          <div class="a-founder__body">
            <p>
              <span class="dropcap">「</span>拾光」最初是写错的——我们想叫「拾光 Coffee」，把「时光」的「时」换成形近的「拾」。结果印在第一块招牌上就错了，写成了「拾光」。
            </p>
            <p>
              我看着那块招牌想了很久——「拾」也有「拾起」的意思。拾起被浪费的时间，拾起被忽略的小事，拾起一杯被遗忘的下午。错就错吧。
            </p>
            <p>
              十二年过去了，我们从 1 张桌子、1 台磨豆机，变成了 1 间店、42 位咖啡师、1 个二楼的红木柜（装着 2,500+ 张杯测表）。但「拾」这个字从来没换过。
            </p>
            <p class="a-founder__sign">
              — 苏先生 / 主理人 / 写于 2026 春
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 三件小事 ============ -->
    <section class="a-things reveal">
      <div class="a-things__head">
        <span class="eyebrow">F·07 · 三件小事</span>
        <h2>没人告诉过你的<br><span class="warm">三件小事</span></h2>
        <p class="a-things__lead">
          — 关于拾光的，可能只有店员知道 —
        </p>
      </div>
      <div class="a-things__grid">
        <article
          v-for="(t, i) in smallThings"
          :key="t.num"
          class="thing"
          :style="{ '--i': i }"
        >
          <span class="thing__num typewriter">{{ t.num }}</span>
          <svg
            viewBox="0 0 24 24"
            class="thing__icon"
            fill="currentColor"
          >
            <path :d="t.icon" />
          </svg>
          <h3 class="thing__title">
            {{ t.title }}
          </h3>
          <p class="thing__body">
            {{ t.body }}
          </p>
          <span class="thing__cta typewriter">→ F·{{ String(7 + i).padStart(2, '0') }}</span>
        </article>
      </div>
    </section>

    <!-- ============ 空间哲学 ============ -->
    <section class="a-space reveal">
      <div class="a-space__head">
        <span class="eyebrow">F·10 · 空间哲学</span>
        <h2>店里没有的<br><span class="warm">三件事</span></h2>
        <p class="a-space__lead">
          — 它们不在，是我们的选择 —
        </p>
      </div>
      <div class="a-space__list">
        <div
          v-for="(s, i) in spaces"
          :key="s.num"
          class="space-row"
          :style="{ '--i': i }"
        >
          <span class="space-row__num typewriter">{{ s.num }}</span>
          <div class="space-row__label">
            <h3>{{ s.label }}</h3>
            <span class="space-row__rule" />
          </div>
          <p class="space-row__body">
            {{ s.body }}
          </p>
        </div>
      </div>
    </section>

    <!-- ============ 价值观 ============ -->
    <section class="a-values reveal">
      <div class="a-values__head">
        <span class="eyebrow">F·13 · 四个坚持</span>
        <h2>我们坚持的<br><span class="warm">四件事</span></h2>
      </div>
      <div class="a-values__grid">
        <article
          v-for="(v, i) in values"
          :key="v.word"
          class="value"
          :style="{ '--i': i }"
        >
          <div class="value__ch">
            {{ v.word }}
          </div>
          <div class="value__en typewriter">
            {{ v.en }}
          </div>
          <p class="value__body">
            {{ v.body }}
          </p>
          <span class="value__frame-num typewriter">F·{{ String(13 + i).padStart(2, '0') }}</span>
        </article>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <section class="a-cta reveal">
      <div class="a-cta__inner">
        <span class="eyebrow eyebrow--accent">F·17 · END OF ROLL</span>
        <h2>看完十二卷，<br>要不要来拾光坐一会儿？</h2>
        <p class="a-cta__lead">
          店里没有密码本，<br>但有 2,500+ 张杯测表等你翻。
        </p>
        <div class="a-cta__btns">
          <button
            class="a-cta__btn a-cta__btn--primary"
            @click="router.push({ name: 'home', hash: '#contact' })"
          >
            <span>查看地址</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            ><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </button>
          <button
            class="a-cta__btn a-cta__btn--ghost"
            @click="router.push({ name: 'story' })"
          >
            <span>回故事页</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
  padding-bottom: 4rem;
  min-height: 100vh;
}
.about.is-loaded { animation: aboutFade 0.8s ease-out; }
@keyframes aboutFade { 0% { opacity: 0; } 100% { opacity: 1; } }

.warm { color: var(--warm); font-style: italic; }

/* ============ HERO ============ */
.a-hero {
  padding: 7rem 3rem 5rem;
  max-width: 1100px;
  margin: 0 auto;
  border-bottom: 1px solid var(--rule);
}
.a-hero__head {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}
.a-hero__roll {
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  color: var(--ink-soft);
  font-weight: 600;
}
.a-hero__title {
  font-family: var(--font-cjk);
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 800;
  line-height: 1.05;
  margin: 1rem 0 2rem;
  letter-spacing: 0.02em;
}
.a-hero__title-warm { color: var(--warm); font-style: italic; }
.a-hero__lead {
  font-family: var(--font-cjk);
  font-size: 1.25rem;
  line-height: 1.95;
  color: var(--ink-soft);
  max-width: 720px;
  margin-bottom: 3rem;
}
.a-hero__meta {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  border-top: 1px dashed var(--rule);
  padding-top: 2rem;
}
.a-hero__meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.a-hero__meta-num {
  font-size: 2rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.a-hero__meta-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  text-transform: uppercase;
}

/* ============ Reveal 通用 ============ */
.reveal {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ============ 主理人手记 ============ */
.a-founder {
  padding: 5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
.a-founder__grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 4rem;
  align-items: center;
}
.a-founder__frame {
  position: relative;
  width: 280px;
  height: 340px;
  background: var(--paper-light);
  padding: 14px 14px 50px;
  box-shadow: 0 8px 20px rgba(31, 26, 21, 0.18);
  transform: rotate(-1.5deg);
  margin: 0 auto;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.a-founder__frame:hover {
  transform: rotate(-0.5deg) translateY(-4px);
  box-shadow: 0 12px 28px rgba(31, 26, 21, 0.25);
}
.a-founder__initials {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--ink) 0%, #3a322a 100%);
  color: var(--paper);
  font-family: var(--font-cjk);
  font-size: 9rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0;
}
.a-founder__portrait-num {
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 0.62rem;
  color: var(--paper);
  background: var(--warm);
  padding: 0.25rem 0.55rem;
  letter-spacing: 0.18em;
  font-weight: 600;
}
.a-founder__tape {
  position: absolute;
  top: -8px;
  left: 25%;
  width: 60px;
  height: 18px;
  background: rgba(255, 255, 255, 0.85);
  transform: rotate(-4deg);
  box-shadow: 0 1px 2px rgba(31, 26, 21, 0.08);
}
.a-founder__tape--2 {
  top: auto;
  bottom: 80px;
  right: -10px;
  left: auto;
  transform: rotate(8deg);
  width: 40px;
  height: 14px;
  background: rgba(255, 235, 180, 0.7);
}
.a-founder__caption {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  font-weight: 600;
}
.a-founder__label { color: var(--warm); }
.a-founder__title {
  font-family: var(--font-cjk);
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
}
.a-founder__body p {
  font-family: var(--font-cjk);
  font-size: 1.05rem;
  line-height: 2;
  color: var(--ink-soft);
  margin-bottom: 1.2rem;
}
.a-founder__sign {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--warm);
  text-align: right;
  margin-top: 2rem;
  font-size: 0.95rem;
}
/* ============ 三件小事 ============ */
.a-things {
  padding: 5rem 3rem 6rem;
  max-width: 1300px;
  margin: 0 auto;
}
.a-things__head {
  text-align: center;
  margin-bottom: 4rem;
}
.a-things__head h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0.5rem 0 0.8rem;
}
.a-things__lead {
  font-family: var(--font-cjk);
  font-size: 1.05rem;
  color: var(--ink-soft);
  font-style: italic;
}
.a-things__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.thing {
  position: relative;
  background: var(--paper-light);
  border: 1px solid var(--rule);
  padding: 2rem 1.6rem 1.8rem;
  box-shadow: 0 3px 8px rgba(31, 26, 21, 0.08);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  cursor: default;
}
.thing:hover {
  transform: translateY(-6px) rotate(-0.5deg);
  box-shadow: 0 10px 22px rgba(31, 26, 21, 0.16);
  border-color: var(--warm);
}
.thing__num {
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--warm);
  font-weight: 600;
}
.thing__icon {
  width: 32px;
  height: 32px;
  color: var(--warm);
  margin-bottom: 1.2rem;
  display: block;
}
.thing__title {
  font-family: var(--font-cjk);
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  line-height: 1.35;
  color: var(--ink);
}
.thing__body {
  font-family: var(--font-cjk);
  font-size: 0.92rem;
  line-height: 1.85;
  color: var(--ink-soft);
  margin-bottom: 1.2rem;
}
.thing__cta {
  display: inline-block;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  border-top: 1px dashed var(--rule);
  padding-top: 0.7rem;
  font-weight: 600;
}

/* ============ 空间哲学 ============ */
.a-space {
  background: var(--paper-deep);
  padding: 5rem 3rem 6rem;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.a-space__head {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
}
.a-space__head h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0.5rem 0 0.8rem;
}
.a-space__lead {
  font-family: var(--font-cjk);
  font-size: 1.05rem;
  color: var(--ink-soft);
  font-style: italic;
}
.a-space__list {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.space-row {
  display: grid;
  grid-template-columns: 80px 220px 1fr;
  gap: 2rem;
  align-items: center;
  padding: 1.8rem 0.5rem;
  border-bottom: 1px dashed var(--rule);
  transition: background 0.3s, padding 0.3s;
  cursor: default;
}
.space-row:last-child { border-bottom: none; }
.space-row:hover {
  background: var(--paper);
  padding-left: 1.5rem;
}
.space-row__num {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--warm);
  font-family: var(--font-serif);
  font-style: italic;
}
.space-row__label h3 {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--ink);
}
.space-row__rule {
  display: block;
  width: 50px;
  height: 2px;
  background: var(--warm);
}
.space-row__body {
  font-family: var(--font-cjk);
  font-size: 0.95rem;
  line-height: 1.85;
  color: var(--ink-soft);
}

/* ============ 价值观 ============ */
.a-values {
  padding: 5rem 3rem 6rem;
  max-width: 1300px;
  margin: 0 auto;
}
.a-values__head {
  text-align: center;
  margin-bottom: 4rem;
}
.a-values__head h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0.5rem 0 0.5rem;
}
.a-values__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.value {
  position: relative;
  border: 1px solid var(--rule);
  padding: 2.5rem 1.6rem 2rem;
  background: var(--paper-light);
  text-align: center;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  cursor: default;
}
.value:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(31, 26, 21, 0.15);
}
.value__ch {
  font-family: var(--font-cjk);
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--warm);
  margin-bottom: 0.5rem;
  font-style: italic;
}
.value__en {
  font-size: 0.68rem;
  letter-spacing: 0.3em;
  color: var(--ink-soft);
  margin-bottom: 1.5rem;
  display: block;
  font-weight: 600;
}
.value__body {
  font-family: var(--font-cjk);
  font-size: 0.88rem;
  line-height: 1.85;
  color: var(--ink-soft);
  text-align: left;
}
.value__frame-num {
  position: absolute;
  top: 0.8rem;
  right: 0.9rem;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--warm);
  font-weight: 600;
}

/* ============ CTA ============ */
.a-cta {
  padding: 6rem 3rem 4rem;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.a-cta__inner {
  background: var(--ink);
  color: var(--paper);
  padding: 4rem 3rem;
  position: relative;
  overflow: hidden;
}
.a-cta__inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--warm), var(--warm-deep) 50%, var(--warm));
}
.a-cta h2 {
  font-family: var(--font-cjk);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.25;
  margin: 0.8rem 0 1.5rem;
}
.a-cta__lead {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  line-height: 1.95;
  color: rgba(255, 251, 240, 0.75);
  margin-bottom: 2.5rem;
}
.a-cta__btns {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.a-cta__btn {
  background: var(--paper);
  color: var(--ink);
  border: none;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  padding: 0.85rem 1.8rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: 999px;
  transition: all 0.3s;
  font-weight: 600;
}
.a-cta__btn--primary { background: var(--warm); color: var(--paper); }
.a-cta__btn--primary:hover {
  background: var(--paper);
  color: var(--warm);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(200, 85, 61, 0.3);
}
.a-cta__btn--ghost {
  background: transparent;
  color: var(--paper);
  border: 1px solid var(--paper);
}
.a-cta__btn--ghost:hover {
  background: var(--paper);
  color: var(--ink);
  transform: translateY(-2px);
}
.a-cta__btn svg { width: 16px; height: 16px; }

/* ============ RESPONSIVE ============ */
@media (max-width: 900px) {
  .a-hero { padding: 5rem 1.5rem 3rem; }
  .a-hero__meta { grid-template-columns: repeat(2, 1fr); gap: 1.2rem; }
  .a-founder { padding: 3rem 1.5rem; }
  .a-founder__grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .a-founder__frame { width: 220px; height: 270px; }
  .a-founder__initials { font-size: 7rem; }
  .a-things { padding: 3rem 1.5rem 4rem; }
  .a-things__grid { grid-template-columns: 1fr; }
  .a-space { padding: 3rem 1.5rem 4rem; }
  .space-row { grid-template-columns: 50px 1fr; gap: 1rem; padding: 1.2rem 0.5rem; }
  .space-row__body { grid-column: 1 / -1; }
  .a-values { padding: 3rem 1.5rem 4rem; }
  .a-values__grid { grid-template-columns: repeat(2, 1fr); }
  .a-cta { padding: 3rem 1.5rem 2rem; }
  .a-cta__inner { padding: 2.5rem 1.5rem; }
}
@media (max-width: 480px) {
  .a-values__grid { grid-template-columns: 1fr; }
}
</style>
