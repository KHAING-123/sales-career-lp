<script setup>
import CtaButton from './common/CtaButton.vue'
import { lpContent } from '../data/lpContent.js'
import { images } from '../data/imageConfig.js'

const content = lpContent.finalCta
const bg = images.finalCta
</script>

<template>
  <section class="final-cta has-decor" aria-labelledby="final-cta-title">
    <!-- 背景画像（PC/スマホで切り替え）。文字は画像に含めず、下のHTMLで表示します -->
    <picture v-if="bg.pc" class="final-cta__bg">
      <source v-if="bg.sp" media="(max-width: 767px)" :srcset="bg.sp" />
      <img :src="bg.pc" :alt="bg.alt" width="2880" height="1120" loading="lazy" decoding="async" />
    </picture>
    <span class="final-cta__overlay" aria-hidden="true"></span>
    <span class="light-sweep" aria-hidden="true"></span>

    <div class="final-cta__inner container" v-reveal>
      <p class="final-cta__label">{{ content.label }}</p>
      <h2 id="final-cta-title" class="final-cta__title">
        <span v-for="line in content.titleLines" :key="line" class="final-cta__line">{{ line }}</span>
      </h2>
      <p class="final-cta__text">{{ content.text }}</p>
      <CtaButton :text="content.buttonText" variant="yellow" class="final-cta__button" />
    </div>
  </section>
</template>

<style scoped>
/* 背景画像が未設定の場合は、このグラデーションが表示されます */
.final-cta {
  display: grid;
  place-items: center;
  min-height: clamp(480px, 39vw, 640px);
  padding-block: clamp(80px, 9vw, 120px);
  color: var(--cta-text-color);
  text-align: center;
  background: linear-gradient(135deg, #1a4fa0 0%, #19a9d4 60%, #7fe3ec 100%);
}

.final-cta__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
}

.final-cta__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
}

.final-cta .light-sweep {
  opacity: 0.35;
}

.final-cta__overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--cta-overlay);
}

.final-cta__label {
  font-family: var(--font-en);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--color-yellow);
}

.final-cta__title {
  margin-top: 16px;
  font-size: clamp(1.5rem, 1rem + 1.8vw, 2.625rem);
  font-weight: 900;
  line-height: 1.6;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 16px rgba(16, 43, 105, 0.35);
}

.final-cta__line {
  display: inline-block;
}

.final-cta__text {
  margin-top: 16px;
  font-weight: 500;
  text-shadow: 0 2px 12px rgba(16, 43, 105, 0.35);
}

.final-cta__button {
  margin-top: 40px;
  min-height: 64px;
  padding-inline: 48px;
  font-size: 1.0625rem;
}

@media (max-width: 767px) {
  .final-cta {
    min-height: 560px;
  }

  .final-cta__title {
    font-size: 1.375rem;
  }

  .final-cta__button {
    padding-inline: 24px;
  }
}
</style>
