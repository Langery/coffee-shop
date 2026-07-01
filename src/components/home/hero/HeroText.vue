<script setup>
defineEmits(['scroll-to-menu', 'go-to-story'])
</script>

<template>
  <div class="hero__text">
    <div class="hero__eyebrow">
      <span class="datestamp">ROLL · 06</span>
      <span class="hero__roll">TRI-X 400 · 24 EXP.</span>
    </div>
    <h1 class="hero__title">
      <span class="hero__line-1">拾</span>
      <span class="hero__line-2">光</span>
      <span class="hero__sub typewriter">SHÍGUĀNG COFFEE<br>— SINCE 2018 —</span>
    </h1>
    <p class="hero__slogan">
      在一杯咖啡里，<br>拾起慢下来的时光。
    </p>
    <div class="hero__cta">
      <button
        class="btn-primary"
        @click="$emit('scroll-to-menu')"
      >
        浏览本卷菜单
      </button>
      <button
        class="btn-ghost"
        @click="$emit('go-to-story')"
      >
        阅读品牌故事 →
      </button>
    </div>
    <div class="hero__meta">
      <span><b>VOL.</b> III</span>
      <span class="meta-sep">·</span>
      <span>ISSUE 06</span>
      <span class="meta-sep">·</span>
      <span>SUMMER '26</span>
    </div>
  </div>
</template>

<style scoped>
.hero__text { position: relative; }
.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.hero__roll {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: var(--ink);
  font-weight: 600;
}
.hero__title {
  font-family: var(--font-cjk);
  font-size: clamp(5rem, 11vw, 9.5rem);
  font-weight: 900;
  line-height: 0.85;
  margin-bottom: 1.5rem;
  position: relative;
}
.hero__line-1 {
  display: inline-block;
  color: var(--ink);
  transform: translateX(0);
}
.hero__line-2 {
  display: inline-block;
  color: var(--warm);
  margin-left: 0.4rem;
  transform: translateY(-0.05em) rotate(-3deg);
}
.hero__sub {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--ink-soft);
  margin-top: 1rem;
}
.hero__slogan {
  font-family: var(--font-cjk);
  font-size: clamp(1.2rem, 1.8vw, 1.6rem);
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 2rem 0 2.5rem;
  font-style: italic;
  font-weight: 400;
  border-left: 3px solid var(--warm);
  padding-left: 1.2rem;
}
.hero__cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}
.btn-primary, .btn-ghost {
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all 0.25s;
  border: none;
  padding: 0.9rem 2.2rem;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  border-radius: 0;
  font-weight: 600;
}
.btn-primary {
  background: var(--ink);
  color: var(--paper);
}
.btn-primary:hover { background: var(--warm); }
.btn-primary:active { transform: scale(0.97); }
.btn-ghost {
  background: transparent;
  color: var(--ink);
  border: 2px solid var(--ink);
}
.btn-ghost:hover { background: var(--ink); color: var(--paper); }
.btn-ghost:active { transform: scale(0.97); }
.hero__meta {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  text-transform: uppercase;
  padding-top: 2rem;
  border-top: 1px dashed var(--rule);
}
.hero__meta b { color: var(--warm); }
.meta-sep { color: var(--rule); }
</style>