<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { products, menuItems, aboutText, contactInfo, socialLinks, socialIcons, baristas } from '../data/index.js'
import ProductCard from '../components/ProductCard.vue'
import SocialIcons from '../components/SocialIcons.vue'
import Lightbox from '../components/Lightbox.vue'

const router = useRouter()
const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

// 水平胶卷条自动轮播
const filmstripRef = ref(null)
const activeStrip = ref(0)
let stripTimer = null
let userInteracting = false
let stripPhase = 'show' // 'show' = 停留, 'fade' = 切换

const startStripAutoplay = () => {
  stopStripAutoplay()
  const tick = () => {
    if (stripPhase === 'show') {
      stripPhase = 'fade'
      stripTimer = setTimeout(() => {
        activeStrip.value = (activeStrip.value + 1) % spaceImages.length
        const frameW = 240 + 16
        filmstripRef.value?.scrollTo({ left: activeStrip.value * frameW, behavior: 'smooth' })
        stripPhase = 'show'
        stripTimer = setTimeout(tick, 2200)
      }, 500)
    }
  }
  stripTimer = setTimeout(tick, 2200)
}
const stopStripAutoplay = () => {
  if (stripTimer) { clearTimeout(stripTimer); stripTimer = null }
  stripPhase = 'show'
}

const onStripScroll = () => {
  if (!filmstripRef.value) return
  const frameW = 240 + 16
  const idx = Math.round(filmstripRef.value.scrollLeft / frameW)
  activeStrip.value = Math.max(0, Math.min(idx, spaceImages.length - 1))
}
const onStripEnter = () => { userInteracting = true; stopStripAutoplay() }
const onStripLeave = () => {
  userInteracting = false
  setTimeout(() => { if (!userInteracting) startStripAutoplay() }, 2000)
}

// 灯箱
const lightboxOpen = ref(false)
const lightboxFrame = ref(null)
const openLightbox = (it) => {
  stopStripAutoplay()
  lightboxFrame.value = { ...it, image: it.src, src: it.src }
  lightboxOpen.value = true
}
const closeLightbox = () => {
  lightboxOpen.value = false
  setTimeout(startStripAutoplay, 500)
}

onMounted(() => {
  setTimeout(startStripAutoplay, 1200)
})
onUnmounted(stopStripAutoplay)

// 数字
const stats = [
  { num: '07', label: '年时光', sub: 'since 2018' },
  { num: '12', label: '款咖啡豆', sub: 'origins' },
  { num: '24K+', label: '杯手冲', sub: 'served' },
  { num: '04', label: '位咖啡师', sub: 'craftspeople' }
]

const statsVisible = ref(false)
const statsRef = ref(null)
let statsObserver = null

onMounted(() => {
  const onScroll = () => { scrollCue.value = window.scrollY > 80 ? 'gone' : 'show' }
  window.addEventListener('scroll', onScroll, { passive: true })
  statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) statsVisible.value = true })
  }, { threshold: 0.3 })
  if (statsRef.value) statsObserver.observe(statsRef.value)
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    statsObserver?.disconnect()
  })
})
const scrollCue = ref('show')

// 菜单 tab + filter
const activeTab = ref('all')
const tabs = computed(() => ['all', ...new Set(menuItems.map(m => m.category))])
const filterPrice = ref('all')
const onlyRecommended = ref(false)
const showFilters = ref(false)
const categoryLabel = (k) => ({ coffee: '咖啡', signature: '特色饮品', tea: '茶饮', dessert: '甜点', set: '套餐' }[k] || k)
const parsePrice = (str) => { const m = String(str).match(/(\d+)/); return m ? parseInt(m[1]) : 0 }
const filteredMenu = computed(() => {
  let list = menuItems
  if (activeTab.value !== 'all') list = list.filter(m => m.category === activeTab.value)
  if (filterPrice.value !== 'all') {
    list = list.filter(m => {
      const p = parsePrice(m.price)
      if (filterPrice.value === 'low') return p < 30
      if (filterPrice.value === 'mid') return p >= 30 && p <= 40
      if (filterPrice.value === 'high') return p > 40
      return true
    })
  }
  if (onlyRecommended.value) {
    const recs = ['osmanthus-latte', 'matcha-red-bean', 'afternoon-tea', 'matcha-latte']
    list = list.filter(m => recs.includes(m.id))
  }
  return list
})

const recommended = computed(() =>
  menuItems.filter(m => ['osmanthus-latte', 'matcha-red-bean', 'afternoon-tea', 'matcha-latte'].includes(m.id))
)

const goToProduct = (id) => router.push(`/product/${id}`)
const goToMenuItem = (id) => router.push(`/menu/${id}`)
const goToPage = (name) => router.push({ name })

// 静态图
const imgOsmanthus = '/coffee-shop/menu-osmanthus-latte.jpg'
const imgCappuccino = '/coffee-shop/menu-cappuccino.jpg'
const imgScone = '/coffee-shop/menu-scone.jpg'
const imgHero = '/coffee-shop/hero.jpg'

