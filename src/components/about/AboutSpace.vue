<script setup>
const spaces = [
  { num: '01', label: '窗边的桌子', body: '三里屯店有 3 张窗边单人位——只放一杯咖啡 + 一本书。下午 4 点到 6 点是它们的"黄金时间"，不接受预订，先到先坐。' },
  { num: '02', label: '没有背景音乐', body: '我们店里没有音箱。背景音是咖啡机的蒸汽、牛奶的起泡、邻座的低语、偶尔的风铃——这些，比任何 playlist 都诚实。' },
  { num: '03', label: '暖光时间', body: '下午 5 点开始，所有顶灯降到 30% 亮度，只留每张桌上的台灯。这是"暖光时间"——回家吃饭之前，给自己 30 分钟不被打扰。' }
]
</script>

<template>
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
        <p class="space-row__body">{{ s.body }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
.warm { color: var(--warm); font-style: italic; }

@media (max-width: 900px) {
  .a-space { padding: 3rem 1.5rem 4rem; }
  .space-row { grid-template-columns: 50px 1fr; gap: 1rem; padding: 1.2rem 0.5rem; }
  .space-row__body { grid-column: 1 / -1; }
}
</style>
