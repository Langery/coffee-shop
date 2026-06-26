<script setup>
defineProps({
  show: { type: Boolean, required: true },
  price: { type: String, required: true },
  onlyRecommended: { type: Boolean, required: true }
})

const emit = defineEmits([
  'update:price',
  'update:onlyRecommended'
])

function setPrice (v) { emit('update:price', v) }
function setRec (e) { emit('update:onlyRecommended', e.target.checked) }
</script>

<template>
  <transition name="filter-panel">
    <div
      v-show="show"
      id="menu-filter-panel"
      class="menu__filter-panel"
    >
      <div class="filter-group">
        <span class="filter-group__label">价格</span>
        <button
          :class="['filter', { active: price === 'all' }]"
          @click="setPrice('all')"
        >
          全部
        </button>
        <button
          :class="['filter', { active: price === 'low' }]"
          @click="setPrice('low')"
        >
          &lt; ¥30
        </button>
        <button
          :class="['filter', { active: price === 'mid' }]"
          @click="setPrice('mid')"
        >
          ¥30–40
        </button>
        <button
          :class="['filter', { active: price === 'high' }]"
          @click="setPrice('high')"
        >
          &gt; ¥40
        </button>
      </div>
      <div class="filter-group">
        <span class="filter-group__label">推荐</span>
        <label class="filter-toggle">
          <input
            :checked="onlyRecommended"
            type="checkbox"
            @change="setRec"
          >
          <span>只看招牌</span>
        </label>
      </div>
    </div>
  </transition>
</template>

<style scoped>
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
</style>