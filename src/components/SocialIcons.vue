<script setup>
defineProps({
  name: String,
  icon: String
})
</script>

<template>
  <a href="#" class="social-link" :title="name">
    <svg viewBox="0 0 24 24" fill="currentColor" v-html="icon"></svg>
  </a>
</template>

<style scoped>
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  color: white;
  transition: all 0.3s;
}

.social-link:hover {
  background: rgba(255,255,255,0.25);
  transform: scale(1.1);
}

.social-link :deep(svg) {
  width: 22px;
  height: 22px;
}
</style>