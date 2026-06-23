<script setup>
import { useRoute, useRouter } from 'vue-router'
import NavLink from './NavLink.vue'

const route = useRoute()
const router = useRouter()

const navItems = [
  { label: '卷首', routeName: 'home' },
  { label: '故事', routeName: 'story' },
  { label: '咖啡师', routeName: 'baristas' },
  { label: '随笔', routeName: 'blog' },
  { label: '关于', routeName: 'about' }
]

const ctaItems = [
  { label: '菜单', sectionId: 'menu' },
  { label: '联系', sectionId: 'contact' }
]

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

const onNavigate = ({ routeName, sectionId }) => {
  if (sectionId) {
    scrollToSection(sectionId)
  } else if (routeName) {
    router.push({ name: routeName })
  }
}
</script>

<template>
  <nav class="mainnav">
    <ul class="mainnav__list">
      <li
        v-for="item in navItems"
        :key="item.routeName"
      >
        <NavLink
          :label="item.label"
          :route-name="item.routeName"
          :active="isActive(item.routeName)"
          @navigate="onNavigate"
        />
      </li>
      <li
        class="mainnav__sep"
        aria-hidden="true"
      />
      <li
        v-for="item in ctaItems"
        :key="item.sectionId"
      >
        <NavLink
          :label="item.label"
          :section-id="item.sectionId"
          variant="cta"
          @navigate="onNavigate"
        />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
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
.mainnav__sep {
  width: 1px;
  height: 14px;
  background: var(--rule);
  margin: 0 0.4rem;
}
</style>