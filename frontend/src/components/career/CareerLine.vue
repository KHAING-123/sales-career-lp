<script setup>
// 04 CAREER：カードの上を通るキャリア成長ライン（装飾）
// カードの実際の位置を測って線を描くため、画面幅が変わっても線・チェックポイントがずれません
//   PC：左から右へ上昇する曲線（各カード上端の中央にチェックポイント、最後は右上への矢印）
//   SP：カード左側を上から下へ通る縦のライン
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  // true になると線が描かれ、光とチェックポイントのアニメーションが始まる
  active: { type: Boolean, default: false },
})

// アニメーションのタイミング（秒）。CSS の値と合わせています
const DRAW_DELAY = 0.3
const DRAW_DURATION = 2.4
const LIGHT_START = DRAW_DELAY + DRAW_DURATION + 0.2
const LIGHT_CYCLE = 7 // 光1周の時間
const LIGHT_MOVE = 0.8 // 1周のうち移動している割合（残りは待機）

const root = ref(null)
const measure = ref(null)
const size = ref({ w: 0, h: 0 })
const d = ref('')
const points = ref([])
const arrow = ref(null)
const vertical = ref(false)

const box = (el) => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight })

// 点の列をなめらかな曲線に変換（各チェックポイントでは水平に通り、点と点の間でS字に上昇する）
// 最後の区間だけは右上へ向かう矢印になるよう、終点に向かってまっすぐ伸ばす
const smooth = (pts) =>
  pts.slice(1).map((p2, i) => {
    const p1 = pts[i]
    const dx = p2.x - p1.x
    const isLast = i === pts.length - 2
    const c1 = { x: p1.x + dx * 0.5, y: p1.y }
    const c2 = isLast ? { x: p2.x - dx * 0.35, y: p2.y + (p1.y - p2.y) * 0.25 } : { x: p2.x - dx * 0.5, y: p2.y }
    return { str: `C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`, c2, end: p2 }
  })

const update = async () => {
  const parent = root.value?.parentElement
  if (!parent) return
  const cards = [...parent.querySelectorAll('[data-career-card]')].map(box)
  if (cards.length < 2) return

  size.value = { w: parent.offsetWidth, h: parent.offsetHeight }
  vertical.value = Math.abs(cards[1].x - cards[0].x) < cards[0].w / 2

  let checkpoints
  let pts
  if (vertical.value) {
    const x = Math.max(10, cards[0].x - 22)
    checkpoints = cards.map((c) => ({ x, y: c.y + 30 }))
    const last = checkpoints[checkpoints.length - 1]
    pts = [{ x, y: checkpoints[0].y - 24 }, ...checkpoints, { x, y: last.y + 70 }]
  } else {
    checkpoints = cards.map((c) => ({ x: c.x + c.w / 2, y: c.y }))
    const first = checkpoints[0]
    const lastCard = cards[cards.length - 1]
    const lastPoint = checkpoints[checkpoints.length - 1]
    pts = [{ x: 0, y: first.y + 6 }, ...checkpoints, { x: lastCard.x + lastCard.w - 8, y: lastPoint.y - 64 }]
  }

  const segs = vertical.value
    ? pts.slice(1).map((p) => ({ str: `L${p.x} ${p.y}`, c2: pts[0], end: p }))
    : smooth(pts)
  const start = `M${pts[0].x} ${pts[0].y}`
  d.value = start + segs.map((s) => s.str).join('')

  // 矢印の向き：最後の区間の接線方向
  const lastSeg = segs[segs.length - 1]
  const from = vertical.value ? pts[pts.length - 2] : lastSeg.c2
  const end = lastSeg.end
  arrow.value = { x: end.x, y: end.y, angle: (Math.atan2(end.y - from.y, end.x - from.x) * 180) / Math.PI }

  // 各チェックポイントまでの長さの割合 → 光が通過する時刻に合わせて円を拡大させる
  await nextTick()
  const el = measure.value
  el.setAttribute('d', d.value)
  const total = el.getTotalLength()
  points.value = checkpoints.map((p, i) => {
    el.setAttribute('d', start + segs.slice(0, i + 1).map((s) => s.str).join(''))
    const ratio = el.getTotalLength() / total
    return {
      ...p,
      appear: `${(DRAW_DELAY + ratio * DRAW_DURATION).toFixed(2)}s`, // 線がここまで描かれたら表示
      delay: `${(LIGHT_START + ratio * LIGHT_MOVE * LIGHT_CYCLE).toFixed(2)}s`, // 光が通過する時刻
    }
  })
}

