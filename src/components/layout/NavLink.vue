<script setup>
defineProps({
  label: { type: String, default: '' },
  routeName: { type: String, default: null },
  sectionId: { type: String, default: null },
  active: { type: Boolean, default: false },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'cta'].includes(v)
  }
})

defineEmits(['navigate'])
</script>

<template>
  <a
    :class="['navlink', { active }, `navlink--${variant}`]"
    style="cursor:pointer"
    @click="$emit('navigate', { routeName, sectionId })"
  >
    <slot>{{ label }}</slot>
  </a>
</template>

<style scoped>
.navlink {
  display: inline-block;
  cursor: pointer;
  font-family: var(--font-cjk);
  font-size: 0.95rem;
  font-weight: 400;
  padding: 0.4rem 0;
  transition: all 0.2s;
  color: var(--ink-soft);
  position: relative;
  letter-spacing: 0.05em;
}
.navlink:hover { color: var(--ink); }
.navlink.active {
  color: var(--ink);
  font-weight: 600;
}
.navlink.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 2px;
  background: var(--warm);
}
.navlink--cta {
  color: var(--ink) !important;
  font-size: 0.95rem !important;
}
.navlink--cta.active {
  color: var(--ink) !important;
}
</style>