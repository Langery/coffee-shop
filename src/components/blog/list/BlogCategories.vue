<script setup>
defineProps({
  categories: { type: Array, required: true },
  active: { type: String, required: true },
  totalByCategory: { type: Object, required: true }
})

const emit = defineEmits(['select'])

function pick (c) {
  emit('select', c)
}
</script>

<template>
  <section class="b-cats">
    <button
      v-for="(c, i) in categories"
      :key="c"
      :class="['cat', { active: active === c }]"
      @click="pick(c)"
    >
      <span class="cat__num">F·{{ String(4 + i).padStart(2, '0') }}</span>
      <span class="cat__label">{{ c === 'all' ? '全部' : c }}</span>
      <span class="cat__count">({{ totalByCategory[c] || 0 }})</span>
    </button>
  </section>
</template>

<style scoped>
.b-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 2.5rem 3rem;
  max-width: 1300px;
  margin: 0 auto;
  justify-content: center;
}
.cat {
  background: var(--paper-light);
  border: 1px solid var(--rule);
  padding: 0.6rem 1.1rem;
  cursor: pointer;
  font-family: var(--font-sans);
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  color: var(--ink-soft);
  transition: all 0.2s;
}
.cat:hover { border-color: var(--ink); color: var(--ink); }
.cat.active { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.cat__num { font-family: var(--font-mono); font-size: 0.62rem; color: var(--warm); }
.cat.active .cat__num { color: var(--warm); }
.cat__label { font-size: 0.92rem; font-weight: 600; }
.cat__count { font-family: var(--font-mono); font-size: 0.7rem; opacity: 0.7; }

@media (max-width: 900px) {
  .b-cats { padding-left: 1.5rem; padding-right: 1.5rem; }
}
</style>