<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { products, menuItems, aboutText, contactInfo, socialLinks, socialIcons, baristas } from '../data/index.js'
import Lightbox from '../components/Lightbox.vue'

// 子组件
import HeroSection from '@/components/home/HeroSection.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import EditorialSection from '@/components/home/EditorialSection.vue'
import ProductsSection from '@/components/home/ProductsSection.vue'
import MenuSection from '@/components/home/MenuSection.vue'
import RecommendationsSection from '@/components/home/RecommendationsSection.vue'
import StorySection from '@/components/home/StorySection.vue'
import SpaceSection from '@/components/home/SpaceSection.vue'
import BaristasSection from '@/components/home/BaristasSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'

const router = useRouter()

// 统计数据
const stats = [
  { num: '07', label: '年慢时光', sub: 'since 2018' },
  { num: '12', label: '款咖啡豆', sub: '产地直采' },
  { num: '24K+', label: '杯手冲咖啡', sub: '2025 年度' },
  { num: '88+', label: '分杯测评分', sub: '云南·普洱' }
]

// 推荐产品
const recommended = computed(() =>
  menuItems.filter(m => ['osmanthus-latte', 'matcha-red-bean', 'afternoon-tea', 'matcha-latte'].includes(m.id))
)

// 空间图片
const spaceImages = [
  { src: '/coffee-shop/menu-cappuccino.jpg', t: '吧台', n: '24A', title: '吧台 · 主理人手冲台', year: '2018', seats: '6 座', lighting: '暖光', bestTime: '7:00 — 9:00', desc: '三里屯旧巷的第一台手冲壶，至今仍放在吧台中央。每天早上七点，主理人苏先生会在这里为第一位客人冲第一杯咖啡。可观看整个手冲过程。' },
  { src: '/coffee-shop/menu-osmanthus-latte.jpg', t: '窗边', n: '25A', title: '窗边 · 临街落地窗', year: '2019', seats: '2 座', lighting: '自然光', bestTime: '14:00 — 16:00', desc: '朝南落地窗配原木长桌，是店里最受欢迎的座位。秋日午后阳光会斜斜地铺在咖啡杯上，适合读一本闲书。需提前 1 天预约。' },
  { src: '/coffee-shop/menu-flat-white.jpg', t: '阅读角', n: '26A', title: '阅读角 · 旧书架与皮沙发', year: '2020', seats: '4 座', lighting: '落地灯', bestTime: '10:00 — 12:00', desc: '藏有 800 余本中文诗集与摄影集的旧书架，旁边的墨绿色皮沙发是店里最常被「占座」的位置。提供毛毯，可窝一整个下午。' },
  { src: '/coffee-shop/menu-fruit-tart.jpg', t: '甜点柜', n: '27A', title: '甜点柜 · 当季水果塔', year: '2022', seats: '立位', lighting: '柜台灯', bestTime: '10:00 — 12:00', desc: '与甜点主厨王沐合作的甜点柜，每周根据当季水果更换品类。周六补货日，草莓塔通常上午十点就售罄。建议提前点单。' },
  { src: '/coffee-shop/menu-jasmine-tea.jpg', t: '庭院', n: '28A', title: '庭院 · 老槐树下', year: '2023', seats: '8 座', lighting: '树荫', bestTime: '15:00 — 18:00', desc: '后院有一棵 30 年树龄的老槐树，每年 5 月开花，槐花香气会飘进店里。夏日傍晚最适合在户外座位消磨时间。' }
]

// 静态图片
const imgOsmanthus = '/coffee-shop/menu-osmanthus-latte.jpg'
const imgCappuccino = '/coffee-shop/menu-cappuccino.jpg'
const imgScone = '/coffee-shop/menu-scone.jpg'
const imgHero = '/coffee-shop/milestone-2018.jpg'

// 灯箱
const lightboxOpen = ref(false)
const lightboxFrame = ref(null)
const openLightbox = (it) => {
  lightboxFrame.value = { ...it, image: it.src, src: it.src }
  lightboxOpen.value = true
}
const closeLightbox = () => {
  lightboxOpen.value = false
}

// 路由方法
const goToPage = (name) => router.push({ name })
const goToProduct = (id) => router.push(`/product/${id}`)
const goToMenuItem = (id) => router.push(`/menu/${id}`)
const scrollToMenu = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
</script>

<template>
  <div class="home">
    <HeroSection
      :img-osmanthus="imgOsmanthus"
      :img-cappuccino="imgCappuccino"
      :img-scone="imgScone"
      @scroll-to-menu="scrollToMenu"
      @go-to-story="goToPage"
    />

    <StatsSection :stats="stats" />

    <EditorialSection :about-text="aboutText" />

    <ProductsSection
      :products="products"
      @go-to-product="goToProduct"
    />

    <MenuSection
      :menu-items="menuItems"
      @go-to-menu-item="goToMenuItem"
    />

    <RecommendationsSection
      :recommended="recommended"
      @go-to-menu-item="goToMenuItem"
    />

    <StorySection
      :img-hero="imgHero"
      @go-to-story="goToPage"
    />

    <SpaceSection
      :space-images="spaceImages"
      @open-lightbox="openLightbox"
    />

    <BaristasSection
      :baristas="baristas"
      @go-to-baristas="goToPage"
    />

    <ContactSection
      :contact-info="contactInfo"
      :social-links="socialLinks"
      :social-icons="socialIcons"
    />

    <Lightbox
      :open="lightboxOpen"
      :frame="lightboxFrame"
      @close="closeLightbox"
    />
  </div>
</template>

<style scoped>
.home {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
}
</style>