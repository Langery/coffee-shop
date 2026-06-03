<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const showChrome = computed(() => true)  // 永远显示 masthead/nav, 不区分页面

const isActive = (name) => {
  if (name === 'home') return route.path === '/' || route.name === 'home'
  return route.name === name
}

const scrollToSection = (id) => {
  if (route.name !== 'home') {
    router.push({ name: 'home', hash: '#' + id })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// 随机 roll number 风格
const today = new Date()
const todayStr = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`
</script>

<template>
  <div class="atelier-shell">
    <!-- 顶部: 报头 + 胶卷号 (FILM ROLL 风格) -->
    <header class="masthead">
      <div class="masthead__left">
        <span class="masthead__roll">ROLL 06</span>
        <span class="masthead__sep">/</span>
        <span class="masthead__film">TRI-X 400</span>
        <span class="masthead__sep">/</span>
        <span class="masthead__date">{{ todayStr }}</span>
      </div>
      <a class="masthead__logo" @click="router.push({ name: 'home' })" style="cursor:pointer">
        <span class="logo-mark">拾光</span>
        <span class="logo-en">SHÍGUĀNG · 35mm</span>
      </a>
      <div class="masthead__right">
        <span class="masthead__city">北京 · 三里屯</span>
        <span class="masthead__sep">/</span>
        <span class="masthead__ed">独立咖啡馆</span>
      </div>
    </header>

    <!-- 胶片孔装饰条 -->
    <div class="filmholes" aria-hidden="true"></div>

    <!-- 主导航 -->
    <nav class="mainnav">
      <ul class="mainnav__list">
        <li>
          <a :class="{ active: isActive('home') }" @click="router.push({ name: 'home' })" style="cursor:pointer">卷首</a>
        </li>
        <li>
          <a :class="{ active: isActive('story') }" @click="router.push({ name: 'story' })" style="cursor:pointer">故事</a>
        </li>
        <li>
          <a :class="{ active: isActive('baristas') }" @click="router.push({ name: 'baristas' })" style="cursor:pointer">咖啡师</a>
        </li>
        <li>
          <a :class="{ active: isActive('blog') }" @click="router.push({ name: 'blog' })" style="cursor:pointer">随笔</a>
        </li>
        <li class="mainnav__sep" aria-hidden="true"></li>
        <li>
          <a class="mainnav__cta" @click="scrollToSection('menu')" style="cursor:pointer">菜单</a>
        </li>
        <li>
          <a class="mainnav__cta" @click="scrollToSection('contact')" style="cursor:pointer">联系</a>
        </li>
      </ul>
    </nav>

    <main class="atelier-main">
      <router-view />
    </main>

    <!-- Footer: 老照片柜 + 暗房红灯 -->
    <footer class="atelier-foot">
      <div class="atelier-foot__upper">
        <div class="col col--roll">
          <span class="foot-num">F·27</span>
          <h4>胶卷信息</h4>
          <p class="foot-label">Roll</p>
          <p>SHÍGUĀNG Vol. III</p>
          <p>2018 — 2026</p>
          <p class="foot-meta">EXPOSED 24+1</p>
        </div>
        <div class="col col--index">
          <span class="foot-num">F·28</span>
          <h4>本卷目录</h4>
          <p class="foot-label">Index</p>
          <p><a @click="router.push({ name: 'home' })" style="cursor:pointer">F·01 — 卷首</a></p>
          <p><a @click="router.push({ name: 'story' })" style="cursor:pointer">F·02 — 故事</a></p>
          <p><a @click="router.push({ name: 'baristas' })" style="cursor:pointer">F·03 — 咖啡师</a></p>
          <p><a @click="router.push({ name: 'blog' })" style="cursor:pointer">F·04 — 随笔</a></p>
        </div>
        <div class="col col--masthead">
          <span class="foot-num">F·29</span>
          <h4>编者</h4>
          <p class="foot-label">Masthead</p>
          <p>主理人 · 苏先生</p>
          <p>咖啡总监 · 李天择</p>
          <p>视觉 · 拾光工坊</p>
        </div>
        <div class="col col--contact">
          <span class="foot-num">F·30</span>
          <h4>联络</h4>
          <p class="foot-label">Contact</p>
          <p>北京市朝阳区</p>
          <p>三里屯路 19 号院</p>
          <p>周一至周日</p>
          <p>8:00 — 22:00</p>
        </div>
      </div>
      <div class="filmholes" aria-hidden="true"></div>
      <div class="atelier-foot__lower">
        <span class="copyright typewriter">© 2026 拾光咖啡 · SHÍGUĀNG COFFEE</span>
        <span class="motto">「 在一杯咖啡里，拾起慢下来的时光 」</span>
        <span class="brand-mark">拾</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.atelier-shell {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans);
}

/* ============ MASTHEAD ============ */
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

.masthead__left, .masthead__right {
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

/* ============ FILM HOLES ============ */
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

/* ============ MAIN NAV (滚动时固定顶部) ============ */
.mainnav {
  background: var(--paper-light);
  color: var(--ink);
  padding: 0.95rem 3rem;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--rule);
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.92);
}
.mainnav__list {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.2rem;
  flex-wrap: wrap;
}
.mainnav__list li { display: flex; align-items: center; }
.mainnav__list a {
  display: inline-block;
  cursor: pointer;
  font-family: var(--font-cjk);
  font-size: 0.95rem;
  font-weight: 400;
  padding: 0.4rem 0;
  transition: all 0.2s;
  color: var(--ink-soft);
  position: relative;
  letter-spacing: 0.05em;
}
.mainnav__list a:hover { color: var(--ink); }
.mainnav__list a.active {
  color: var(--ink);
  font-weight: 600;
}
.mainnav__list a.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 2px;
  background: var(--warm);
}
.mainnav__sep {
  width: 1px;
  height: 14px;
  background: var(--rule);
  margin: 0 0.4rem;
}
.mainnav__cta {
  color: var(--ink) !important;
  font-size: 0.95rem !important;
}
.mainnav__cta.active {
  color: var(--ink) !important;
}

/* ============ MAIN ============ */
.atelier-main { min-height: calc(100vh - 400px); }

/* ============ FOOTER ============ */
.atelier-foot {
  background: var(--paper-deep);
  color: var(--ink);
  padding: 0 0 0;
  margin-top: 6rem;
  border-top: 1px solid var(--rule);
}
.atelier-foot__upper {
  display: grid;
  grid-template-columns: 1fr 1.4fr 1.2fr 1.2fr;
  gap: 2.5rem;
  padding: 4rem 3rem 3rem;
}
.atelier-foot .col { position: relative; padding-left: 1.2rem; }
.atelier-foot .col::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--warm);
}
.atelier-foot .foot-num {
  position: absolute;
  top: 0;
  right: 0;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--warm);
  letter-spacing: 0.15em;
}
.atelier-foot .col h4 {
  font-family: var(--font-cjk);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--ink);
}
.atelier-foot .col .foot-label {
  font-family: var(--font-type);
  font-size: 0.72rem;
  color: var(--warm);
  margin-bottom: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.atelier-foot .col p {
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--ink-soft);
}
.atelier-foot .col a {
  cursor: pointer;
  transition: color 0.2s;
  border-bottom: 1px solid transparent;
  padding-bottom: 1px;
}
.atelier-foot .col a:hover { color: var(--warm); border-bottom-color: var(--warm); }
.foot-meta {
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px dashed var(--rule);
  font-family: var(--font-mono) !important;
  font-size: 0.7rem !important;
  letter-spacing: 0.2em;
  color: var(--warm) !important;
}

.atelier-foot__lower {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: var(--ink-soft);
  text-transform: uppercase;
}
.atelier-foot__lower .motto {
  font-family: var(--font-cjk);
  font-style: italic;
  text-transform: none;
  letter-spacing: 0.05em;
  font-size: 0.9rem;
  color: var(--ink-soft);
}
.atelier-foot__lower .brand-mark {
  font-family: var(--font-cjk);
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--warm);
  line-height: 1;
  letter-spacing: 0;
}

/* ============ RESPONSIVE ============ */
@media (max-width: 900px) {
  .masthead {
    grid-template-columns: 1fr 1fr;
    padding: 1rem 1.2rem;
    font-size: 0.6rem;
  }
  .masthead__logo { grid-column: 1 / -1; order: -1; }
  .mainnav { padding: 0.6rem 1rem; top: 0; position: relative; }
  .mainnav__list { gap: 1rem; font-size: 0.8rem; }
  .atelier-foot__upper { grid-template-columns: 1fr 1fr; gap: 1.5rem; padding: 3rem 1.2rem 2rem; }
  .atelier-foot__lower { flex-direction: column; gap: 1rem; text-align: center; padding: 1.2rem; }
  .atelier-foot__lower .brand-mark { font-size: 2.2rem; }
}
</style>
