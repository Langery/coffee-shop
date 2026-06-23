<script setup>
import SiteMasthead from '@/components/layout/SiteMasthead.vue'
import SiteMainNav from '@/components/layout/SiteMainNav.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import BackToTopButton from '@/components/layout/BackToTopButton.vue'
</script>

<template>
  <div class="atelier-shell">
    <SiteMasthead />
    <SiteMainNav />
    <main class="atelier-main">
      <router-view />
    </main>
    <SiteFooter />
    <BackToTopButton />
  </div>
</template>

<style scoped>
.atelier-shell {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans);
}
.atelier-main { min-height: calc(100vh - 400px); }

/* ============ RESPONSIVE ============
   5 个 layout 组件协同响应: 集中此处避免"masthead 响应但 mainnav 没响应" */
@media (max-width: 900px) {
  :deep(.masthead) {
    grid-template-columns: 1fr 1fr;
    padding: 1rem 1.2rem;
    font-size: 0.6rem;
  }
  :deep(.masthead__logo) {
    grid-column: 1 / -1;
    order: -1;
  }
  :deep(.mainnav) {
    padding: 0.6rem 1rem;
    top: 0;
    position: relative;
  }
  :deep(.mainnav__list) {
    gap: 1rem;
    font-size: 0.8rem;
  }
  :deep(.atelier-foot__upper) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    padding: 3rem 1.2rem 2rem;
  }
  :deep(.atelier-foot__lower) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 1.2rem;
  }
  :deep(.atelier-foot__lower .brand-mark) {
    font-size: 2.2rem;
  }
  :deep(.darkroom-light) {
    right: 1.2rem;
    top: 10px;
    font-size: 0.5rem;
  }
  :deep(.back-to-top) {
    right: 1rem;
    bottom: 1rem;
    width: 44px;
    height: 44px;
  }
}
</style>