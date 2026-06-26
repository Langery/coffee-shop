<script setup>
const emit = defineEmits(['reset'])

function reset () { emit('reset') }
</script>

<template>
  <section class="b-empty">
    <div class="b-empty__frame">
      <div class="b-empty__cross">
        ⊘
      </div>
      <h3>本卷暂无相关条目</h3>
      <p>换一个关键词, 或切换分类试试</p>
      <button
        class="b-empty__reset"
        @click="reset"
      >
        清空筛选
      </button>
    </div>
  </section>
</template>

<style scoped>
.b-empty {
  padding: 5rem 3rem 8rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
.b-empty__frame {
  border: 1.5px dashed var(--rule);
  padding: 3rem 2rem;
  background: var(--paper-light);
}
.b-empty__cross {
  font-size: 3rem;
  color: var(--warm);
  margin-bottom: 1rem;
  font-family: var(--font-mono);
}
.b-empty h3 {
  font-family: var(--font-cjk);
  font-size: 1.3rem;
  margin-bottom: 0.6rem;
  color: var(--ink);
}
.b-empty p {
  font-size: 0.9rem;
  color: var(--ink-soft);
  margin-bottom: 1.5rem;
}
.b-empty__reset {
  background: var(--ink);
  color: var(--paper);
  border: none;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  padding: 0.6rem 1.4rem;
  cursor: pointer;
  border-radius: 999px;
  transition: all 0.25s;
}
.b-empty__reset:hover {
  background: var(--warm);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(200, 85, 61, 0.3);
}
</style>