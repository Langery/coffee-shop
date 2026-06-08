<script setup>
defineProps({
  image: String,
  name: String,
  shortDesc: String
})

const emit = defineEmits(['click'])
const handleClick = () => emit('click')
</script>

<template>
  <div
    class="product-card"
    @click="handleClick"
  >
    <img
      :src="image"
      :alt="name"
      class="product-img"
    >
    <div class="product-info">
      <h3>{{ name }}</h3>
      <p>{{ shortDesc }}</p>
      <span class="learn-more">了解更多 →</span>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}

.product-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.product-card h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: var(--ink);
}

.product-card p {
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 12px;
}

.learn-more {
  color: var(--warm);
  font-size: 0.9rem;
  font-weight: 500;
}
</style>