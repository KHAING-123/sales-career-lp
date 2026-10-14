<script setup>
import { ref } from 'vue'
import CtaButton from './common/CtaButton.vue'
import { lpContent } from '../data/lpContent.js'
import { images } from '../data/imageConfig.js'

const content = lpContent.hero
const hero = images.hero
const failed = ref(false)

// 強調する文字（titleAccent）の前後で行を分割する
const splitLine = (line) => {
  const i = line.indexOf(content.titleAccent)
  if (!content.titleAccent || i < 0) return { before: line }
  return {
    before: line.slice(0, i),
    accent: content.titleAccent,
    after: line.slice(i + content.titleAccent.length),
  }
}
const lines = content.titleLines.map(splitLine)
</script>

<template>
  <section class="hero has-decor" aria-labelledby="hero-title">
    <!-- 背景装飾 -->
    <span class="light-sweep" aria-hidden="true"></span>
    <span class="bg-blob bg-blob--yellow hero__blob hero__blob--yellow" aria-hidden="true"></span>
    <span class="bg-blob bg-blob--blue hero__blob hero__blob--blue" aria-hidden="true"></span>
    <span class="bg-curve hero__curve hero__curve--1" aria-hidden="true"></span>
    <span class="bg-curve hero__curve hero__curve--2" aria-hidden="true"></span>
    <svg class="bg-wave bg-wave--bottom hero__wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
      <path class="hero__wave-back" d="M0 70C220 20 420 10 690 60s520 80 750 10v70H0Z" />
      <path d="M0 100C260 50 520 50 760 90s470 50 680 0v50H0Z" />
    </svg>

    <div class="hero__inner container">
      <div class="hero__text">
        <p class="hero__label">{{ content.label }}</p>
        <h1 id="hero-title" class="hero__title">
          <span v-for="(line, i) in lines" :key="i" class="hero__line">
            {{ line.before }}<em v-if="line.accent" class="hero__accent">{{ line.accent }}</em>{{ line.after }}
          </span>
        </h1>
        <p class="hero__lead pre-line">{{ content.lead }}</p>
        <CtaButton :text="content.buttonText" class="hero__cta" />
      </div>

      <div class="hero__visual">
        <picture v-if="hero.pc && !failed">
          <source v-if="hero.sp" media="(max-width: 767px)" :srcset="hero.sp" />
          <img :src="hero.pc" :alt="hero.alt" width="1200" height="1000" fetchpriority="high" @error="failed = true" />
        </picture>
        <span v-else class="img-placeholder" role="img" :aria-label="hero.alt">
          画像未設定：hero/sales-hero-pc.png / sales-hero-sp.png
        </span>
      </div>
    </div>

    <a href="#people" class="hero__scroll">
      <span>{{ content.scrollText }}</span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  min-height: min(100svh, 880px);
  padding: calc(var(--header-height) + clamp(24px, 4vw, 56px)) 0 clamp(120px, 12vw, 180px);
  background: var(--gradient-hero);
  color: var(--color-navy);
}

/* 背景装飾の位置・大きさ */
.hero__blob--yellow {
  top: -10%;
  right: -6%;
  width: min(58vw, 760px);
  aspect-ratio: 1;
}

.hero__blob--blue {
  bottom: 0;
  left: -12%;
  width: min(50vw, 640px);
  aspect-ratio: 1;
}

.hero__curve--1 {
  top: 12%;
  right: -18%;
  width: 72vw;
  aspect-ratio: 1.6;
  border: 2px solid rgba(25, 196, 212, 0.18);
}

.hero__curve--2 {
  top: 22%;
  right: -10%;
  width: 60vw;
  aspect-ratio: 1.6;
  border: 1px solid rgba(255, 216, 77, 0.45);
}

.hero__wave {
  color: var(--color-bg);
}

.hero__wave-back {
  fill: var(--decor-wave-cyan) !important;
  opacity: 0.7;
}

.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  align-items: center;
  gap: clamp(24px, 4vw, 64px);
}

.hero__label {
  display: inline-block;
  margin-bottom: 20px;
  padding: 6px 18px;
  font-family: var(--font-en);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--color-white);
  background: var(--color-turquoise);
  border-radius: var(--radius-pill);
}

.hero__title {
  font-size: var(--fs-hero);
  font-weight: 900;
  line-height: 1.4;
  letter-spacing: 0.04em;
}

.hero__line {
  display: block;
  white-space: nowrap;
}

/* 「未来」の強調（イエロー） */
.hero__accent {
  position: relative;
  font-style: normal;
  color: inherit;
  background: linear-gradient(transparent 52%, var(--color-yellow) 52%, var(--color-yellow) 92%, transparent 92%);
  padding-inline: 0.06em;
}

.hero__lead {
  margin-top: 28px;
  font-size: clamp(0.9375rem, 0.9rem + 0.2vw, 1.0625rem);
  font-weight: 500;
  line-height: 2;
  color: var(--color-text-sub);
}

.hero__cta {
  margin-top: 40px;
}

.hero__visual {
  position: relative;
  width: 100%;
  max-width: 640px;
  justify-self: end;
}

.hero__visual img {
  width: 100%;
  height: auto;
}

.hero__visual .img-placeholder {
  aspect-ratio: 6 / 5;
}

.hero__scroll {
  position: absolute;
  left: 50%;
  bottom: clamp(36px, 5vw, 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-family: var(--font-en);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  transform: translateX(-50%);
}

.hero__scroll::after {
  content: "";
  width: 1px;
  height: 40px;
  background: linear-gradient(var(--color-navy), transparent);
  animation: scroll-line 2s ease-in-out infinite;
  transform-origin: top;
}

@keyframes scroll-line {
  0% { transform: scaleY(0); }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* 小型PC・タブレット */
@media (max-width: 1279px) {
  .hero {
    min-height: auto;
  }
}

/* スマホ：画像 → 文章の順に縦並び */
@media (max-width: 767px) {
  .hero {
    padding-bottom: 120px;
  }

  .hero__inner {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .hero__visual {
    order: -1;
    max-width: 420px;
    justify-self: center;
  }

  .hero__visual .img-placeholder {
    aspect-ratio: 15 / 14;
  }

  .hero__text {
    text-align: center;
  }

  .hero__lead {
    margin-top: 20px;
  }

  .hero__cta {
    margin-top: 32px;
  }

  .hero__scroll {
    display: none;
  }
}
</style>
