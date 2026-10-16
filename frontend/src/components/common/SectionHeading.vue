<script setup>
// セクション見出し（番号・英字ラベル・タイトル・説明文）
// 画面に入ったら「番号 → 英字ラベル → タイトル → 説明文」の順に1文字ずつ表示（初回のみ）
import { computed, ref } from 'vue'
import AnimatedParagraph from './AnimatedParagraph.vue'
import { splitText, toChars, useInViewOnce } from '../../composables/useSplitText.js'

const props = defineProps({
  id: { type: String, required: true },
  content: { type: Object, required: true },
  center: { type: Boolean, default: false },
})

// 表示タイミング（秒）
const LABEL_START = 0.2
const LABEL_STEP = 0.08
const TITLE_GAP = 0.15
const TITLE_STEP = 0.1
const DESC_AFTER_TITLE = 0.4 // タイトル開始からこの秒数後に説明文を開始（タイトル完了は待たない）

const label = computed(() => splitText(props.content.label, LABEL_START, LABEL_STEP)[0])
const titleStart = computed(() => LABEL_START + toChars(props.content.label).length * LABEL_STEP + TITLE_GAP)
const titleLines = computed(() => splitText(props.content.title, titleStart.value, TITLE_STEP))

// 画面に入ったら1回だけ表示。説明文はこの時刻を基準に開始する
const inView = ref(false)
const descStartAt = ref(null)
const root = useInViewOnce(() => {
  inView.value = true
  descStartAt.value = performance.now() + (titleStart.value + DESC_AFTER_TITLE) * 1000
})
</script>

<template>
  <div
    ref="root"
    class="section-heading"
    :class="{ 'section-heading--center': center, 'is-inview': inView }"
  >
    <p class="section-heading__number" aria-hidden="true">
      <span class="section-heading__num">{{ content.number }}</span>
      <span class="section-heading__label">
        <span v-for="(group, g) in label" :key="g" class="split-group">
          <span v-for="(c, k) in group" :key="k" class="split-char" :style="{ '--char-delay': c.delay }">{{ c.char }}</span>
        </span>
      </span>
    </p>
    <h2 :id="id" class="section-heading__title">
      <!-- 読み上げ用の文章（画面には表示しない） -->
      <span class="visually-hidden">{{ content.title }}</span>
      <!-- 画面表示用（1文字ずつ表示。読み上げは上の文章のみ） -->
      <span aria-hidden="true">
        <template v-for="(line, l) in titleLines" :key="l">
          <br v-if="l > 0" />
          <span v-for="(group, g) in line" :key="g" class="split-group">
            <span v-for="(c, k) in group" :key="k" class="split-char" :style="{ '--char-delay': c.delay }">{{ c.char }}</span>
          </span>
        </template>
      </span>
    </h2>
    <AnimatedParagraph v-if="content.description" class="section-heading__desc" :text="content.description" :start-at="descStartAt" />
  </div>
</template>
