<script setup>
defineProps({
  timeline: { type: Array, required: true }
})
</script>

<template>
  <section class="b-timeline">
    <header class="b-timeline__head">
      <span class="eyebrow eyebrow--accent">F·26 · 16 YEARS · 4 LIVES</span>
      <h2>十六年<br>四双手的轨迹</h2>
      <p class="b-timeline__lead">
        从云南到台北, 从里昂到上海, 四个时间线在 2018 年的拾光咖啡交汇。
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
</template>

<style scoped>
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
</style>