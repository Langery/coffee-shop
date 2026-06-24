<script setup>
import StoryHero from '@/components/story/StoryHero.vue'
import StoryTimeline from '@/components/story/StoryTimeline.vue'
import StoryPrinciples from '@/components/story/StoryPrinciples.vue'
import StoryStats from '@/components/story/StoryStats.vue'
import StoryQuote from '@/components/story/StoryQuote.vue'
import StoryCta from '@/components/story/StoryCta.vue'

const milestones = [
  { year: '2010', frame: '00A', text: '主理人苏先生在云南普洱产区开始学习咖啡种植与杯测。', img: '/coffee-shop/milestone-2010.jpg' },
  { year: '2014', frame: '01A', text: '云南小粒种在国际杯测中首次突破 85 分，进入精品区间。', img: '/coffee-shop/milestone-2014.jpg' },
  { year: '2018', frame: '02A', text: '拾光咖啡在三里屯旧巷开张，只有一台手冲壶与一款危地马拉豆。', img: '/coffee-shop/milestone-2018.jpg' },
  { year: '2020', frame: '03A', text: '第二家店于上海安福路开张，引入甜点主厨王沐。', img: '/coffee-shop/milestone-2020.jpg' },
  { year: '2022', frame: '04A', text: '调饮师陈芷加入，开启「节气咖啡」系列。', img: '/coffee-shop/milestone-2022.jpg' },
  { year: '2024', frame: '05A', text: '拾光学院成立，开设手冲萃取与杯测课程。', img: '/coffee-shop/milestone-2024.jpg' },
  { year: '2026', frame: '06A', text: '累计供应超过 24 万杯手冲咖啡。', img: '/coffee-shop/milestone-2026.jpg' }
]

const principles = [
  { num: 'F·11', title: '只用手冲', body: '不卖意式机出品的「美式」「拿铁」——只用手冲与冷萃，每杯都由咖啡师手工萃取。', img: '/coffee-shop/principle-11.jpg' },
  { num: 'F·12', title: '只用当季', body: '生豆按季节轮换，不使用库存超过 6 个月的豆子。每批豆子都会标注入店日期。', img: '/coffee-shop/principle-12.jpg' },
  { num: 'F·13', title: '只用心', body: '不为了效率引入任何「一键式」冲煮设备。手冲的变量是「人」，不是「机器」。', img: '/coffee-shop/principle-13.jpg' }
]

const stats = [
  { num: '07', label: '年时光', sub: 'years', note: 'since 2018', frame: 'F·16' },
  { num: '02', label: '家门店', sub: 'locations', note: '三里屯 · 安福路', frame: 'F·17' },
  { num: '12', label: '款当季豆', sub: 'origins', note: 'updated quarterly', frame: 'F·18' },
  { num: '240K+', label: '杯手冲', sub: 'brews', note: 'from 2018 to 2026', frame: 'F·19' }
]

const ctaImg = '/coffee-shop/product-1.jpg'
const quoteImg = '/coffee-shop/quote-bg.jpg'

// 目录速览 (hero 下方)
const toc = [
  { num: '01', label: '七帧碎片', sub: 'timeline', frame: 'F·09–15' },
  { num: '02', label: '三个坚持', sub: 'principles', frame: 'F·11–13' },
  { num: '03', label: '4 个数字', sub: 'stats', frame: 'F·16–19' },
  { num: '04', label: '九十秒的慢', sub: 'quote', frame: 'F·20A' },
  { num: '05', label: '坐下来喝一杯', sub: 'cta', frame: 'F·21–25' }
]
</script>

<template>
  <div class="story-page">
    <StoryHero :toc="toc" />

    <!-- ============ 装饰条 1: 胶片孔 (hero→timeline) ============ -->
    <div
      class="divider divider--filmholes"
      aria-hidden="true"
    >
      <span class="divider__label">ROLL · 06 / FRAME 09–15</span>
    </div>

    <StoryTimeline :milestones="milestones" />

    <!-- ============ 装饰条 2: 印章 + dashed (timeline→principles) ============ -->
    <div
      class="divider divider--stamp"
      aria-hidden="true"
    >
      <span class="divider__line" />
      <span class="divider__icon">F · 16</span>
      <span class="divider__line" />
    </div>

    <StoryPrinciples :principles="principles" />

    <!-- ============ 装饰条 3: 手绘虚线 (principles→stats) ============ -->
    <div
      class="divider divider--handdrawn"
      aria-hidden="true"
    />

    <StoryStats :stats="stats" />

    <!-- ============ 装饰条 4: ⌖ 定位标 (stats→quote) ============ -->
    <div
      class="divider divider--crosshair"
      aria-hidden="true"
    >
      <span class="cross">⌖</span>
      <span class="divider__label typewriter">FRAME 20A · 90 SECONDS</span>
      <span class="cross">⌖</span>
    </div>

    <StoryQuote :quote-img="quoteImg" />

    <StoryCta :cta-img="ctaImg" />
  </div>
</template>

<style scoped>
.story-page {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
  padding-bottom: 2rem;
}

/* ============ 装饰条 (4 种,各 section 之间) ============ */
.divider {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--paper);
}
.divider__label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--warm);
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--paper);
  padding: 0 14px;
}
/* 1. 胶片孔条 (hero→timeline) */
.divider--filmholes {
  height: 14px;
  background: var(--ink);
  background-image: radial-gradient(circle at 14px 7px, var(--paper) 3px, transparent 3.5px);
  background-size: 28px 14px;
  background-repeat: repeat-x;
  background-position: 0 center;
  padding: 0 60px;
}
.divider--filmholes .divider__label {
  background: var(--ink);
  color: var(--paper);
  font-size: 0.6rem;
  letter-spacing: 0.25em;
}
/* 2. 印章 + 双 dashed (timeline→principles) */
.divider--stamp {
  height: 36px;
  gap: 1rem;
  padding: 0 3rem;
}
.divider--stamp .divider__line {
  flex: 1;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    var(--warm) 0 4px,
    transparent 4px 8px
  );
}
.divider--stamp .divider__icon {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--warm);
  letter-spacing: 0.3em;
  border: 1.5px solid var(--warm);
  padding: 4px 10px;
  transform: rotate(-2deg);
  background: var(--paper);
  font-weight: 700;
}
/* 3. 手绘虚线 (principles→stats) */
.divider--handdrawn {
  height: 18px;
  background: var(--paper);
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='18' viewBox='0 0 100 18'><path d='M2 9 Q 12 5, 22 9 T 42 9 T 62 9 T 82 9 T 98 9' stroke='%23b8543a' stroke-width='1.2' fill='none' stroke-linecap='round'/></svg>");
  background-repeat: repeat-x;
  background-position: center;
  background-size: 100px 18px;
}
/* 4. ⌖ 定位标 (stats→quote) */
.divider--crosshair {
  height: 36px;
  gap: 1.2rem;
  font-family: var(--font-mono);
  background: var(--paper);
}
.divider--crosshair .cross {
  color: var(--warm);
  font-size: 1rem;
  line-height: 1;
}
.divider--crosshair .divider__label {
  position: static;
  transform: none;
  background: transparent;
  padding: 0;
  color: var(--ink-soft);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
}

@media (max-width: 900px) {
  .divider--filmholes .divider__label { font-size: 0.5rem; letter-spacing: 0.15em; }
  .divider--stamp .divider__icon { font-size: 0.6rem; padding: 3px 7px; }
}
</style>
