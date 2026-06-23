<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { products, menuItems, aboutText, contactInfo, socialLinks, socialIcons, baristas, stats, spaceImages, recommendedMenuIds, images } from '../data/index.js'
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

// 推荐产品: 从数据层 id 列表查 menuItems
const recommended = computed(() =>
  recommendedMenuIds.map(id => menuItems.find(m => m.id === id)).filter(Boolean)
)

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
      :img-osmanthus="images.osmanthus"
      :img-cappuccino="images.cappuccino"
      :img-scone="images.scone"
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
      :img-hero="images.hero"
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