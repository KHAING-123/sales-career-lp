<script setup>
// 02 WORK：ステップの丸いアイコン（白いリング＋淡い光＋アニメーションするSVG）
// type は lpContent.js の work.items[].icon で指定します（chat / document / cycle）
// 別のアイコンにしたい場合は、下の <template v-else-if> を追加してください
defineProps({
  type: { type: String, required: true },
  // true になると中のアイコンのアニメーションが始まる（セクションが画面に入ったとき）
  active: { type: Boolean, default: false },
})
</script>

<template>
  <div class="work-icon" :class="[`work-icon--${type}`, { 'is-active': active }]" aria-hidden="true">
    <span class="work-icon__glow work-icon__glow--main"></span>
    <span class="work-icon__glow work-icon__glow--sub"></span>
    <span class="work-icon__ring"></span>

    <svg class="work-icon__svg" viewBox="0 0 100 100" focusable="false">
      <defs>
        <linearGradient :id="`work-icon-grad-${type}`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style="stop-color: var(--work-icon-blue)" />
          <stop offset="100%" style="stop-color: var(--work-icon-cyan)" />
        </linearGradient>
      </defs>

      <!-- STEP 1：チャット（吹き出しの中の3つの点が順番に上下） -->
      <template v-if="type === 'chat'">
        <path class="work-icon__back" d="M48 44h34a8 8 0 0 1 8 8v18a8 8 0 0 1-8 8h-4v8l-9-8H48a8 8 0 0 1-8-8V52a8 8 0 0 1 8-8Z" />
        <path
          class="work-icon__line"
          :stroke="`url(#work-icon-grad-${type})`"
          d="M20 22h44a9 9 0 0 1 9 9v24a9 9 0 0 1-9 9H36l-12 10v-10h-4a9 9 0 0 1-9-9V31a9 9 0 0 1 9-9Z"
        />
        <circle class="work-icon__chat-dot" cx="30" cy="43" r="3.8" />
        <circle class="work-icon__chat-dot" cx="42" cy="43" r="3.8" />
        <circle class="work-icon__chat-dot" cx="54" cy="43" r="3.8" />
        <g class="work-icon__sparkle">
          <path d="M80 10l-4 9M89 18l-8 5M91 30l-9-1" />
        </g>
      </template>

      <!-- STEP 2：書類＋チェック（行が上から現れ、チェックが描かれ、黄色の丸が弾む） -->
      <template v-else-if="type === 'document'">
        <rect class="work-icon__line" :stroke="`url(#work-icon-grad-${type})`" x="20" y="12" width="48" height="64" rx="8" />
        <path class="work-icon__doc-line" d="M31 30h26" pathLength="1" />
        <path class="work-icon__doc-line" d="M31 42h26" pathLength="1" />
        <path class="work-icon__doc-line" d="M31 54h16" pathLength="1" />
        <g class="work-icon__badge">
          <circle cx="67" cy="72" r="15" />
          <path class="work-icon__check" d="M60 72.5l5 5 9.5-10" pathLength="1" />
        </g>
        <g class="work-icon__sparkle work-icon__sparkle--cyan">
          <path d="M80 12l-4 8M89 21l-8 4" />
        </g>
      </template>

      <!-- STEP 3：循環矢印（ゆっくり回転・中央の丸は固定） -->
      <template v-else-if="type === 'cycle'">
        <g class="work-icon__spin">
          <path class="work-icon__line" :stroke="`url(#work-icon-grad-${type})`" d="M24 46a26 26 0 0 1 44-15" />
          <path class="work-icon__line" :stroke="`url(#work-icon-grad-${type})`" d="M70 22l-1 10-10-1" />
          <path class="work-icon__line" :stroke="`url(#work-icon-grad-${type})`" d="M76 54a26 26 0 0 1-44 15" />
          <path class="work-icon__line" :stroke="`url(#work-icon-grad-${type})`" d="M30 78l1-10 10 1" />
        </g>
        <circle class="work-icon__core" cx="50" cy="50" r="10" />
        <g class="work-icon__sparkle work-icon__sparkle--occasional">
          <path d="M80 12l-4 8M89 21l-8 4" />
        </g>
      </template>
    </svg>
  </div>
</template>

