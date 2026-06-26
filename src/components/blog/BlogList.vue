<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { blogPosts } from '../../data/index.js'
import BlogHero from './list/BlogHero.vue'
import BlogCategories from './list/BlogCategories.vue'
import BlogTools from './list/BlogTools.vue'
import BlogEntries from './list/BlogEntries.vue'
import BlogEmpty from './list/BlogEmpty.vue'

const router = useRouter()

const activeCategory = ref('all')
const searchQuery = ref('')
const sortBy = ref('date-desc')

// 所有分类 + "all" 在前
const categories = computed(() => ['all', ...new Set(blogPosts.map(p => p.category))])

// 各分类条目数 (props 下传 BlogCategories 用)
const totalByCategory = computed(() => {
  const counts = { all: blogPosts.length }
  for (const p of blogPosts) counts[p.category] = (counts[p.category] || 0) + 1
  return counts
})

const filteredPosts = computed(() => {
  let posts = blogPosts
  if (activeCategory.value !== 'all') {
    posts = posts.filter(p => p.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    posts = posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.subtitle || '').toLowerCase().includes(q) ||
      (p.excerpt || '').toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }
  const sorted = [...posts]
  if (sortBy.value === 'date-desc') sorted.sort((a, b) => b.date.localeCompare(a.date))
  else if (sortBy.value === 'date-asc') sorted.sort((a, b) => a.date.localeCompare(a.date))
  else if (sortBy.value === 'reading-desc') sorted.sort((a, b) => (b.reading || 0) - (a.reading || 0))
  return sorted
})

function openPost (id) { router.push(`/blog/${id}`) }
function reset () { searchQuery.value = ''; activeCategory.value = 'all' }
</script>

<template>
  <div class="blog-list">
    <BlogHero />
    <BlogCategories
      :categories="categories"
      :active="activeCategory"
      :total-by-category="totalByCategory"
      @select="activeCategory = $event"
    />
    <BlogTools
      :search="searchQuery"
      :sort="sortBy"
      @update:search="searchQuery = $event"
      @update:sort="sortBy = $event"
    />
    <BlogEntries
      v-if="filteredPosts.length"
      :posts="filteredPosts"
      @open="openPost"
    />
    <BlogEmpty
      v-else
      @reset="reset"
    />
  </div>
</template>

<style scoped>
.blog-list {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
  padding-bottom: 2rem;
}
</style>