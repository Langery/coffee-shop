<template>
  <section class="a-founder reveal">
    <div class="a-founder__grid">
      <div class="a-founder__portrait">
        <div class="a-founder__frame">
          <div class="a-founder__initials">
            苏
          </div>
          <span class="a-founder__portrait-num typewriter">F·22A</span>
          <span class="a-founder__tape" aria-hidden="true" />
          <span class="a-founder__tape a-founder__tape--2" aria-hidden="true" />
        </div>
        <p class="a-founder__caption typewriter">
          苏先生 · 2014 于三里屯
        </p>
      </div>
      <div class="a-founder__text">
        <span class="a-founder__label eyebrow">F·06 · 主理人手记</span>
        <h2 class="a-founder__title">
          为什么叫<span class="warm">「拾光」</span>？
        </h2>
        <div class="a-founder__body">
          <p>
            <span class="dropcap">「</span>拾光」最初是写错的——我们想叫「拾光 Coffee」，把「时光」的「时」换成形近的「拾」。结果印在第一块招牌上就错了，写成了「拾光」。
          </p>
          <p>
            我看着那块招牌想了很久——「拾」也有「拾起」的意思。拾起被浪费的时间，拾起被忽略的小事，拾起一杯被遗忘的下午。错就错吧。
          </p>
          <p>
            十二年过去了，我们从 1 张桌子、1 台磨豆机，变成了 1 间店、42 位咖啡师、1 个二楼的红木柜（装着 2,500+ 张杯测表）。但「拾」这个字从来没换过。
          </p>
          <p class="a-founder__sign">
            — 苏先生 / 主理人 / 写于 2026 春
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.a-founder {
  padding: 5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
.a-founder__grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 4rem;
  align-items: center;
}
.a-founder__frame {
  position: relative;
  width: 280px;
  height: 340px;
  background: var(--paper-light);
  padding: 14px 14px 50px;
  box-shadow: 0 8px 20px rgba(31, 26, 21, 0.18);
  transform: rotate(-1.5deg);
  margin: 0 auto;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.a-founder__frame:hover {
  transform: rotate(-0.5deg) translateY(-4px);
  box-shadow: 0 12px 28px rgba(31, 26, 21, 0.25);
}
.a-founder__initials {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--ink) 0%, #3a322a 100%);
  color: var(--paper);
  font-family: var(--font-cjk);
  font-size: 9rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0;
}
.a-founder__portrait-num {
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 0.62rem;
  color: var(--paper);
  background: var(--warm);
  padding: 0.25rem 0.55rem;
  letter-spacing: 0.18em;
  font-weight: 600;
}
.a-founder__tape {
  position: absolute;
  top: -8px;
  left: 25%;
  width: 60px;
  height: 18px;
  background: rgba(255, 255, 255, 0.85);
  transform: rotate(-4deg);
  box-shadow: 0 1px 2px rgba(31, 26, 21, 0.08);
}
.a-founder__tape--2 {
  top: auto;
  bottom: 80px;
  right: -10px;
  left: auto;
  transform: rotate(8deg);
  width: 40px;
  height: 14px;
  background: rgba(255, 235, 180, 0.7);
}
.a-founder__caption {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  font-weight: 600;
}
.a-founder__label { color: var(--warm); }
.a-founder__title {
  font-family: var(--font-cjk);
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
}
.a-founder__body p {
  font-family: var(--font-cjk);
  font-size: 1.05rem;
  line-height: 2;
  color: var(--ink-soft);
  margin-bottom: 1.2rem;
}
.a-founder__sign {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--warm);
  text-align: right;
  margin-top: 2rem;
  font-size: 0.95rem;
}
.warm { color: var(--warm); font-style: italic; }

@media (max-width: 900px) {
  .a-founder { padding: 3rem 1.5rem; }
  .a-founder__grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .a-founder__frame { width: 220px; height: 270px; }
  .a-founder__initials { font-size: 7rem; }
}
</style>
