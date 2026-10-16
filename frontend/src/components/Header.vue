<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
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
        <LpImage class="logo-image" :src="images.logo.src" :alt="images.logo.alt" placeholder="logo/preai-logo.png" :width="images.logo.size[0]" :height="images.logo.size[1]" loading="eager" />
      </a>

      <nav id="global-nav" class="header__nav" aria-label="ページ内メニュー">
        <ul class="header__list">
          <li v-for="(item, i) in navItems" :key="item.href" class="header__item" :style="{ '--i': i }">
            <a :href="item.href" class="header__link" @click="close">
              <!-- 英語は装飾のため読み上げ対象外（リンク名は日本語のみ） -->
              <span class="header__en" aria-hidden="true">{{ item.labelEn }}</span>
              <span class="header__ja">{{ item.label }}</span>
            </a>
          </li>
        </ul>
        <!-- クリックできない装飾テキスト（リンクではありません） -->
        <span class="header-cta" :style="{ '--i': navItems.length }">
          <span class="header-cta__lines" aria-hidden="true"><span></span><span></span><span></span></span>
          <span class="header-cta__text">{{ content.buttonText }}</span>
        </span>
      </nav>

      <button
        type="button"
        class="header__toggle"
        aria-controls="global-nav"
        :aria-expanded="isOpen"
        :aria-label="isOpen ? content.menuCloseLabel : content.menuOpenLabel"
        @click="isOpen = !isOpen"
      >
        <span class="header__toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span>
        <!-- MENU / CLOSE は同じ位置に重ねて切り替え（読み上げは aria-label を使用） -->
        <span class="header__toggle-text" aria-hidden="true">
          <span class="header__toggle-word header__toggle-word--menu">{{ content.menuButtonText }}</span>
          <span class="header__toggle-word header__toggle-word--close">{{ content.closeButtonText }}</span>
        </span>
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
  background: var(--hero-header-bg);
  transition: box-shadow 0.3s ease;
}

.header.is-scrolled {
  box-shadow: 0 4px 20px rgba(16, 43, 105, 0.06);
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
  width: var(--header-logo-width);
}

.header__logo :deep(.img-placeholder) {
  min-height: 0;
  aspect-ratio: 4 / 1;
  padding: 0;
  font-size: 0.5rem;
  border-radius: 6px;
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

/* PC・タブレット（768px以上）：英語を上、日本語を下に縦並び */
.header__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
}

/* 英語ラベル：初回表示時に順番に下からふわっと表示 */
.header__en {
  font-family: var(--font-en);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-nav-en);
  transition: color 0.3s ease;
  animation: nav-en-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(0.2s + var(--i, 0) * 80ms);
}

@keyframes nav-en-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}

.header__ja {
  position: relative;
  line-height: 1.5;
}

/* 日本語の下線：ホバー・キーボードフォーカスで左から伸びる */
.header__ja::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 2px;
  background: var(--color-turquoise);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.header__link:hover .header__ja::after,
.header__link:focus-visible .header__ja::after {
  transform: scaleX(1);
}

.header__link:hover .header__en,
.header__link:focus-visible .header__en {
  color: var(--color-nav-en-hover);
}

/* ---------- CTA（クリック不可のテキスト） ---------- */
.header-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  margin-left: clamp(4px, 1vw, 16px);
  padding: 8px 4px;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-navy);
  white-space: nowrap;
  cursor: default;
}

/* 左側の3本ライン（順番に伸びて消える） */
.header-cta__lines {
  display: grid;
  justify-items: end;
  gap: 4px;
}

.header-cta__lines span {
  display: block;
  height: 2px;
  background: var(--color-turquoise);
  border-radius: 2px;
  transform-origin: right center;
  animation: cta-line 2.8s ease-in-out infinite;
}

.header-cta__lines span:nth-child(1) { width: 12px; }
.header-cta__lines span:nth-child(2) { width: 18px; animation-delay: 0.2s; }
.header-cta__lines span:nth-child(3) { width: 9px; animation-delay: 0.4s; }

@keyframes cta-line {
  0%, 8% { transform: scaleX(0); opacity: 0; }
  28%, 72% { transform: scaleX(1); opacity: 1; }
  92%, 100% { transform: scaleX(1); opacity: 0; }
}

/* 文字下の細いライン（常時ゆっくり流れる） */
.header-cta__text {
  position: relative;
}

.header-cta__text::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 2px;
  background: var(--color-turquoise);
  border-radius: 2px;
  transform-origin: left center;
  animation: cta-underline 3.6s ease-in-out infinite;
}

@keyframes cta-underline {
  0% { transform: scaleX(0); transform-origin: left center; }
  45%, 55% { transform: scaleX(1); transform-origin: left center; }
  56% { transform: scaleX(1); transform-origin: right center; }
  100% { transform: scaleX(0); transform-origin: right center; }
}

/* 動きを減らす設定：ライン・下線・英語ラベルを静止表示 */
@media (prefers-reduced-motion: reduce) {
  .header-cta__lines span,
  .header-cta__text::after,
  .header__en {
    animation: none;
  }
}

.header__toggle {
  display: none;
}

/* 小型PC・タブレット・スマホ：ハンバーガーメニュー */
@media (max-width: 1099px) {
  .header__logo {
    position: relative;
    z-index: 2;
  }

  /* 丸いボタン：アイコン（三本線 / ×）の下に MENU / CLOSE */
  .header__toggle {
    position: relative;
    z-index: 2;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 4px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-navy);
    color: var(--color-white);
  }

  .header__toggle-icon {
    display: grid;
    gap: 4px;
  }

  .header__toggle-icon span {
    display: block;
    width: 18px;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .is-open .header__toggle-icon span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .is-open .header__toggle-icon span:nth-child(2) { opacity: 0; }
  .is-open .header__toggle-icon span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

  /* MENU と CLOSE を同じ場所に重ね、開閉に合わせて入れ替え */
  .header__toggle-text {
    display: grid;
    font-family: var(--font-en);
    font-size: 9px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.08em;
    text-align: center;
  }

  .header__toggle-word {
    grid-area: 1 / 1;
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }

  .header__toggle-word--close,
  .is-open .header__toggle-word--menu {
    opacity: 0;
    transform: translateY(3px);
  }

  .is-open .header__toggle-word--close {
    opacity: 1;
    transform: none;
  }

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

  /* メニューを開いたとき、各項目が順番に右へ少し動きながら表示 */
  .header__item,
  .header-cta {
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .is-open .header__item,
  .is-open .header-cta {
    opacity: 1;
    transform: none;
    transition-delay: calc(0.1s + var(--i, 0) * 60ms);
  }

  .header__list {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .header__link {
    font-size: 1.125rem;
  }

  .header-cta {
    min-height: 56px;
    margin-left: 0;
    padding: 12px 16px;
    font-size: 1rem;
  }
}

/* スマホ：日本語の右に英語を横並び */
@media (max-width: 767px) {
  .header__link {
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }

  .header__en {
    order: 2;
    font-size: 11px;
    letter-spacing: 0.1em;
  }
}
</style>
