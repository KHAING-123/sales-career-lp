<script setup>
// 画像表示。画像が未設定・読み込み失敗のときは「仮画像」の枠を表示します
import { ref, watch } from 'vue'

const props = defineProps({
  src: { type: String, default: null },
  alt: { type: String, default: '' },
  // 画像未設定時の枠に表示するファイル名（担当者向けの目印）
  placeholder: { type: String, default: '' },
  width: { type: [Number, String], default: undefined },
  height: { type: [Number, String], default: undefined },
  loading: { type: String, default: 'lazy' },
})

const failed = ref(false)
watch(() => props.src, () => (failed.value = false))
</script>

<template>
  <img
    v-if="src && !failed"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    decoding="async"
    @error="failed = true"
  />
  <span v-else class="img-placeholder" role="img" :aria-label="alt || undefined" :aria-hidden="alt ? undefined : 'true'">
    {{ placeholder ? `画像未設定：${placeholder}` : '画像未設定' }}
  </span>
</template>
