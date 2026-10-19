<script setup>
import { ref } from 'vue'
import SectionHeading from './common/SectionHeading.vue'
import CareerIcon from './career/CareerIcon.vue'
import CareerLine from './career/CareerLine.vue'
import { lpContent } from '../data/lpContent.js'
import { useInViewOnce } from '../composables/useSplitText.js'

const content = lpContent.career

// 背景装飾：セクションが見え始めたら柔らかく表示（初回のみ）
const bgVisible = ref(false)
const section = useInViewOnce(() => (bgVisible.value = true), { threshold: 0.05 })

// カード・ライン：画面に入ったら順番に表示（初回のみ）
const stepsVisible = ref(false)
const steps = useInViewOnce(() => (stepsVisible.value = true), { rootMargin: '0px 0px -10% 0px', threshold: 0.15 })

// 背景下部の淡い都市シルエット（[x, 幅, 高さ]。viewBox 1440×160 の座標）
const buildings = [
  [0, 70, 60], [64, 46, 96], [104, 60, 72], [160, 38, 120], [194, 72, 84], [262, 50, 58], [308, 44, 104],
  [348, 66, 76], [410, 36, 132], [442, 58, 90], [496, 80, 64], [572, 42, 112], [610, 64, 80], [670, 34, 140],
  [700, 60, 92], [756, 76, 70], [828, 40, 118], [864, 62, 86], [922, 48, 60], [966, 36, 128], [998, 70, 96],
  [1064, 52, 74], [1112, 40, 110], [1148, 68, 84], [1212, 44, 124], [1252, 60, 70], [1308, 38, 100], [1342, 98, 78],
]
</script>

<template>
  <section
    id="career"
    ref="section"
    class="career section has-decor"
    :class="{ 'is-bg-visible': bgVisible }"
    aria-labelledby="career-title"
  >
    <!-- 背景装飾（ウェーブ・光・ドット・円・都市シルエット） -->
    <div class="career__decor" aria-hidden="true">
      <svg class="career__decor-wave career__decor-wave--left" viewBox="0 0 800 600" preserveAspectRatio="none">
        <path d="M0 140C220 120 420 220 520 360S700 560 800 600H0Z" />
      </svg>
      <svg class="career__decor-wave career__decor-wave--right" viewBox="0 0 800 600" preserveAspectRatio="none">
        <path d="M800 0V600C620 520 520 380 560 240S700 40 800 0Z" />
      </svg>
      <span class="career__decor-glow career__decor-glow--mint"></span>
      <span class="career__decor-glow career__decor-glow--yellow"></span>
      <span class="career__decor-circle career__decor-circle--1"></span>
      <span class="career__decor-circle career__decor-circle--2"></span>
      <span class="career__decor-dots career__decor-dots--1"></span>
      <span class="career__decor-dots career__decor-dots--2"></span>
      <svg class="career__decor-city" viewBox="0 0 1440 160" preserveAspectRatio="none">
        <rect v-for="(b, i) in buildings" :key="i" :x="b[0]" :y="160 - b[2]" :width="b[1] - 4" :height="b[2]" rx="2" />
      </svg>
    </div>

    <div class="container">
      <SectionHeading id="career-title" :content="content" center />

      <div ref="steps" class="career-steps" :class="{ 'is-inview': stepsVisible }">
        <CareerLine :active="stepsVisible" />

        <ol class="career-steps__list">
          <li
            v-for="(item, i) in content.items"
            :key="item.id"
            class="career-card"
            data-career-card
            :style="{
              '--i': i,
              '--step-color': `var(--color-step-${i + 1})`,
              '--career-card-tint': `var(--career-card-tint-${i + 1})`,
              '--career-icon-bg': `var(--career-icon-bg-${i + 1})`,
            }"
          >
            <p class="career-card__year">
              <span class="career-card__year-num">{{ item.year }}</span>{{ item.yearUnit }}
            </p>
            <div class="career-card__icon">
              <CareerIcon :type="item.icon" :active="stepsVisible" />
            </div>
            <h3 class="career-card__title">{{ item.title }}</h3>
            <span class="career-card__line" aria-hidden="true"></span>
            <p class="career-card__text">{{ item.text }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.career {
  background: var(--career-bg);
}

/* ---------- 背景装飾 ---------- */
.career__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 1.2s ease 0.2s;
  pointer-events: none;
}

