<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { categoryLabel } from '@/utils/menuHelpers'

const props = defineProps({
  tabs: { type: Array, required: true },
  active: { type: String, required: true },
  totalByTab: { type: Object, required: true }
})

const emit = defineEmits(['update:active'])

// 滑动指示器: 完全自包含的内部状态
const tabRefs = ref({})
const indicatorStyle = ref({ left: '0px', width: '0px' })

const updateIndicator = async () => {
  await nextTick()
  const el = tabRefs.value[props.active]
  if (el) {
    indicatorStyle.value = {
      left: el.offsetLeft + 'px',
      width: el.offsetWidth + 'px'
    }
  }
}

watch(() => props.active, () => { updateIndicator() })

function pick (t) { emit('update:active', t) }
</script>

<template>
  <div class="menu__tabs">
    <button
      v-for="t in tabs"
      :key="t"
      :ref="el => { if (el && t === active) tabRefs[t] = el }"
      :class="['tab', { active: active === t }]"
      @click="pick(t)"
    >
      <span class="tab__label">{{ t === 'all' ? '全部' : categoryLabel(t) }}</span>
      <span class="tab__count">{{ totalByTab[t] || 0 }}</span>
    </button>
    <span
      class="tab__indicator"
      :style="indicatorStyle"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.menu__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  position: relative;
}
.tab__indicator {
  position: absolute;
  bottom: -4px;
  height: 2px;
  background: var(--warm);
  transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  border-radius: 1px;
}
.tab {
  background: transparent;
  border: 1px solid var(--rule);
  padding: 0.5rem 1.1rem;
  cursor: pointer;
  font-family: var(--font-cjk);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--ink-soft);
  border-radius: 999px;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: 500;
}
.tab:hover { color: var(--ink); border-color: var(--ink); }
.tab:active { transform: scale(0.95); }
.tab.active {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}
.tab__label { font-size: 0.9rem; font-weight: 500; }
.tab.active .tab__label { font-weight: 600; }
.tab__count {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  opacity: 0.6;
  background: var(--paper-deep);
  color: var(--ink-soft);
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  min-width: 1.4rem;
  text-align: center;
}
.tab.active .tab__count {
  background: var(--warm);
  color: var(--paper);
  opacity: 1;
}
</style>