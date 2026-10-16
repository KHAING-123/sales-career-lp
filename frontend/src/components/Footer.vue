<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import LpImage from './common/LpImage.vue'
import { lpContent } from '../data/lpContent.js'
import { images } from '../data/imageConfig.js'
import { footerLinks, snsLinks } from '../data/navigation.js'

const content = lpContent.footer
const showPageTop = ref(false)

const onScroll = () => (showPageTop.value = window.scrollY > 600)
const scrollToTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__brand">
        <a href="#top" class="footer__logo">
          <LpImage class="logo-image" :src="images.logo.src" :alt="images.logo.alt" placeholder="logo/preai-logo.png" :width="images.logo.size[0]" :height="images.logo.size[1]" />
        </a>
        <p class="footer__message">{{ content.message }}</p>
        <address class="footer__company">
          <span>{{ content.companyName }}</span>
          <span>{{ content.address }}</span>
        </address>
      </div>

      <nav class="footer__nav" aria-label="フッターメニュー">
        <div v-for="group in footerLinks" :key="group.title" class="footer__group">
          <h2 class="footer__heading">{{ group.title }}</h2>
          <ul class="footer__links">
            <li v-for="link in group.links" :key="link.label">
              <a :href="link.url" class="footer__link">{{ link.label }}</a>
            </li>
          </ul>
        </div>
        <div class="footer__group">
          <h2 class="footer__heading">{{ content.snsTitle }}</h2>
          <ul class="footer__sns">
            <li v-for="sns in snsLinks" :key="sns.id">
              <a :href="sns.url" class="footer__sns-link" target="_blank" rel="noopener" :aria-label="sns.label">
                <LpImage :src="images.icons.sns[sns.id]" :placeholder="sns.id" width="20" height="20" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="footer__bottom container">
      <p class="footer__copyright"><small>{{ content.copyright }}</small></p>
    </div>

    <button
      type="button"
      class="page-top"
      :class="{ 'is-visible': showPageTop }"
      :aria-label="content.pageTopLabel"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding-top: clamp(56px, 6vw, 80px);
  color: var(--color-footer-text);
  background: var(--color-footer-bg);
}

.footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
  gap: 48px;
}

/* ロゴは白い角丸の上に表示（濃い背景でも読みやすくするため） */
.footer__logo {
  display: block;
  box-sizing: content-box;
  width: var(--footer-logo-width);
  padding: 14px 20px;
  background: var(--color-white);
  border-radius: var(--radius-sm);
}

.footer__logo :deep(.img-placeholder) {
  min-height: 0;
  aspect-ratio: 4 / 1;
  padding: 0;
  font-size: 0.5625rem;
  border-radius: 6px;
}

.footer__message {
  margin-top: 20px;
  font-weight: 700;
}

.footer__company {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  font-size: var(--fs-small);
  font-style: normal;
  opacity: 0.8;
}

.footer__nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.footer__heading {
  padding-bottom: 12px;
  margin-bottom: 16px;
  font-size: 0.9375rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.footer__links {
  display: grid;
  gap: 10px;
}

.footer__link {
  font-size: var(--fs-small);
  opacity: 0.8;
  transition: opacity 0.3s ease, color 0.3s ease;
}

.footer__link:hover {
  color: var(--color-turquoise-light);
  opacity: 1;
}

.footer__sns {
  display: flex;
  gap: 12px;
}

.footer__sns-link {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.footer__sns-link:hover {
  background: var(--color-turquoise);
  transform: translateY(-2px);
}

.footer__sns-link :deep(img) {
  width: 20px;
  height: 20px;
}

.footer__sns-link :deep(.img-placeholder) {
  min-height: 0;
  padding: 0;
  font-size: 0;
  border-radius: 50%;
}

.footer__bottom {
  margin-top: 56px;
  padding-block: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.footer__copyright {
  font-family: var(--font-en);
  font-size: 0.75rem;
  text-align: center;
  opacity: 0.7;
}

/* ページトップへ戻るボタン */
.page-top {
  position: fixed;
  right: clamp(16px, 2.5vw, 32px);
  bottom: clamp(16px, 2.5vw, 32px);
  z-index: 90;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  color: var(--color-navy);
  background: var(--color-yellow);
  border-radius: 50%;
  box-shadow: var(--shadow-button);
  opacity: 0;
  visibility: hidden;
  transform: translateY(12px);
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
}

.page-top.is-visible {
  opacity: 1;
  visibility: visible;
  transform: none;
}

.page-top:hover {
  transform: translateY(-3px);
}

.page-top svg {
  width: 22px;
  height: 22px;
}

@media (max-width: 1279px) {
  .footer__inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .footer__nav {
    grid-template-columns: 1fr 1fr;
    gap: 32px 20px;
  }

  .footer__nav .footer__group:last-child {
    grid-column: 1 / -1;
  }

  .page-top {
    width: 46px;
    height: 46px;
  }
}
</style>