// 空间图
const spaceImages = [
  { src: imgCappuccino, t: '吧台', n: '24A', title: '吧台 · 主理人手冲台', year: '2018', desc: '三里屯旧巷的第一台手冲壶，至今仍放在吧台中央。每天早上七点，主理人苏先生会在这里为第一位客人冲第一杯咖啡。' },
  { src: imgOsmanthus, t: '窗边', n: '25A', title: '窗边 · 临街落地窗', year: '2019', desc: '朝南落地窗配原木长桌，是拾光最受欢迎的座位。秋日午后阳光会斜斜地铺在咖啡杯上，适合读一本闲书。' },
  { src: '/coffee-shop/menu-flat-white.jpg', t: '阅读角', n: '26A', title: '阅读角 · 旧书架与皮沙发', year: '2020', desc: '藏有 800 余本中文诗集与摄影集的旧书架，旁边的墨绿色皮沙发是店里最常被「占座」的位置。' },
  { src: '/coffee-shop/menu-fruit-tart.jpg', t: '甜点柜', n: '27A', title: '甜点柜 · 当季水果塔', year: '2022', desc: '与甜点主厨王沐合作的甜点柜，每周根据当季水果更换品类。周六补货日，草莓塔通常上午十点就售罄。' },
  { src: '/coffee-shop/menu-jasmine-tea.jpg', t: '茶室', n: '28A', title: '茶室 · 安福路分店', year: '2024', desc: '上海安福路分店的小包间，可容 6-8 人。需提前一天预约，常被用作读书会与小规模摄影展的场地。' }
]
</script>

