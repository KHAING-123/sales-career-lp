<script setup>
import { ref } from 'vue'
import SectionHeading from './common/SectionHeading.vue'
import ValueIcon from './value/ValueIcon.vue'
import { lpContent } from '../data/lpContent.js'
import { useInViewOnce } from '../composables/useSplitText.js'

const content = lpContent.value

// 3枚のカード：画面に入ったら「カード → アイコン → タイトル下のライン → 表面の光」の順に表示（初回のみ）
const cardsVisible = ref(false)
const list = useInViewOnce(() => (cardsVisible.value = true), { rootMargin: '0px 0px -10% 0px', threshold: 0.15 })
</script>

<template>
  <section id="value" class="value section bg-light has-decor" aria-labelledby="value-title">
    <svg class="bg-wave bg-wave--top value__wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0h1440v60c-260-50-520-40-760 10S240 90 0 40Z" />
    </svg>
    <span class="bg-blob bg-blob--yellow value__blob value__blob--yellow" aria-hidden="true"></span>
    <span class="bg-blob bg-blob--blue value__blob value__blob--blue" aria-hidden="true"></span>

    <div class="value__inner container">
      <SectionHeading id="value-title" :content="content" class="value__heading" />

      <ul ref="list" class="value__list" :class="{ 'is-inview': cardsVisible }">
        <li
          v-for="(item, i) in content.items"
          :key="item.id"
          :class="['value-card', `value-card--0${i + 1}`]"
          :style="{ '--i': i }"
        >
          <div class="value-card__icon">
            <div class="value-card__icon-circle">
              <ValueIcon :type="item.icon" :active="cardsVisible" />
            </div>
          </div>
          <div class="value-card__body">
            <h3 class="value-card__title">{{ item.title }}</h3>
            <span class="value-card__line" aria-hidden="true"></span>
            <p class="value-card__text">{{ item.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.value__wave {
  color: #e8f8fc;
}

.value__blob--yellow {
  top: 20%;
  left: -10%;
  width: 460px;
  aspect-ratio: 1;
}

.value__blob--blue {
  bottom: -10%;
  right: -8%;
  width: 520px;
  aspect-ratio: 1;
}

/* PC：左に見出し、右にカード */
.value__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  align-items: center;
  gap: clamp(32px, 5vw, 80px);
}

.value__heading {
  margin-bottom: 0;
}

.value__list {
  --value-float: -5px; /* アイコンの浮遊量 */
  --value-pulse-opacity: 0.35; /* 外側に広がるリングの濃さ */
  display: grid;
  gap: 20px;
}

/* ---------- カード ---------- */
.value-card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  align-items: center;
  gap: 28px;
  padding: 30px 38px;
  background: var(--value-card-bg);
  border: 1px solid var(--value-border);
  border-radius: 28px;
  box-shadow:
    0 22px 50px rgba(20, 75, 120, 0.08),
    0 8px 18px rgba(20, 75, 120, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  opacity: 0;
  transform: translateY(25px);
  /* opacity・transform は表示アニメーション、translate・影・枠線はホバー用 */
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 180ms),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 180ms),
    translate 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.is-inview .value-card {
  opacity: 1;
  transform: none;
}

/* 半透明のホワイトレイヤー（上部をやわらかく明るく） */
.value-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(170deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 55%);
  pointer-events: none;
}

/* カード表面を斜めに流れる光（表示後に1回だけ） */
.value-card::after {
  content: "";
  position: absolute;
  top: -50%;
  left: 0;
  width: 40%;
  height: 200%;
  background: linear-gradient(105deg, transparent 0%, rgba(255, 255, 255, 0.22) 50%, transparent 100%);
  transform: translateX(-160%) rotate(12deg);
  pointer-events: none;
}

.is-inview .value-card::after {
  animation: value-card-sweep 1.4s ease-in-out calc(1.2s + var(--i) * 180ms) 1 both;
}

/* カードごとの色（variables.css の --value-〇〇-1〜3 で変更できます） */
.value-card--01 {
  --value-card-bg: var(--value-card-bg-1);
  --value-border: var(--value-border-1);
  --value-icon-bg: var(--value-icon-bg-1);
  --value-glow: var(--value-glow-1);
}

.value-card--02 {
  --value-card-bg: var(--value-card-bg-2);
  --value-border: var(--value-border-2);
  --value-icon-bg: var(--value-icon-bg-2);
  --value-glow: var(--value-glow-2);
}

.value-card--03 {
  --value-card-bg: var(--value-card-bg-3);
  --value-border: var(--value-border-3);
  --value-icon-bg: var(--value-icon-bg-3);
  --value-glow: var(--value-glow-3);
}

/* PC：カードを左右に少しずつずらして立体感を出す */
.value-card--01 {
  margin-right: 48px;
}

.value-card--02 {
  margin-left: 48px;
}

.value-card--03 {
  margin-left: 16px;
  margin-right: 32px;
}

