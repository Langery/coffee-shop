<script setup>
import { baristas } from '../data/index.js'
import { useFlash } from '@/composables/useFlash'
import BaristasHero from '@/components/baristas/BaristasHero.vue'
import BaristasFounder from '@/components/baristas/BaristasFounder.vue'
import BaristasGrid from '@/components/baristas/BaristasGrid.vue'
import BaristasTimeline from '@/components/baristas/BaristasTimeline.vue'
import BaristasCTA from '@/components/baristas/BaristasCTA.vue'

const founder = baristas.find(b => b.id === 'su')
const others = baristas.filter(b => b.id !== 'su')

// 闪光状态上提:Founder/Grid 共享同一闪光瞬间, 容器管理触发, 子组件只读 flashId
const { value: flashBarista, trigger: triggerFlash } = useFlash()

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

function onFounderFlash () { triggerFlash(founder.id) }
function onGridFlash (id) { triggerFlash(id) }
</script>

<template>
  <div class="baristas-page">
    <BaristasHero />
    <BaristasFounder
      :founder="founder"
      :flash-id="flashBarista"
      @flash="onFounderFlash"
    />
    <BaristasGrid
      :baristas="others"
      :flash-id="flashBarista"
      @flash="onGridFlash"
    />
    <BaristasTimeline :timeline="timeline" />
    <BaristasCTA />
  </div>
</template>

<style scoped>
.baristas-page {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
  padding-bottom: 2rem;
}
</style>

<!-- 非 scoped: polaroidFlash keyframe 跨 BaristasFounder / BaristasGrid 共用 -->
<style>
@keyframes polaroidFlash {
  0% { background: rgba(255, 255, 255, 0); }
  10% { background: rgba(255, 255, 255, 0.95); }
  100% { background: rgba(255, 255, 255, 0); }
}
</style>