<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  menuItems: { type: Array, required: true }
})

const emit = defineEmits(['goToMenuItem'])

const activeTab = ref('all')
const tabs = computed(() => ['all', ...new Set(props.menuItems.map(m => m.category))])
const filterPrice = ref('all')
const onlyRecommended = ref(false)
const showFilters = ref(false)
const categoryLabel = (k) => ({ coffee: '咖啡', signature: '特色饮品', tea: '茶饮', dessert: '甜点', set: '套餐' }[k] || k)
const parsePrice = (str) => { const m = String(str).match(/(\d+)/); return m ? parseInt(m[1]) : 0 }

const REC_IDS = ['osmanthus-latte', 'matcha-red-bean', 'afternoon-tea', 'matcha-latte']
const isRecommended = (id) => REC_IDS.includes(id)
const isLimited = (item) => /季节限定|限定/.test(item.name) || /限时|季节/.test(item.shortDesc || '')

const tabRefs = ref({})
const indicatorStyle = ref({ left: '0px', width: '0px' })
const updateIndicator = async () => {
  await nextTick()
  const el = tabRefs.value[activeTab.value]
  const container = el?.parentElement
  if (el && container) {
    indicatorStyle.value = {
      left: el.offsetLeft + 'px',
      width: el.offsetWidth + 'px'
    }
  }
}
watch(activeTab, () => { updateIndicator() })

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
  if (onlyRecommended.value) {
    list = list.filter(m => REC_IDS.includes(m.id))
  }
  return list
})

const goToMenuItem = (id) => emit('goToMenuItem', id)
</script>

<template>
  <section id="menu" class="menu">
    <header class="section-head">
      <div>
        <span class="eyebrow eyebrow--accent">MENU</span>
        <h2>本卷菜单<br>夏季号</h2>
      </div>
      <p class="section-head__caption">
        点击分类切换 · 价格区间筛选 · {{ menuItems.length }} 个选项
      </p>
    </header>

    <div class="menu__controls">
      <div class="menu__top">
        <div class="menu__tabs">
          <button
            v-for="t in tabs"
            :key="t"
            :ref="el => { if (el && t === activeTab) tabRefs[t] = el }"
            :class="['tab', { active: activeTab === t }]"
            @click="activeTab = t"
          >
            <span class="tab__label">{{ t === 'all' ? '全部' : categoryLabel(t) }}</span>
            <span class="tab__count">{{ t === 'all' ? menuItems.length : menuItems.filter(m => m.category === t).length }}</span>
          </button>
          <span class="tab__indicator" :style="indicatorStyle" aria-hidden="true" />
        </div>
        <button
          :class="['filter-toggle-btn', { active: showFilters }]"
          :aria-expanded="showFilters"
          aria-controls="menu-filter-panel"
          @click="showFilters = !showFilters"
        >
          <span>筛选</span>
          <span class="filter-toggle-btn__chevron" :class="{ open: showFilters }">▾</span>
        </button>
      </div>

      <transition name="filter-panel">
        <div v-show="showFilters" id="menu-filter-panel" class="menu__filter-panel">
          <div class="filter-group">
            <span class="filter-group__label">价格</span>
            <button :class="['filter', { active: filterPrice === 'all' }]" @click="filterPrice = 'all'">
              全部
            </button>
            <button :class="['filter', { active: filterPrice === 'low' }]" @click="filterPrice = 'low'">
              &lt; ¥30
            </button>
            <button :class="['filter', { active: filterPrice === 'mid' }]" @click="filterPrice = 'mid'">
              ¥30–40
            </button>
            <button :class="['filter', { active: filterPrice === 'high' }]" @click="filterPrice = 'high'">
              &gt; ¥40
            </button>
          </div>
          <div class="filter-group">
            <span class="filter-group__label">推荐</span>
            <label class="filter-toggle">
              <input v-model="onlyRecommended" type="checkbox" />
              <span>只看招牌</span>
            </label>
          </div>
        </div>
      </transition>
    </div>

    <div :key="activeTab + filterPrice + onlyRecommended" class="menu__grid">
      <article
        v-for="(item, i) in filteredMenu"
        :key="item.id"
        class="menu-card"
        :class="{ 'menu-card--recommended': isRecommended(item.id), 'menu-card--limited': isLimited(item) }"
        :style="{ animationDelay: (i * 0.04) + 's' }"
        @click="goToMenuItem(item.id)"
      >
        <div class="menu-card__img">
          <div class="duotone">
            <img :src="item.image" :alt="item.name" loading="lazy" />
          </div>
          <span v-if="isLimited(item)" class="menu-card__ribbon menu-card__ribbon--limited">季节限定</span>
          <span v-else-if="isRecommended(item.id)" class="menu-card__ribbon menu-card__ribbon--rec">招牌</span>
        </div>
        <div class="menu-card__body">
          <div class="menu-card__cat">
            {{ categoryLabel(item.category) }}
          </div>
          <h4>{{ item.name }}</h4>
          <p class="menu-card__desc">
            {{ item.shortDesc }}
          </p>
          <div class="menu-card__footer">
            <span class="menu-card__price">{{ item.price }}</span>
            <span class="menu-card__unit">{{ item.unit }}</span>
          </div>
        </div>
      </article>
    </div>

    <p v-if="filteredMenu.length === 0" class="menu__empty">
      没有符合条件的饮品 · 试着放宽筛选
    </p>
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