<template>
  <div class="home">
    <!-- ============ 1. HERO (拍立得 + 大字 + 胶片号) ============ -->
    <section class="hero">
      <div class="hero__grid">
        <!-- 左: 大字 -->
        <div class="hero__text">
          <div class="hero__eyebrow">
            <span class="datestamp">ROLL · 06</span>
            <span class="hero__roll">TRI-X 400 · 24 EXP.</span>
          </div>
          <h1 class="hero__title">
            <span class="hero__line-1">拾</span>
            <span class="hero__line-2">光</span>
            <span class="hero__sub typewriter">SHÍGUĀNG COFFEE<br />— SINCE 2018 —</span>
          </h1>
          <p class="hero__slogan">在一杯咖啡里，<br />拾起慢下来的时光。</p>
          <div class="hero__cta">
            <button class="btn-primary" @click="scrollToSection('menu')">浏览本卷菜单</button>
            <button class="btn-ghost" @click="goToPage('story')">阅读品牌故事 →</button>
          </div>
          <div class="hero__meta">
            <span><b>VOL.</b> III</span>
            <span class="meta-sep">·</span>
            <span>ISSUE 06</span>
            <span class="meta-sep">·</span>
            <span>SUMMER '26</span>
          </div>
        </div>
        <!-- 右: 拍立得拼图 -->
        <div class="hero__collage">
          <figure class="polaroid tilt-l polaroid--big">
            <div class="duotone"><img :src="imgOsmanthus" alt="桂花拿铁" /></div>
            <figcaption>桂花拿铁 · autumn limited</figcaption>
          </figure>
          <figure class="polaroid tilt-r polaroid--small">
            <div class="duotone"><img :src="imgCappuccino" alt="卡布奇诺" /></div>
            <figcaption>卡布奇诺 · classic</figcaption>
          </figure>
          <figure class="polaroid tilt-c polaroid--small polaroid--right">
            <div class="duotone"><img :src="imgScone" alt="司康" /></div>
            <figcaption>司康 · tea time</figcaption>
          </figure>
          <div class="hero__rollcap">
            <span class="typewriter">F · 01 — 03</span>
            <span class="hero__rollcap-sub">本期封面 · 三帧</span>
          </div>
        </div>
      </div>
      <div :class="['scroll-cue', scrollCue]">
        <span class="typewriter">SCROLL ↓</span>
      </div>
    </section>

    <!-- ============ 2. 数字 (老打字机 + 日期戳) ============ -->
    <section class="stats" ref="statsRef">
      <div class="stats__grid">
        <div v-for="(s, i) in stats" :key="i" class="stat" :class="{ visible: statsVisible }">
          <span class="stat__no">F·{{ String(i + 4).padStart(2, '0') }}</span>
          <div class="stat__num">{{ s.num }}</div>
          <div class="stat__label">{{ s.label }}</div>
          <div class="stat__sub typewriter">{{ s.sub }}</div>
        </div>
      </div>
      <p class="stats__cap">A BAROMETER OF SLOW TIME · 时间刻度</p>
    </section>

    <!-- ============ 3. 卷首语 (印章 + dropcap) ============ -->
    <section class="editorial" id="about">
      <div class="editorial__head">
        <span class="stamp">EDITOR'S NOTE</span>
        <h2 class="editorial__title">让一杯咖啡<br />成为一段<br />可读的时光</h2>
        <p class="editorial__caption">— 主理人手记 · 06</p>
      </div>
      <div class="editorial__body">
        <p class="editorial__lead">
          <span class="dropcap">{{ aboutText[0][0] }}</span>
          <span>{{ aboutText[0].slice(1) }}</span>
        </p>
        <div class="editorial__cols">
          <p v-for="(t, i) in aboutText.slice(1)" :key="i">{{ t }}</p>
        </div>
        <p class="editorial__sig">
          <span class="typewriter">— 主编 · 苏先生</span>
          <span class="editorial__sig-date">2026 · SUMMER ISSUE</span>
        </p>
      </div>
    </section>

    <!-- ============ 4. 主打产品 (拍立得错位) ============ -->
    <section class="products" id="products">
      <header class="section-head">
        <div>
          <span class="eyebrow eyebrow--accent">SHOWCASE · F·09–11</span>
          <h2>三款招牌<br />不容错过</h2>
        </div>
        <p class="section-head__caption">从产地到杯中，每一支都经咖啡总监手工挑选</p>
      </header>
      <div class="products__grid">
        <article
          v-for="(p, i) in products"
          :key="p.id"
          :class="['product', `tilt-${i % 3 === 0 ? 'l' : i % 3 === 1 ? 'r' : 'c'}`]"
          @click="goToProduct(p.id)"
        >
          <div class="product__frame">
            <div class="duotone"><img :src="p.image" :alt="p.name" /></div>
            <span class="product__no">F·{{ String(9 + i).padStart(2, '0') }}</span>
            <span class="product__tag">{{ p.tag }}</span>
          </div>
          <div class="product__info">
            <h3>{{ p.name }}</h3>
            <p class="product__desc">{{ p.shortDesc }}</p>
            <div class="product__footer">
              <span class="product__price">{{ p.price }}<span class="unit">{{ p.unit }}</span></span>
              <span class="product__more typewriter">READ →</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ============ 5. 菜单精选 (胶片标签 tab) ============ -->
    <section class="menu" id="menu">
      <header class="section-head">
        <div>
          <span class="eyebrow eyebrow--accent">MENU</span>
          <h2>本卷菜单<br />夏季号</h2>
        </div>
        <p class="section-head__caption">点击分类切换 · 价格区间筛选 · 17 个选项</p>
      </header>

      <div class="menu__controls">
        <div class="menu__top">
          <div class="menu__tabs">
            <button
              v-for="t in tabs"
              :key="t"
              :class="['tab', { active: activeTab === t }]"
              @click="activeTab = t"
            >
              <span class="tab__label">{{ t === 'all' ? '全部' : categoryLabel(t) }}</span>
              <span class="tab__count">{{ t === 'all' ? menuItems.length : menuItems.filter(m => m.category === t).length }}</span>
            </button>
          </div>
          <button
            :class="['filter-toggle-btn', { active: showFilters }]"
            @click="showFilters = !showFilters"
            :aria-expanded="showFilters"
            aria-controls="menu-filter-panel"
          >
            <span>筛选</span>
            <span class="filter-toggle-btn__chevron" :class="{ open: showFilters }">▾</span>
          </button>
        </div>

        <transition name="filter-panel">
          <div v-show="showFilters" id="menu-filter-panel" class="menu__filter-panel">
            <div class="filter-group">
              <span class="filter-group__label">价格</span>
              <button :class="['filter', { active: filterPrice === 'all' }]" @click="filterPrice = 'all'">全部</button>
              <button :class="['filter', { active: filterPrice === 'low' }]" @click="filterPrice = 'low'">&lt; ¥30</button>
              <button :class="['filter', { active: filterPrice === 'mid' }]" @click="filterPrice = 'mid'">¥30–40</button>
              <button :class="['filter', { active: filterPrice === 'high' }]" @click="filterPrice = 'high'">&gt; ¥40</button>
            </div>
            <div class="filter-group">
              <span class="filter-group__label">推荐</span>
              <label class="filter-toggle">
                <input type="checkbox" v-model="onlyRecommended" />
                <span>只看招牌</span>
              </label>
            </div>
          </div>
        </transition>
      </div>

      <div class="menu__grid" :key="activeTab + filterPrice + onlyRecommended">
        <article
          v-for="(item, i) in filteredMenu"
          :key="item.id"
          class="menu-card"
          @click="goToMenuItem(item.id)"
        >
          <div class="menu-card__img">
            <div class="duotone"><img :src="item.image" :alt="item.name" /></div>
          </div>
          <div class="menu-card__body">
            <div class="menu-card__cat">{{ categoryLabel(item.category) }}</div>
            <h4>{{ item.name }}</h4>
            <p class="menu-card__desc">{{ item.shortDesc }}</p>
            <div class="menu-card__footer">
              <span class="menu-card__price">{{ item.price }}</span>
              <span class="menu-card__unit">{{ item.unit }}</span>
            </div>
          </div>
        </article>
      </div>

      <p v-if="filteredMenu.length === 0" class="menu__empty">
        没有符合条件的饮品 · 试着放宽筛选
      </p>
    </section>

    <!-- ============ 6. 编辑推荐 (大数字斜放) ============ -->
    <section class="recs">
      <header class="section-head section-head--center">
        <span class="stamp">EDITOR'S PICKS</span>
        <h2>今夏<br />我们最想推荐</h2>
      </header>
      <div class="recs__grid">
        <article
          v-for="(r, i) in recommended"
          :key="r.id"
          class="rec tilt-c"
          @click="goToMenuItem(r.id)"
        >
          <span class="rec__rank">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="rec__img">
            <div class="duotone"><img :src="r.image" :alt="r.name" /></div>
          </div>
          <div class="rec__info">
            <h4>{{ r.name }}</h4>
            <p>{{ r.shortDesc }}</p>
            <div class="rec__price">{{ r.price }} <span>{{ r.unit }}</span></div>
          </div>
        </article>
      </div>
    </section>

    <!-- ============ 7. 品牌故事 (2 列图文) ============ -->
    <section class="story" id="story">
      <div class="story__grid">
        <div class="story__imgwrap tilt-l">
          <figure class="polaroid">
            <div class="duotone"><img :src="imgHero" alt="拾光咖啡空间" /></div>
            <figcaption>三里屯店 · 2018</figcaption>
          </figure>
        </div>
        <div class="story__text">
          <span class="eyebrow eyebrow--accent">OUR STORY · F·15</span>
          <h2>从一杯<br />手冲开始<br />的旅程</h2>
          <p>2018 年春天，主理人苏先生在三里屯一条旧巷子里开了第一间店。从一台手冲壶、一袋危地马拉豆子开始，七年来我们坚持「只用手冲、只用当季、只用心」的原则。</p>
          <p>这里没有连锁咖啡的标准化，只有一杯杯根据豆子特性调整的、温度与时间都精确到秒的手冲咖啡。</p>
          <button class="btn-link" @click="goToPage('story')">阅读全文 →</button>
        </div>
      </div>
    </section>

    <!-- ============ 8. 空间 (胶片条 horizontal) ============ -->
    <section class="space">
      <header class="section-head">
        <div>
          <span class="eyebrow eyebrow--accent">SPACE · F·17–21</span>
          <h2>在拾光<br />慢慢地坐一会儿</h2>
        </div>
        <p class="section-head__caption">← 横向滚动浏览 · 5 帧空间 →</p>
      </header>
      <div class="filmstrip-horizontal" ref="filmstripRef" @scroll="onStripScroll" @mouseenter="onStripEnter" @mouseleave="onStripLeave">
        <figure v-for="(it, i) in spaceImages" :key="i" class="filmstrip-horizontal__frame" :class="{ 'is-active': activeStrip === i }" @click="openLightbox(it)" role="button" tabindex="0" @keydown.enter="openLightbox(it)">
          <div class="duotone"><img :src="it.src" :alt="it.n" loading="lazy" /></div>
          <span class="filmstrip-horizontal__num">FRAME · {{ it.n }}</span>
        </figure>
      </div>
      <div class="filmstrip-horizontal__progress">
        <button v-for="(it, i) in spaceImages" :key="i" class="filmstrip-horizontal__dot-btn" :class="{ 'is-active': activeStrip === i }" @click="activeStrip = i; filmstripRef?.scrollTo({ left: i * 256, behavior: 'smooth' })" :aria-label="`第 ${i + 1} 帧: ${it.t}`"></button>
      </div>
      <div class="filmstrip-horizontal__cap">
        <span class="typewriter">← DRAG / SCROLL →</span>
        <span class="typewriter">FRAME 24A — 28A · 5 EXP.</span>
      </div>
    </section>

    <!-- ============ 9. 咖啡师 (拍立得卡片) ============ -->
    <section class="baristas-row">
      <header class="section-head">
        <div>
          <span class="eyebrow eyebrow--accent">CRAFTSPEOPLE · F·22–25</span>
          <h2>四双手<br />的专注</h2>
        </div>
        <p class="section-head__caption">每位咖啡师都来自产区深耕 · 见面认识一下 →</p>
      </header>
      <div class="baristas-row__grid">
        <article
          v-for="(b, i) in baristas"
          :key="b.id"
          class="bcard tilt-c"
          @click="goToPage('baristas')"
        >
          <div class="bcard__avatar">
            <div class="bcard__initials">{{ b.initials }}</div>
            <span class="bcard__no">F·{{ String(22 + i).padStart(2, '0') }}</span>
          </div>
          <h4>{{ b.name }}</h4>
          <p class="bcard__role">{{ b.role }}</p>
          <p class="bcard__quote">"{{ b.quote }}"</p>
        </article>
      </div>
    </section>

    <!-- ============ 10. 联系 (深色, 暖橘) ============ -->
    <section class="contact" id="contact">
      <div class="contact__inner">
        <div class="contact__head">
          <span class="datestamp">F·26 · CONTACT</span>
          <h2>来拾光<br />坐一会儿</h2>
        </div>
        <div class="contact__grid">
          <div class="contact__col">
            <span class="contact__num">F·26A</span>
            <h5>地址</h5>
            <p>{{ contactInfo.address }}</p>
          </div>
          <div class="contact__col">
            <span class="contact__num">F·26B</span>
            <h5>电话</h5>
            <p>{{ contactInfo.phone }}</p>
          </div>
          <div class="contact__col">
            <span class="contact__num">F·26C</span>
            <h5>微信</h5>
            <p>{{ contactInfo.wechat }}</p>
          </div>
          <div class="contact__col">
            <span class="contact__num">F·26D</span>
            <h5>营业时间</h5>
            <p>{{ contactInfo.hours }}</p>
          </div>
        </div>
        <div class="contact__social">
          <SocialIcons
            v-for="{ name, icon } in socialLinks"
            :key="name"
            :name="name"
            :icon="socialIcons[icon]"
          />
        </div>
      </div>
    </section>

    <Lightbox :open="lightboxOpen" :frame="lightboxFrame" @close="closeLightbox" />
  </div>
