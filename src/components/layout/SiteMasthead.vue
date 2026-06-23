<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const today = new Date()
const todayStr = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`

const goHome = () => router.push({ name: 'home' })
</script>

<template>
  <header class="masthead">
    <div class="masthead__left">
      <span class="masthead__roll">ROLL 06</span>
      <span class="masthead__sep">/</span>
      <span class="masthead__film">TRI-X 400</span>
      <span class="masthead__sep">/</span>
      <span class="masthead__date">{{ todayStr }}</span>
    </div>
    <a
      class="masthead__logo"
      style="cursor:pointer"
      @click="goHome"
    >
      <span class="logo-mark">拾光</span>
      <span class="logo-en">SHÍGUĀNG · 35mm</span>
    </a>
    <div class="masthead__right">
      <span class="masthead__city">北京 · 三里屯</span>
      <span class="masthead__sep">/</span>
      <span class="masthead__ed">独立咖啡馆</span>
    </div>
  </header>
  <div
    class="filmholes"
    aria-hidden="true"
  />
</template>

<style scoped>
.masthead {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.2rem 3rem;
  border-bottom: 2px solid var(--ink);
  background: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-soft);
  position: relative;
}

.masthead__left,
.masthead__right {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}
.masthead__right { justify-content: flex-end; }
.masthead__sep { color: var(--rule); }
.masthead__roll { color: var(--warm); font-weight: 600; }
.masthead__film { color: var(--ink); font-weight: 600; }

.masthead__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  text-align: center;
}
.logo-mark {
  font-family: var(--font-cjk);
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: 0.5rem;
  color: var(--ink);
  line-height: 1;
}
.logo-en {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: var(--warm);
  text-transform: uppercase;
}

/* 胶片孔装饰条 */
.filmholes {
  position: relative;
  background: var(--ink);
  height: 12px;
  background-image: radial-gradient(circle at 14px 6px, var(--paper) 2.5px, transparent 3px);
  background-size: 28px 12px;
  background-repeat: repeat-x;
  background-position: 0 center;
  flex-shrink: 0;
}
</style>