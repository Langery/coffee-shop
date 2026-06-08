<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  eyebrowVariant: { type: String, default: 'accent' },
  title: { type: String, required: true },
  caption: { type: String, default: '' },
  align: { type: String, default: 'between' },
  tag: { type: String, default: 'h2' }
})
</script>

<template>
  <header :class="['section-head', `section-head--${align}`]">
    <div class="section-head__main">
      <span v-if="eyebrow" :class="['eyebrow', `eyebrow--${eyebrowVariant}`]">{{ eyebrow }}</span>
      <component :is="tag" class="section-head__title">{{ title }}</component>
    </div>
    <p v-if="caption" class="section-head__caption">{{ caption }}</p>
  </header>
</template>