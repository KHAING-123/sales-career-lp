<script setup>
import SectionHeading from './common/SectionHeading.vue'
import LpImage from './common/LpImage.vue'
import { lpContent } from '../data/lpContent.js'
import { images } from '../data/imageConfig.js'

const content = lpContent.value
</script>

<template>
  <section id="value" class="value section bg-light has-decor" aria-labelledby="value-title">
    <svg class="bg-wave bg-wave--top value__wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0h1440v60c-260-50-520-40-760 10S240 90 0 40Z" />
    </svg>
    <span class="bg-blob bg-blob--yellow value__blob value__blob--yellow" aria-hidden="true"></span>
    <span class="bg-blob bg-blob--blue value__blob value__blob--blue" aria-hidden="true"></span>

    <div class="value__inner container">
      <SectionHeading id="value-title" :content="content" class="value__heading" />

      <ul class="value__list">
        <li v-for="(item, i) in content.items" :key="item.id" class="value-card" v-reveal="i * 0.15">
          <div class="value-card__icon float" :style="{ '--float-delay': `${i * 0.6}s` }">
            <LpImage :src="images.icons.value[item.id]" :placeholder="`icons/value/icon-${item.id}.png`" width="240" height="240" />
          </div>
          <div class="value-card__body">
            <h3 class="value-card__title">{{ item.title }}</h3>
            <p class="value-card__text">{{ item.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.value__wave {
  color: #e8f8fc;
}

.value__blob--yellow {
  top: 20%;
  left: -10%;
  width: 460px;
  aspect-ratio: 1;
}

.value__blob--blue {
  bottom: -10%;
  right: -8%;
  width: 520px;
  aspect-ratio: 1;
}

/* PC：左に見出し、右にカード */
.value__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  align-items: center;
  gap: clamp(32px, 5vw, 80px);
}

.value__heading {
  margin-bottom: 0;
}

.value__list {
  display: grid;
  gap: 20px;
}

.value-card {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  align-items: center;
  gap: 28px;
  padding: 28px 36px;
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  transition: box-shadow 0.3s ease;
}

.value-card:hover {
  box-shadow: var(--shadow-card-hover);
}

/* カードを少しずつずらして配置 */
.value-card:nth-child(2) {
  margin-left: 40px;
}

.value-card:nth-child(3) {
  margin-left: 80px;
}

.value-card__icon {
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  padding: 14px;
  background: var(--color-bg-blue);
  border-radius: 50%;
}

.value-card:nth-child(2) .value-card__icon {
  background: var(--color-bg-yellow);
}

.value-card__icon :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.value-card__icon :deep(.img-placeholder) {
  min-height: 0;
  padding: 2px;
  font-size: 0.5rem;
  border-radius: 50%;
}

.value-card__title {
  font-size: var(--fs-h3);
  font-weight: 900;
  line-height: 1.5;
}

.value-card__title::after {
  content: "";
  display: block;
  width: 32px;
  height: 3px;
  margin-top: 10px;
  background: var(--gradient-accent);
  border-radius: 3px;
}

.value-card__text {
  margin-top: 12px;
  font-size: var(--fs-small);
  line-height: 1.9;
  color: var(--color-text-sub);
}

@media (max-width: 1279px) {
  .value__inner {
    grid-template-columns: 1fr;
  }

  .value-card:nth-child(n) {
    margin-left: 0;
  }
}

@media (max-width: 767px) {
  .value-card {
    grid-template-columns: 64px minmax(0, 1fr);
    align-items: start;
    gap: 16px;
    padding: 22px 20px;
  }

  .value-card__icon {
    width: 64px;
    height: 64px;
    padding: 10px;
  }

  .value-card__title {
    font-size: 1.0625rem;
  }

  .value-card__text {
    font-size: 0.8125rem;
  }
}
</style>
