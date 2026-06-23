<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = (name) => router.push({ name })
</script>

<template>
  <footer class="atelier-foot">
    <!-- 暗房红灯 (右侧脉冲) -->
    <div
      class="darkroom-light"
      aria-hidden="true"
    >
      <span class="darkroom-light__dot" />
      <span class="darkroom-light__label typewriter">DARKROOM · SAFE LIGHT</span>
    </div>
    <div class="atelier-foot__upper">
      <div class="col col--roll">
        <span class="foot-num">F·27</span>
        <h4>胶卷信息</h4>
        <p class="foot-label">
          Roll
        </p>
        <p>SHÍGUĀNG Vol. III</p>
        <p>2018 — 2026</p>
        <p class="foot-meta">
          EXPOSED 24+1
        </p>
      </div>
      <div class="col col--index">
        <span class="foot-num">F·28</span>
        <h4>本卷目录</h4>
        <p class="foot-label">
          Index
        </p>
        <p>
          <a
            style="cursor:pointer"
            @click="goTo('home')"
          >F·01 — 卷首</a>
        </p>
        <p>
          <a
            style="cursor:pointer"
            @click="goTo('story')"
          >F·02 — 故事</a>
        </p>
        <p>
          <a
            style="cursor:pointer"
            @click="goTo('baristas')"
          >F·03 — 咖啡师</a>
        </p>
        <p>
          <a
            style="cursor:pointer"
            @click="goTo('blog')"
          >F·04 — 随笔</a>
        </p>
        <p>
          <a
            style="cursor:pointer"
            @click="goTo('about')"
          >F·05 — 关于</a>
        </p>
      </div>
      <div class="col col--masthead">
        <span class="foot-num">F·29</span>
        <h4>编者</h4>
        <p class="foot-label">
          Masthead
        </p>
        <p>主理人 · 苏先生</p>
        <p>咖啡总监 · 李青</p>
        <p>视觉 · 拾光工坊</p>
      </div>
      <div class="col col--contact">
        <span class="foot-num">F·30</span>
        <h4>联络</h4>
        <p class="foot-label">
          Contact
        </p>
        <p>北京市朝阳区</p>
        <p>三里屯路 19 号院</p>
        <p>周一至周日</p>
        <p>8:00 — 22:00</p>
      </div>
    </div>
    <div
      class="filmholes"
      aria-hidden="true"
    />
    <div class="atelier-foot__lower">
      <span class="copyright typewriter">© 2026 拾光咖啡 · SHÍGUĀNG COFFEE</span>
      <span class="motto">「 在一杯咖啡里，拾起慢下来的时光 」</span>
      <span class="brand-mark">拾</span>
    </div>
  </footer>
</template>

<style scoped>
.atelier-foot {
  background: var(--paper-deep);
  color: var(--ink);
  margin-top: 3rem;
  border-top: 1px solid var(--rule);
  position: relative;
}
/* 暗房灯依赖此 position 上下文 — 不要改成 <div> */
.darkroom-light {
  position: absolute;
  top: 14px;
  right: 3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  color: rgba(220, 100, 90, 0.7);
  text-transform: uppercase;
  pointer-events: none;
  z-index: 2;
}
.darkroom-light__dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(220, 100, 90, 0.55);
  box-shadow: 0 0 8px rgba(220, 100, 90, 0.4);
  animation: darkroomPulse 2.5s ease-in-out infinite;
}
@keyframes darkroomPulse {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}
/* 顶部胶片孔装饰条 (与 masthead 呼应) */
.atelier-foot::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: var(--ink);
  background-image: radial-gradient(circle at 14px 4px, var(--paper) 2.5px, transparent 3px);
  background-size: 28px 8px;
  background-repeat: repeat-x;
}
.atelier-foot__upper {
  display: grid;
  grid-template-columns: 1fr 1.4fr 1.2fr 1.2fr;
  gap: 2.5rem;
  padding: 2.5rem 3rem 2rem;
  padding-top: 2.8rem;
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
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: var(--ink);
}
.atelier-foot .col .foot-label {
  font-family: var(--font-type);
  font-size: 0.7rem;
  color: var(--warm);
  margin-bottom: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.atelier-foot .col p {
  font-size: 0.85rem;
  line-height: 1.55;
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
  margin-top: 0.6rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--rule);
  font-family: var(--font-mono) !important;
  font-size: 0.68rem !important;
  letter-spacing: 0.2em;
  color: var(--warm) !important;
}

.atelier-foot__lower {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
  padding: 1.1rem 3rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  color: var(--ink-soft);
  text-transform: uppercase;
  border-top: 1px dashed var(--rule);
}
.atelier-foot__lower .motto {
  font-family: var(--font-cjk);
  font-style: italic;
  text-transform: none;
  letter-spacing: 0.05em;
  text-align: center;
  font-size: 0.78rem;
  color: var(--warm-deep);
}
.atelier-foot__lower .brand-mark {
  font-family: var(--font-cjk);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--warm);
  letter-spacing: 0;
  border: 1.5px solid var(--warm);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-3deg);
}
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