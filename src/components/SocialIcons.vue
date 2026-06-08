<script setup>
import Icon from './Icon.vue'

defineProps({
  name: String,
  icon: String // now expects icon name like 'wechat', 'weibo', 'xiaohongshu'
})
</script>

<template>
  <a
    href="#"
    class="social-link"
    :title="name"
  >
    <Icon :name="icon" :size="22" />
    <span class="social-link__label typewriter">{{ name }}</span>
  </a>
</template>

<style scoped>
.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid transparent;
  border-radius: 8px;
  color: white;
  transition: all 0.3s;
}

.social-link:hover {
  background: rgba(255,255,255,0.12);
  border-color: var(--warm);
  transform: translateY(-2px);
}

.social-link__label {
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  transition: color 0.3s;
}

.social-link:hover .social-link__label {
  color: var(--warm);
}
</style>