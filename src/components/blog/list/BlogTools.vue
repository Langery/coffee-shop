<script setup>
defineProps({
  search: { type: String, required: true },
  sort: { type: String, required: true }
})

const emit = defineEmits(['update:search', 'update:sort'])

const sortOptions = [
  { v: 'date-desc', l: '最新' },
  { v: 'date-asc', l: '最早' },
  { v: 'reading-desc', l: '读时长' }
]

function setSearch (e) { emit('update:search', e.target.value) }
function clearSearch () { emit('update:search', '') }
function setSort (v) { emit('update:sort', v) }
</script>

<template>
  <section class="b-tools">
    <div class="b-search">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="b-search__icon"
      >
        <circle
          cx="11"
          cy="11"
          r="7"
        /><path d="M21 21l-4.3-4.3" />
      </svg>
      <input
        :value="search"
        type="text"
        class="b-search__input"
        placeholder="搜索随笔 · 标题、作者、关键词…"
        aria-label="搜索随笔"
        @input="setSearch"
      >
      <button
        v-if="search"
        class="b-search__clear"
        aria-label="清除搜索"
        @click="clearSearch"
      >
        ×
      </button>
    </div>
    <div class="b-sort">
      <span class="b-sort__label typewriter">排序</span>
      <button
        v-for="opt in sortOptions"
        :key="opt.v"
        :class="['b-sort__btn', { active: sort === opt.v }]"
        @click="setSort(opt.v)"
      >
        {{ opt.l }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.b-tools {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 3rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: space-between;
}
.b-search {
  position: relative;
  flex: 1;
  min-width: 240px;
  max-width: 420px;
  display: flex;
  align-items: center;
  border: 1px solid var(--rule);
  background: var(--paper-light);
  border-radius: 999px;
  padding: 0.4rem 1rem;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.b-search:focus-within {
  border-color: var(--warm);
  box-shadow: 0 0 0 3px rgba(200, 85, 61, 0.12);
}
.b-search__icon {
  width: 16px;
  height: 16px;
  color: var(--ink-soft);
  flex-shrink: 0;
  margin-right: 0.6rem;
}
.b-search__input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--ink);
  padding: 0.4rem 0;
}
.b-search__input::placeholder { color: var(--ink-soft); opacity: 0.6; }
.b-search__clear {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--ink-soft);
  line-height: 1;
  padding: 0 0.2rem;
  transition: color 0.2s;
}
.b-search__clear:hover { color: var(--warm); }

.b-sort {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.b-sort__label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  text-transform: uppercase;
  margin-right: 0.3rem;
}
.b-sort__btn {
  background: var(--paper-light);
  border: 1px solid var(--rule);
  font-family: var(--font-cjk);
  font-size: 0.78rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  cursor: pointer;
  color: var(--ink-soft);
  transition: all 0.2s;
}
.b-sort__btn:hover { border-color: var(--ink); color: var(--ink); }
.b-sort__btn.active {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
  font-weight: 600;
}

@media (max-width: 900px) {
  .b-tools { padding: 0 1.5rem 1rem; gap: 1rem; }
  .b-search { min-width: 0; max-width: none; flex: 1 0 100%; }
}
</style>