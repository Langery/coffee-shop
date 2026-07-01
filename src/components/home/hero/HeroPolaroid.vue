<script setup>
const props = defineProps({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  num: { type: String, required: true },
  index: { type: Number, required: true },
  tilt: { type: String, default: 'l' },     // l | r | c
  size: { type: String, default: 'small' }, // big | small
  rightAlign: { type: Boolean, default: false },
  flashing: { type: Boolean, default: false }
})

const emit = defineEmits(['flash'])

function trigger () { emit('flash', props.index) }
</script>

<template>
  <figure
    :class="['polaroid', `tilt-${tilt}`, size === 'big' ? 'polaroid--big' : 'polaroid--small', { 'polaroid--right': rightAlign, 'is-flash': flashing }]"
    :style="{ '--i': index }"
    tabindex="0"
    :aria-label="`拍一张 ${num}`"
    @click="trigger"
    @keydown.enter="trigger"
  >
    <span
      class="polaroid__tape"
      aria-hidden="true"
    />
    <div class="polaroid__num typewriter">
      {{ num }}
    </div>
    <div class="duotone polaroid__duotone">
      <img
        :src="image"
        :alt="caption"
      >
    </div>
    <figcaption>{{ caption }}</figcaption>
    <span
      class="polaroid__flash"
      aria-hidden="true"
    />
  </figure>
</template>

<style scoped>
.polaroid {
  position: relative;
  cursor: pointer;
  background: var(--paper-light);
  padding: 12px 12px 50px;
  box-shadow: 0 6px 16px rgba(31, 26, 21, 0.25);
  opacity: 0;
  transform-origin: center top;
  animation: polaroidEnter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: calc(0.15s + var(--i, 0) * 0.12s);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
@keyframes polaroidEnter {
  0% { opacity: 0; transform: translateY(30px) rotate(0deg) scale(0.92); }
  100% { opacity: 1; }
}
.polaroid__tape {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-2deg);
  width: 80px;
  height: 22px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(216, 210, 196, 0.6);
  box-shadow: 0 1px 3px rgba(31, 26, 21, 0.06);
  z-index: 3;
  pointer-events: none;
}
.polaroid__num {
  position: absolute;
  top: -2px;
  right: -2px;
  z-index: 4;
  background: var(--warm);
  color: var(--paper);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  padding: 3px 8px;
  font-weight: 600;
  border: 1px solid var(--ink);
}
.polaroid__duotone { overflow: hidden; position: relative; }
.polaroid__duotone img {
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.polaroid:hover .polaroid__duotone img { transform: scale(1.05); }
.polaroid__flash {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0);
  pointer-events: none;
  z-index: 5;
  transition: background 0.05s ease;
}
.polaroid.is-flash .polaroid__flash { animation: polaroidHeroFlash 0.4s ease-out; }
@keyframes polaroidHeroFlash {
  0% { background: rgba(255, 255, 255, 0); }
  10% { background: rgba(255, 255, 255, 0.9); }
  100% { background: rgba(255, 255, 255, 0); }
}
.polaroid--big {
  grid-row: span 2;
  transform: rotate(-2.5deg);
}
.polaroid--big:hover {
  transform: rotate(-1deg) translateY(-6px) scale(1.02);
  box-shadow: 0 14px 32px rgba(31, 26, 21, 0.32);
  z-index: 5;
}
.polaroid--small { font-size: 0.78rem; }
.polaroid--small:nth-of-type(2) { transform: rotate(1.5deg); }
.polaroid--small:nth-of-type(2):hover {
  transform: rotate(0deg) translateY(-6px) scale(1.04);
  box-shadow: 0 12px 24px rgba(31, 26, 21, 0.28);
  z-index: 5;
}
.polaroid--right { transform: rotate(2deg); }
.polaroid--right:hover {
  transform: rotate(0.5deg) translateY(-6px) scale(1.04);
  box-shadow: 0 12px 24px rgba(31, 26, 21, 0.28);
  z-index: 5;
}
.polaroid figcaption {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  text-align: center;
  font-family: var(--font-type);
  font-size: 0.85rem;
  color: var(--ink);
  letter-spacing: 0.05em;
}
.polaroid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4/5;
}
</style>