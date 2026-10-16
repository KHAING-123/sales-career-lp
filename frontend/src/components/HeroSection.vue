<script setup>
import { ref } from 'vue'
import { images } from '../data/imageConfig.js'

const hero = images.hero
const failed = ref(false)
</script>

<template>
  <section class="hero" aria-label="ファーストビュー">
    <!-- メインコピーは画像内に含まれるため、画像の alt を見出しとして扱います -->
    <h1 class="hero__visual">
      <picture v-if="hero.pc && !failed">
        <source v-if="hero.sp" media="(max-width: 767px)" :srcset="hero.sp" :width="hero.spSize[0]" :height="hero.spSize[1]" />
        <img
          :src="hero.pc"
          :alt="hero.alt"
          :width="hero.pcSize[0]"
          :height="hero.pcSize[1]"
          fetchpriority="high"
          decoding="async"
          @error="failed = true"
        />
      </picture>
      <span v-else class="img-placeholder" role="img" :aria-label="hero.alt">
        画像未設定：hero/sales-hero-pc.png / sales-hero-sp.png
      </span>
    </h1>
  </section>
</template>

<style scoped>
/* ヘッダー（固定表示）の高さぶん下げて、画像がヘッダーに隠れないようにする */
.hero {
  padding-top: var(--header-height);
  background: var(--color-bg);
}

/* 画像の下端の色から、次のセクションの背景色へなめらかにつなぐ帯 */
.hero::after {
  content: "";
  display: block;
  height: var(--hero-bottom-fade-height);
  background: linear-gradient(180deg, transparent 0%, var(--color-bg) 100%), var(--hero-bottom-bg);
}

/* 画像は横幅いっぱい・縦横比を維持。大きな画面でも元画像以上に拡大しすぎないよう上限を設定 */
.hero__visual {
  max-width: 1920px;
  margin: 0 auto;
  font-size: inherit;
  line-height: 0;
}

.hero__visual img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.hero__visual .img-placeholder {
  aspect-ratio: 16 / 9;
  line-height: 1.6;
  border-radius: 0;
}

@media (max-width: 767px) {
  .hero__visual .img-placeholder {
    aspect-ratio: 2 / 3;
  }
}
</style>
