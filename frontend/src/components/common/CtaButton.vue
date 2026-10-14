<script setup>
// 「話を詳しく聞いてみる」ボタン。リンク先は data/navigation.js で設定
import { ctaLink } from '../../data/navigation.js'

defineProps({
  text: { type: String, required: true },
  variant: { type: String, default: 'primary' }, // primary（ネイビー）/ yellow
})
</script>

<template>
  <a
    class="btn"
    :class="`btn--${variant}`"
    :href="ctaLink.url"
    :target="ctaLink.newTab ? '_blank' : undefined"
    :rel="ctaLink.newTab ? 'noopener' : undefined"
  >
    <span>{{ text }}</span>
    <span class="btn__arrow" aria-hidden="true">
      <svg viewBox="0 0 12 12"><path d="M3 1.5 7.5 6 3 10.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </span>
  </a>
</template>
