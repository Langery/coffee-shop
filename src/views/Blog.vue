<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { blogPosts } from '../data/index.js'
import BlogList from '@/components/blog/BlogList.vue'
import BlogPost from '@/components/blog/BlogPost.vue'

const route = useRoute()
// 从 route 派生 currentPost — 路由无 id 时为 undefined,渲染列表
const currentPost = computed(() =>
  blogPosts.find(p => p.id === route.params.id)
)
</script>

<template>
  <BlogList v-if="!currentPost" />
  <BlogPost
    v-else
    :post="currentPost"
  />
</template>