.is-bg-visible .career__decor {
  opacity: 1;
}

.career__decor-wave {
  position: absolute;
}

.career__decor-wave--left {
  top: 10%;
  left: 0;
  width: 46%;
  height: 70%;
}

.career__decor-wave--left path {
  fill: var(--career-wave-blue);
  opacity: 0.55;
}

.career__decor-wave--right {
  top: 4%;
  right: 0;
  width: 38%;
  height: 72%;
}

.career__decor-wave--right path {
  fill: var(--career-wave-yellow);
  opacity: 0.45;
}

.career__decor-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
}

.career__decor-glow--mint {
  top: 30%;
  left: 32%;
  width: 40vw;
  max-width: 620px;
  aspect-ratio: 1.8;
  background: radial-gradient(ellipse, var(--career-glow-mint) 0%, transparent 70%);
}

.career__decor-glow--yellow {
  top: 8%;
  right: 6%;
  width: 26vw;
  max-width: 380px;
  aspect-ratio: 1;
  background: radial-gradient(circle, var(--career-glow-yellow) 0%, transparent 70%);
}

.career__decor-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.7), rgba(205, 236, 250, 0.35));
}

.career__decor-circle--1 {
  top: 26%;
  left: 20%;
  width: 72px;
  aspect-ratio: 1;
}

.career__decor-circle--2 {
  top: 48%;
  left: -24px;
  width: 120px;
  aspect-ratio: 1;
}

.career__decor-dots {
  position: absolute;
  width: 84px;
  height: 52px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 1.8px, transparent 2.4px) 0 0 / 14px 14px;
}

.career__decor-dots--1 {
  top: 24%;
  left: 7%;
}

.career__decor-dots--2 {
  top: 56%;
  right: 3%;
  width: 28px;
  height: 66px;
  background-image: radial-gradient(circle, rgba(130, 200, 235, 0.6) 1.8px, transparent 2.4px);
}

.career__decor-city {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: clamp(90px, 11vw, 160px);
}

.career__decor-city rect {
  fill: var(--career-city);
  opacity: 0.35;
}

/* ---------- キャリアカード ---------- */
.career-steps {
  --career-icon-size: 92px;
  --career-stair: clamp(28px, 3.4vw, 48px); /* 階段1段ぶんの高さ */
  position: relative;
  isolation: isolate; /* カード(1) → ライン(2) の重なり順をこの中で管理 */
  padding-top: 84px; /* 右上へ伸びる矢印のぶんの余白 */
}

.career-steps__list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: start;
  gap: clamp(16px, 2vw, 28px);
}

.career-card {
  position: relative;
  z-index: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px clamp(16px, 1.8vw, 26px) 32px;
  text-align: center;
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 55%, var(--career-card-tint) 100%);
  border: 1px solid var(--career-card-border);
  border-radius: 26px;
  box-shadow:
    0 18px 44px rgba(20, 75, 120, 0.08),
    0 6px 16px rgba(20, 75, 120, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  opacity: 0;
  transform: translateY(28px);
  /* opacity・transform は表示アニメーション、translate・影はホバー用 */
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) calc(0.6s + var(--i) * 0.18s),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) calc(0.6s + var(--i) * 0.18s),
    translate 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

/* 階段状：左から右へ1段ずつ高くなる */
.career-card:nth-child(1) { margin-top: calc(var(--career-stair) * 3); }
.career-card:nth-child(2) { margin-top: calc(var(--career-stair) * 2); }
.career-card:nth-child(3) { margin-top: var(--career-stair); }