.menu__filter-panel {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.5rem 0 1.5rem;
  border-bottom: 1px solid var(--rule);
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.filter-group__label {
  font-family: var(--font-cjk);
  font-size: 0.85rem;
  color: var(--ink-soft);
  font-weight: 500;
  margin-right: 0.4rem;
  min-width: 2.4rem;
}

.filter-panel-enter-active,
.filter-panel-leave-active {
  transition: max-height 0.3s ease, opacity 0.25s ease, padding 0.3s ease;
  overflow: hidden;
  max-height: 200px;
}
.filter-panel-enter-from,
.filter-panel-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

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

.filter {
  background: none;
  border: 1px solid transparent;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  font-family: var(--font-cjk);
  font-size: 0.85rem;
  color: var(--ink-soft);
  transition: all 0.2s;
  border-radius: 999px;
}
.filter:hover { color: var(--ink); background: var(--paper-deep); }
.filter:active { transform: scale(0.95); }
.filter.active {
  color: var(--ink);
  background: var(--paper-deep);
  font-weight: 600;
}
.filter-toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  font-family: var(--font-cjk);
  font-size: 0.85rem;
  color: var(--ink-soft);
}
.filter-toggle:hover { color: var(--ink); }
.filter-toggle input { accent-color: var(--warm); }

.menu__grid {
  padding: 0 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
@keyframes cardFade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.menu-card {
  background: var(--paper-light);
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
  border: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  position: relative;
  animation: cardFade 0.4s ease-out;
  animation-fill-mode: backwards;
  box-shadow: 0 1px 3px rgba(31, 26, 21, 0.05);
}
.menu-card:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(31, 26, 21, 0.08); }
.menu-card:hover .menu-card__img img { transform: scale(1.06); }
.menu-card__img img { transition: transform 0.5s ease; }
.menu-card__ribbon {
  position: absolute;
  top: 10px;
  left: -2px;
  padding: 0.25rem 0.7rem;
  font-family: var(--font-cjk);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--paper);
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}
.menu-card__ribbon::after {
  content: '';
  position: absolute;
  right: -8px;
  top: 0;
  border-top: 13px solid transparent;
  border-bottom: 13px solid transparent;
  border-left: 8px solid currentColor;
}
.menu-card__ribbon--limited {
  background: var(--warm);
  color: var(--paper);
}
.menu-card__ribbon--rec {
  background: var(--ink);
  color: var(--paper);
}
.menu-card__ribbon--rec::after { border-left-color: var(--ink); }
.menu-card__img {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: var(--paper-deep);
}
.menu-card__body {
  padding: 1.1rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.menu-card__cat {
  font-family: var(--font-cjk);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
  margin-bottom: 0.35rem;
  font-weight: 400;
  border-bottom: 1px solid var(--rule);
  padding-bottom: 0.4rem;
  display: inline-block;
  align-self: flex-start;
  padding-right: 1.5rem;
}
.menu-card h4 {
  font-family: var(--font-cjk);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
}
.menu-card__desc {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.menu-card__footer {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  padding-top: 0.8rem;
  border-top: 1px dashed var(--rule);
}
.menu-card__price {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--ink);
  font-style: italic;
}
.menu-card__unit { font-size: 0.8rem; color: var(--ink-soft); }
.menu__empty {
  text-align: center;
  padding: 4rem 0;
  font-family: var(--font-cjk);
  font-style: italic;
  color: var(--ink-soft);
}

@media (max-width: 1024px) {
  .menu { padding: 3rem 0; }
  .menu__controls, .menu__grid { padding: 0 1rem; }
  .section-head { padding: 0 1rem; }
}
</style>