<script setup>
import SectionHeading from './common/SectionHeading.vue'
import LpImage from './common/LpImage.vue'
import { lpContent } from '../data/lpContent.js'
import { images } from '../data/imageConfig.js'

const content = lpContent.work
</script>

<template>
  <section id="work" class="work section bg-blue has-decor" aria-labelledby="work-title">
    <svg class="bg-wave bg-wave--top work__wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0h1440v40c-240 60-480 70-740 30S220 20 0 70Z" />
    </svg>
    <span class="bg-blob bg-blob--cyan work__blob" aria-hidden="true"></span>

    <div class="container">
      <div class="work__top">
        <SectionHeading id="work-title" :content="content" class="work__heading" />
        <div class="work__visual" v-reveal="0.15">
          <LpImage :src="images.work.src" :alt="images.work.alt" placeholder="work/sales-work.png" width="1040" height="800" />
        </div>
      </div>

      <ol class="work__list">
        <li v-for="(item, i) in content.items" :key="item.id" class="work-item" v-reveal="i * 0.15">
          <div class="work-item__icon float" :style="{ '--float-delay': `${i * 0.6}s` }">
            <LpImage :src="images.icons.work[item.id]" :placeholder="`icons/work/icon-${item.id}.png`" width="240" height="240" />
          </div>
          <p class="work-item__step">{{ item.step }}</p>
          <h3 class="work-item__title">{{ item.title }}</h3>
          <p class="work-item__text">{{ item.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.work__wave {
  color: var(--color-bg);
}

.work__blob {
  bottom: 5%;
  left: -8%;
  width: 520px;
  aspect-ratio: 1;
}

.work__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(32px, 4vw, 64px);
}

.work__heading {
  margin-bottom: 0;
}

.work__visual {
  width: 100%;
  max-width: 560px;
  justify-self: end;
}

.work__visual :deep(img) {
  width: 100%;
  height: auto;
}

.work__visual :deep(.img-placeholder) {
  aspect-ratio: 13 / 10;
}

/* PC：3項目を横並び */
.work__list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(20px, 3vw, 40px);
  margin-top: clamp(48px, 6vw, 80px);
}

/* 項目をつなぐ点線 */
.work__list::before {
  content: "";
  position: absolute;
  top: 60px;
  left: 16%;
  right: 16%;
  border-top: 2px dashed var(--color-turquoise-light);
  z-index: 0;
}

.work-item {
  position: relative;
  z-index: 1;
  padding: 0 8px;
  text-align: center;
}

.work-item__icon {
  display: grid;
  place-items: center;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  padding: 18px;
  background: var(--color-white);
  border-radius: 50%;
  box-shadow: var(--shadow-card);
}

.work-item__icon :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.work-item__icon :deep(.img-placeholder) {
  min-height: 0;
  padding: 4px;
  font-size: 0.5625rem;
  border-radius: 50%;
}

.work-item__step {
  font-family: var(--font-en);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--color-turquoise);
}

.work-item__title {
  margin-top: 6px;
  font-size: var(--fs-h3);
  font-weight: 900;
  line-height: 1.5;
}

.work-item__text {
  max-width: 320px;
  margin: 12px auto 0;
  font-size: var(--fs-small);
  line-height: 1.9;
  color: var(--color-text-sub);
  text-align: left;
}

@media (max-width: 1279px) {
  .work__top {
    grid-template-columns: 1fr;
  }

  .work__visual {
    justify-self: center;
  }
}

/* スマホ：アイコン＋文章の縦並び */
@media (max-width: 767px) {
  .work__list {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .work__list::before {
    top: 40px;
    bottom: 40px;
    left: 56px;
    right: auto;
    border-top: 0;
    border-left: 2px dashed var(--color-turquoise-light);
  }

  .work-item {
    display: grid;
    grid-template-columns: 80px minmax(0, 1fr);
    gap: 0 18px;
    padding: 20px;
    text-align: left;
    background: rgba(255, 255, 255, 0.7);
    border-radius: var(--radius-md);
  }

  .work-item__icon {
    grid-row: span 3;
    width: 80px;
    height: 80px;
    margin: 0;
    padding: 12px;
  }

  .work-item__title {
    margin-top: 2px;
    font-size: 1.0625rem;
  }

  .work-item__text {
    max-width: none;
    margin-top: 6px;
    font-size: 0.8125rem;
  }
}
</style>