</template>

<style scoped>
.home {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
}

/* ===== 共用 ===== */
.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--ink-soft);
  display: inline-block;
  margin-bottom: 1.2rem;
  font-weight: 600;
}
.eyebrow--accent { color: var(--warm); }
.eyebrow--cool { color: var(--cool); }

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  padding: 0 3rem;
  gap: 2rem;
  flex-wrap: wrap;
}
.section-head h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--ink);
  letter-spacing: 0.02em;
}
.section-head__caption {
  font-family: var(--font-cjk);
  font-style: italic;
  color: var(--ink-soft);
  max-width: 380px;
  font-size: 0.95rem;
}
.section-head--center {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ===== 1. HERO ===== */
.hero {
  position: relative;
  padding: 4rem 3rem 5rem;
  min-height: 92vh;
  display: flex;
  align-items: center;
  background: var(--paper);
  border-bottom: 3px double var(--ink);
}
.hero__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
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
.btn-primary, .btn-ghost, .btn-link {
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all 0.25s;
  border: none;
}
.btn-primary {
  padding: 0.9rem 2.2rem;
  background: var(--ink);
  color: var(--paper);
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  border-radius: 0;
  font-weight: 600;
}
.btn-primary:hover { background: var(--warm); }
.btn-ghost {
  padding: 0.9rem 2.2rem;
  background: transparent;
  color: var(--ink);
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  border: 2px solid var(--ink);
  border-radius: 0;
  font-weight: 600;
}
.btn-ghost:hover { background: var(--ink); color: var(--paper); }
.btn-link {
  background: none;
  padding: 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: var(--warm);
  border-bottom: 2px solid var(--warm);
  padding-bottom: 2px;
  font-weight: 600;
}
.btn-link:hover { color: var(--ink); border-bottom-color: var(--ink); }

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

/* 拍立得拼图 */
.hero__collage {
  position: relative;
  height: 620px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
  padding: 1rem;
}
.polaroid {
  position: relative;
  cursor: pointer;
  background: var(--paper-light);
  padding: 12px 12px 50px;
  box-shadow: 0 6px 16px rgba(31, 26, 21, 0.25);
}
.polaroid--big {
  grid-row: span 2;
  transform: rotate(-2.5deg);
}
.polaroid--small {
  font-size: 0.78rem;
}
.polaroid--right { transform: rotate(2deg); }
.polaroid figcaption {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  text-align: center;
  font-family: var(--font-type);
  font-size: 0.85rem;
  color: var(--ink);
  letter-spacing: 0.05em;
}
.polaroid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4/5;
}

