<script setup>
// 03 VALUE：カードの丸いアイコン内のSVG（これまでのアイコンと同じデザインをパーツごとに動かせるよう描いたもの）
// type は lpContent.js の value.items[].icon で指定します（globe / factory / people）
defineProps({
  type: { type: String, required: true },
  // true になるとアイコン固有のアニメーションが始まる（カード表示後）
  active: { type: Boolean, default: false },
})
</script>

<template>
  <svg class="value-icon" :class="{ 'is-active': active }" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <!-- Card 01：地球（左右にわずかに揺れ、周りの光が点灯・消灯） -->
    <template v-if="type === 'globe'">
      <g class="value-icon__globe">
        <circle class="value-icon__line value-icon__fill" cx="30" cy="34" r="18" />
        <ellipse class="value-icon__line" cx="30" cy="34" rx="8" ry="18" />
        <path class="value-icon__line" d="M12 34h36" />
      </g>
      <path class="value-icon__sparkle" d="M50 10l1.6 4.2L56 16l-4.4 1.8L50 22l-1.6-4.2L44 16l4.4-1.8Z" />
      <path class="value-icon__sparkle value-icon__sparkle--small" d="M55 26l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9Z" />
    </template>

    <!-- Card 02：工場（窓が左から順番に点灯） -->
    <template v-else-if="type === 'factory'">
      <rect class="value-icon__chimney" x="40" y="12" width="6" height="18" rx="1" />
      <path class="value-icon__line value-icon__fill" d="M10 52V32l12-8v8l12-8v8l12-8v28Z" />
      <rect class="value-icon__window" x="15" y="41" width="7" height="3.6" rx="1.8" />
      <rect class="value-icon__window" style="animation-delay: 0.4s" x="26" y="41" width="7" height="3.6" rx="1.8" />
      <rect class="value-icon__window" style="animation-delay: 0.8s" x="37" y="41" width="7" height="3.6" rx="1.8" />
    </template>

    <!-- Card 03：人物（2人が順番に柔らかく表示され、間の光が点灯・消灯） -->
    <template v-else-if="type === 'people'">
      <g class="value-icon__person">
        <circle class="value-icon__line value-icon__head--warm" cx="23" cy="24" r="6.5" />
        <path class="value-icon__line" d="M11 50c0-9 5-15 12-15s12 6 12 15" />
      </g>
      <g class="value-icon__person" style="animation-delay: 0.6s">
        <circle class="value-icon__line value-icon__fill" cx="42" cy="27" r="5.5" />
        <path class="value-icon__line" d="M33 50c1-8 4-12 9-12s9 4 10 12" />
      </g>
      <path class="value-icon__link" d="M33 16l1.3 3.2 3.2 1.3-3.2 1.3L33 25l-1.3-3.2-3.2-1.3 3.2-1.3Z" />
    </template>
  </svg>
</template>

<style scoped>
.value-icon {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.value-icon * {
  stroke-linecap: round;
  stroke-linejoin: round;
}

.value-icon__line {
  fill: none;
  stroke: var(--color-navy);
  stroke-width: 3.5;
}

.value-icon__fill {
  fill: #e4f3ff;
}

.value-icon__head--warm {
  fill: var(--color-yellow-light);
}

.value-icon__chimney {
  fill: var(--color-turquoise);
  stroke: var(--color-navy);
  stroke-width: 3;
}

.value-icon__window {
  fill: var(--color-navy);
}

.value-icon__sparkle,
.value-icon__link {
  fill: var(--color-yellow);
  transform-box: fill-box;
  transform-origin: center;
}

.value-icon__globe {
  transform-box: fill-box;
  transform-origin: center;
}

.value-icon__person {
  transform-box: fill-box;
  transform-origin: center bottom;
}

/* ---------- アニメーション（キーフレームは animations.css） ---------- */
.is-active .value-icon__globe {
  animation: value-globe-sway 5s ease-in-out infinite;
}

.is-active .value-icon__sparkle {
  animation: value-twinkle 3.5s ease-in-out infinite;
}

.is-active .value-icon__sparkle--small {
  animation-delay: 1.2s;
}

.is-active .value-icon__window {
  animation: value-window-light 5.5s ease-in-out infinite;
}

.is-active .value-icon__person {
  animation: value-person-appear 4.5s ease-in-out infinite;
}

.is-active .value-icon__link {
  animation: value-twinkle 4.5s ease-in-out 1.2s infinite;
}

@media (prefers-reduced-motion: reduce) {
  .value-icon * {
    animation: none !important;
  }
}
</style>