let observer = null
onMounted(() => {
  update()
  observer = new ResizeObserver(update)
  observer.observe(root.value.parentElement)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    ref="root"
    class="career-line"
    :class="{ 'is-active': active, 'is-vertical': vertical }"
    :style="{ '--light-start': `${LIGHT_START}s`, '--light-cycle': `${LIGHT_CYCLE}s` }"
    aria-hidden="true"
  >
    <svg class="career-line__svg" :viewBox="`0 0 ${size.w} ${size.h}`" :width="size.w" :height="size.h" focusable="false">
      <defs>
        <linearGradient
          id="career-line-grad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          :x2="vertical ? 0 : size.w"
          :y2="vertical ? size.h : 0"
        >
          <stop offset="0%" style="stop-color: var(--color-step-1)" />
          <stop offset="38%" style="stop-color: var(--color-step-2)" />
          <stop offset="66%" style="stop-color: var(--color-step-3)" />
          <stop offset="100%" style="stop-color: var(--color-step-4)" />
        </linearGradient>
      </defs>
      <!-- 長さ計測用（非表示） -->
      <path ref="measure" class="career-line__measure" />
      <path class="career-line__halo" :d="d" pathLength="1" />
      <path class="career-line__path" :d="d" pathLength="1" stroke="url(#career-line-grad)" />
      <path
        v-if="arrow"
        class="career-line__arrow"
        :transform="`translate(${arrow.x} ${arrow.y}) rotate(${arrow.angle})`"
        d="M-12 -8L2 0L-12 8"
        stroke="url(#career-line-grad)"
      />
    </svg>

    <!-- チェックポイント（光が通過すると軽く拡大し、淡いリングが広がる） -->
    <span
      v-for="(p, i) in points"
      :key="i"
      class="career-line__point"
      :style="{ left: `${p.x}px`, top: `${p.y}px`, '--point-color': `var(--color-step-${i + 1})`, '--pulse-delay': p.delay, '--appear-delay': p.appear }"
    ></span>

    <!-- ラインに沿って移動する光 -->
    <span v-if="d" class="career-line__light" :style="{ offsetPath: `path('${d}')` }"></span>
  </div>
</template>

<style scoped>
.career-line {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.career-line__svg {
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
}

.career-line path {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.career-line__measure {
  visibility: hidden;
}

/* 線：左から右（SPは上から下）へ描かれる */
.career-line__path,
.career-line__halo {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 2.4s cubic-bezier(0.45, 0, 0.2, 1) 0.3s;
}

.career-line__path {
  stroke-width: 3.5;
}

.career-line__halo {
  stroke: var(--career-line-halo);
  stroke-width: 12;
  opacity: 0.5;
}

.career-line__arrow {
  stroke-width: 3.5;
  opacity: 0;
  transition: opacity 0.5s ease 2.5s;
}

.is-active .career-line__path,
.is-active .career-line__halo {
  stroke-dashoffset: 0;
}

.is-active .career-line__arrow {
  opacity: 1;
}

/* チェックポイント */
.career-line__point {
  position: absolute;
  width: 22px;
  height: 22px;
  margin: -11px 0 0 -11px;
  background: #ffffff;
  border: 5px solid var(--point-color);
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(45, 135, 190, 0.18);
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.career-line__point::after {
  content: "";
  position: absolute;
  inset: -5px;
  border: 2px solid var(--point-color);
  border-radius: 50%;
  opacity: 0;
}

.is-active .career-line__point {
  opacity: 1;
  transform: none;
  transition-delay: var(--appear-delay);
  animation: career-point-pulse var(--light-cycle) ease-out var(--pulse-delay) infinite;
}

.is-active .career-line__point::after {
  animation: career-point-ring var(--light-cycle) ease-out var(--pulse-delay) infinite;
}

/* 移動する光 */
.career-line__light {
  position: absolute;
  top: 0;
  left: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, #ffffff 0%, #8fe2ff 45%, var(--color-step-2) 100%);
  box-shadow: 0 0 10px 4px rgba(63, 156, 240, 0.35);
  offset-rotate: 0deg;
  opacity: 0;
}

.is-active .career-line__light {
  animation: career-light-flow var(--light-cycle) linear var(--light-start) infinite;
}

/* SP：光とリングを控えめに */
.is-vertical .career-line__light {
  width: 7px;
  height: 7px;
}

.is-vertical .career-line__point {
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border-width: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .career-line__light {
    display: none;
  }

  .is-active .career-line__point,
  .is-active .career-line__point::after {
    animation: none;
  }
}
</style>
