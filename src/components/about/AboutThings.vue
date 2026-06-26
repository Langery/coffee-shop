<script setup>
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
    icon: 'M2 21h18v-2H2v2zM20 8h-2V5h-2v3H8V5H6v3H4v2h2v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8h2zm-6 6H6V8h8v6z'
  },
  {
    num: 'F·03',
    title: '豆袋上的手写编号',
    body: '每一袋咖啡豆上都有一串手写编号：产地 / 处理法 / 烘焙日 / 杯测分。顾客买走时我们会在背面再加一行：当时谁烘的、当时店里播的什么歌。',
    icon: 'M19 3H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  }
]
</script>

<template>
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
        <svg viewBox="0 0 24 24" class="thing__icon" fill="currentColor">
          <path :d="t.icon" />
        </svg>
        <h3 class="thing__title">{{ t.title }}</h3>
        <p class="thing__body">{{ t.body }}</p>
        <span class="thing__cta typewriter">→ F·{{ String(7 + i).padStart(2, '0') }}</span>
      </article>
    </div>
  </section>
</template>

<style scoped>
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
.warm { color: var(--warm); font-style: italic; }

@media (max-width: 900px) {
  .a-things { padding: 3rem 1.5rem 4rem; }
  .a-things__grid { grid-template-columns: 1fr; }
}
</style>
