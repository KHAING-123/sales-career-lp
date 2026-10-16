<script setup>
// 説明文：画面に入ったら左から1文字ずつ表示（初回のみ）
// 文章は props で受け取ります（lpContent.js の文章をそのまま表示）
import { computed, ref } from 'vue'
import { splitText, toChars, useInViewOnce } from '../../composables/useSplitText.js'

const props = defineProps({
  text: { type: String, required: true },
  // この時刻（performance.now() の値）より前には開始しない。見出しのアニメーションと順番をそろえるために使用
  startAt: { type: Number, default: null },
})

// 1文字ごとの遅延は 30〜45ms。長い文章でも全体が約3秒に収まるよう調整
const MAX_TOTAL = 3
const step = computed(() => Math.min(0.045, Math.max(0.03, MAX_TOTAL / Math.max(1, toChars(props.text).length))))

const startDelay = ref(0)
const inView = ref(false)
const target = useInViewOnce(() => {
  startDelay.value = props.startAt ? Math.max(0, (props.startAt - performance.now()) / 1000) : 0
  inView.value = true
})

const lines = computed(() => splitText(props.text, startDelay.value, step.value))
</script>

<template>
  <p ref="target" :class="{ 'is-revealed': inView }">
    <!-- 読み上げ用の文章（画面には表示しない） -->
    <span class="visually-hidden">{{ text }}</span>
    <!-- 画面表示用（1文字ずつ表示。読み上げは上の文章のみ） -->
    <span aria-hidden="true">
      <template v-for="(line, l) in lines" :key="l">
        <br v-if="l > 0" />
        <span v-for="(group, g) in line" :key="g" class="split-group">
          <span v-for="(c, k) in group" :key="k" class="split-char split-char--soft" :style="{ '--char-delay': c.delay }">{{ c.char }}</span>
        </span>
      </template>
    </span>
  </p>
</template>
