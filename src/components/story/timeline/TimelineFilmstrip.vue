<script setup>
defineProps({
  milestones: { type: Array, required: true },
  activeFrame: { type: Number, required: true }
})

const emit = defineEmits(['frame-click', 'frame-hover', 'frame-leave'])

function clickFrame (i) { emit('frame-click', i) }
function hoverFrame () { emit('frame-hover') }
function leaveFrame () { emit('frame-leave') }
</script>

<template>
  <div class="filmstrip">
    <ol class="filmstrip__list">
      <li
        v-for="(m, i) in milestones"
        :key="m.year"
        class="filmstrip__frame"
        :class="{ 'is-active': activeFrame === i, 'is-side': i !== activeFrame }"
        :data-idx="i"
        role="button"
        tabindex="0"
        @click="clickFrame(i)"
        @mouseenter="hoverFrame"
        @mouseleave="leaveFrame"
        @keydown.enter="clickFrame(i)"
      >
        <div class="filmstrip__plate">
          <span
            class="filmstrip__sprocket filmstrip__sprocket--top"
            aria-hidden="true"
          />
          <span
            class="filmstrip__sprocket filmstrip__sprocket--bottom"
            aria-hidden="true"
          />
          <div class="filmstrip__plate-photo">
            <img
              :src="m.img"
              :alt="m.year"
            >
          </div>
          <span class="filmstrip__frame-no">{{ m.frame }}</span>
          <span class="filmstrip__year">{{ m.year }}</span>
        </div>
      </li>
    </ol>

    <!-- 7 颗胶片孔 (进度) -->
    <div class="filmstrip__sprockets">
      <span
        v-for="(_, i) in milestones"
        :key="i"
        class="filmstrip__sprocket-bar"
        :class="{ 'is-active': activeFrame === i }"
      />
    </div>
  </div>
</template>

<style scoped>
.filmstrip {
  position: relative;
  padding: 1.2rem 0 0.6rem;
  border-top: 1px dashed var(--rule);
}
.filmstrip__list {
  list-style: none;
  margin: 0;
  padding: 0 0.4rem 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
}
.filmstrip__frame {
  cursor: pointer;
  position: relative;
  flex: 0 0 auto;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.filmstrip__frame.is-active { transform: scale(1.15); z-index: 2; }
.filmstrip__frame.is-side { opacity: 0.7; }
.filmstrip__frame.is-side:hover { opacity: 1; }
.filmstrip__plate {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 8px;
  background: var(--paper);
  border: 1px solid var(--ink);
  width: 110px;
  height: 130px;
  overflow: hidden;
}
/* 胶片上下打孔 (像 35mm 底片的齿孔) */
.filmstrip__sprocket {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 8px;
  background-image: radial-gradient(circle at 8px 4px, var(--ink) 2.5px, transparent 3px);
  background-size: 16px 8px;
  background-repeat: repeat-x;
  background-position: 0 center;
}
.filmstrip__sprocket--top { top: 0; }
.filmstrip__sprocket--bottom { bottom: 0; }
.filmstrip__plate-photo {
  flex: 1;
  width: 100%;
  background: var(--ink);
  margin: 4px 0;
  overflow: hidden;
}
.filmstrip__plate-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.3) contrast(1.1);
}
.filmstrip__frame.is-active .filmstrip__plate-photo img {
  filter: sepia(0) contrast(1.05);
}
.filmstrip__frame-no {
  position: absolute;
  top: 16px;
  right: 4px;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  color: var(--warm);
  letter-spacing: 0.1em;
}
.filmstrip__year {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--paper);
  background: var(--ink);
  padding: 1px 6px;
  letter-spacing: 0.1em;
}
/* 7 颗胶片孔 (进度指示) */
.filmstrip__sprockets {
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  margin-top: 4px;
}
.filmstrip__sprocket-bar {
  flex: 1;
  height: 2px;
  background: var(--rule);
  margin: 0 2px;
  transition: background 0.3s;
}
.filmstrip__sprocket-bar.is-active { background: var(--warm); }

@media (max-width: 900px) {
  .filmstrip__list { flex-wrap: wrap; gap: 10px; }
  .filmstrip__frame { padding-left: 0; padding-right: 0; }
  .filmstrip__plate { max-width: 100%; }
  .filmstrip__frame:not(.is-active) .filmstrip__plate { width: 70px; height: 90px; }
}
</style>