.hero__rollcap {
  position: absolute;
  top: -0.5rem;
  right: 0;
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.hero__rollcap span:first-child {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  color: var(--warm);
  font-weight: 600;
}
.hero__rollcap-sub {
  font-family: var(--font-cjk);
  font-size: 0.8rem;
  color: var(--ink-soft);
  font-style: italic;
}

.scroll-cue {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.5s;
  font-family: var(--font-type);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--ink-soft);
  animation: pulse 2s ease-in-out infinite;
}
.scroll-cue.gone { opacity: 0; pointer-events: none; }
@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* ===== 2. STATS ===== */
.stats {
  padding: 5rem 3rem 4rem;
  background: var(--paper-deep);
  text-align: center;
  border-bottom: 1px solid var(--rule);
  position: relative;
}
.stats::before {
  content: '';
  position: absolute;
  top: 14px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--ink);
  opacity: 0.3;
}
.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  max-width: 1200px;
  margin: 0 auto 2rem;
}
.stat {
  padding: 2rem 1rem;
  border-right: 1px solid var(--rule);
  position: relative;
}
.stat:last-child { border-right: none; }
.stat__no {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--warm);
  letter-spacing: 0.15em;
  font-weight: 600;
}
.stat__num {
  font-family: var(--font-serif);
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 700;
  color: var(--ink);
  line-height: 1;
  margin-bottom: 0.5rem;
  font-style: italic;
}
.stat__label {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  color: var(--ink);
  margin-bottom: 0.3rem;
  font-weight: 600;
}
.stat__sub {
  font-family: var(--font-type);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--warm);
  text-transform: uppercase;
}
.stat__num, .stat__label, .stat__sub {
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.7s, transform 0.7s;
}
.stat.visible .stat__num,
.stat.visible .stat__label,
.stat.visible .stat__sub {
  opacity: 1;
  transform: translateY(0);
}
.stats__cap {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--ink-soft);
}

