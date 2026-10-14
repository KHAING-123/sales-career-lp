<script setup>
// セクション見出し（番号・英字ラベル・タイトル・説明文）
defineProps({
  id: { type: String, required: true },
  content: { type: Object, required: true },
  center: { type: Boolean, default: false },
})
</script>

<template>
  <div class="section-heading" :class="{ 'section-heading--center': center }" v-reveal>
    <p class="section-heading__number" aria-hidden="true">
      <span class="section-heading__num">{{ content.number }}</span>
      <span class="section-heading__label">{{ content.label }}</span>
    </p>
    <h2 :id="id" class="section-heading__title">{{ content.title }}</h2>
    <p v-if="content.description" class="section-heading__desc">{{ content.description }}</p>
  </div>
</template>
