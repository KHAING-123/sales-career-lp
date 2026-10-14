<script setup>
import SectionHeading from './common/SectionHeading.vue'
import LpImage from './common/LpImage.vue'
import { lpContent } from '../data/lpContent.js'
import { images } from '../data/imageConfig.js'

const content = lpContent.career
</script>

<template>
  <section id="career" class="career section bg-white has-decor" aria-labelledby="career-title">
    <span class="light-sweep" aria-hidden="true"></span>
    <span class="bg-curve career__curve" aria-hidden="true"></span>

    <div class="container">
      <SectionHeading id="career-title" :content="content" center />

      <div class="career__steps" v-reveal>
        <!-- ステップをつなぐ曲線（PCのみ）。各カードの丸印を通り、カードの上を階段状に上がっていきます -->
        <svg class="career__line" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="career-line-gradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" style="stop-color: var(--color-step-1)" />
              <stop offset="35%" style="stop-color: var(--color-step-2)" />
              <stop offset="68%" style="stop-color: var(--color-step-3)" />
              <stop offset="100%" style="stop-color: var(--color-step-4)" />
            </linearGradient>
          </defs>
          <path
            class="career__line-path"
            d="M16 253H141C220 253 230 183 300 183H447C526 183 536 113 606 113H753C832 113 842 43 912 43H1059C1120 43 1150 30 1184 20"
            pathLength="1"
          />
        </svg>

        <ol class="career__list">
          <li
            v-for="(item, i) in content.items"
            :key="item.id"
            class="career-card"
            :style="{ '--step-color': `var(--color-step-${i + 1})`, '--reveal-delay': `${0.3 + i * 0.25}s` }"
          >
            <span class="career-card__dot" aria-hidden="true"></span>
            <p class="career-card__year">
              <span class="career-card__year-num">{{ item.year }}</span>{{ item.yearUnit }}
            </p>
            <div class="career-card__icon float" :style="{ '--float-delay': `${i * 0.5}s` }">
              <LpImage :src="images.icons.career[item.id]" :placeholder="`icons/career/icon-${item.id}.png`" width="240" height="240" />
            </div>
            <h3 class="career-card__title">{{ item.title }}</h3>
            <p class="career-card__text">{{ item.text }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.career {
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-white) 30%, var(--color-white) 70%, var(--color-bg) 100%);
}

.career__curve {
  top: 30%;
  left: -20%;
  width: 140%;
  aspect-ratio: 4;
  background: radial-gradient(ellipse at center, rgba(227, 246, 252, 0.9) 0%, rgba(227, 246, 252, 0) 65%);
}

.career__steps {
  position: relative;
  padding-top: 24px;
}

/* キャリアライン：表示されたら左から描かれる */
.career__line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  height: 260px;
  overflow: visible;
  pointer-events: none;
}

.career__line-path {
  fill: none;
  stroke: url(#career-line-gradient);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  vector-effect: non-scaling-stroke;
}

.career__steps.is-visible .career__line-path {
  animation: draw-line 2.2s cubic-bezier(0.45, 0, 0.2, 1) 0.2s forwards;
}

/* PC：階段状に右上がりで並べる */
.career__list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: start;
  gap: 24px;
}

.career-card {
  position: relative;
  padding: 36px 24px 28px;
  text-align: center;
  background: var(--color-white);
  border-top: 5px solid var(--step-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: var(--reveal-delay);
}

.career__steps.is-visible .career-card {
  opacity: 1;
  transform: none;
}

.career-card:nth-child(1) { margin-top: 240px; }
.career-card:nth-child(2) { margin-top: 170px; }
.career-card:nth-child(3) { margin-top: 100px; }
.career-card:nth-child(4) { margin-top: 30px; }

.career-card__dot {
  position: absolute;
  z-index: 3;
  top: -16px;
  left: 50%;
  width: 26px;
  height: 26px;
  background: var(--color-white);
  border: 6px solid var(--step-color);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.career-card__year {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--step-color);
}

.career-card__year-num {
  margin-right: 2px;
  font-family: var(--font-en);
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1;
}

.career-card__icon {
  display: grid;
  place-items: center;
  width: 88px;
  height: 88px;
  margin: 16px auto;
  padding: 12px;
  background: var(--color-bg);
  border-radius: 50%;
}

.career-card__icon :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.career-card__icon :deep(.img-placeholder) {
  min-height: 0;
  padding: 2px;
  font-size: 0.5rem;
  border-radius: 50%;
}

.career-card__title {
  font-size: 1.0625rem;
  font-weight: 900;
  line-height: 1.6;
  white-space: pre-line;
}

.career-card__text {
  margin-top: 10px;
  font-size: var(--fs-small);
  line-height: 1.8;
  color: var(--color-text-sub);
  text-align: left;
}

/* 小型PC・タブレット：2列 */
@media (max-width: 1279px) {
  .career__line {
    display: none;
  }

  .career__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px 24px;
  }

  .career-card:nth-child(n) {
    margin-top: 0;
  }
}

/* スマホ：縦型タイムライン */
@media (max-width: 767px) {
  .career__steps {
    padding-top: 0;
  }

  .career__list {
    grid-template-columns: 1fr;
    gap: 20px;
    padding-left: 32px;
  }

  /* 縦のキャリアライン（上から伸びる） */
  .career__list::before {
    content: "";
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 9px;
    width: 4px;
    background: linear-gradient(var(--color-step-1), var(--color-step-2), var(--color-step-3), var(--color-step-4));
    border-radius: 4px;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 2s cubic-bezier(0.45, 0, 0.2, 1) 0.2s;
  }

  .career__steps.is-visible .career__list::before {
    transform: scaleY(1);
  }

  .career-card {
    display: grid;
    grid-template-columns: 64px minmax(0, 1fr);
    gap: 4px 16px;
    padding: 20px;
    text-align: left;
    border-top: 0;
    border-left: 5px solid var(--step-color);
  }

  .career-card__dot {
    top: 30px;
    left: -27px;
    width: 22px;
    height: 22px;
    border-width: 5px;
  }

  .career-card__year {
    grid-column: 2;
  }

  .career-card__year-num {
    font-size: 2rem;
  }

  .career-card__icon {
    grid-column: 1;
    grid-row: 1 / span 3;
    width: 64px;
    height: 64px;
    margin: 0;
    padding: 8px;
  }

  .career-card__title,
  .career-card__text {
    grid-column: 2;
  }

  .career-card__title {
    font-size: 1rem;
  }

  .career-card__text {
    margin-top: 4px;
    font-size: 0.8125rem;
  }
}
</style>
