<script setup>
import { ref, computed } from 'vue'
import { parsePrice } from '@/utils/menuHelpers'
import { recommendedMenuIds } from '../../data/index.js'
import MenuHeader from './menu/MenuHeader.vue'
import MenuTabs from './menu/MenuTabs.vue'
import MenuFilterPanel from './menu/MenuFilterPanel.vue'
import MenuGrid from './menu/MenuGrid.vue'
import MenuEmpty from './menu/MenuEmpty.vue'

const props = defineProps({
  menuItems: { type: Array, required: true }
})

const emit = defineEmits(['goToMenuItem'])

// 筛选状态: 4 个 ref 都在容器里
const activeTab = ref('all')
const filterPrice = ref('all')
const onlyRecommended = ref(false)
const showFilters = ref(false)

// tabs 派生: "all" + 所有 category 去重
const tabs = computed(() => ['all', ...new Set(props.menuItems.map(m => m.category))])

// 每个 tab 的条目数 (props 下传 MenuTabs, 避免子组件内重复 filter)
const totalByTab = computed(() => {
  const counts = { all: props.menuItems.length }
  for (const m of props.menuItems) counts[m.category] = (counts[m.category] || 0) + 1
  return counts
})

const filteredMenu = computed(() => {
  let list = props.menuItems
  if (activeTab.value !== 'all') list = list.filter(m => m.category === activeTab.value)
  if (filterPrice.value !== 'all') {
    list = list.filter(m => {
      const p = parsePrice(m.price)
      if (filterPrice.value === 'low') return p < 30
      if (filterPrice.value === 'mid') return p >= 30 && p <= 40
      if (filterPrice.value === 'high') return p > 40
      return true
    })
  }
  if (onlyRecommended.value) list = list.filter(m => recommendedMenuIds.includes(m.id))
  return list
})

function goToMenuItem (id) { emit('goToMenuItem', id) }
</script>

<template>
  <section
    id="menu"
    class="menu"
  >
    <MenuHeader :total-count="menuItems.length" />

    <div class="menu__controls">
      <div class="menu__top">
        <MenuTabs
          :tabs="tabs"
          :active="activeTab"
          :total-by-tab="totalByTab"
          @update:active="activeTab = $event"
        />
        <button
          :class="['filter-toggle-btn', { active: showFilters }]"
          :aria-expanded="showFilters"
          aria-controls="menu-filter-panel"
          @click="showFilters = !showFilters"
        >
          <span>筛选</span>
          <span
            class="filter-toggle-btn__chevron"
            :class="{ open: showFilters }"
          >▾</span>
        </button>
      </div>

      <MenuFilterPanel
        :show="showFilters"
        :price="filterPrice"
        :only-recommended="onlyRecommended"
        @update:price="filterPrice = $event"
        @update:only-recommended="onlyRecommended = $event"
      />
    </div>

    <MenuGrid
      v-if="filteredMenu.length"
      :items="filteredMenu"
      @go-to-menu-item="goToMenuItem"
    />
    <MenuEmpty v-else />
  </section>
</template>

<style scoped>
.menu {
  padding: 5rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
.menu__controls {
  padding: 0 3rem;
  margin-bottom: 2.5rem;
}
.menu__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--rule);
}
.filter-toggle-btn {
  background: transparent;
  border: 1px solid var(--rule);
  padding: 0.5rem 1.1rem;
  cursor: pointer;
  font-family: var(--font-cjk);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ink-soft);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s;
}
.filter-toggle-btn:hover { color: var(--ink); border-color: var(--ink); }
.filter-toggle-btn:active { transform: scale(0.95); }
.filter-toggle-btn.active {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}
.filter-toggle-btn__chevron {
  font-size: 0.7rem;
  display: inline-block;
  transition: transform 0.25s ease;
}
.filter-toggle-btn__chevron.open { transform: rotate(180deg); }

@media (max-width: 1024px) {
  .menu { padding: 3rem 0; }
  .menu__controls { padding: 0 1rem; }
}
</style>