<style scoped>
/* 円の大きさは親（WorkSection）の --work-icon-size で指定 */
.work-icon {
  position: relative;
  width: var(--work-icon-size);
  aspect-ratio: 1;
}

/* 背景の淡い光（ステップごとの色＋淡いブルー） */
.work-icon__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(14px);
  pointer-events: none;
}

.work-icon__glow--main {
  inset: -10% -18% 2% 8%;
  background: radial-gradient(circle at 60% 45%, var(--work-step-glow) 0%, transparent 70%);
  opacity: 0.95;
}

.work-icon__glow--sub {
  inset: 6% 18% -8% -16%;
  background: radial-gradient(circle at 40% 55%, var(--work-glow-blue) 0%, transparent 70%);
  opacity: 0.8;
}

/* 白いリング＋内側の淡い水色グラデーション */
.work-icon__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  /* 内側：ステップごとの色（variables.css の --work-icon-bg-1〜3）／外側：白いリング */
  background:
    var(--work-icon-bg, radial-gradient(circle at 38% 30%, #ffffff 0%, #f3fbff 55%, #e3f5fc 100%)) padding-box,
    #ffffff border-box;
  border: calc(var(--work-icon-size) * 0.055) solid transparent;
  box-shadow:
    0 18px 40px rgba(45, 135, 190, 0.12),
    0 5px 15px rgba(45, 135, 190, 0.06),
    inset 0 2px 8px rgba(255, 255, 255, 0.9);
}

.work-icon__ring::after {
  content: "";
  position: absolute;
  inset: 6%;
  border: 1px solid rgba(182, 231, 245, 0.6);
  border-radius: 50%;
}

.work-icon__svg {
  position: absolute;
  inset: 22%;
  overflow: visible;
}

.work-icon__svg path,
.work-icon__svg rect {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.work-icon__line {
  stroke-width: 5;
  fill: #ffffff !important;
}

.work-icon__spin .work-icon__line {
  fill: none !important;
  stroke-width: 6.5;
}

.work-icon__back {
  fill: #cfeefc !important;
  stroke: none;
}

.work-icon__chat-dot {
  fill: var(--work-icon-blue);
  transform-box: fill-box;
  transform-origin: center;
}

.work-icon__sparkle path {
  stroke: var(--work-icon-yellow);
  stroke-width: 4;
}

.work-icon__sparkle--cyan path {
  stroke: var(--work-icon-cyan);
}

.work-icon__sparkle {
  transform-box: fill-box;
  transform-origin: center;
}

.work-icon__doc-line {
  stroke: var(--work-icon-blue);
  stroke-width: 5;
  stroke-dasharray: 1;
}

.work-icon__badge {
  transform-box: fill-box;
  transform-origin: center;
}

.work-icon__badge circle {
  fill: var(--work-icon-yellow);
  stroke: #2f6fe4;
  stroke-width: 3;
}

.work-icon__check {
  stroke: #ffffff !important;
  stroke-width: 4.5;
  stroke-dasharray: 1;
}

.work-icon__spin {
  transform-box: view-box;
  transform-origin: 50% 50%;
}

.work-icon__core {
  fill: #7fe3f0;
}

/* ---------- アイコン内部のアニメーション（キーフレームは animations.css） ---------- */
.is-active .work-icon__chat-dot {
  animation: work-chat-dot 1.5s ease-in-out infinite;
}

.is-active .work-icon__chat-dot:nth-of-type(2) { animation-delay: 0.18s; }
.is-active .work-icon__chat-dot:nth-of-type(3) { animation-delay: 0.36s; }

.is-active .work-icon__sparkle {
  animation: work-sparkle 3s ease-in-out infinite;
}

.is-active .work-icon__doc-line {
  animation: work-doc-line 4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

.is-active .work-icon__doc-line:nth-of-type(2) { animation-delay: 0.2s; }
.is-active .work-icon__doc-line:nth-of-type(3) { animation-delay: 0.4s; }

.is-active .work-icon__check {
  animation: work-doc-check 4s ease-out infinite;
}

.is-active .work-icon__badge {
  animation: work-doc-badge 4s ease-out infinite;
}

.is-active .work-icon__spin {
  animation: work-cycle-spin 11s linear infinite;
}

.is-active .work-icon__sparkle--occasional {
  animation: work-sparkle-occasional 5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .work-icon * {
    animation: none !important;
  }
}
</style>
