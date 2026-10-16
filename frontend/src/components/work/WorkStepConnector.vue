<script setup>
// 02 WORK：ステップをつなぐドット曲線・流れる光・丸い矢印（装飾）
// アイコンとカードの実際の位置を測って線を描くため、画面幅が変わっても線がずれません
//   PC：アイコン同士を横向きの波線でつなぐ（アイコンの背面を通る）
//   SP：カードの下端から次のアイコンまで、縦向きの波線でつなぐ（カード・文字には重ならない）
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  // true になると線が描かれ、矢印と光のアニメーションが始まる
  active: { type: Boolean, default: false },
})

const root = ref(null)
const size = ref({ w: 0, h: 0 })
const d = ref('')
const arrows = ref([])
const vertical = ref(false)

// 親要素（.work-steps）を基準にした位置。transform（浮遊・表示アニメーション）の影響を受けない offset 値を使う
const box = (el) => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight })

const update = () => {
  const parent = root.value?.parentElement
  if (!parent) return
  const icons = [...parent.querySelectorAll('[data-work-icon]')].map(box)
  const cards = [...parent.querySelectorAll('[data-work-card]')].map(box)
  if (icons.length < 2) return

  size.value = { w: parent.offsetWidth, h: parent.offsetHeight }
  vertical.value = Math.abs(icons[1].x - icons[0].x) < icons[0].w / 2
  const parts = []
  const mids = []

  for (let i = 0; i < icons.length - 1; i++) {
    const a = icons[i]
    const b = icons[i + 1]
    if (vertical.value) {
      // カード下端 → 次のアイコン上端（S字の緩やかな縦波）
      const x = a.x + a.w / 2
      const y1 = cards[i].y + cards[i].h + 6
      const y2 = b.y - 6
      const len = y2 - y1
      const m = { x, y: y1 + len / 2 }
      parts.push(`M${x} ${y1}C${x + 10} ${y1 + len * 0.25} ${x + 10} ${m.y - len * 0.15} ${m.x} ${m.y}S${x - 10} ${y2 - len * 0.25} ${x} ${y2}`)
      mids.push(m)
    } else {
      // アイコン中心 → 次のアイコン中心（中間点に矢印。アイコンに隠れる部分は見えない）
      const p = { x: a.x + a.w / 2, y: a.y + a.h / 2 }
      const q = { x: b.x + b.w / 2, y: b.y + b.h / 2 }
      const dx = q.x - p.x
      const m = { x: p.x + dx / 2, y: p.y + 4 }
      if (!parts.length) parts.push(`M${p.x} ${p.y}`)
      parts.push(
        `C${p.x + dx * 0.25} ${p.y - 16} ${m.x - dx * 0.16} ${m.y - 10} ${m.x} ${m.y}` +
          `C${m.x + dx * 0.16} ${m.y + 10} ${q.x - dx * 0.25} ${q.y + 22} ${q.x} ${q.y}`,
      )
      mids.push(m)
    }
  }
  d.value = parts.join('')
  arrows.value = mids
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
  <div ref="root" class="work-connector" :class="{ 'is-active': active, 'is-vertical': vertical }" aria-hidden="true">
    <svg class="work-connector__svg" :viewBox="`0 0 ${size.w} ${size.h}`" :width="size.w" :height="size.h" focusable="false">
      <defs>
        <linearGradient id="work-connector-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" :x2="size.w" :y2="size.h">
          <stop offset="0%" style="stop-color: var(--work-dot)" />
          <stop offset="100%" style="stop-color: var(--work-dot-light)" />
        </linearGradient>
        <!-- 左から右（上から下）へ線を描いて表示するためのマスク -->
        <mask id="work-connector-mask" maskUnits="userSpaceOnUse" x="0" y="0" :width="size.w" :height="size.h">
          <path class="work-connector__reveal" :d="d" pathLength="1" />
        </mask>
      </defs>
      <g mask="url(#work-connector-mask)">
        <path class="work-connector__halo" :d="d" />
        <path class="work-connector__dots" :d="d" stroke="url(#work-connector-grad)" />
      </g>
    </svg>

    <!-- ステップ間の丸い矢印（装飾・クリック不可） -->
    <span
      v-for="(a, i) in arrows"
      :key="i"
      class="work-connector__arrow"
      :style="{ left: `${a.x}px`, top: `${a.y}px` }"
    >
      <svg viewBox="0 0 24 24" focusable="false"><path d="M9 5l7 7-7 7" /></svg>
    </span>

    <!-- 線に沿って流れる光（CSS の offset-path で線と同じ形をなぞる） -->
    <span v-if="d" class="work-connector__orb" :style="{ offsetPath: `path('${d}')` }"></span>
  </div>
</template>

<style scoped>
.work-connector {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.work-connector__svg {
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
}

.work-connector path {
  fill: none;
  stroke-linecap: round;
}

/* ドット：長さ0の線＋丸い端で小さな丸を並べる */
.work-connector__dots {
  stroke-width: 4;
  stroke-dasharray: 0 10;
}

.work-connector__halo {
  stroke: var(--work-dot-pale);
  stroke-width: 10;
  opacity: 0.35;
}

.work-connector__reveal {
  stroke: #ffffff;
  stroke-width: 30;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.8s cubic-bezier(0.45, 0, 0.2, 1) 0.6s;
}

.is-active .work-connector__reveal {
  stroke-dashoffset: 0;
}

/* 丸い矢印 */
.work-connector__arrow {
  position: absolute;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  color: var(--color-navy);
  background: #ffffff;
  border-radius: 50%;
  box-shadow:
    0 0 0 7px rgba(182, 242, 248, 0.35),
    0 8px 18px rgba(45, 135, 190, 0.14);
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.6s ease 1.4s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 1.4s;
}

.is-active .work-connector__arrow {
  opacity: 1;
  transform: none;
}

.work-connector__arrow svg {
  width: 18px;
  height: 18px;
}

.work-connector__arrow path {
  stroke: currentColor;
  stroke-width: 3;
  stroke-linejoin: round;
}

.is-active .work-connector__arrow svg {
  animation: work-arrow-nudge 2s ease-in-out 2s infinite;
}

.is-vertical .work-connector__arrow svg {
  rotate: 90deg;
}

/* 流れる光 */
.work-connector__orb {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, #f2feff 0%, var(--work-dot-light) 45%, var(--work-dot) 100%);
  box-shadow: 0 0 10px 4px rgba(106, 221, 234, 0.5);
  offset-rotate: 0deg;
  offset-distance: 0%;
  opacity: 0;
}

.is-active .work-connector__orb {
  animation: work-orb-flow 8s linear 2.6s infinite;
}

.is-vertical.is-active .work-connector__orb {
  animation-duration: 6s;
}

@media (prefers-reduced-motion: reduce) {
  .work-connector__orb {
    display: none;
  }

  .is-active .work-connector__arrow svg {
    animation: none;
  }
}
</style>