/* ===== 3. EDITORIAL ===== */
.editorial {
  padding: 7rem 3rem;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
}
.editorial__head { position: sticky; top: 8rem; }
.editorial__title {
  font-family: var(--font-cjk);
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--ink);
  margin: 1.5rem 0 1rem;
  letter-spacing: 0.02em;
}
.editorial__caption {
  font-family: var(--font-type);
  font-size: 0.85rem;
  color: var(--warm);
  letter-spacing: 0.1em;
}
.editorial__lead {
  font-family: var(--font-cjk);
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--ink);
  margin-bottom: 2rem;
}
.dropcap {
  font-family: var(--font-serif);
  font-size: 4.5rem;
  font-weight: 800;
  float: left;
  line-height: 0.85;
  margin: 0.3rem 0.5rem 0 0;
  color: var(--warm);
  font-style: italic;
}
.editorial__cols {
  columns: 2;
  column-gap: 3rem;
  font-size: 1rem;
  line-height: 1.9;
  color: var(--ink-soft);
  margin-bottom: 2.5rem;
}
.editorial__cols p { margin-bottom: 1rem; break-inside: avoid; }
.editorial__sig {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-family: var(--font-cjk);
  font-style: italic;
  color: var(--ink-soft);
  padding-top: 1.5rem;
  border-top: 1px dashed var(--rule);
}
.editorial__sig-date {
  font-family: var(--font-type);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  font-style: normal;
  color: var(--warm);
}

/* ===== 4. PRODUCTS ===== */
.products {
  padding: 6rem 3rem;
  background: var(--paper-light);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.products__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: start;
}
.product {
  background: var(--paper-light);
  cursor: pointer;
  transition: transform 0.4s, box-shadow 0.4s;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--rule);
  box-shadow: 0 4px 12px rgba(31, 26, 21, 0.08);
}
.product:hover { transform: translateY(-6px) rotate(-0.5deg); box-shadow: 0 12px 24px rgba(31, 26, 21, 0.15); }
.product--0 { grid-column: 1 / span 7; margin-top: 0; }
.product--1 { grid-column: 8 / span 5; margin-top: 4rem; }
.product--2 { grid-column: 3 / span 7; margin-top: 2rem; }

.product__frame {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--ink);
}
.product__no {
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  background: var(--warm);
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  padding: 0.3rem 0.6rem;
  z-index: 2;
  font-weight: 600;
}
.product__tag {
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-type);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--ink);
}
.product__info { padding: 1.8rem; }
.product__info h3 {
  font-family: var(--font-cjk);
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  letter-spacing: 0.02em;
}
.product__desc {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--ink-soft);
  margin-bottom: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product__footer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 1rem;
  border-top: 1px dashed var(--rule);
}
.product__price {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ink);
  font-style: italic;
}
.product__price .unit { font-size: 0.85rem; color: var(--ink-soft); font-style: normal; }
.product__more {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--warm);
  font-weight: 600;
}

/* ===== 5. MENU ===== */
.menu {
  padding: 5rem 0;
  max-width: 1400px;
  margin: 0 auto;
}
.menu__controls {
  padding: 0 3rem;
  margin-bottom: 2.5rem;
}
.menu__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--rule);
}
.filter-toggle-btn {
  background: transparent;
  border: 1px solid var(--rule);
  padding: 0.5rem 1.1rem;
  cursor: pointer;
  font-family: var(--font-cjk);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ink-soft);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s;
}
.filter-toggle-btn:hover { color: var(--ink); border-color: var(--ink); }
.filter-toggle-btn.active {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}
.filter-toggle-btn__chevron {
  font-size: 0.7rem;
  display: inline-block;
  transition: transform 0.25s ease;
}
.filter-toggle-btn__chevron.open { transform: rotate(180deg); }

.menu__filter-panel {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.5rem 0 1.5rem;
  border-bottom: 1px solid var(--rule);
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.filter-group__label {
  font-family: var(--font-cjk);
  font-size: 0.85rem;
  color: var(--ink-soft);
  font-weight: 500;
  margin-right: 0.4rem;
  min-width: 2.4rem;
}

/* Vue transition 动画 */
.filter-panel-enter-active,
.filter-panel-leave-active {
  transition: max-height 0.3s ease, opacity 0.25s ease, padding 0.3s ease;
  overflow: hidden;
  max-height: 200px;
}
.filter-panel-enter-from,
.filter-panel-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.menu__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}
.tab {
  background: transparent;
  border: 1px solid var(--rule);
  padding: 0.5rem 1.1rem;
  cursor: pointer;
  font-family: var(--font-cjk);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--ink-soft);
  border-radius: 999px;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: 500;
}
.tab:hover { color: var(--ink); border-color: var(--ink); }
.tab.active {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}
.tab__label { font-size: 0.9rem; font-weight: 500; }
.tab.active .tab__label { font-weight: 600; }
.tab__count {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  opacity: 0.6;
  background: var(--paper-deep);
  color: var(--ink-soft);
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  min-width: 1.4rem;
  text-align: center;
}
.tab.active .tab__count {
  background: var(--warm);
  color: var(--paper);
  opacity: 1;
}

