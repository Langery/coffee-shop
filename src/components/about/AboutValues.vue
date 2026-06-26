<script setup>
const values = [
  { word: '慢', en: 'SLOW', body: '我们拒绝 90 秒出杯。手冲 3 分钟，意式 25 秒萃取 + 30 秒打奶——慢，是为了让你有时间想一些事情。' },
  { word: '料', en: 'PURE', body: '糖用云南手工红糖，奶用每日鲜送的本地有机奶，巧克力用 70% 以上可可含量的法芙娜。配料表是看得懂的。' },
  { word: '诚', en: 'TRUE', body: '豆子来自哪、谁烘的、什么时候烘的、保质期多久——全部写在豆袋上。我们不说"阿拉比卡"，我们说"云南保山·水洗"。' },
  { word: '伴', en: 'COMPANION', body: '我们不卖"第 N 杯"。我们希望你来了，就坐一会儿；走了，下次还想来。这是 12 年里我们交到的最贵的朋友。' }
]
</script>

<template>
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
        <div class="value__ch">{{ v.word }}</div>
        <div class="value__en typewriter">{{ v.en }}</div>
        <p class="value__body">{{ v.body }}</p>
        <span class="value__frame-num typewriter">F·{{ String(13 + i).padStart(2, '0') }}</span>
      </article>
    </div>
  </section>
</template>

<style scoped>
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
.warm { color: var(--warm); font-style: italic; }

@media (max-width: 900px) {
  .a-values { padding: 3rem 1.5rem 4rem; }
  .a-values__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .a-values__grid { grid-template-columns: 1fr; }
}
</style>
