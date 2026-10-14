<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import CtaButton from './common/CtaButton.vue'
import LpImage from './common/LpImage.vue'
import { lpContent } from '../data/lpContent.js'
import { images } from '../data/imageConfig.js'
import { navItems } from '../data/navigation.js'

const content = lpContent.header
const isScrolled = ref(false)
const isOpen = ref(false)

const onScroll = () => (isScrolled.value = window.scrollY > 24)
const onKeydown = (e) => e.key === 'Escape' && (isOpen.value = false)
const close = () => (isOpen.value = false)

watch(isOpen, (open) => document.body.style.setProperty('overflow', open ? 'hidden' : ''))

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': isScrolled, 'is-open': isOpen }">
    <div class="header__inner">
      <a href="#top" class="header__logo" @click="close">
        <LpImage :src="images.logo.src" :alt="images.logo.alt" placeholder="logo/preai-logo.png" width="180" height="48" loading="eager" />
      </a>

      <nav id="global-nav" class="header__nav" aria-label="ページ内メニュー">
        <ul class="header__list">
          <li v-for="item in navItems" :key="item.href">
            <a :href="item.href" class="header__link" @click="close">{{ item.label }}</a>
          </li>
        </ul>
        <CtaButton :text="content.buttonText" class="header__cta" />
      </nav>

      <button
        type="button"
        class="header__toggle"
        aria-controls="global-nav"
        :aria-expanded="isOpen"
        :aria-label="isOpen ? content.menuCloseLabel : content.menuOpenLabel"
        @click="isOpen = !isOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  height: var(--header-height);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.header.is-scrolled {
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 4px 20px rgba(16, 43, 105, 0.06);
  backdrop-filter: blur(10px);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.header__logo {
  flex-shrink: 0;
  display: block;
  width: 150px;
  height: 40px;
}

.header__logo :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left center;
}

.header__logo :deep(.img-placeholder) {
  min-height: 0;
  padding: 0;
  font-size: 0.625rem;
  border-radius: 8px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2vw, 32px);
}

.header__list {
  display: flex;
  gap: clamp(14px, 1.8vw, 28px);
}

.header__link {
  position: relative;
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
}

.header__link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 2px;
  background: var(--color-turquoise);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.header__link:hover::after {
  transform: scaleX(1);
}

.header__cta {
  min-height: 48px;
  padding: 10px 24px;
  font-size: 0.875rem;
}

.header__toggle {
  display: none;
}

/* 小型PC・タブレット・スマホ：ハンバーガーメニュー */
@media (max-width: 1099px) {
  /* backdrop-filter があるとメニューが全画面に広がらないため、開いている間は外す */
  .header.is-open {
    backdrop-filter: none;
  }

  .header__logo {
    position: relative;
    z-index: 2;
  }

  .header__toggle {
    position: relative;
    z-index: 2;
    display: grid;
    place-content: center;
    gap: 6px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-navy);
  }

  .header__toggle span {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--color-white);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .is-open .header__toggle span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .is-open .header__toggle span:nth-child(2) { opacity: 0; }
  .is-open .header__toggle span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

  .header__nav {
    position: fixed;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    padding: calc(var(--header-height) + 24px) var(--gutter) 48px;
    background: linear-gradient(160deg, #e4f7fd 0%, #ffffff 60%, #fffbe9 100%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.35s ease, visibility 0.35s ease;
  }

  .is-open .header__nav {
    opacity: 1;
    visibility: visible;
  }

  .header__list {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .header__link {
    font-size: 1.125rem;
  }

  .header__cta {
    min-height: 56px;
    font-size: 1rem;
  }
}

@media (max-width: 767px) {
  .header__logo {
    width: 120px;
    height: 32px;
  }
}
</style>