.filter {
  background: none;
  border: 1px solid transparent;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  font-family: var(--font-cjk);
  font-size: 0.85rem;
  color: var(--ink-soft);
  transition: all 0.2s;
  border-radius: 999px;
}
.filter:hover { color: var(--ink); background: var(--paper-deep); }
.filter.active {
  color: var(--ink);
  background: var(--paper-deep);
  font-weight: 600;
}
.filter-toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  font-family: var(--font-cjk);
  font-size: 0.85rem;
  color: var(--ink-soft);
}
.filter-toggle:hover { color: var(--ink); }
.filter-toggle input { accent-color: var(--warm); }

.menu__grid {
  padding: 0 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
@keyframes cardFade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.menu-card {
  background: var(--paper-light);
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
  border: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  position: relative;
  animation: cardFade 0.4s ease-out;
  box-shadow: 0 1px 3px rgba(31, 26, 21, 0.05);
}
.menu-card:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(31, 26, 21, 0.08); }
.menu-card__img {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: var(--paper-deep);
}
.menu-card__body {
  padding: 1.1rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.menu-card__cat {
  font-family: var(--font-cjk);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
  margin-bottom: 0.35rem;
  font-weight: 400;
  border-bottom: 1px solid var(--rule);
  padding-bottom: 0.4rem;
  display: inline-block;
  align-self: flex-start;
  padding-right: 1.5rem;
}
.menu-card h4 {
  font-family: var(--font-cjk);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
}
.menu-card__desc {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.menu-card__footer {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  padding-top: 0.8rem;
  border-top: 1px dashed var(--rule);
}
.menu-card__price {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--ink);
  font-style: italic;
}
.menu-card__unit { font-size: 0.8rem; color: var(--ink-soft); }

.menu__empty {
  text-align: center;
  padding: 4rem 0;
  font-family: var(--font-cjk);
  font-style: italic;
  color: var(--ink-soft);
}

/* ===== 6. RECOMMENDED ===== */
.recs {
  padding: 6rem 3rem;
  background: var(--paper-light);
  color: var(--ink);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.recs .stamp { color: var(--warm); border-color: var(--warm); }
.recs h2 { color: var(--ink); }
.recs__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  max-width: 1300px;
  margin: 0 auto;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.recs__grid > .rec-card {
  background: var(--paper);
  border: 1px solid var(--rule);
  margin: 1.5rem 0.5rem;
}
.rec {
  padding: 2.5rem 1.5rem;
  cursor: pointer;
  border-right: 1px solid var(--rule);
  transition: background 0.3s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rec:last-child { border-right: none; }
.rec:hover { background: var(--paper-deep); }
.rec__rank {
  font-family: var(--font-serif);
  font-size: 3rem;
  color: var(--warm);
  line-height: 1;
  font-style: italic;
  font-weight: 700;
}
.rec__img {
  aspect-ratio: 1/1;
  overflow: hidden;
  background: var(--paper-deep);
}
.rec__info h4 {
  font-family: var(--font-cjk);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--ink);
}
.rec__info p {
  font-size: 0.85rem;
  color: var(--ink-soft);
  line-height: 1.5;
  margin-bottom: 0.8rem;
}
.rec__price {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--ink);
  font-style: italic;
  font-weight: 700;
}
.rec__price span { font-size: 0.8rem; color: var(--ink-soft); font-style: normal; }

/* ===== 7. STORY ===== */
.story {
  padding: 7rem 3rem;
  max-width: 1300px;
  margin: 0 auto;
}
.story__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}
.story__imgwrap { position: relative; }
.story__imgwrap .polaroid { max-width: 500px; margin: 0 auto; }
.story__text h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 1rem 0 2rem;
  letter-spacing: 0.02em;
}
.story__text p {
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--ink-soft);
  margin-bottom: 1.2rem;
}

/* ===== 8. SPACE (filmstrip) ===== */
.space {
  padding: 6rem 0;
  background: var(--paper-deep);
  overflow: hidden;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.space .section-head { padding: 0 3rem 3rem; margin-bottom: 0; }
.space .section-head h2 { color: var(--ink); }
.space .section-head__caption { color: var(--ink-soft); }
.space .eyebrow { color: var(--warm); }

.filmstrip-horizontal {
  background: var(--ink);
  padding: 24px 0 32px;
  display: flex;
  gap: 18px;
  overflow-x: auto;
  position: relative;
  scrollbar-width: none;
}
.filmstrip-horizontal::-webkit-scrollbar { display: none; }
.filmstrip-horizontal::before, .filmstrip-horizontal::after {
  content: '';
  position: sticky;
  top: 0;
  width: 16px;
  background: var(--ink);
  background-image: radial-gradient(circle at 8px center, var(--paper) 4px, transparent 4.5px);
  background-size: 16px 24px;
  background-repeat: repeat-y;
  z-index: 3;
  flex-shrink: 0;
  align-self: stretch;
}
.filmstrip-horizontal::before { left: 0; }
.filmstrip-horizontal::after { right: 0; }
.filmstrip-horizontal__frame {
  flex: 0 0 280px;
  height: 320px;
  position: relative;
  cursor: pointer;
  background: var(--ink);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.filmstrip-horizontal__frame .duotone { width: 100%; height: 100%; }
.filmstrip-horizontal__frame {
  cursor: pointer;
  transition: transform 0.6s ease, box-shadow 0.6s ease, opacity 0.6s ease;
  flex-shrink: 0;
  opacity: 0.6;
}
.filmstrip-horizontal__frame:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}
.filmstrip-horizontal__frame.is-active {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
  opacity: 1;
}
.filmstrip-horizontal__frame.is-active .filmstrip-horizontal__num {
  color: var(--warm);
}
.filmstrip-horizontal__num {
  transition: color 0.3s ease;
}
.filmstrip-horizontal__progress {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.8rem 0 0;
}
.filmstrip-horizontal__dot-btn {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--rule);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}
.filmstrip-horizontal__dot-btn.is-active {
  width: 28px;
  border-radius: 4px;
  background: var(--warm);
}
.filmstrip-horizontal__num {
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  text-align: center;
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
}