.is-inview .career-card {
  opacity: 1;
  transform: none;
}

/* カード上部のアクセントライン（年次ごとの色） */
.career-card::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 4px;
  background: var(--step-color);
  transition: box-shadow 0.5s ease;
}

.career-card__year {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--step-color);
}

.career-card__year-num {
  margin-right: 2px;
  font-family: var(--font-en);
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
}

.career-card__icon {
  margin: 14px 0 18px;
}

.career-card__title {
  font-size: 1.0625rem;
  font-weight: 900;
  line-height: 1.6;
  white-space: pre-line;
}

/* タイトル下のライン：中央から左右へ伸び、その後に光が流れる */
.career-card__line {
  position: relative;
  display: block;
  width: 48px;
  height: 3px;
  margin: 14px auto 0;
  overflow: hidden;
  background: var(--step-color);
  border-radius: 3px;
  opacity: 0.85;
  transform: scaleX(0);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) calc(1.1s + var(--i) * 0.18s), opacity 0.4s ease;
}

.career-card__line::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.85) 50%, transparent 100%);
  transform: translateX(-100%);
}

.is-inview .career-card__line {
  transform: none;
}

.is-inview .career-card__line::after {
  animation: career-line-shine 4s ease-in-out calc(2s + var(--i) * 0.4s) infinite;
}

.career-card__text {
  margin-top: 14px;
  font-size: var(--fs-small);
  line-height: 1.85;
  color: var(--color-text-sub);
}

/* PCのみ：ホバーで少し浮き、影とアクセントラインを強調 */
@media (hover: hover) and (min-width: 768px) {
  .career-card:hover {
    translate: 0 -5px;
    box-shadow:
      0 26px 56px rgba(20, 75, 120, 0.12),
      0 10px 22px rgba(20, 75, 120, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }

  .career-card:hover::before {
    box-shadow: 0 0 14px 2px var(--step-color);
  }

  .career-card:hover .career-card__line {
    opacity: 1;
  }
}

/* 小型PC：アイコン・余白を少し小さく */
@media (max-width: 1279px) {
  .career-steps {
    --career-icon-size: 80px;
  }

  .career-card__year-num {
    font-size: 2.125rem;
  }

  .career-card__title {
    font-size: 1rem;
  }
}

/* タブレット縦・スマホ：縦1列（左側に縦の成長ライン） */
@media (max-width: 1023px) {
  .career-steps {
    --career-icon-size: 68px;
    padding-top: 0;
  }

  .career-steps__list {
    grid-template-columns: 1fr;
    gap: 22px;
    max-width: 640px;
    margin-inline: auto;
    padding-left: 34px;
  }

  .career-card:nth-child(n) {
    margin-top: 0;
  }

  .career-card {
    display: grid;
    grid-template-columns: var(--career-icon-size) minmax(0, 1fr);
    align-items: start;
    gap: 2px 18px;
    padding: 24px 22px 24px;
    text-align: left;
    border-radius: 22px;
    transform: translateY(18px);
  }

  .career-card__icon {
    grid-column: 1;
    grid-row: 1 / span 4;
    margin: 4px 0 0;
  }

  .career-card__year,
  .career-card__title,
  .career-card__line,
  .career-card__text {
    grid-column: 2;
  }

  .career-card__year-num {
    font-size: 1.875rem;
  }

  .career-card__line {
    margin: 10px 0 0;
    transform-origin: left center;
  }

  .career-card__text {
    margin-top: 10px;
    font-size: 0.8125rem;
  }
}

@media (max-width: 767px) {
  .career-steps__list {
    padding-left: 28px;
  }

  .career-card {
    gap: 2px 14px;
    padding: 20px 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-inview .career-card__line::after {
    animation: none;
  }
}
</style>
