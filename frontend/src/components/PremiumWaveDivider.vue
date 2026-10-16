<script setup>
// Hero と 01 PEOPLE の間の波型ライン（装飾）。青い丸がラインに沿って左から右へ移動する
// 色は variables.css の --wave-〇〇 で変更できます
const waves = [
  // PC・タブレット用（緩やかで大きな波）。move：丸の移動時間（秒）、rest：右端で消えてから再出発までの間隔（秒）
  { key: 'pc', viewBox: '0 0 1440 130', d: 'M-20 64C220 18 520 22 800 62S1240 104 1460 46', orb: 8, move: 8, rest: 2 },
  // スマホ用（画面幅に合わせた小さめの波）
  { key: 'sp', viewBox: '0 0 390 70', d: 'M-8 36C70 12 160 14 230 34S340 56 398 26', orb: 6, move: 6, rest: 1.5 },
].map((w) => {
  const dur = w.move + w.rest
  const end = w.move / dur // 1周のうち移動している割合
  return {
    ...w,
    dur: `${dur}s`,
    // 移動中は一定速度で 0→1（パスの長さに対する位置）、残りの時間は右端で待機
    keyTimes: `0;${end.toFixed(3)};1`,
    // 左端でふわっと現れ、右端の手前で柔らかく消える
    fadeTimes: `0;${(end * 0.08).toFixed(3)};${(end * 0.92).toFixed(3)};${end.toFixed(3)};1`,
  }
})
</script>

<template>
  <div class="wave-divider" aria-hidden="true">
    <svg
      v-for="wave in waves"
      :key="wave.key"
      :class="['wave-divider__svg', `wave-divider__svg--${wave.key}`]"
      :viewBox="wave.viewBox"
      focusable="false"
    >
      <defs>
        <linearGradient :id="`wave-line-${wave.key}`" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" style="stop-color: var(--wave-main)" />
          <stop offset="50%" style="stop-color: var(--wave-sub)" />
          <stop offset="100%" style="stop-color: var(--wave-main)" />
        </linearGradient>
        <!-- 丸：中央が明るいシアン → 外側がターコイズ -->
        <radialGradient :id="`wave-orb-${wave.key}`" cx="40%" cy="38%" r="65%">
          <stop offset="0%" style="stop-color: var(--orb-center)" />
          <stop offset="100%" style="stop-color: var(--orb-main)" />
        </radialGradient>
        <!-- 外側のグロー（ぼかしフィルターを使わず軽量に） -->
        <radialGradient :id="`wave-orb-glow-${wave.key}`">
          <stop offset="35%" style="stop-color: var(--orb-glow); stop-opacity: 0.8" />
          <stop offset="100%" style="stop-color: var(--orb-glow); stop-opacity: 0" />
        </radialGradient>
      </defs>

      <!-- ライン本体（丸と同じ path を参照） -->
      <path :id="`wave-path-${wave.key}`" class="wave-divider__line" :d="wave.d" :stroke="`url(#wave-line-${wave.key})`" />
      <!-- ラインの中央に入る柔らかいハイライト -->
      <path class="wave-divider__sheen" :d="wave.d" />

      <!-- ラインに沿って移動する青い丸 -->
      <g class="wave-divider__orb" opacity="0">
        <circle :r="wave.orb * 2" :fill="`url(#wave-orb-glow-${wave.key})`" />
        <circle :r="wave.orb" :fill="`url(#wave-orb-${wave.key})`" />
        <circle :cx="wave.orb * -0.32" :cy="wave.orb * -0.34" :r="wave.orb * 0.28" fill="#ffffff" opacity="0.75" />
        <animateMotion
          :dur="wave.dur"
          repeatCount="indefinite"
          calcMode="linear"
          keyPoints="0;1;1"
          :keyTimes="wave.keyTimes"
        >
          <mpath :href="`#wave-path-${wave.key}`" :xlink:href="`#wave-path-${wave.key}`" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0;0" :keyTimes="wave.fadeTimes" :dur="wave.dur" repeatCount="indefinite" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* Hero下端のなじませ帯の上に重ねて配置（Hero画像には重ならない） */
.wave-divider {
  position: relative;
  z-index: 1;
  margin-top: calc(var(--hero-bottom-fade-height) * -1);
  pointer-events: none;
}

.wave-divider__svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.wave-divider__svg--sp {
  display: none;
}

.wave-divider path {
  fill: none;
  stroke-linecap: round;
}

.wave-divider__line {
  stroke-width: 22;
}

.wave-divider__sheen {
  stroke: var(--wave-highlight);
  stroke-width: 10;
  opacity: 0.5;
}

/* スマホ：小さめの波・ライン */
@media (max-width: 767px) {
  .wave-divider__svg--pc {
    display: none;
  }

  .wave-divider__svg--sp {
    display: block;
  }

  .wave-divider__line {
    stroke-width: 14;
  }

  .wave-divider__sheen {
    stroke-width: 6;
  }
}

/* 動きを減らす設定：丸は表示せず、ラインのみ表示 */
@media (prefers-reduced-motion: reduce) {
  .wave-divider__orb {
    display: none;
  }
}
</style>