.filmstrip-horizontal__cap {
  display: flex;
  justify-content: space-between;
  padding: 1rem 3rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  color: var(--warm);
}

/* ===== 9. BARISTAS ===== */
.baristas-row {
  padding: 6rem 3rem;
  max-width: 1300px;
  margin: 0 auto;
}
.baristas-row__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.bcard {
  padding: 1.8rem 1.2rem;
  text-align: center;
  cursor: pointer;
  border: 1px solid var(--rule);
  transition: all 0.3s;
  background: var(--paper-light);
  box-shadow: 0 3px 8px rgba(31, 26, 21, 0.1);
}
.bcard:hover { border-color: var(--ink); transform: translateY(-4px) rotate(-1deg); box-shadow: 0 8px 16px rgba(31, 26, 21, 0.2); }
.bcard__avatar {
  position: relative;
  width: 84px;
  height: 84px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--warm);
}
.bcard__initials {
  font-family: var(--font-cjk);
  font-size: 2rem;
  color: var(--paper);
  font-weight: 700;
}
.bcard__no {
  position: absolute;
  bottom: -3px;
  right: -3px;
  background: var(--warm);
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  padding: 0.15rem 0.4rem;
  font-weight: 600;
}
.bcard h4 {
  font-family: var(--font-cjk);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  letter-spacing: 0.05em;
}
.bcard__role {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: var(--warm);
  text-transform: uppercase;
  margin-bottom: 0.8rem;
  font-weight: 600;
}
.bcard__quote {
  font-family: var(--font-cjk);
  font-style: italic;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--ink-soft);
}

/* ===== 10. CONTACT ===== */
.contact {
  padding: 7rem 3rem;
  background: var(--paper-light);
  color: var(--ink);
  border-top: 1px solid var(--rule);
}
.contact__inner { max-width: 1100px; margin: 0 auto; }
.contact__head { margin-bottom: 4rem; }
.contact__head .datestamp { color: var(--warm); border-color: var(--warm); }
.contact__head h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--ink);
  margin-top: 1rem;
  letter-spacing: 0.02em;
}
.contact__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 3rem 0;
  border-top: 1px dashed var(--rule);
  border-bottom: 1px dashed var(--rule);
}
.contact__col { position: relative; }
.contact__num {
  position: absolute;
  top: 0;
  right: 0;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--warm);
  letter-spacing: 0.2em;
  font-weight: 600;
}
.contact__col h5 {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--warm);
  margin-bottom: 0.8rem;
  font-weight: 600;
}
.contact__col p {
  font-family: var(--font-cjk);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ink-soft);
}
.contact__social { display: flex; gap: 1.2rem; }
.contact__social :deep(svg) {
  width: 28px;
  height: 28px;
  color: var(--ink);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .hero { padding: 3rem 2rem; min-height: auto; }
  .hero__grid { grid-template-columns: 1fr; gap: 3rem; }
  .hero__collage { height: 500px; }
  .editorial { grid-template-columns: 1fr; gap: 2rem; padding: 4rem 2rem; }
  .editorial__head { position: static; }
  .products__grid { grid-template-columns: 1fr 1fr; }
  .product--0, .product--1, .product--2 { grid-column: span 1; margin-top: 0; }
  .recs__grid { grid-template-columns: 1fr 1fr; }
  .rec { border-right: none; border-bottom: 1px solid var(--rule); }
  .story__grid { grid-template-columns: 1fr; gap: 3rem; }
  .baristas-row__grid { grid-template-columns: 1fr 1fr; }
  .contact__grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .hero { padding: 2rem 1rem; }
  .hero__collage { height: 400px; grid-template-columns: 1fr; grid-template-rows: 200px 200px 200px; }
  .polaroid--big, .polaroid--small { grid-column: 1; grid-row: auto; }
  .stats { padding: 3rem 1rem; }
  .stats__grid { grid-template-columns: 1fr 1fr; }
  .stat { border-right: none; border-bottom: 1px solid var(--rule); }
  .section-head, .editorial, .products, .menu, .recs, .story, .baristas-row, .contact {
    padding-left: 1rem; padding-right: 1rem;
  }
  .menu__controls, .menu__grid { padding: 0; }
  .products__grid, .recs__grid, .baristas-row__grid, .contact__grid {
    grid-template-columns: 1fr;
  }
  .editorial__cols { columns: 1; }
}
</style>
