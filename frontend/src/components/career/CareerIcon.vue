<script setup>
// 04 CAREER：カードの丸いアイコン（淡い円形の背景＋アニメーションするSVG）
// type は lpContent.js の career.items[].icon で指定します（sprout / person / chart / rocket）
defineProps({
  type: { type: String, required: true },
  // true になるとアイコン内のアニメーションが始まる（カード表示後）
  active: { type: Boolean, default: false },
})
</script>

<template>
  <div class="career-icon" :class="[`career-icon--${type}`, { 'is-active': active }]" aria-hidden="true">
    <svg class="career-icon__svg" viewBox="0 0 64 64" focusable="false">
      <defs>
        <linearGradient :id="`career-icon-grad-${type}`" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" style="stop-color: var(--career-icon-blue)" />
          <stop offset="100%" style="stop-color: var(--career-icon-cyan)" />
        </linearGradient>
      </defs>

      <!-- 1年目：芽（ゆっくり伸びて、葉が揺れる） -->
      <template v-if="type === 'sprout'">
        <path class="career-icon__stroke" d="M19 52h26" />
        <g class="career-icon__grow">
          <path class="career-icon__stroke" d="M32 52V30" />
          <path class="career-icon__leaf career-icon__leaf--left" :fill="`url(#career-icon-grad-${type})`" d="M32 36c-10 0-16-6-16-14 9 0 16 5 16 14Z" />
          <path class="career-icon__leaf career-icon__leaf--right" :fill="`url(#career-icon-grad-${type})`" d="M32 32c0-9 6-15 16-15 0 10-6 15-16 15Z" />
        </g>
        <path class="career-icon__sparkle" d="M50 8l-2 5M56 14l-5 2M55 6l-3 3" />
      </template>

      <!-- 2年目：人物＋アイデア（ラインが順番に点灯し、小さな光が現れる） -->
      <template v-else-if="type === 'person'">
        <circle class="career-icon__stroke career-icon__fill" cx="28" cy="24" r="8" />
        <path class="career-icon__stroke career-icon__fill" d="M13 50c0-9 7-15 15-15s15 6 15 15Z" />
        <path class="career-icon__idea" d="M45 13l3-5" />
        <path class="career-icon__idea" style="animation-delay: 0.25s" d="M49 19l6-2" />
        <path class="career-icon__idea" style="animation-delay: 0.5s" d="M41 10V4" />
        <path class="career-icon__star" d="M48 30l1.4 3.6L53 35l-3.6 1.4L48 40l-1.4-3.6L43 35l3.6-1.4Z" />
      </template>

      <!-- 3年目：成長グラフ（棒が下から伸び、光が右上へ移動） -->
      <template v-else-if="type === 'chart'">
        <path class="career-icon__stroke" d="M13 50h38" />
        <rect class="career-icon__bar" :fill="`url(#career-icon-grad-${type})`" x="18" y="36" width="7" height="14" rx="1.5" />
        <rect class="career-icon__bar" :fill="`url(#career-icon-grad-${type})`" x="29" y="28" width="7" height="22" rx="1.5" />
        <rect class="career-icon__bar" :fill="`url(#career-icon-grad-${type})`" x="40" y="18" width="7" height="32" rx="1.5" />
        <circle class="career-icon__spark-dot" cx="21.5" cy="32" r="2.4" />
        <path class="career-icon__sparkle" d="M52 8l-2 5M58 14l-5 2" />
      </template>

      <!-- 5年目：ロケット（上下に浮遊し、炎が柔らかく点滅） -->
      <template v-else-if="type === 'rocket'">
        <g class="career-icon__rocket">
          <path class="career-icon__flame" d="M22 42c-5 2-7 6-8 10 4-1 8-3 10-8Z" />
          <path class="career-icon__stroke career-icon__fill" d="M24 32l-7 1-3 7 8-2M32 40l-1 7-7 3 2-8" />
          <path class="career-icon__stroke career-icon__fill" d="M47 13c-9 1-18 8-23 19l8 8c11-5 18-14 19-23 0-2-2-4-4-4Z" />
          <circle class="career-icon__window" cx="40" cy="24" r="4" />
        </g>
        <path class="career-icon__sparkle" d="M52 30l-1 4M57 36l-4 1" />
      </template>
    </svg>
  </div>
</template>

<style scoped>
.career-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--career-icon-size);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--career-icon-bg);
  box-shadow:
    0 12px 26px rgba(45, 135, 190, 0.12),
    0 3px 8px rgba(45, 135, 190, 0.06),
    inset 0 2px 6px rgba(255, 255, 255, 0.9);
}

.career-icon__svg {
  width: 72%;
  overflow: visible;
}

.career-icon svg * {
  stroke-linecap: round;
  stroke-linejoin: round;
}

.career-icon__stroke {
  fill: none;
  stroke: var(--color-navy);
  stroke-width: 3;
}

.career-icon__fill {
  fill: #e4f3ff;
}

.career-icon__leaf {
  stroke: var(--color-navy);
  stroke-width: 2;
}

.career-icon__sparkle {
  fill: none;
  stroke: var(--career-icon-yellow);
  stroke-width: 3;
  transform-box: fill-box;
  transform-origin: center;
}

.career-icon__idea {
  fill: none;
  stroke: var(--career-icon-cyan);
  stroke-width: 3;
}

.career-icon__star {
  fill: var(--career-icon-yellow);
  transform-box: fill-box;
  transform-origin: center;
}

.career-icon__bar {
  transform-box: fill-box;
  transform-origin: center bottom;
}

.career-icon__spark-dot {
  fill: #ffffff;
  stroke: var(--career-icon-cyan);
  stroke-width: 1.5;
  opacity: 0;
}

.career-icon__window {
  fill: #ffffff;
  stroke: var(--career-icon-blue);
  stroke-width: 2.5;
}

.career-icon__flame {
  fill: var(--career-icon-yellow);
  transform-box: fill-box;
  transform-origin: 80% 20%;
}

.career-icon__grow {
  transform-box: view-box;
  transform-origin: 32px 52px;
}

.career-icon__leaf--left {
  transform-box: view-box;
  transform-origin: 32px 36px;
}

.career-icon__leaf--right {
  transform-box: view-box;
  transform-origin: 32px 32px;
}

/* ---------- アニメーション（キーフレームは animations.css） ---------- */
.is-active .career-icon__grow {
  animation: career-sprout-grow 4s ease-in-out infinite;
}

.is-active .career-icon__leaf--left {
  animation: career-leaf-sway 3s ease-in-out infinite;
}

.is-active .career-icon__leaf--right {
  animation: career-leaf-sway 3s ease-in-out 0.4s infinite reverse;
}

.is-active .career-icon__sparkle {
  animation: career-twinkle 3.2s ease-in-out infinite;
}

.is-active .career-icon__idea {
  animation: career-idea 2.4s ease-in-out infinite;
}

.is-active .career-icon__star {
  animation: career-twinkle 3s ease-in-out 0.6s infinite;
}

.is-active .career-icon__bar {
  animation: career-bar-grow 4.5s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

.is-active .career-icon__bar:nth-of-type(2) { animation-delay: 0.15s; }
.is-active .career-icon__bar:nth-of-type(3) { animation-delay: 0.3s; }

.is-active .career-icon__spark-dot {
  animation: career-chart-light 4.5s ease-in-out infinite;
}

.is-active .career-icon__rocket {
  animation: career-rocket-float 3.6s ease-in-out infinite;
}

.is-active .career-icon__flame {
  animation: career-flame 1.2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .career-icon * {
    animation: none !important;
  }
}
</style>
