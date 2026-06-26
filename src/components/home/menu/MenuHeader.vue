<script setup>
defineProps({
  totalCount: { type: Number, required: true }
})
</script>

<template>
  <header class="section-head">
    <div>
      <span class="eyebrow eyebrow--accent">MENU</span>
      <h2>本卷菜单<br>夏季号</h2>
    </div>
    <p class="section-head__caption">
      点击分类切换 · 价格区间筛选 · {{ totalCount }} 个选项
    </p>
  </header>
</template>

<style scoped>
/* 局部响应式: section-head 是项目全局类, 但 MenuHeader 内部这一处需要 < 1024 时缩进 */
@media (max-width: 1024px) {
  .section-head { padding: 0 1rem; }
}
</style>