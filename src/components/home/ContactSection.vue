<script setup>
import { ref, computed } from 'vue'
import { useIntersectionAnimation } from '@/composables/useIntersectionAnimation'
import SocialIcons from '@/components/SocialIcons.vue'

const props = defineProps({
  contactInfo: { type: Object, required: true },
  socialLinks: { type: Array, required: true },
  socialIcons: { type: Object, required: true }
})

const { el: sectionRef, isVisible } = useIntersectionAnimation({ threshold: 0.2 })

const copyState = ref('点击复制微信号')

const isOpen = computed(() => {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  if (day === 0 || day === 6) {
    return hour >= 9 && hour < 22
  }
  return hour >= 8 && hour < 21
})

const openMap = () => {
  window.open(`https://uri.amap.com/search?keyword=${encodeURIComponent(props.contactInfo.address)}`, '_blank', 'noopener')
}

const callPhone = () => {
  const phone = props.contactInfo.phone.replace(/[^\d-]/g, '')
  if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
    window.location.href = `tel:${phone}`
  } else {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phone)
      alert(`号码已复制: ${phone}`)
    } else {
      window.prompt('复制号码:', phone)
    }
  }
}

const copyWechat = async () => {
  if (!navigator.clipboard) {
    window.prompt('复制微信号:', props.contactInfo.wechat)
    return
  }
  try {
    await navigator.clipboard.writeText(props.contactInfo.wechat)
    copyState.value = '已复制 ✓'
    setTimeout(() => { copyState.value = '点击复制微信号' }, 2000)
  } catch (e) {
    window.prompt('复制微信号:', props.contactInfo.wechat)
  }
}
</script>

<template>
  <section id="contact" ref="sectionRef" class="contact" :class="{ visible: isVisible }">
    <div class="contact__inner">
      <div class="contact__head">
        <span class="datestamp">F·26 · CONTACT</span>
        <h2>来拾光<br>坐一会儿</h2>
      </div>
      <div class="contact__grid">
        <div class="contact__col" @click="openMap">
          <span class="contact__num">F·26A</span>
          <svg class="contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <h5>地址</h5>
          <p>{{ contactInfo.address }}</p>
          <span class="contact__sub">🚇 {{ contactInfo.subway }}</span>
          <span class="contact__sub">🅿️ {{ contactInfo.parking }}</span>
          <span class="contact__action">查看地图 →</span>
        </div>
        <div class="contact__col" @click="callPhone">
          <span class="contact__num">F·26B</span>
          <svg class="contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <h5>电话</h5>
          <p>{{ contactInfo.phone }}</p>
          <span class="contact__sub">📧 {{ contactInfo.email }}</span>
          <span class="contact__action">一键拨号 →</span>
        </div>
        <div class="contact__col" @click="copyWechat">
          <span class="contact__num">F·26C</span>
          <svg class="contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <h5>微信</h5>
          <p>{{ contactInfo.wechat }}</p>
          <span class="contact__action">{{ copyState }}</span>
        </div>
        <div class="contact__col contact__col--hours">
          <span class="contact__num">F·26D</span>
          <svg class="contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <h5>营业时间</h5>
          <p>{{ contactInfo.hours }}</p>
          <span class="contact__status" :class="{ 'is-open': isOpen }">
            <span class="contact__status-dot" />
            {{ isOpen ? 'NOW OPEN' : 'NOW CLOSED' }}
          </span>
        </div>
      </div>

      <div class="contact__services" v-if="contactInfo.services">
        <span class="contact__services-title">店内设施 · FACILITIES</span>
        <div class="contact__services-grid">
          <div v-for="s in contactInfo.services" :key="s.label" class="contact__service">
            <span class="contact__service-label">{{ s.label }}</span>
            <span class="contact__service-detail">{{ s.detail }}</span>
          </div>
        </div>
      </div>
      <div class="contact__social">
        <SocialIcons
          v-for="{ name, icon } in socialLinks"
          :key="name"
          :name="name"
          :icon="socialIcons[icon]"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: 7rem 3rem;
  background: var(--paper-light);
  color: var(--ink);
  border-top: 1px solid var(--rule);
}
.contact__inner {
  max-width: 1100px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.contact.visible .contact__inner {
  opacity: 1;
  transform: translateY(0);
}
.contact__head { margin-bottom: 4rem; }
.contact__head .datestamp { color: var(--warm); border-color: var(--warm); }
.contact__head h2 {
  font-family: var(--font-cjk);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--ink);
  margin-top: 1rem;
  letter-spacing: 0.02em;
}
.contact__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 3rem 0;
  border-top: 1px dashed var(--rule);
  border-bottom: 1px dashed var(--rule);
}
.contact__col {
  position: relative;
  padding: 1rem 1rem 1.2rem;
  border-left: 1px solid transparent;
  transition: border-color 0.3s ease, transform 0.3s ease, background 0.3s ease;
  cursor: pointer;
  border-radius: 4px;
}
.contact__col:hover {
  border-left-color: var(--warm);
  background: rgba(200, 85, 61, 0.04);
  transform: translateY(-2px);
}
.contact__col--hours { cursor: default; }
.contact__col--hours:hover { background: transparent; transform: none; border-left-color: transparent; }
.contact__icon {
  width: 24px;
  height: 24px;
  color: var(--warm);
  margin-bottom: 0.6rem;
  display: block;
}
.contact__action {
  display: inline-block;
  margin-top: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--warm);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.contact__col:hover .contact__action {
  opacity: 1;
  transform: translateX(0);
}
.contact__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  font-weight: 600;
  color: #b85c50;
}
.contact__status.is-open { color: #4a7c59; }
.contact__status-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  position: relative;
}
.contact__status.is-open .contact__status-dot::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.3;
  animation: statusPulse 2s ease-in-out infinite;
}
@keyframes statusPulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 0; }
}
.contact__num {
  position: absolute;
  top: 0;
  right: 0;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--warm);
  letter-spacing: 0.2em;
  font-weight: 600;
}
.contact__col h5 {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--warm);
  margin-bottom: 0.8rem;
  font-weight: 600;
}
.contact__col p {
  font-family: var(--font-cjk);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ink-soft);
}
.contact__sub {
  display: block;
  font-family: var(--font-cjk);
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--ink-soft);
  opacity: 0.85;
  margin-top: 0.4rem;
}
.contact__services {
  margin: 3rem 0 2rem;
  padding: 2rem 0;
  border-top: 1px dashed var(--rule);
  border-bottom: 1px dashed var(--rule);
}
.contact__services-title {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  color: var(--warm);
  margin-bottom: 1.2rem;
  text-transform: uppercase;
}
.contact__services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem 2rem;
}
.contact__service {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.contact__service-label {
  font-family: var(--font-cjk);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
}
.contact__service-detail {
  font-family: var(--font-cjk);
  font-size: 0.82rem;
  color: var(--ink-soft);
}
.contact__social { display: flex; gap: 1.2rem; }
.contact__social :deep(svg) {
  width: 28px;
  height: 28px;
  color: var(--ink);
}

@media (max-width: 1024px) {
  .contact { padding: 4rem 1rem; }
  .contact__grid { grid-template-columns: 1fr 1fr; }
  .contact__services-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .contact__grid { grid-template-columns: 1fr; }
  .contact__services-grid { grid-template-columns: 1fr; }
}
</style>