/* PCのみ：ホバーで約5px浮き上がり、影と枠線をやわらかく強調 */
@media (hover: hover) and (min-width: 768px) {
  .value-card:hover {
    translate: 0 -5px;
    border-color: rgba(255, 255, 255, 0.95);
    box-shadow:
      0 30px 62px rgba(20, 75, 120, 0.12),
      0 12px 24px rgba(20, 75, 120, 0.06),
      0 0 0 3px color-mix(in srgb, var(--value-glow) 45%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
  }
}

/* ---------- 丸いアイコン ---------- */
/* 外側：表示アニメーション・光・広がるリング */
.value-card__icon {
  position: relative;
  width: 96px;
  height: 96px;
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 0.7s ease calc(0.3s + var(--i) * 180ms),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) calc(0.3s + var(--i) * 180ms);
}

.is-inview .value-card__icon {
  opacity: 1;
  transform: none;
}

/* アイコン周りのやわらかい光 */
.value-card__icon::before {
  content: "";
  position: absolute;
  inset: -18px;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--value-glow) 0%, transparent 68%);
  animation: value-glow 4.5s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.6s);
  pointer-events: none;
}

/* 外側にゆっくり広がる半透明リング */
.value-card__icon::after {
  content: "";
  position: absolute;
  inset: -6px;
  border: 2px solid var(--value-glow);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

.is-inview .value-card__icon::after {
  animation: value-pulse-ring 4.5s ease-out calc(1s + var(--i) * 0.6s) infinite;
}

/* 内側の円：淡いグラデーション＋白いリング＋ごく薄い二重リング。全体がゆっくり浮遊 */
.value-card__icon-circle {
  width: 100%;
  height: 100%;
  padding: 12px;
  background: var(--value-icon-bg);
  border: 4px solid rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  box-shadow:
    0 0 0 7px rgba(255, 255, 255, 0.4),
    0 0 0 8px color-mix(in srgb, var(--value-glow) 40%, transparent),
    0 12px 26px rgba(45, 135, 190, 0.14),
    inset 0 3px 8px rgba(255, 255, 255, 0.9),
    inset 0 -4px 10px rgba(45, 135, 190, 0.08);
}

.is-inview .value-card__icon-circle {
  animation: value-float 4.5s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.6s);
}

/* ---------- テキスト ---------- */
.value-card__title {
  font-size: var(--fs-h3);
  font-weight: 900;
  line-height: 1.5;
}

/* タイトル下のライン：中央から左右へ伸び、その後に淡い光が流れる */
.value-card__line {
  position: relative;
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 10px;
  overflow: hidden;
  background: var(--gradient-accent);
  border-radius: 999px;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.7s ease-out calc(0.6s + var(--i) * 180ms);
}

.value-card__line::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(230, 252, 255, 0.95) 50%, transparent 100%);
  transform: translateX(-100%);
}

.is-inview .value-card__line {
  transform: none;
}

.is-inview .value-card__line::after {
  animation: value-line-sweep 4.5s ease-in-out calc(1.6s + var(--i) * 0.4s) infinite;
}

.value-card__text {
  margin-top: 12px;
  font-size: var(--fs-small);
  line-height: 1.9;
  color: var(--color-text-sub);
}

@media (max-width: 1279px) {
  .value__inner {
    grid-template-columns: 1fr;
  }

  .value-card:nth-child(n) {
    margin-inline: 0;
  }
}

/* スマホ：浮遊・リングは控えめ、影はやわらかく */
@media (max-width: 767px) {
  .value__list {
    --value-float: -3px;
    --value-pulse-opacity: 0.2;
  }

  .value-card {
    grid-template-columns: 64px minmax(0, 1fr);
    align-items: start;
    gap: 16px;
    padding: 22px 20px;
    border-radius: 22px;
    box-shadow:
      0 14px 32px rgba(20, 75, 120, 0.06),
      0 4px 12px rgba(20, 75, 120, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
  }

  .value-card__icon {
    width: 64px;
    height: 64px;
  }

  .value-card__icon::before {
    inset: -12px;
  }

  .value-card__icon-circle {
    padding: 8px;
    border-width: 3px;
    box-shadow:
      0 0 0 5px rgba(255, 255, 255, 0.4),
      0 0 0 6px color-mix(in srgb, var(--value-glow) 40%, transparent),
      0 8px 18px rgba(45, 135, 190, 0.12),
      inset 0 2px 6px rgba(255, 255, 255, 0.9);
  }

  .value-card__title {
    font-size: 1.0625rem;
  }

  .value-card__line {
    transform-origin: left center;
  }

  .value-card__text {
    font-size: 0.8125rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .value-card__icon::before,
  .is-inview .value-card__icon::after,
  .is-inview .value-card__icon-circle,
  .is-inview .value-card__line::after,
  .is-inview .value-card::after {
    animation: none;
  }
}
</style>
